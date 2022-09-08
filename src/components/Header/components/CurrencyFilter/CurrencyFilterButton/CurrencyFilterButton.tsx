import { useContext, useState } from "react";

import styles from "@components/Header/components/CurrencyFilter/CurrencyFilterButton/CurrencyFilterButton.module.scss";
import { EssencesStoreContext, OpenStoreContext } from "@src/App";
import { observer } from "mobx-react-lite";

import CurrencyFilterItem from "../CurrencyFilterItem/CurrencyFilterItem";

const CurrencyFilterButton = () => {
  const { essencesStore } = useContext(EssencesStoreContext);
  const { openStore } = useContext(OpenStoreContext);
  const [isOpen, setIsOpen] = useState(false);
  return !openStore.isInputSearchOpen ? (
    <div className={styles.filter__container}>
      <div className={styles.coins__inscription}>Coins</div>
      <div
        className={
          styles[`filter__list__container_${isOpen ? `open` : `close`}`] +
          " " +
          styles.filter__list__container
        }
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={
            styles[`filter__button_${isOpen ? `open` : `close`}`] +
            " " +
            styles.filter__button
          }
        >
          <div className={styles.button__description}>
            Market- {essencesStore.currentCurrency.toUpperCase()}
          </div>
          {isOpen ? (
            <div className={styles.button__opener_open}></div>
          ) : (
            <div className={styles.button__opener_close}></div>
          )}
        </button>
        <div className={styles.item__list__container}>
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
