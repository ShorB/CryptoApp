import { useContext, useEffect } from "react";

import CoinItemList from "@components/CoinItemList";
import Header from "@components/Header";
import styles from "@components/PageList/PageList.module.scss";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

import {
  EssencesStoreContext,
  GlobalApiStoreContext,
  OpenStoreContext,
} from "../../App";

const PageList = () => {
  const openStoreContext = useContext(OpenStoreContext);
  const globalApiStoreContext = useContext(GlobalApiStoreContext);
  const essencesStoreContext = useContext(EssencesStoreContext);
  const [searchParams] = useSearchParams();
  let search = searchParams.get("search");
  const openStoreIsCancelClick = openStoreContext.openStore.isCancelClick;
  openStoreContext.openStore.setSearch(search);
  useEffect(() => {
    if (!search && openStoreIsCancelClick) {
      openStoreContext.openStore.setInputSearch(false);
      openStoreContext.openStore.setIsCancelClick();
    }
  }, [search, openStoreContext.openStore, openStoreIsCancelClick]);
  let globalCurrenciesArray =
    globalApiStoreContext.globalApiStore.currenciesArray;
  useEffect(() => {
    globalApiStoreContext.globalApiStore.fetch(
      "https://api.coingecko.com/api/v3/simple/supported_vs_currencies",
      "getCurrencies",
      "",
      0,
      "",
      ""
    );
  }, [globalApiStoreContext.globalApiStore]);
  useEffect(() => {
    essencesStoreContext.essencesStore.setCurrenciesArray(
      globalCurrenciesArray
    );
  }, [essencesStoreContext.essencesStore, globalCurrenciesArray]);
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
