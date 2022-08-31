import React, { useEffect } from "react";

import CoinItemContainer from "@components/CoinItemContainer/CoinItemContainer";
import styles from "@components/CoinItemList/CoinItemList.module.scss";
import axios from "axios";
import { CoinsData, RawData } from "src/types";

type CoinItemListData = {
  setCoins: (coin: CoinsData[]) => void;
  coins: CoinsData[];
  category: string;
  isInputSearchOpen: boolean;
  currency: string;
};

const CoinItemList = ({
  setCoins,
  currency,
  coins,
  category,
  isInputSearchOpen,
}: CoinItemListData) => {
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
    fetch();
  }, [currency]);
  let coinListClassNames = "coin__list__container_input_close";
  if (isInputSearchOpen === true) {
    coinListClassNames = "coin__list__container_input_open";
  }
  return (
    <div className={styles.coin__container}>
      <div className={styles[coinListClassNames]}>
        <CoinItemContainer category={category} coins={coins} />
      </div>
    </div>
  );
};

export default CoinItemList;
