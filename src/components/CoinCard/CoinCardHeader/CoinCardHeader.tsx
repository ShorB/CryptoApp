import Star from "@img/Vector.svg";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { CoinsData } from "src/types";

import styles from "./CoinCardHeader.module.scss";

type CoinCardHeaderData = {
  coin: CoinsData | null;
};

const CoinCardHeader = ({ coin }: CoinCardHeaderData) => {
  let flatChangeClassNames = "coin__card__change_flat_loser";
  let changeClassNames = "coin__card__change_loser";
  if (coin!.priceChange >= 0) {
    flatChangeClassNames = "coin__card__change_flat_gainer";
    changeClassNames = "coin__card__change_gainer";
  }
  return (
    <div>
      <div className={styles.coin__card__header__container}>
        <NavLink to={"/"}>
          <div className={styles.coin__card__back}></div>
        </NavLink>
        <div
          className={styles.coin__card__image}
          style={{ backgroundImage: `url(${coin!.image})` }}
        ></div>
        <div className={styles.coin__card__header__name__container}>
          <div className={styles.coin__card__header__name}>{coin!.name}</div>
          <div className={styles.coin__card__header__discription}>
            {"(" + coin!.symbol.toUpperCase() + ")"}
          </div>
        </div>
        <img src={Star} alt="star"></img>
      </div>
      <div className={styles.coin__card__price__container}>
        <div className={styles.coin__card__price}>{coin!.curPrice}</div>
        <div className={styles[flatChangeClassNames]}>
          {coin!.priceChangeFlat >= 0
            ? "+" + coin!.priceChangeFlat.toFixed(3)
            : coin!.priceChangeFlat.toFixed(3)}
        </div>
        <div className={styles[changeClassNames]}>
          {"(" + coin!.priceChange.toFixed(2) + "%)"}
        </div>
      </div>
    </div>
  );
};

export default observer(CoinCardHeader);
