import { useContext } from "react";

import styles from "@components/Header/CurrencyFilter/CurrencyFilterItem/CurrencyFilterItem.module.scss";

import { EssencesStoreContext } from "../../../../App";

type CurrencyFilterItemData = {
  currency: string;
};

const CurrencyFilterItem = ({ currency }: CurrencyFilterItemData) => {
  const essencesStoreContext = useContext(EssencesStoreContext);
  return (
    <div
      onClick={() =>
        essencesStoreContext.essencesStore.changeCurrentCurrency(currency)
      }
      className={styles.item__container}
    >
      <div className={styles.item__description}>Market- {currency}</div>
    </div>
  );
};

export default CurrencyFilterItem;
