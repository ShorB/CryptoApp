import { useContext, useEffect, useRef } from "react";

import { EChart } from "@hcorta/react-echarts";
import { timeInterval } from "config/Constants";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";
import { EssencesStoreContext, GlobalApiStoreContext } from "src/App";

import styles from "./CoinCard.module.scss";
import CoinCardHeader from "./CoinCardHeader/CoinCardHeader";

const CoinCard = () => {
  const location = useLocation();
  const { essencesStore } = useContext(EssencesStoreContext);
  const { globalApiStore } = useContext(GlobalApiStoreContext);
  let globalCoin = globalApiStore.coin;
  let globalChartData = globalApiStore.chartData;
  let essencesCurrentCurrency = essencesStore.currentCurrency.toLowerCase();
  let essencesDays = essencesStore.days;
  let essencesInterval = essencesStore.interval;
  useEffect(() => {
    globalApiStore.fetch(
      "https://api.coingecko.com/api/v3/coins",
      "getCoin",
      "",
      0,
      "",
      essencesCurrentCurrency,
      location
    );
  }, [essencesCurrentCurrency, globalApiStore, location]);
  useEffect(() => {
    globalApiStore.fetch(
      "https://api.coingecko.com/api/v3/coins",
      "getChart",
      "",
      0,
      "",
      essencesCurrentCurrency,
      location,
      essencesDays,
      essencesInterval
    );
  }, [
    essencesCurrentCurrency,
    globalApiStore,
    location,
    essencesDays,
    essencesInterval,
  ]);
  useEffect(() => {
    essencesStore.setCoin(globalCoin);
  }, [essencesStore, globalCoin]);
  useEffect(() => {
    essencesStore.setChartData(globalChartData);
  }, [essencesStore, globalChartData]);
  let setDays = (days: number) => essencesStore.setDays(days);
  let setInterval = (interval: string) => essencesStore.setInterval(interval);
  let setCurrentChartInterval = (interval: string) =>
    essencesStore.setCurrentChartInterval(interval);
  function handleOnClick(elem: any) {
    let item = elem.target.innerText;
    if (item === "24 H") {
      setInterval("hourly");
      setDays(1);
      setCurrentChartInterval("24 H");
    }
    if (item === "1 W") {
      setInterval("daily");
      setDays(7);
      setCurrentChartInterval("1 W");
    }
    if (item === "1 M") {
      setInterval("daily");
      setDays(30);
      setCurrentChartInterval("1 M");
    }
    if (item === "6 M") {
      setInterval("mounthly");
      setDays(183);
      setCurrentChartInterval("6 M");
    }
    if (item === "1 Y") {
      setInterval("mounthly");
      setDays(366);
      setCurrentChartInterval("1 Y");
    }
    if (item === "All") {
      setInterval("yearly");
      setDays(100500);
      setCurrentChartInterval("All");
    }
  }
  return (
    essencesStore.coin && (
      <div className={styles["coin-card"]}>
        <CoinCardHeader coin={essencesStore.coin} />
        <div className={styles["graph"]}>
          <EChart
            width={310}
            height={200}
            xAxis={{
              type: "category",
              data: essencesStore.chartDataTime,
            }}
            yAxis={{
              type: "value",
            }}
            series={[
              {
                data: essencesStore.chartDataPrice,
                type: "line",
              },
            ]}
            grid={{
              x: 50,
              y: 20,
              x2: 50,
              y2: 20,
            }}
          />
        </div>
        <div className={styles["time-list"]}>
          {timeInterval.map((elem, index) => {
            return (
              <button
                onClick={(elem) => handleOnClick(elem)}
                key={index}
                className={
                  styles[
                    `item${
                      elem === essencesStore.currentChartInterval ? "_open" : ""
                    }`
                  ]
                }
              >
                <div
                  className={
                    styles[
                      `item__text${
                        elem === essencesStore.currentChartInterval
                          ? "_open"
                          : ""
                      }`
                    ]
                  }
                >
                  {elem}
                </div>
              </button>
            );
          })}
        </div>
        <div className={styles["coin"]}>
          <div className={styles["image"]}>
            <img
              className={styles["image__content"]}
              src={`${essencesStore.coin.image}`}
              alt={`${essencesStore.coin.symbol.toUpperCase()}`}
            ></img>
          </div>
          <div className={styles["coin-info"]}>
            <div className={styles["coin-info__name"]}>
              {essencesStore.coin.name}
            </div>
            <div className={styles["coin-info__symbol"]}>
              {"00:00 " + essencesStore.coin.symbol.toUpperCase()}
            </div>
          </div>
          <div className={styles["coin-graph"]}></div>
          <div className={styles["coin-price-container"]}>
            <div className={styles["coin-price-container__price"]}>
              {essencesStore.coin.curPrice}
            </div>
            <div
              className={
                styles[
                  `coin-price-container__price-change_${
                    essencesStore.coin.priceChange >= 0 ? `gainer` : `loser`
                  }`
                ]
              }
            >
              {essencesStore.coin.priceChange >= 0 ? "+" : ""}
              {essencesStore.coin.priceChange + "%"}
            </div>
          </div>
        </div>
        <div className={styles["coin-transaction"]}>
          <div className={styles["coin-transaction__name"]}>Transactions</div>
        </div>
      </div>
    )
  );
};

export default observer(CoinCard);
