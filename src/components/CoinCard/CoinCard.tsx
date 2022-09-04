import { useEffect } from "react";

import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";

import CoinCardApiStore from "../../store/local/CoinCardApiStore/CoinCardApiStore";
import styles from "./CoinCard.module.scss";
import CoinCardHeader from "./CoinCardHeader/CoinCardHeader";

type CoinCardData = {
  currency?: string;
};

const CoinCard = ({ currency = "usd" }: CoinCardData) => {
  const location = useLocation();
  const coinCardApiStore = useLocalStore(
    () => new CoinCardApiStore(currency, location)
  );
  useEffect(() => {
    coinCardApiStore.fetch();
  }, [coinCardApiStore]);
  return coinCardApiStore.coin ? (
    <div className={styles.coin__card__container}>
      <CoinCardHeader coin={coinCardApiStore.coin} />
      <div className={styles.coin__card__graph__container}>
        <div className={styles.coin__card__graph}>красивый график</div>
      </div>
      <div className={styles.coin__card__time__container}>
        <div className={styles.coin__card__time__item}>
          <div className={styles.coin__card__time__item__text}>1 H</div>
        </div>
        <div className={styles.coin__card__time__item}>
          <div className={styles.coin__card__time__item__text}>24 H</div>
        </div>
        <div className={styles.coin__card__time__item}>
          <div className={styles.coin__card__time__item__text}>1 W</div>
        </div>
        <div className={styles.coin__card__time__item}>
          <div className={styles.coin__card__time__item__text}>1 M</div>
        </div>
        <div className={styles.coin__card__time__item}>
          <div className={styles.coin__card__time__item__text}>6 M</div>
        </div>
        <div className={styles.coin__card__time__item}>
          <div className={styles.coin__card__time__item__text}>1 Y</div>
        </div>
        <div className={styles.coin__card__time__item}>
          <div className={styles.coin__card__time__item__text}>All</div>
        </div>
      </div>
      <div className={styles.coin__container}>
        <div className={styles.coin__image__container}>
          <div
            className={styles.coin__image}
            style={{ backgroundImage: `url(${coinCardApiStore.coin.image})` }}
          ></div>
        </div>
        <div className={styles.coin__info__container}>
          <div className={styles.coin__name}>{coinCardApiStore.coin.name}</div>
          <div className={styles.coin__symbol}>
            {"00:00 " + coinCardApiStore.coin.symbol.toUpperCase()}
          </div>
        </div>
        <div className={styles.coin__graph}></div>
        <div className={styles.coin__price__container}>
          <div className={styles.coin__price}>
            {coinCardApiStore.coin.curPrice}
          </div>
          {coinCardApiStore.coin.priceChange >= 0 ? (
            <div className={styles.coin__price__change_gainer}>
              {"+" + coinCardApiStore.coin.priceChange + "%"}
            </div>
          ) : (
            <div className={styles.coin__price__change_loser}>
              {coinCardApiStore.coin.priceChange + "%"}
            </div>
          )}
        </div>
      </div>
      <div className={styles.coin__card__transaction__container}>
        <div className={styles.coin__card__transaction__name}>Transactions</div>
      </div>
    </div>
  ) : null;
};

export default observer(CoinCard);
