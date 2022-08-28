import styles from "@components/Header/CurrencyFilter/CurrencyFilterItem/CurrencyFilterItem.module.scss";

type CurrencyFilterItemData = {
  currency: string;
  onClick: (currency: string) => void;
};

const CurrencyFilterItem = ({ currency, onClick }: CurrencyFilterItemData) => {
  return (
    <div onClick={() => onClick(currency)} className={styles.item__container}>
      <div className={styles.item__description}>Market- {currency}</div>
    </div>
  );
};

export default CurrencyFilterItem;
