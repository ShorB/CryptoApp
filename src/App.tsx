import React, { useEffect, useState, useCallback } from "react";

import CoinCard from "@components/CoinCard/CoinCard";
import { Category } from "@components/CoinItemContainer/CoinItemContainer";
import CoinItemList from "@components/CoinItemList";
import Header from "@components/Header/Header";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CoinsData, CurrenciesArrayItemData } from "src/types";

import styles from "./App.module.scss";

function App() {
  const [isInputSearchOpen, setIsInputSearchOpen] = useState(false);
  const [category, setCategory] = useState(Category.all);
  const [currenciesArray, setCurrenciesArray] = useState([]);
  const [coins, setCoins] = useState<CoinsData[]>([]);
  const [currency, setCurrency] = useState("USD");
  let appContainerClassNames = "app__container_input_close";
  if (isInputSearchOpen === true) {
    appContainerClassNames = "app__container_input_open";
  }
  const fetchCur = useCallback(() => {
    const fetchCur = async () => {
      const result = await axios({
        method: "get",
        url: "https://api.coingecko.com/api/v3/simple/supported_vs_currencies",
      });
      setCurrenciesArray(
        result.data.map((raw: CurrenciesArrayItemData) => ({
          id: result.data.indexOf(raw),
          currency: raw,
        }))
      );
    };
    fetchCur();
  }, []);
  useEffect(() => {
    fetchCur();
  }, [fetchCur]);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className={styles[appContainerClassNames]}>
              <Header
                onClick={(currency) => setCurrency(currency)}
                currenciesArray={currenciesArray}
                currency={currency}
                category={category}
                changeCategory={(category: Category) => setCategory(category)}
                setIsInputSearchOpen={() =>
                  setIsInputSearchOpen(!isInputSearchOpen)
                }
                isInputSearchOpen={isInputSearchOpen}
              />
              <CoinItemList
                currency={currency}
                setCoins={(coin: CoinsData[]) => setCoins(coin)}
                isInputSearchOpen={isInputSearchOpen}
                category={category}
                coins={coins}
              />
            </div>
          }
        />
        <Route
          path="/:id"
          element={<CoinCard currency={currency.toLocaleLowerCase()} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
