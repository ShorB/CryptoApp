import { useEffect, useCallback } from "react";

import CoinCard from "@components/CoinCard/CoinCard";
import { Category } from "@components/CoinItemContainer/CoinItemContainer";
import PageList from "@components/PageList";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { Routes, Route } from "react-router-dom";

import CategoryStore from "./store/local/CategoryStore";
import CurrencyApiStore from "./store/local/CurrencyApiStore/CurrencyApiStore";
import CurrentCurrencyStore from "./store/local/CurrentCurrencyStore";
import InputValueStore from "./store/local/InputValueStore";
import IsInputSearchOpenStore from "./store/local/IsInputSearchOpenStore";

function App() {
  const inputStoreValue = useLocalStore(() => new InputValueStore());
  const isInputSearchOpenStore = useLocalStore(
    () => new IsInputSearchOpenStore(false)
  );
  const categoryStore = useLocalStore(() => new CategoryStore(Category.all));
  const currenctCurrencyStore = useLocalStore(
    () => new CurrentCurrencyStore("usd")
  );
  const currencyApiStore = useLocalStore(() => new CurrencyApiStore());
  useEffect(() => {
    currencyApiStore.fetchCur();
  }, [currencyApiStore]);
  const toogleInputSearchOpen = useCallback(() => {
    isInputSearchOpenStore.changeIsInputSearchOpen();
  }, [isInputSearchOpenStore]);
  return (
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
            value={inputStoreValue.value}
            setValue={(value: string) => inputStoreValue.setValue(value)}
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
  );
}

export default observer(App);
