import { useContext, useEffect } from "react";

import CoinItemList from "components/CoinItemList";
import Header from "components/Header";
import styles from "components/PageList/PageList.module.scss";
import { action } from "mobx";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";
import {
  EssencesStoreContext,
  GlobalApiStoreContext,
  OpenStoreContext,
} from "src/App";

const PageList = () => {
  const { openStore } = useContext(OpenStoreContext);
  const { globalApiStore } = useContext(GlobalApiStoreContext);
  const { essencesStore } = useContext(EssencesStoreContext);
  const [searchParams] = useSearchParams();
  let search = searchParams.get("search");
  openStore.setSearch(searchParams.get("search"));
  useEffect(
    action(() => {
      if (!search && openStore.isCancelClick) {
        openStore.setInputSearch(false);
        openStore.setIsCancelClick();
      }
    }),
    [search, openStore, openStore.isCancelClick]
  );
  let globalCurrenciesArray = globalApiStore.currenciesArray;
  useEffect(() => {
    globalApiStore.fetch(
      "https://api.coingecko.com/api/v3/simple/supported_vs_currencies",
      "getCurrencies",
      "",
      0,
      "",
      ""
    );
  }, [globalApiStore]);
  useEffect(() => {
    essencesStore.setCurrenciesArray(globalCurrenciesArray);
  }, [essencesStore, globalCurrenciesArray]);
  return (
    <div
      className={
        styles[
          `page-list_input-${openStore.isInputSearchOpen ? `open` : `close`}`
        ]
      }
    >
      <Header />
      <CoinItemList />
    </div>
  );
};

export default observer(PageList);
