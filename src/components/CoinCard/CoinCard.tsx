import { useContext, useEffect } from "react";

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
  let essencesCurrentCurrency = essencesStore.currentCurrency.toLowerCase();
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
    essencesStore.setCoin(globalCoin);
  }, [essencesStore, globalCoin]);
  return (
    essencesStore.coin && (
      <div className={styles["coin-card"]}>
        <CoinCardHeader coin={essencesStore.coin} />
        <div className={styles["graph"]}>
          <div className={styles["graph__content"]}>красивый график</div>
        </div>
        <div className={styles["time-list"]}>
          {timeInterval.map((elem, index) => {
            return (
              <button key={index} className={styles["item"]}>
                <div className={styles["item__text"]}>{elem}</div>
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
