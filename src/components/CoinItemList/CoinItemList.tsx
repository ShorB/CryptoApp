import { useEffect, useContext } from "react";

import CoinItemContainer from "@components/CoinItemContainer/CoinItemContainer";
import styles from "@components/CoinItemList/CoinItemList.module.scss";
import {
  EssencesStoreContext,
  GlobalApiStoreContext,
  OpenStoreContext,
} from "@src/App";
import { observer } from "mobx-react-lite";

const CoinItemList = () => {
  const { globalApiStore } = useContext(GlobalApiStoreContext);
  const { essencesStore } = useContext(EssencesStoreContext);
  const { openStore } = useContext(OpenStoreContext);
  let currentCurrency = essencesStore.currentCurrency;
  let globalCoins = globalApiStore.coins;
  let openStoreIsInputSearchOpen = openStore.isInputSearchOpen;
  useEffect(() => {
    if (!openStoreIsInputSearchOpen) {
      essencesStore.changeCurrentCurrency(currentCurrency);
      globalApiStore.fetch(
        "https://api.coingecko.com/api/v3/coins/markets",
        "getCoins",
        "",
        1,
        "",
        currentCurrency
      );
    }
  }, [
    globalApiStore,
    currentCurrency,
    essencesStore,
    openStoreIsInputSearchOpen,
  ]);
  useEffect(() => {
    essencesStore.setCoins(globalCoins);
  }, [globalCoins, essencesStore]);
  return (
    <div
      className={
        styles[
          `coin__list__container_input_${
            openStoreIsInputSearchOpen ? `open` : `close`
          }`
        ]
      }
    >
      <CoinItemContainer />
    </div>
  );
};

export default observer(CoinItemList);
