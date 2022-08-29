import React, { useEffect, useState, useCallback } from "react";

import CoinCard from "@components/CoinCard/CoinCard";
import CoinItemList from "@components/CoinItemList";
import Header from "@components/Header/Header";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import styles from "./App.module.scss";

export type CoinsData = {
  id: string;
  image: string;
  name: string;
  symbol: string;
  curPrice: number;
  priceChange: number;
  priceChangeFlat: number;
};

export type RawData = {
  id: string;
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  price_change_24h: number;
};

export type CurrenciesArrayItemData = {
  id: number;
  currency: string;
};

export type CurrenciesArray = {
  currenciesArray: CurrenciesArrayItemData[];
};

function App() {
  const [isInputSearchOpen, setIsInputSearchOpen] = useState(false);
  const [category, setCategory] = useState("all");
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
  }, []);
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
                changeCategory={(category: string) => setCategory(category)}
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
