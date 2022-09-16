import { useContext, useState, useEffect, useRef, MouseEvent } from "react";

import { observer } from "mobx-react-lite";
import { EssencesStoreContext, OpenStoreContext } from "src/App";

import CurrencyFilterItem from "../CurrencyFilterItem/CurrencyFilterItem";
import styles from "./CurrencyFilterButton.module.scss";

const CurrencyFilterButton = () => {
  const { essencesStore } = useContext(EssencesStoreContext);
  const { openStore } = useContext(OpenStoreContext);
  const [isOpen, setIsOpen] = useState(false);
  //console.log("внешний", isOpen)//eslint-disable-line
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        isOpen &&
        ref.current &&
        !ref.current.contains(event.target as HTMLElement)
      ) {
        setIsOpen(false);
      }
      //console.log("сработало")//eslint-disable-line
    }
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  return !openStore.isInputSearchOpen ? (
    <div className={styles["filter-container"]}>
      <div className={styles["filter-container__coins-inscription"]}>Coins</div>
      <div
        ref={ref}
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
            essencesStore.currenciesArray.map((currencyItem, index) => (
              <CurrencyFilterItem
                key={currencyItem.id}
                currency={currencyItem.currency.toUpperCase()}
                index={index}
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
