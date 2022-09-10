import { useContext, useState } from "react";

import styles from "components/Header/Header.module.scss";
import { observer } from "mobx-react-lite";
import { OpenStoreContext } from "src/App";

import CoinMenu from "./components/CoinMenu/CoinMenu";
import CurrencyFilterButton from "./components/CurrencyFilter/CurrencyFilterButton/CurrencyFilterButton";
import Input from "./components/Input/Input";

const Header = () => {
  const { openStore } = useContext(OpenStoreContext);
  const [isShow, setIsShow] = useState(true);
  return (
    <div
      className={
        styles[`header_input-${openStore.isInputSearchOpen ? `open` : `close`}`]
      }
    >
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
