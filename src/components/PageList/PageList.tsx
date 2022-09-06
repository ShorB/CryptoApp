import { useContext } from "react";

import CoinItemList from "@components/CoinItemList";
import Header from "@components/Header";
import styles from "@components/PageList/PageList.module.scss";
import { observer } from "mobx-react-lite";

import { OpenStoreContext } from "../../App";

const PageList = () => {
  const openStoreContext = useContext(OpenStoreContext);
  let PageListContainerClassNames = "page__list__container_input_close";
  if (openStoreContext.openStore.isInputSearchOpen === true) {
    PageListContainerClassNames = "page__list__container_input_open";
  }
  return (
    <div className={styles[PageListContainerClassNames]}>
      <Header />
      <CoinItemList
        isInputSearchOpen={openStoreContext.openStore.isInputSearchOpen}
      />
    </div>
  );
};

export default observer(PageList);
