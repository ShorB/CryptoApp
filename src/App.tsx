import { useEffect, createContext } from "react";

import CoinCard from "@components/CoinCard/CoinCard";
import PageList from "@components/PageList";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { Routes, Route, useSearchParams } from "react-router-dom";

import EssencesStore from "./store/global/EssencesStore";
import GlobalApiStore from "./store/global/GlobalApiStore";
import OpenStore from "./store/global/OpenStore";

export const GlobalApiStoreContext = createContext({
  globalApiStore: new GlobalApiStore(),
});

export const EssencesStoreContext = createContext({
  essencesStore: new EssencesStore(),
});

export const OpenStoreContext = createContext({
  openStore: new OpenStore(),
});

function App() {
  const [searchParams] = useSearchParams();
  let search = searchParams.get("search");
  const globalApiStore = useLocalStore(() => new GlobalApiStore());
  const essencesStore = useLocalStore(() => new EssencesStore());
  const openStore = useLocalStore(() => new OpenStore());
  const openStoreIsCancelClick = openStore.isCancelClick;
  openStore.setSearch(search);
  useEffect(() => {
    if (!search && openStoreIsCancelClick) {
      openStore.setInputSearch(false);
      openStore.setIsCancelClick();
    }
  }, [search, openStore, openStoreIsCancelClick]);
  let globalCurrenciesArray = globalApiStore.currenciesArray;
  useEffect(() => {
    globalApiStore.fetch(
      "https://api.coingecko.com/api/v3/simple/supported_vs_currencies",
      "getCurrencies",
      "",
      0,
      "",
      ""
    );
  }, [globalApiStore]);
  useEffect(() => {
    essencesStore.setCurrenciesArray(globalCurrenciesArray);
  }, [essencesStore, globalCurrenciesArray]);
  return (
    <GlobalApiStoreContext.Provider value={{ globalApiStore }}>
      <EssencesStoreContext.Provider value={{ essencesStore }}>
        <OpenStoreContext.Provider value={{ openStore }}>
          <Routes>
            <Route path="/" element={<PageList />} />
            <Route
              path="/:id"
              element={
                <CoinCard
                  currency={essencesStore.currentCurrency.toLowerCase()}
                />
              }
            />
          </Routes>
        </OpenStoreContext.Provider>
      </EssencesStoreContext.Provider>
    </GlobalApiStoreContext.Provider>
  );
}

export default observer(App);
