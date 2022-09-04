import { useEffect, useCallback, createContext } from "react";

import CoinCard from "@components/CoinCard/CoinCard";
import { Category } from "@components/CoinItemContainer/CoinItemContainer";
import PageList from "@components/PageList";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { Routes, Route, useSearchParams } from "react-router-dom";

import GlobalStore from "./store/global/GlobalStore";
import CategoryStore from "./store/local/CategoryStore";
import CurrencyApiStore from "./store/local/CurrencyApiStore/CurrencyApiStore";
import CurrentCurrencyStore from "./store/local/CurrentCurrencyStore";
import IsInputSearchOpenStore from "./store/local/IsInputSearchOpenStore";

export const GlobalStoreContext = createContext({
  globalStore: new GlobalStore("usd"),
});

function App() {
  const [searchParams] = useSearchParams();
  let search = searchParams.get("search");
  const globalStore = useLocalStore(() => new GlobalStore("usd"));
  const categoryStore = useLocalStore(() => new CategoryStore(Category.all));
  const currenctCurrencyStore = useLocalStore(
    () => new CurrentCurrencyStore("usd")
  );
  const currencyApiStore = useLocalStore(() => new CurrencyApiStore());
  useEffect(() => {
    currencyApiStore.fetchCur();
  }, [currencyApiStore]);
  const isInputSearchOpenStore = useLocalStore(
    () => new IsInputSearchOpenStore(false, search!)
  );
  const toogleInputSearchOpen = useCallback(() => {
    isInputSearchOpenStore.changeIsInputSearchOpen();
  }, [isInputSearchOpenStore]);
  return (
    <GlobalStoreContext.Provider value={{ globalStore }}>
      <Routes>
        <Route
          path="/"
          element={
            <PageList
              onClick={(currency: string) =>
                currenctCurrencyStore.changeCurrency(currency)
              }
              currenciesArray={currencyApiStore.сurrenciesArray}
              currency={currenctCurrencyStore.curCurrency.toLowerCase()}
              category={categoryStore.category}
              changeCategory={(category: Category) =>
                categoryStore.changeCategory(category)
              }
              setIsInputSearchOpen={toogleInputSearchOpen}
              isInputSearchOpen={isInputSearchOpenStore.isInputSearchOpen}
              value={globalStore.value}
              setValue={(value: string) => globalStore.setValue(value)}
            />
          }
        />
        <Route
          path="/:id"
          element={
            <CoinCard
              currency={currenctCurrencyStore.curCurrency.toLowerCase()}
            />
          }
        />
      </Routes>
    </GlobalStoreContext.Provider>
  );
}

export default observer(App);
