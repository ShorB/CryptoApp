import CoinItem from "@components/CoinItemContainer/CoinItem/CoinItem";
import styles from "@components/CoinItemContainer/CoinItemContainer.module.scss";
import { NavLink } from "react-router-dom";
import { CoinsData } from "src/App";

type CoinItemContainerData = {
  coins: CoinsData[];
  category: string;
};

const CoinItemContainer = ({ coins, category }: CoinItemContainerData) => {
  if (category === "all") {
    return (
      <div className={styles.coin__container}>
        <>
          {coins.map((coin: CoinsData) => (
            <NavLink key={coin.id} to={"/" + coin.id}>
              <CoinItem key={coin.id} coin={coin} />
            </NavLink>
          ))}
        </>
      </div>
    );
  }
  if (category === "gainer") {
    return (
      <div className={styles.coin__container}>
        <>
          {Array.from(coins)
            .sort((a, b) => b.priceChange - a.priceChange)
            .map((coin: CoinsData) => (
              <NavLink key={coin.id} to={"/" + coin.id}>
                <CoinItem key={coin.id} coin={coin} />
              </NavLink>
            ))}
          {/* //.sort((a, b) => a.priceChange - b.priceChange) */}
        </>
      </div>
    );
  }
  if (category === "loser") {
    return (
      <div className={styles.coin__container}>
        <>
          {Array.from(coins)
            .sort((a, b) => a.priceChange - b.priceChange)
            .map((coin: CoinsData) => (
              <NavLink key={coin.id} to={"/" + coin.id}>
                <CoinItem key={coin.id} coin={coin} />
              </NavLink>
            ))}
        </>
      </div>
    );
  }
  if (category === "favourites") {
    return (
      <div className={styles.coin__container}>
        <>
          {Array.from(coins).map((coin: CoinsData) => (
            <NavLink key={coin.id} to={"/" + coin.id}>
              <CoinItem key={coin.id} coin={coin} />
            </NavLink>
          ))}
        </>
      </div>
    );
  }
  return (
    <div className={styles.coin__container}>
      <>
        {coins.map((coin: CoinsData) => (
          <NavLink key={coin.id} to={"/" + coin.id}>
            <CoinItem key={coin.id} coin={coin} />
          </NavLink>
        ))}
      </>
    </div>
  );
};

export default CoinItemContainer;
