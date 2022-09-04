import styles from "@components/CoinItemContainer/CoinItem/CoinItem.module.scss";
import { CoinsData } from "src/types";

type CoinItemProps = {
  coin: CoinsData;
};

const CoinItem = ({ coin }: CoinItemProps) => {
  return (
    <div className={styles.coin__container}>
      <div className={styles.coin__image__container}>
        <div
          className={styles.coin__image}
          style={{ backgroundImage: `url(${coin.image})` }}
        ></div>
      </div>
      <div className={styles.coin__info__container}>
        <div className={styles.coin__name}>{coin.name}</div>
        <div className={styles.coin__symbol}>{coin.symbol.toUpperCase()}</div>
      </div>
      <div className={styles.coin__graph}>график</div>
      <div className={styles.coin__price__container}>
        <div className={styles.coin__price}>{coin.curPrice}</div>
        {coin.priceChange >= 0 ? (
          <div
            className={
              styles.coin__price__change_gainer +
              " " +
              styles.coin__price__change
            }
          >
            +{coin.priceChange?.toFixed(2)}%
          </div>
        ) : (
          <div
            className={
              styles.coin__price__change_loser +
              " " +
              styles.coin__price__change
            }
          >
            {coin.priceChange?.toFixed(2)}%
          </div>
        )}
      </div>
    </div>
  );
};

export default CoinItem;
