import { useEffect, useContext } from "react";

import CoinItemContainer from "components/CoinItemContainer/CoinItemContainer";
import styles from "components/CoinItemList/CoinItemList.module.scss";
import { action } from "mobx";
import { observer } from "mobx-react-lite";
import {
  EssencesStoreContext,
  GlobalApiStoreContext,
  OpenStoreContext,
} from "src/App";

const CoinItemList = () => {
  const { globalApiStore } = useContext(GlobalApiStoreContext);
  const { essencesStore } = useContext(EssencesStoreContext);
  const { openStore } = useContext(OpenStoreContext);
  useEffect(
    action(() => {
      if (!openStore.isInputSearchOpen) {
        essencesStore.changeCurrentCurrency(essencesStore.currentCurrency);
        globalApiStore.fetch(
          "https://api.coingecko.com/api/v3/coins/markets",
          "getCoins",
          "",
          1,
          "",
          essencesStore.currentCurrency
        );
      }
    }),
    [
      globalApiStore,
      essencesStore.currentCurrency,
      essencesStore,
      openStore.isInputSearchOpen,
    ]
  );
  useEffect(
    action(() => {
      essencesStore.setCoins(globalApiStore.coins);
    }),
    [globalApiStore.coins, essencesStore]
  );
  return (
    <div
      className={
        styles[
          `coin-list_input-${openStore.isInputSearchOpen ? `open` : `close`}`
        ]
      }
    >
      <CoinItemContainer />
    </div>
  );
};

export default observer(CoinItemList);
