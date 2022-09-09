import { useContext, useState } from "react";

import { EssencesStoreContext, OpenStoreContext } from "@src/App";
import { observer } from "mobx-react-lite";

import CurrencyFilterItem from "../CurrencyFilterItem/CurrencyFilterItem";
import styles from "./CurrencyFilterButton.module.scss";

const CurrencyFilterButton = () => {
  const { essencesStore } = useContext(EssencesStoreContext);
  const { openStore } = useContext(OpenStoreContext);
  const [isOpen, setIsOpen] = useState(false);
  return !openStore.isInputSearchOpen ? (
    <div className={styles["filter-container"]}>
      <div className={styles["filter-container__coins-inscription"]}>Coins</div>
      <div
        className={
          styles[`filter-list_${isOpen ? `open` : `close`}`] +
          " " +
          styles["filter-list"]
        }
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={
            styles[`filter-button_${isOpen ? `open` : `close`}`] +
            " " +
            styles["filter-button"]
          }
        >
          <div className={styles["filter-button__description"]}>
            Market- {essencesStore.currentCurrency.toUpperCase()}
          </div>
          {isOpen ? (
            <div className={styles["filter-button__opener_open"]}></div>
          ) : (
            <div className={styles["filter-button__opener_close"]}></div>
          )}
        </button>
        <div className={styles["item-list"]}>
          {isOpen &&
            essencesStore.currenciesArray.map((currencyItem) => (
              <CurrencyFilterItem
                key={currencyItem.id}
                currency={currencyItem.currency.toUpperCase()}
              />
            ))}
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default observer(CurrencyFilterButton);
