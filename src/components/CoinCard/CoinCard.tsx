import { useState, useEffect } from "react";

import axios from "axios";
import { useLocation } from "react-router-dom";
import { CoinsData } from "src/types";

import styles from "./CoinCard.module.scss";
import CoinCardHeader from "./CoinCardHeader/CoinCardHeader";

type CoinCardData = {
  currency?: string;
};

const CoinCard = ({ currency = "usd" }: CoinCardData) => {
  const location = useLocation();
  const [coin, setCoin] = useState<CoinsData | null>(null);
  useEffect(() => {
    const fetch = async () => {
      const result = await axios({
        method: "get",
        url: `https://api.coingecko.com/api/v3/coins${location.pathname}`,
      });
      setCoin({
        id: result.data.id,
        image: result.data.image.large,
        name: result.data.name,
        symbol: result.data.symbol,
        curPrice: result.data.market_data.current_price[currency],
        priceChange:
          result.data.market_data.price_change_percentage_24h_in_currency[
            currency
          ],
        priceChangeFlat:
          result.data.market_data.price_change_24h_in_currency[currency],
      });
    };
    fetch();
  }, [currency, location.pathname]);

  return coin ? (
    <div className={styles.coin__card__container}>
      <CoinCardHeader coin={coin} />
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
            style={{ backgroundImage: `url(${coin.image})` }}
          ></div>
        </div>
        <div className={styles.coin__info__container}>
          <div className={styles.coin__name}>{coin.name}</div>
          <div className={styles.coin__symbol}>
            {"00:00 " + coin.symbol.toUpperCase()}
          </div>
        </div>
        <div className={styles.coin__graph}></div>
        <div className={styles.coin__price__container}>
          <div className={styles.coin__price}>{coin.curPrice}</div>
          {coin.priceChange >= 0 ? (
            <div className={styles.coin__price__change_gainer}>
              {"+" + coin.priceChange + "%"}
            </div>
          ) : (
            <div className={styles.coin__price__change_loser}>
              {coin.priceChange + "%"}
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

export default CoinCard;
