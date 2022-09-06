import { useContext } from "react";

import { Category } from "@components/CoinItemContainer/CoinItemContainer";
import styles from "@components/Header/CoinMenu/CoinMenu.module.scss";
import { observer } from "mobx-react-lite";

import { EssencesStoreContext, OpenStoreContext } from "../../../App";

const CoinMenu = () => {
  const essencesStoreContext = useContext(EssencesStoreContext);
  const openStoreContext = useContext(OpenStoreContext);
  let menuClassNamesAll = "menu__container__all_close";
  let menuClassNamesGainer = "menu__container__gainer_close";
  let menuClassNamesLoser = "menu__container__loser_close";
  let menuClassNamesFavourites = "menu__container__favourites_close";
  let category = essencesStoreContext.essencesStore.currentCategory;
  if (category === Category.all) {
    menuClassNamesAll = "menu__container__all_open";
  }
  if (category === Category.gainer) {
    menuClassNamesGainer = "menu__container__gainer_open";
  }
  if (category === Category.loser) {
    menuClassNamesLoser = "menu__container__loser_open";
  }
  if (category === Category.favourites) {
    menuClassNamesFavourites = "menu__container__favourites_open";
  }
  return !openStoreContext.openStore.isInputSearchOpen ? (
    <div className={styles.menu__container}>
      <div
        onClick={() =>
          essencesStoreContext.essencesStore.changeCurrentCategory(Category.all)
        }
        className={
          styles[menuClassNamesAll] + " " + styles.menu__container__all
        }
      >
        All
      </div>
      <div
        onClick={() =>
          essencesStoreContext.essencesStore.changeCurrentCategory(
            Category.gainer
          )
        }
        className={
          styles[menuClassNamesGainer] + " " + styles.menu__container__gainer
        }
      >
        Gainer
      </div>
      <div
        onClick={() =>
          essencesStoreContext.essencesStore.changeCurrentCategory(
            Category.loser
          )
        }
        className={
          styles[menuClassNamesLoser] + " " + styles.menu__container__loser
        }
      >
        Loser
      </div>
      <div
        onClick={() =>
          essencesStoreContext.essencesStore.changeCurrentCategory(
            Category.favourites
          )
        }
        className={
          styles[menuClassNamesFavourites] +
          " " +
          styles.menu__container__favourites
        }
      >
        Favourites
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default observer(CoinMenu);
