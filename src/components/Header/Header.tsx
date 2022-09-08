import { useContext, useState } from "react";

import styles from "@components/Header/Header.module.scss";
import { OpenStoreContext } from "@src/App";
import { observer } from "mobx-react-lite";

import CoinMenu from "./components/CoinMenu/CoinMenu";
import CurrencyFilterButton from "./components/CurrencyFilter/CurrencyFilterButton/CurrencyFilterButton";
import Input from "./components/Input/Input";

const Header = () => {
  const { openStore } = useContext(OpenStoreContext);
  const [isShow, setIsShow] = useState(true);
  let headerContainerClassNames = "header__container_close_input";
  if (openStore.isInputSearchOpen === true) {
    headerContainerClassNames = "header__container_open_input";
  }
  return (
    <div className={styles[headerContainerClassNames]}>
      <Input
        show={() => setIsShow(!isShow)}
        isInputSearchOpen={openStore.isInputSearchOpen}
      />
      {!openStore.isInputSearchOpen && <CurrencyFilterButton />}
      {!openStore.isInputSearchOpen && <CoinMenu />}
    </div>
  );
};

export default observer(Header);
