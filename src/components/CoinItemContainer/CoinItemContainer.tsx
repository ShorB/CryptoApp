import { useState, useContext, useEffect } from "react";

import CoinItem from "@components/CoinItemContainer/CoinItem/CoinItem";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { Virtuoso } from "react-virtuoso";

import { EssencesStoreContext, GlobalApiStoreContext } from "../../App";
import styles from "./CoinItemContainer.module.scss";

export enum Category {
  all = "all",
  gainer = "gainer",
  loser = "loser",
  favourites = "favourites",
}

const CoinItemContainer = () => {
  const globalApiStoreContext = useContext(GlobalApiStoreContext);
  const essencesStoreContext = useContext(EssencesStoreContext);
  const [page, setPage] = useState(1);
  let currentCurrency = essencesStoreContext.essencesStore.currentCurrency;

  let essencesValue = essencesStoreContext.essencesStore.value;
  let globalCoins = globalApiStoreContext.globalApiStore.coins;

  useEffect(() => {
    if (essencesValue) {
      globalApiStoreContext.globalApiStore.fetch(
        "https://api.coingecko.com/api/v3/search",
        "searchCoins",
        "",
        0,
        essencesValue,
        currentCurrency
      );
    }
  }, [
    essencesValue,
    currentCurrency,
    essencesStoreContext.essencesStore,
    globalApiStoreContext.globalApiStore,
  ]);
  useEffect(() => {
    essencesStoreContext.essencesStore.setCoins(globalCoins);
  }, [globalCoins, essencesStoreContext.essencesStore]);
  const loadMore = () => {
    setPage(page + 1);
    globalApiStoreContext.globalApiStore.fetch(
      "https://api.coingecko.com/api/v3/coins/markets",
      "loadMoreCoins",
      "",
      page + 1,
      "",
      currentCurrency
    );
    return essencesStoreContext.essencesStore.setCoins(globalCoins);
  };
  const coinsAll = essencesStoreContext.essencesStore.coins;
  const coinsGainer = essencesStoreContext.essencesStore.coins
    .slice()
    .sort((a, b) => b.priceChange - a.priceChange);
  const coinsLoser = essencesStoreContext.essencesStore.coins
    .slice()
    .sort((a, b) => a.priceChange - b.priceChange);
  const coinsFavourites = essencesStoreContext.essencesStore.coins;
  if (essencesStoreContext.essencesStore.currentCategory === Category.all) {
    return essencesStoreContext.essencesStore.value ? (
      <Virtuoso
        style={{ height: "60vh" }}
        totalCount={essencesStoreContext.essencesStore.coins.length}
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
        totalCount={essencesStoreContext.essencesStore.coins.length}
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
  if (essencesStoreContext.essencesStore.currentCategory === Category.gainer) {
    return (
      <Virtuoso
        style={{ height: "60vh" }}
        totalCount={essencesStoreContext.essencesStore.coins.length}
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
  if (essencesStoreContext.essencesStore.currentCategory === Category.loser) {
    return (
      <Virtuoso
        style={{ height: "60vh" }}
        totalCount={essencesStoreContext.essencesStore.coins.length}
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
  if (
    essencesStoreContext.essencesStore.currentCategory === Category.favourites
  ) {
    return (
      <Virtuoso
        style={{ height: "60vh" }}
        totalCount={coinsFavourites.length}
        endReached={loadMore}
        itemContent={(index) => {
          return (
            <div className={styles.coin__container}>
              <>
                {
                  <NavLink
                    key={coinsFavourites[index].id}
                    to={"/" + coinsFavourites[index].id}
                  >
                    <CoinItem
                      key={coinsFavourites[index].id}
                      coin={coinsFavourites[index]}
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
  return (
    <Virtuoso
      style={{ height: "60vh" }}
      totalCount={essencesStoreContext.essencesStore.coins.length}
      endReached={loadMore}
      itemContent={(index) => {
        return (
          <div className={styles.coin__container}>
            <>
              {
                <NavLink
                  key={essencesStoreContext.essencesStore.coins[index].id}
                  to={"/" + essencesStoreContext.essencesStore.coins[index].id}
                >
                  <CoinItem
                    key={essencesStoreContext.essencesStore.coins[index].id}
                    coin={essencesStoreContext.essencesStore.coins[index]}
                  />
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
