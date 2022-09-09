import styles from "@components/CoinItemContainer/CoinItem/CoinItem.module.scss";
import { CoinsData } from "src/types";

type CoinItemProps = {
  coin: CoinsData;
};

const CoinItem = ({ coin }: CoinItemProps) => {
  return (
    <div className={styles["coin"]}>
      <div className={styles["image"]}>
        <img
          className={styles["image__content"]}
          src={`${coin.image}`}
          alt={`${coin.symbol}`}
        ></img>
      </div>
      <div className={styles["coin-info"]}>
        <div className={styles["coin-info__name"]}>{coin.name}</div>
        <div className={styles["coin-info__symbol"]}>
          {coin.symbol.toUpperCase()}
        </div>
      </div>
      <div className={styles["graph"]}></div>
      <div className={styles["coin-price"]}>
        <div className={styles["coin-price__price"]}>{coin.curPrice}</div>
        {
          <div
            className={
              styles[
                `coin-price__change_${
                  coin.priceChange >= 0 ? `gainer` : `loser`
                }`
              ] +
              " " +
              styles["coin-price__change"]
            }
          >
            {`${coin.priceChange >= 0 ? "+" : ""}` +
              coin.priceChange?.toFixed(2) +
              "%"}
          </div>
        }
      </div>
    </div>
  );
};

export default CoinItem;
