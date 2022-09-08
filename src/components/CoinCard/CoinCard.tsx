import { useContext, useEffect } from "react";

import { timeInterval } from "@config/Constants";
import { EssencesStoreContext, GlobalApiStoreContext } from "@src/App";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";

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
        <div className={styles["coin-card__graph"]}>
          <div className={styles.coin__card__graph}>красивый график</div>
        </div>
        <div className={styles.coin__card__time__container}>
          {timeInterval.map((elem, index) => {
            return (
              <button key={index} className={styles.coin__card__time__item}>
                <div className={styles.coin__card__time__item__text}>
                  {elem}
                </div>
              </button>
            );
          })}
        </div>
        <div className={styles.coin__container}>
          <div className={styles.coin__image__container}>
            <img
              className={styles.coin__image}
              src={`${essencesStore.coin.image}`}
              alt={`${essencesStore.coin.symbol.toUpperCase()}`}
            ></img>
          </div>
          <div className={styles.coin__info__container}>
            <div className={styles.coin__name}>{essencesStore.coin.name}</div>
            <div className={styles.coin__symbol}>
              {"00:00 " + essencesStore.coin.symbol.toUpperCase()}
            </div>
          </div>
          <div className={styles.coin__graph}></div>
          <div className={styles.coin__price__container}>
            <div className={styles.coin__price}>
              {essencesStore.coin.curPrice}
            </div>
            <div
              className={
                styles[
                  `coin__price__change_${
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
        <div className={styles.coin__card__transaction__container}>
          <div className={styles.coin__card__transaction__name}>
            Transactions
          </div>
        </div>
      </div>
    )
  );
};

export default observer(CoinCard);
