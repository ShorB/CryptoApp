import { useContext, useEffect } from "react";

import { timeInterval } from "@config/Constants";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";

import { EssencesStoreContext, GlobalApiStoreContext } from "../../App";
import styles from "./CoinCard.module.scss";
import CoinCardHeader from "./CoinCardHeader/CoinCardHeader";

const CoinCard = () => {
  const location = useLocation();
  const essencesStoreContext = useContext(EssencesStoreContext);
  const globalApiStoreContext = useContext(GlobalApiStoreContext);
  let globalCoin = globalApiStoreContext.globalApiStore.coin;
  let essencesCurrentCurrency =
    essencesStoreContext.essencesStore.currentCurrency.toLowerCase();
  useEffect(() => {
    globalApiStoreContext.globalApiStore.fetch(
      "https://api.coingecko.com/api/v3/coins",
      "getCoin",
      "",
      0,
      "",
      essencesCurrentCurrency,
      location
    );
  }, [essencesCurrentCurrency, globalApiStoreContext.globalApiStore, location]);
  useEffect(() => {
    essencesStoreContext.essencesStore.setCoin(globalCoin);
  }, [essencesStoreContext.essencesStore, globalCoin]);
  return (
    essencesStoreContext.essencesStore.coin && (
      <div className={styles.coin__card__container}>
        <CoinCardHeader coin={essencesStoreContext.essencesStore.coin} />
        <div className={styles.coin__card__graph__container}>
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
              src={`${essencesStoreContext.essencesStore.coin.image}`}
              alt={`${essencesStoreContext.essencesStore.coin.symbol.toUpperCase()}`}
            ></img>
          </div>
          <div className={styles.coin__info__container}>
            <div className={styles.coin__name}>
              {essencesStoreContext.essencesStore.coin.name}
            </div>
            <div className={styles.coin__symbol}>
              {"00:00 " +
                essencesStoreContext.essencesStore.coin.symbol.toUpperCase()}
            </div>
          </div>
          <div className={styles.coin__graph}></div>
          <div className={styles.coin__price__container}>
            <div className={styles.coin__price}>
              {essencesStoreContext.essencesStore.coin.curPrice}
            </div>
            {essencesStoreContext.essencesStore.coin.priceChange >= 0 ? (
              <div className={styles.coin__price__change_gainer}>
                {"+" +
                  essencesStoreContext.essencesStore.coin.priceChange +
                  "%"}
              </div>
            ) : (
              <div className={styles.coin__price__change_loser}>
                {essencesStoreContext.essencesStore.coin.priceChange + "%"}
              </div>
            )}
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
