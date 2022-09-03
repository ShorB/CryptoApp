import CoinItem from "@components/CoinItemContainer/CoinItem/CoinItem";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { Virtuoso } from "react-virtuoso";
import { CoinsData } from "src/types";

import styles from "./CoinItemContainer.module.scss";

type CoinItemContainerData = {
  coins: CoinsData[];
  category: string;
  value: string;
};

export enum Category {
  all = "all",
  gainer = "gainer",
  loser = "loser",
  favourites = "favourites",
}

const CoinItemContainer = ({
  coins,
  category,
  value,
}: CoinItemContainerData) => {
  const coinsLength = coins.length;
  if (category === Category.all) {
    return (
      <Virtuoso
        style={{ height: "60vh" }}
        totalCount={coinsLength}
        itemContent={() => (
          <div className={styles.coin__container}>
            <>
              {coins
                .filter((coin) =>
                  coin.name.toLowerCase().includes(value.toLowerCase())
                )
                .map((coin: CoinsData) => (
                  <NavLink key={coin.id} to={"/" + coin.id}>
                    <CoinItem key={coin.id} coin={coin} />
                  </NavLink>
                ))}
            </>
          </div>
        )}
      />
    );
  }
  if (category === Category.gainer) {
    return (
      <Virtuoso
        style={{ height: "60vh" }}
        totalCount={coinsLength}
        itemContent={() => (
          <div className={styles.coin__container}>
            <>
              {Array.from(coins)
                .filter((coin) =>
                  coin.name.toLowerCase().includes(value.toLowerCase())
                )
                .sort((a, b) => b.priceChange - a.priceChange)
                .map((coin: CoinsData) => (
                  <NavLink key={coin.id} to={"/" + coin.id}>
                    <CoinItem key={coin.id} coin={coin} />
                  </NavLink>
                ))}
            </>
          </div>
        )}
      />
    );
  }
  if (category === Category.loser) {
    return (
      <Virtuoso
        style={{ height: "60vh" }}
        totalCount={coinsLength}
        itemContent={() => (
          <div className={styles.coin__container}>
            <>
              {Array.from(coins)
                .filter((coin) =>
                  coin.name.toLowerCase().includes(value.toLowerCase())
                )
                .sort((a, b) => a.priceChange - b.priceChange)
                .map((coin: CoinsData) => (
                  <NavLink key={coin.id} to={"/" + coin.id}>
                    <CoinItem key={coin.id} coin={coin} />
                  </NavLink>
                ))}
            </>
          </div>
        )}
      />
    );
  }
  if (category === Category.favourites) {
    return (
      <Virtuoso
        style={{ height: "60vh" }}
        totalCount={coinsLength}
        itemContent={() => (
          <div className={styles.coin__container}>
            <>
              {Array.from(coins)
                .filter((coin) =>
                  coin.name.toLowerCase().includes(value.toLowerCase())
                )
                .map((coin: CoinsData) => (
                  <NavLink key={coin.id} to={"/" + coin.id}>
                    <CoinItem key={coin.id} coin={coin} />
                  </NavLink>
                ))}
            </>
          </div>
        )}
      />
    );
  }
  return (
    <Virtuoso
      style={{ height: "60vh" }}
      totalCount={coinsLength}
      itemContent={() => (
        <div className={styles.coin__container}>
          <>
            {coins.map((coin: CoinsData) => (
              <NavLink key={coin.id} to={"/" + coin.id}>
                <CoinItem key={coin.id} coin={coin} />
              </NavLink>
            ))}
          </>
        </div>
      )}
    />
  );
};

export default observer(CoinItemContainer);
