import { useState, useContext, useEffect } from "react";

import CoinItem from "components/CoinItemContainer/CoinItem/CoinItem";
import { action } from "mobx";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { Virtuoso } from "react-virtuoso";
import {
  EssencesStoreContext,
  GlobalApiStoreContext,
  OpenStoreContext,
} from "src/App";

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
  useEffect(
    action(() => {
      if (essencesStore.value) {
        globalApiStore.fetch(
          "https://api.coingecko.com/api/v3/search",
          "searchCoins",
          "",
          0,
          essencesStore.value,
          essencesStore.currentCurrency
        );
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
  return (
    <Virtuoso
      style={{ height: "60vh" }}
      totalCount={essencesStore.coins.length}
      endReached={essencesStore.value ? () => {} : loadMore}
      itemContent={action((index) => {
        return (
          <>
            {
              <NavLink
                key={essencesStore.currentCoinsSort[index]?.id}
                to={"/" + essencesStore.currentCoinsSort[index]?.id}
              >
                {essencesStore.value && openStore.isInputSearchOpen ? (
                  <CoinSearchItem
                    key={essencesStore.currentCoinsSort[index]?.id}
                    coin={essencesStore.currentCoinsSort[index]}
                  />
                ) : !essencesStore.value && openStore.isInputSearchOpen ? (
                  <CoinSearchItem
                    key={essencesStore.currentCoinsSort[index]?.id}
                    coin={essencesStore.currentCoinsSort[index]}
                  />
                ) : (
                  <CoinItem
                    key={essencesStore.currentCoinsSort[index]?.id}
                    coin={essencesStore.currentCoinsSort[index]}
                  />
                )}
              </NavLink>
            }
          </>
        );
      })}
    />
  );
};

export default observer(CoinItemContainer);
