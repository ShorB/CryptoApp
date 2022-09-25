import { useState, useEffect } from "react";
import Back from "img/Back.svg";
import Star from "img/Vector.svg";
import { NavLink } from "react-router-dom";
import { CoinsData } from "src/types";

import styles from "./CoinCardHeader.module.scss";

type CoinCardHeaderData = {
  coin: CoinsData;
};

const CoinCardHeader = ({ coin }: CoinCardHeaderData) => {
  let localStorageStore: CoinsData[] = [];
  for(let key in localStorage) {
    if (!localStorage.hasOwnProperty(key)) {
      continue;
    }
    localStorageStore.push(JSON.parse(localStorage.getItem(key) || "{}"));
  }
  let result = localStorageStore.find(elem => elem.name === coin.name);
  const [starOpen, setStarOpen] = useState(false);
  useEffect(() => {
    if (result) {
      setStarOpen(true);
    } else {
      setStarOpen(false);
    }
  }, [result]);
  function handleOnClick() {
    if (localStorageStore.findIndex(item => item.name === coin.name) === -1) {
      localStorage.setItem(`${coin.name}`, JSON.stringify(coin));
    } else {
      localStorage.removeItem(`${coin.name}`);
    }
    setStarOpen(!starOpen);
  }
  return (
    <div>
      <div className={styles["header"]}>
        <NavLink to={"/"}>
          <div className={styles["header__back-container"]}>
            <img
              className={styles["header__back-img"]}
              src={Back}
              alt="back"
            ></img>
          </div>
        </NavLink>
        <img
          className={styles["header__image"]}
          src={`${coin.image}`}
          alt={`${coin.symbol.toUpperCase()}`}
        ></img>
        <div className={styles["name-container"]}>
          <div className={styles["name-container__name"]}>{coin.name}</div>
          <div className={styles["name-container__discription"]}>
            {"(" + coin.symbol.toUpperCase() + ")"}
          </div>
        </div>
        <img
          className={styles[`${starOpen ? `star_open` : `star_close`}`]}
          src={Star}
          alt="star"
          onClick={handleOnClick}
        ></img>
      </div>
      <div className={styles["price-container"]}>
        <div className={styles["price-container__price"]}>{coin?.curPrice}</div>
        <div
          className={
            styles[
              `price-container__price-change-flat_${
                coin.priceChange >= 0 ? `gainer` : `loser`
              }`
            ]
          }
        >
          {coin.priceChangeFlat >= 0
            ? "+" + coin.priceChangeFlat?.toFixed(3)
            : coin.priceChangeFlat?.toFixed(3)}
        </div>
        <div
          className={
            styles[
              `price-container__price-change_${
                coin.priceChange >= 0 ? `gainer` : `loser`
              }`
            ]
          }
        >
          {"(" + coin.priceChange?.toFixed(2) + "%)"}
        </div>
      </div>
    </div>
  );
};

export default CoinCardHeader;
