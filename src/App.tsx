import { useEffect, useState, useCallback } from "react";

import CoinCard from "@components/CoinCard/CoinCard";
import { Category } from "@components/CoinItemContainer/CoinItemContainer";
import PageList from "@components/PageList";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CoinsData, CurrenciesArrayItemData } from "src/types";

function App() {
  console.log("app render") //eslint-disable-line
  const [isInputSearchOpen, setIsInputSearchOpen] = useState(false);
  const [category, setCategory] = useState(Category.all);
  const [currenciesArray, setCurrenciesArray] = useState([]);
  const [coins, setCoins] = useState<CoinsData[]>([]);
  const [currency, setCurrency] = useState("USD");
  useEffect(() => {
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
  const toogleInputSearchOpen = useCallback(() => {
    setIsInputSearchOpen(!isInputSearchOpen);
  }, [isInputSearchOpen]);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PageList
              onClick={(currency: string) => setCurrency(currency)}
              currenciesArray={currenciesArray}
              currency={currency}
              category={category}
              changeCategory={(category: Category) => setCategory(category)}
              setIsInputSearchOpen={toogleInputSearchOpen}
              isInputSearchOpen={isInputSearchOpen}
              setCoins={(coin: CoinsData[]) => setCoins(coin)}
              coins={coins}
            />
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
