import { useState } from "react";

import styles from "@components/Header/CoinMenu/CoinMenu.module.scss";
import { NavLink } from "react-router-dom";

type CoinMenuData = {
  category: string;
  changeCategory: (category: string) => void;
  isInputSearchOpen: boolean;
};

const CoinMenu = ({
  category,
  changeCategory,
  isInputSearchOpen,
}: CoinMenuData) => {
  let menuClassNamesAll = "menu__container__all_close";
  let menuClassNamesGainer = "menu__container__gainer_close";
  let menuClassNamesLoser = "menu__container__loser_close";
  let menuClassNamesFavourites = "menu__container__favourites_close";
  if (category === "all") {
    menuClassNamesAll = "menu__container__all_open";
  }
  if (category === "gainer") {
    menuClassNamesGainer = "menu__container__gainer_open";
  }
  if (category === "loser") {
    menuClassNamesLoser = "menu__container__loser_open";
  }
  if (category === "favourites") {
    menuClassNamesFavourites = "menu__container__favourites_open";
  }
  return !isInputSearchOpen ? (
    <div className={styles.menu__container}>
      <div
        onClick={() => changeCategory("all")}
        className={styles[menuClassNamesAll]}
      >
        All
      </div>
      <div
        onClick={() => changeCategory("gainer")}
        className={styles[menuClassNamesGainer]}
      >
        Gainer
      </div>
      <div
        onClick={() => changeCategory("loser")}
        className={styles[menuClassNamesLoser]}
      >
        Loser
      </div>
      <div
        onClick={() => changeCategory("favourites")}
        className={styles[menuClassNamesFavourites]}
      >
        Favourites
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default CoinMenu;
