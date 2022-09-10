import { useContext } from "react";

import styles from "components/Header/components/CoinMenu/CoinMenu.module.scss";
import { categoryList } from "config/Constants";
import { observer } from "mobx-react-lite";
import { EssencesStoreContext, OpenStoreContext } from "src/App";

const CoinMenu = () => {
  const { essencesStore } = useContext(EssencesStoreContext);
  const { openStore } = useContext(OpenStoreContext);
  let category = essencesStore.currentCategory;
  return !openStore.isInputSearchOpen ? (
    <div className={styles["menu"]}>
      {categoryList.map((elem, index) => (
        <button
          key={index}
          onClick={() => essencesStore.changeCurrentCategory(elem)}
          className={
            styles[`menu__${elem}_${category === elem ? "open" : "close"}`] +
            " " +
            styles[`menu__${elem}`]
          }
        >
          {`${elem[0].toUpperCase() + elem.slice(1)}`}
        </button>
      ))}
    </div>
  ) : (
    <div></div>
  );
};

export default observer(CoinMenu);
