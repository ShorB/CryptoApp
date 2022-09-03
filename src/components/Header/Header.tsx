import { useState } from "react";

import { Category } from "@components/CoinItemContainer/CoinItemContainer";
import styles from "@components/Header/Header.module.scss";
import { CurrenciesArrayItemData } from "src/types";

import CoinMenu from "./CoinMenu/CoinMenu";
import CurrencyFilterButton from "./CurrencyFilter/CurrencyFilterButton/CurrencyFilterButton";
import Input from "./Input/Input";

type HeaderData = {
  onClick: (currency: string) => void;
  currenciesArray: CurrenciesArrayItemData[];
  currency: string;
  category: Category;
  changeCategory: (category: Category) => void;
  setIsInputSearchOpen: () => void;
  isInputSearchOpen: boolean;
};

const Header = ({
  onClick,
  currenciesArray,
  currency,
  category,
  changeCategory,
  setIsInputSearchOpen,
  isInputSearchOpen,
}: HeaderData) => {
  const [isShow, setIsShow] = useState(true);
  let headerContainerClassNames = "header__container_close_input";
  if (isInputSearchOpen === true) {
    headerContainerClassNames = "header__container_open_input";
  }
  return (
    <div className={styles[headerContainerClassNames]}>
      <Input
        show={() => setIsShow(!isShow)}
        setIsInputSearchOpen={setIsInputSearchOpen}
        isInputSearchOpen={isInputSearchOpen}
      />
      {!isInputSearchOpen && (
        <CurrencyFilterButton
          onClick={onClick}
          currenciesArray={currenciesArray}
          currency={currency}
          isInputSearchOpen={isInputSearchOpen}
        />
      )}
      {!isInputSearchOpen && (
        <CoinMenu
          changeCategory={changeCategory}
          category={category}
          isInputSearchOpen={isInputSearchOpen}
        />
      )}
    </div>
  );
};

export default Header;
