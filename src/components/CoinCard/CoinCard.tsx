import { useContext, useEffect, useState } from "react";

import { EChart } from "@hcorta/react-echarts";
import { Loader } from "components/Loader";
import { timeInterval, timeIntervalMap } from "config/Constants";
import { action } from "mobx";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";
import { EssencesStoreContext, GlobalApiStoreContext } from "src/App";

import styles from "./CoinCard.module.scss";
import CoinCardHeader from "./CoinCardHeader/CoinCardHeader";

const CoinCard = () => {
  const location = useLocation();
  const { essencesStore } = useContext(EssencesStoreContext);
  const { globalApiStore } = useContext(GlobalApiStoreContext);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(
    action(() => {
      setIsLoading(true);
      globalApiStore
        .fetch(
          "https://api.coingecko.com/api/v3/coins",
          "getCoin",
          "",
          0,
          "",
          essencesStore.currentCurrency.toLowerCase(),
          location
        )
        .then(() => setIsLoading(false));
    }),
    [essencesStore.currentCurrency.toLowerCase(), globalApiStore, location]
  );
  useEffect(
    action(() => {
      globalApiStore.fetch(
        "https://api.coingecko.com/api/v3/coins",
        "getChart",
        "",
        0,
        "",
        essencesStore.currentCurrency.toLowerCase(),
        location,
        essencesStore.days,
        essencesStore.interval
      );
    }),
    [
      essencesStore.currentCurrency.toLowerCase(),
      globalApiStore,
      location,
      essencesStore.days,
      essencesStore.interval,
    ]
  );
  useEffect(
    action(() => {
      essencesStore.setCoin(globalApiStore.coin);
    }),
    [essencesStore, globalApiStore.coin]
  );
  useEffect(
    action(() => {
      essencesStore.setChartData(globalApiStore.chartData);
    }),
    [essencesStore, globalApiStore.chartData]
  );
  function handleOnClick(elem: any) {
    let item = elem.target.innerText;
    essencesStore.setInterval(timeIntervalMap.get(item).setInterval);
    essencesStore.setDays(timeIntervalMap.get(item).setDays);
    essencesStore.setCurrentChartInterval(
      timeIntervalMap.get(item).setCurrentChartInterval
    );
  }
  return (
    essencesStore.coin && (
      <div className={styles["coin-card"]}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
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
                          elem === essencesStore.currentChartInterval
                            ? "_open"
                            : ""
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
              <div className={styles["coin-transaction__name"]}>
                Transactions
              </div>
            </div>
          </>
        )}
      </div>
    )
  );
};

export default observer(CoinCard);
