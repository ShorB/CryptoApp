import { useContext } from "react";

import styles from "@components/Header/components/CurrencyFilter/CurrencyFilterItem/CurrencyFilterItem.module.scss";
import { EssencesStoreContext } from "@src/App";

type CurrencyFilterItemData = {
  currency: string;
};

const CurrencyFilterItem = ({ currency }: CurrencyFilterItemData) => {
  const { essencesStore } = useContext(EssencesStoreContext);
  return (
    <button
      onClick={() => essencesStore.changeCurrentCurrency(currency)}
      className={styles.item__container}
    >
      <div className={styles.item__description}>Market- {currency}</div>
    </button>
  );
};

export default CurrencyFilterItem;
