import { useState, useContext, useEffect } from "react";

import CoinItem from "@components/CoinItemContainer/CoinItem/CoinItem";
import { action } from "mobx";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { Virtuoso } from "react-virtuoso";
import { CoinsData } from "src/types";

import { GlobalStoreContext } from "../../App";
import styles from "./CoinItemContainer.module.scss";

type CoinItemContainerData = {
  coins: CoinsData[];
  category: string;
};

export enum Category {
  all = "all",
  gainer = "gainer",
  loser = "loser",
  favourites = "favourites",
}

const CoinItemContainer = ({ coins, category }: CoinItemContainerData) => {
  const globalStoreContext = useContext(GlobalStoreContext);
  const [page, setPage] = useState(1);
  useEffect(
    action(() => {
      if (globalStoreContext.globalStore.value) {
        globalStoreContext.globalStore.fetchSearch(
          globalStoreContext.globalStore.value
        );
      }
    }),
    [globalStoreContext.globalStore, globalStoreContext.globalStore.value]
  );
  const loadMore = () => {
    setPage(page + 1);
    return globalStoreContext.globalStore.fetchInf(page + 1);
  };
  const coinsAll = coins;
  const coinsGainer = coins
    .slice()
    .sort((a, b) => b.priceChange - a.priceChange);
  const coinsLoser = coins
    .slice()
    .sort((a, b) => a.priceChange - b.priceChange);
  if (category === Category.all) {
    return globalStoreContext.globalStore.value ? (
      <Virtuoso
        style={{ height: "60vh" }}
        totalCount={coins.length}
        itemContent={(index) => {
          return (
            <div className={styles.coin__container}>
              <>
                {
                  <NavLink
                    key={coinsAll[index].id}
                    to={"/" + coinsAll[index].id}
                  >
                    <CoinItem key={coinsAll[index].id} coin={coinsAll[index]} />
                  </NavLink>
                }
              </>
            </div>
          );
        }}
      />
    ) : (
      <Virtuoso
        style={{ height: "60vh" }}
        totalCount={coins.length}
        endReached={loadMore}
        itemContent={(index) => {
          return (
            <div className={styles.coin__container}>
              <>
                {
                  <NavLink
                    key={coinsAll[index].id}
                    to={"/" + coinsAll[index].id}
                  >
                    <CoinItem key={coinsAll[index].id} coin={coinsAll[index]} />
                  </NavLink>
                }
              </>
            </div>
          );
        }}
      />
    );
  }
  if (category === Category.gainer) {
    return (
      <Virtuoso
        style={{ height: "60vh" }}
        totalCount={coins.length}
        endReached={loadMore}
        itemContent={(index) => {
          return (
            <div className={styles.coin__container}>
              <>
                {
                  <NavLink
                    key={coinsGainer[index].id}
                    to={"/" + coinsGainer[index].id}
                  >
                    <CoinItem
                      key={coinsGainer[index].id}
                      coin={coinsGainer[index]}
                    />
                  </NavLink>
                }
              </>
            </div>
          );
        }}
      />
    );
  }
  if (category === Category.loser) {
    return (
      <Virtuoso
        style={{ height: "60vh" }}
        totalCount={coins.length}
        endReached={loadMore}
        itemContent={(index) => {
          return (
            <div className={styles.coin__container}>
              <>
                {
                  <NavLink
                    key={coinsLoser[index].id}
                    to={"/" + coinsLoser[index].id}
                  >
                    <CoinItem
                      key={coinsLoser[index].id}
                      coin={coinsLoser[index]}
                    />
                  </NavLink>
                }
              </>
            </div>
          );
        }}
      />
    );
  }
  if (category === Category.favourites) {
    return (
      <Virtuoso
        style={{ height: "60vh" }}
        totalCount={coins.length}
        endReached={loadMore}
        itemContent={(index) => {
          return (
            <div className={styles.coin__container}>
              <>
                {
                  <NavLink key={coins[index].id} to={"/" + coins[index].id}>
                    <CoinItem key={coins[index].id} coin={coins[index]} />
                  </NavLink>
                }
              </>
            </div>
          );
        }}
      />
    );
  }
  return (
    <Virtuoso
      style={{ height: "60vh" }}
      totalCount={coins.length}
      endReached={loadMore}
      itemContent={(index) => {
        return (
          <div className={styles.coin__container}>
            <>
              {
                <NavLink key={coins[index].id} to={"/" + coins[index].id}>
                  <CoinItem key={coins[index].id} coin={coins[index]} />
                </NavLink>
              }
            </>
          </div>
        );
      }}
    />
  );
};

export default observer(CoinItemContainer);
