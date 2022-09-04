import { useEffect, useContext } from "react";

import CoinItemContainer from "@components/CoinItemContainer/CoinItemContainer";
import styles from "@components/CoinItemList/CoinItemList.module.scss";
import { observer } from "mobx-react-lite";

import { GlobalStoreContext } from "../../App";

type CoinItemListData = {
  category: string;
  isInputSearchOpen: boolean;
  currency: string;
};

const CoinItemList = ({
  currency,
  category,
  isInputSearchOpen,
}: CoinItemListData) => {
  const globalStoreContext = useContext(GlobalStoreContext);
  useEffect(() => {
    if (!isInputSearchOpen) {
      globalStoreContext.globalStore.load(currency);
      globalStoreContext.globalStore.fetch();
    }
  }, [globalStoreContext.globalStore, currency, isInputSearchOpen]);
  let coinListClassNames = "coin__list__container_input_close";
  if (isInputSearchOpen === true) {
    coinListClassNames = "coin__list__container_input_open";
  }
  return (
    <div className={styles.coin__container}>
      <div className={styles[coinListClassNames]}>
        <CoinItemContainer
          category={category}
          coins={globalStoreContext.globalStore.coins}
        />
      </div>
    </div>
  );
};

export default observer(CoinItemList);
