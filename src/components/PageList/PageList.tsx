import { Category } from "@components/CoinItemContainer/CoinItemContainer";
import CoinItemList from "@components/CoinItemList";
import Header from "@components/Header";
import styles from "@components/PageList/PageList.module.scss";
import { CurrenciesArrayItemData } from "src/types";

export type PageListData = {
  onClick: (currency: string) => void;
  currenciesArray: CurrenciesArrayItemData[];
  currency: string;
  category: Category;
  changeCategory: (category: Category) => void;
  setIsInputSearchOpen: () => void;
  isInputSearchOpen: boolean;
  value: string;
  setValue: (value: string) => void;
};

const PageList = ({
  onClick,
  currenciesArray,
  currency,
  category,
  changeCategory,
  setIsInputSearchOpen,
  isInputSearchOpen,
  value,
  setValue,
}: PageListData) => {
  let PageListContainerClassNames = "page__list__container_input_close";
  if (isInputSearchOpen === true) {
    PageListContainerClassNames = "page__list__container_input_open";
  }
  return (
    <div className={styles[PageListContainerClassNames]}>
      <Header
        onClick={onClick}
        currenciesArray={currenciesArray}
        currency={currency}
        category={category}
        changeCategory={changeCategory}
        setIsInputSearchOpen={setIsInputSearchOpen}
        isInputSearchOpen={isInputSearchOpen}
        value={value}
        setValue={setValue}
      />
      <CoinItemList
        currency={currency}
        isInputSearchOpen={isInputSearchOpen}
        category={category}
        value={value}
      />
    </div>
  );
};

export default PageList;
