import { useContext } from "react";

import { EssencesStoreContext } from "src/App";

import styles from "./CurrencyFilterItem.module.scss";

type CurrencyFilterItemData = {
  currency: string;
};

const CurrencyFilterItem = ({ currency }: CurrencyFilterItemData) => {
  const { essencesStore } = useContext(EssencesStoreContext);
  return (
    <button
      onClick={() => essencesStore.changeCurrentCurrency(currency)}
      className={styles["item"]}
    >
      <div className={styles["item__description"]}>Market- {currency}</div>
    </button>
  );
};

export default CurrencyFilterItem;
