import Star from "@img/Vector.svg";
import { NavLink } from "react-router-dom";
import { CoinsData } from "src/types";

import styles from "./CoinCardHeader.module.scss";

type CoinCardHeaderData = {
  coin: CoinsData;
};

const CoinCardHeader = ({ coin }: CoinCardHeaderData) => {
  return (
    <div>
      <div className={styles.coin__card__header__container}>
        <NavLink to={"/"}>
          <button className={styles.coin__card__back}></button>
        </NavLink>
        <img
          className={styles.coin__card__image}
          src={`${coin.image}`}
          alt={`${coin.symbol.toUpperCase()}`}
        ></img>
        <div className={styles.coin__card__header__name__container}>
          <div className={styles.coin__card__header__name}>{coin.name}</div>
          <div className={styles.coin__card__header__discription}>
            {"(" + coin.symbol.toUpperCase() + ")"}
          </div>
        </div>
        <img src={Star} alt="star"></img>
      </div>
      <div className={styles.coin__card__price__container}>
        <div className={styles.coin__card__price}>{coin!.curPrice}</div>
        <div
          className={
            styles[
              `coin__card__change_flat_${
                coin.priceChange >= 0 ? `gainer` : `loser`
              }`
            ]
          }
        >
          {coin.priceChangeFlat >= 0
            ? "+" + coin.priceChangeFlat.toFixed(3)
            : coin.priceChangeFlat.toFixed(3)}
        </div>
        <div
          className={
            styles[
              `coin__card__change_${coin.priceChange >= 0 ? `gainer` : `loser`}`
            ]
          }
        >
          {"(" + coin.priceChange.toFixed(2) + "%)"}
        </div>
      </div>
    </div>
  );
};

export default CoinCardHeader;
