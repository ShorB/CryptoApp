import { useState } from "react";

import styles from "@components/Header/CurrencyFilter/CurrencyFilterButton/CurrencyFilterButton.module.scss";
import { CurrenciesArrayItemData } from "src/App";

import CurrencyFilterItem from "../CurrencyFilterItem/CurrencyFilterItem";

export type CurrenciesFilterButtonData = {
  onClick: (currency: string) => void;
  currenciesArray: CurrenciesArrayItemData[];
  currency: string;
  isInputSearchOpen: boolean;
};

const CurrencyFilterButton = ({
  onClick,
  currenciesArray,
  currency,
  isInputSearchOpen,
}: CurrenciesFilterButtonData) => {
  const [isOpen, setIsOpen] = useState(false);

  let buttonClassName = "filter__button_close";
  isOpen
    ? (buttonClassName = "filter__button_open")
    : (buttonClassName = "filter__button_close");
  let filterListClassName = "filter__list__container_close";
  isOpen
    ? (filterListClassName = "filter__list__container_open")
    : (filterListClassName = "filter__list__container_close");

  return !isInputSearchOpen ? (
    <div className={styles.filter__list__container}>
      <div className={styles.coins__inscription}>Coins</div>
      <div
        className={
          styles[filterListClassName] + " " + styles.filter__list__container_
        }
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={styles[buttonClassName] + " " + styles.filter__button}
        >
          <div className={styles.button__description}>
            Market- {currency.toUpperCase()}
          </div>
          {isOpen ? (
            <div className={styles.button__opener_open}></div>
          ) : (
            <div className={styles.button__opener_close}></div>
          )}
        </button>
        <div className={styles.item__list__container}>
          {isOpen &&
            currenciesArray.map((currencyItem) => (
              <CurrencyFilterItem
                key={currencyItem.id}
                currency={currencyItem.currency.toUpperCase()}
                onClick={onClick}
              />
            ))}
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default CurrencyFilterButton;
