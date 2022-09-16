import { CoinsData } from "src/types";

import styles from "./CoinSearchItem.module.scss";

type CoinItemProps = {
  coin: CoinsData;
};

const CoinSearchItem = ({ coin }: CoinItemProps) => {
  return (
    <div className={styles["coin"]}>
      <div className={styles["image"]}>
        <img
          className={styles["image__content"]}
          src={`${coin?.image}`}
          alt={`${coin?.symbol}`}
        ></img>
      </div>
      <div className={styles["coin__name"]}>{coin?.name}</div>
      <div className={styles["coin__symbol"]}>{coin?.symbol.toUpperCase()}</div>
    </div>
  );
};

export default CoinSearchItem;
