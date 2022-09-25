import { useState, useContext, useEffect } from "react";

import CoinItem from "components/CoinItemContainer/components/CoinItem/CoinItem";
import { Loader } from "components/Loader";
import { action } from "mobx";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { Virtuoso } from "react-virtuoso";
import {
  EssencesStoreContext,
  GlobalApiStoreContext,
  OpenStoreContext,
} from "src/App";

import styles from "./CoinItemContainer.module.scss";
import CoinSearchItem from "./components/CoinSearchItem";
import { CoinsData } from "src/types";

export enum Category {
  all = "all",
  gainer = "gainer",
  loser = "loser",
  favourites = "favourites",
}

const CoinItemContainer = () => {
  const { globalApiStore } = useContext(GlobalApiStoreContext);
  const { essencesStore } = useContext(EssencesStoreContext);
  const { openStore } = useContext(OpenStoreContext);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(
    action(() => {
      if (essencesStore.value) {
        setIsLoading(true);
        globalApiStore
          .fetch(
            "https://api.coingecko.com/api/v3/search",
            "searchCoins",
            "",
            0,
            essencesStore.value,
            essencesStore.currentCurrency
          )
          .then(() => setIsLoading(false));
      }
    }),
    [
      essencesStore.value,
      essencesStore.currentCurrency,
      essencesStore,
      globalApiStore,
    ]
  );
  useEffect(
    action(() => {
      essencesStore.setCoins(globalApiStore.coins);
    }),
    [globalApiStore.coins, essencesStore]
  );
  const loadMore = action(() => {
    setPage(page + 1);
    globalApiStore.fetch(
      "https://api.coingecko.com/api/v3/coins/markets",
      "loadMoreCoins",
      "",
      page + 1,
      "",
      essencesStore.currentCurrency
    );
    return essencesStore.setCoins(globalApiStore.coins);
  });
  const currentCoinsSort = essencesStore.currentCoinsSort;
  let localStorageStore: CoinsData[] = [];
  for(let key in localStorage) {
    if (!localStorage.hasOwnProperty(key)) {
      continue;
    }
    localStorageStore.push(JSON.parse(localStorage.getItem(key) || "{}"));
  }
  return isLoading ? (
    <Loader />
  ) : (currentCoinsSort.length !== 0 && essencesStore.currentCategory !== Category.favourites)  ? (
    <Virtuoso
      style={{ height: "60vh" }}
      totalCount={essencesStore.coins.length}
      endReached={essencesStore.value ? () => {} : loadMore}
      itemContent={action((index) => {
        return (
          <>
            {
              <NavLink
                key={currentCoinsSort[index]?.id}
                to={"/" + currentCoinsSort[index]?.id}
              >
                {essencesStore.value && openStore.isInputSearchOpen ? (
                  <CoinSearchItem
                    key={currentCoinsSort[index]?.id}
                    coin={currentCoinsSort[index]}
                  />
                ) : !essencesStore.value && openStore.isInputSearchOpen ? (
                  <CoinSearchItem
                    key={currentCoinsSort[index]?.id}
                    coin={currentCoinsSort[index]}
                  />
                ) : ( 
                  <CoinItem
                    key={currentCoinsSort[index]?.id}
                    coin={currentCoinsSort[index]}
                  />
                )}
              </NavLink>
            }
          </>
        );
      })}
    />
  ) : ( essencesStore.currentCategory === Category.favourites ? (
    <>
      {localStorageStore.map((elem: any) => (
        <NavLink key={elem?.id} to={"/" + elem?.id} >
          <CoinSearchItem key={elem.id} coin={elem} />
        </NavLink>
      ))}
    </>
  ) : (
    <div className={styles["empty-list"]}>Ничего не найдено :(</div>
  ))
};

export default observer(CoinItemContainer);
