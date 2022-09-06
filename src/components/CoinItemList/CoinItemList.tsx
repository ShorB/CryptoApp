import { useEffect, useContext } from "react";

import CoinItemContainer from "@components/CoinItemContainer/CoinItemContainer";
import styles from "@components/CoinItemList/CoinItemList.module.scss";
import { observer } from "mobx-react-lite";

import {
  EssencesStoreContext,
  GlobalApiStoreContext,
  OpenStoreContext,
} from "../../App";

type CoinItemListData = {
  isInputSearchOpen: boolean;
};

const CoinItemList = ({ isInputSearchOpen }: CoinItemListData) => {
  const globalApiStoreContext = useContext(GlobalApiStoreContext);
  const essencesStoreContext = useContext(EssencesStoreContext);
  const openStoreContext = useContext(OpenStoreContext);
  let currentCurrency = essencesStoreContext.essencesStore.currentCurrency;
  let globalCoins = globalApiStoreContext.globalApiStore.coins;
  let openStoreIsInputSearchOpen = openStoreContext.openStore.isInputSearchOpen;
  useEffect(() => {
    if (!openStoreIsInputSearchOpen) {
      essencesStoreContext.essencesStore.changeCurrentCurrency(currentCurrency);
      globalApiStoreContext.globalApiStore.fetch(
        "https://api.coingecko.com/api/v3/coins/markets",
        "getCoins",
        "",
        1,
        "",
        currentCurrency
      );
    }
  }, [
    globalApiStoreContext.globalApiStore,
    currentCurrency,
    essencesStoreContext.essencesStore,
    openStoreIsInputSearchOpen,
  ]);
  useEffect(() => {
    essencesStoreContext.essencesStore.setCoins(globalCoins);
  }, [globalCoins, essencesStoreContext.essencesStore]);
  let coinListClassNames = "coin__list__container_input_close";
  if (isInputSearchOpen === true) {
    coinListClassNames = "coin__list__container_input_open";
  }
  return (
    <div className={styles.coin__container}>
      <div className={styles[coinListClassNames]}>
        <CoinItemContainer />
      </div>
    </div>
  );
};

export default observer(CoinItemList);
