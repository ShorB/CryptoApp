import React, { useEffect, useState } from "react";

import CoinCard from "@components/CoinCard/CoinCard";
import CoinItemContainer from "@components/CoinItemContainer/CoinItemContainer";
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
  const [category, SetCategory] = useState("all");
  const [currenciesArray, setCurrenciesArray] = useState([]);
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState("USD");
  // console.log(isInputSearchOpen) //eslint-disable-line
  let coinContainerClassNames = "coin__container_input_close";
  if (isInputSearchOpen === true) {
    coinContainerClassNames = "coin__container_input_open";
  }
  let appContainerClassNames = "app__container_input_close";
  if (isInputSearchOpen === true) {
    appContainerClassNames = "app__container_input_open";
  }
  useEffect(() => {
    const fetch = async () => {
      const result = await axios({
        method: "get",
        url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}`,
      });
      setCoins(
        result.data.map((raw: RawData) => ({
          id: raw.id,
          image: raw.image,
          name: raw.name,
          symbol: raw.symbol,
          curPrice: raw.current_price,
          priceChange: raw.price_change_percentage_24h,
          priceChangeFlat: raw.price_change_24h,
        }))
      );
    };

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

    fetch();
    fetchCur();
  }, [currency]);
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
                changeCategory={(category: string) => SetCategory(category)}
                setIsInputSearchOpen={() =>
                  setIsInputSearchOpen(!isInputSearchOpen)
                }
                isInputSearchOpen={isInputSearchOpen}
              />
              <div className={styles[coinContainerClassNames]}>
                <CoinItemContainer category={category} coins={coins} />
              </div>
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
