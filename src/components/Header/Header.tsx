import { useContext, useState } from "react";

import styles from "@components/Header/Header.module.scss";
import { observer } from "mobx-react-lite";

import { OpenStoreContext } from "../../App";
import CoinMenu from "./CoinMenu/CoinMenu";
import CurrencyFilterButton from "./CurrencyFilter/CurrencyFilterButton/CurrencyFilterButton";
import Input from "./Input/Input";

const Header = () => {
  const openStoreContext = useContext(OpenStoreContext);
  const [isShow, setIsShow] = useState(true);
  let headerContainerClassNames = "header__container_close_input";
  if (openStoreContext.openStore.isInputSearchOpen === true) {
    headerContainerClassNames = "header__container_open_input";
  }
  return (
    <div className={styles[headerContainerClassNames]}>
      <Input show={() => setIsShow(!isShow)} />
      {!openStoreContext.openStore.isInputSearchOpen && (
        <CurrencyFilterButton />
      )}
      {!openStoreContext.openStore.isInputSearchOpen && <CoinMenu />}
    </div>
  );
};

export default observer(Header);
