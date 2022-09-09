import { useState, useContext, useEffect } from "react";

import CoinItem from "@components/CoinItemContainer/CoinItem/CoinItem";
import {
  EssencesStoreContext,
  GlobalApiStoreContext,
  OpenStoreContext,
} from "@src/App";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { Virtuoso } from "react-virtuoso";

import CoinSearchItem from "./CoinSearchItem";

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
  let currentCurrency = essencesStore.currentCurrency;
  let essencesValue = essencesStore.value;
  let globalCoins = globalApiStore.coins;
  useEffect(() => {
    if (essencesValue) {
      globalApiStore.fetch(
        "https://api.coingecko.com/api/v3/search",
        "searchCoins",
        "",
        0,
        essencesValue,
        currentCurrency
      );
    }
  }, [essencesValue, currentCurrency, essencesStore, globalApiStore]);
  useEffect(() => {
    essencesStore.setCoins(globalCoins);
  }, [globalCoins, essencesStore]);
  const loadMore = () => {
    setPage(page + 1);
    globalApiStore.fetch(
      "https://api.coingecko.com/api/v3/coins/markets",
      "loadMoreCoins",
      "",
      page + 1,
      "",
      currentCurrency
    );
    return essencesStore.setCoins(globalCoins);
  };
  const essencesStoreValue = essencesStore.value;
  const openStoreIsInputSearchOpen = openStore.isInputSearchOpen;
  let currentCoinsSort = essencesStore.currentCoinsSort;
  return (
    <Virtuoso
      style={{ height: "60vh" }}
      totalCount={essencesStore.coins.length}
      endReached={essencesStoreValue ? () => {} : loadMore}
      itemContent={(index) => {
        return (
          <>
            {
              <NavLink
                key={currentCoinsSort[index].id}
                to={"/" + currentCoinsSort[index].id}
              >
                {essencesStoreValue && openStoreIsInputSearchOpen ? (
                  <CoinSearchItem
                    key={currentCoinsSort[index].id}
                    coin={currentCoinsSort[index]}
                  />
                ) : !essencesStoreValue && openStoreIsInputSearchOpen ? (
                  <CoinSearchItem
                    key={currentCoinsSort[index].id}
                    coin={currentCoinsSort[index]}
                  />
                ) : (
                  <CoinItem
                    key={currentCoinsSort[index].id}
                    coin={currentCoinsSort[index]}
                  />
                )}
              </NavLink>
            }
          </>
        );
      }}
    />
  );
};

export default observer(CoinItemContainer);
