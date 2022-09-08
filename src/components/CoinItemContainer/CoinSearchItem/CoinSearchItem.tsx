import styles from "@components/CoinItemContainer/CoinSearchItem/CoinSearchItem.module.scss";
import { CoinsData } from "src/types";

type CoinItemProps = {
  coin: CoinsData;
};

const CoinSearchItem = ({ coin }: CoinItemProps) => {
  return (
    <div className={styles["coin-search__container"]}>
      <div className={styles["coin-image__container"]}>
        <img
          className={styles["coin-image"]}
          src={`${coin.image}`}
          alt={`${coin.symbol}`}
        ></img>
      </div>
      <div className={styles["coin-name"]}>{coin.name}</div>
      <div className={styles["coin-symbol"]}>{coin.symbol.toUpperCase()}</div>
    </div>
  );
};

export default CoinSearchItem;
