import { useEffect } from "react";

import CoinItemContainer from "@components/CoinItemContainer/CoinItemContainer";
import styles from "@components/CoinItemList/CoinItemList.module.scss";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";

import CoinApiStore from "../../store/local/CoinApiStore/CoinApiStore";

type CoinItemListData = {
  category: string;
  isInputSearchOpen: boolean;
  currency: string;
  value: string;
};

const CoinItemList = ({
  currency,
  category,
  isInputSearchOpen,
  value,
}: CoinItemListData) => {
  const coinApiStore = useLocalStore(() => new CoinApiStore(currency));
  useEffect(() => {
    coinApiStore.load(currency);
    coinApiStore.fetch();
  }, [coinApiStore, currency]);
  let coinListClassNames = "coin__list__container_input_close";
  if (isInputSearchOpen === true) {
    coinListClassNames = "coin__list__container_input_open";
  }
  return (
    <div className={styles.coin__container}>
      <div className={styles[coinListClassNames]}>
        <CoinItemContainer
          value={value}
          category={category}
          coins={coinApiStore.coins}
        />
      </div>
    </div>
  );
};

export default observer(CoinItemList);
