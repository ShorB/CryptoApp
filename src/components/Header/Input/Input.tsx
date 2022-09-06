import { ChangeEvent, useEffect, useState, useContext } from "react";

import styles from "@components/Header/Input/Input.module.scss";
import { observer } from "mobx-react-lite";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { EssencesStoreContext, OpenStoreContext } from "../../../App";

type InputData = {
  show: () => void;
};

const Input = ({ show }: InputData) => {
  const essencesStoreContext = useContext(EssencesStoreContext);
  const openStoreContext = useContext(OpenStoreContext);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  let essencesValue = essencesStoreContext.essencesStore.value;
  let openStoreSetIsCancelClick = () =>
    openStoreContext.openStore.setIsCancelClick();
  const navigate = useNavigate();
  const [isInputOpen, setIsInputOpen] = useState(false);
  function handleOnClick() {
    setIsInputOpen(false);
    show();
    openStoreContext.openStore.changeIsInputSearchOpen();
    essencesStoreContext.essencesStore.setValue("");
  }
  function handleCancelOnClick() {
    show();
    openStoreContext.openStore.setSearch("");
    openStoreContext.openStore.dropInputSearch();
    openStoreContext.openStore.setSearch(search);
    openStoreSetIsCancelClick();
    essencesStoreContext.essencesStore.setValue("");
  }
  function handleSetValue(event: ChangeEvent<HTMLInputElement>) {
    essencesStoreContext.essencesStore.setValue(event.target.value);
  }
  useEffect(() => {
    navigate({
      pathname: "/",
      search: createSearchParams({
        search: essencesValue,
      }).toString(),
    });
  }, [navigate, essencesValue]);
  useEffect(() => {
    let search = searchParams.get("search");
    if (search) {
      essencesStoreContext.essencesStore.setValue(search);
    }
  }, [searchParams, essencesStoreContext.essencesStore]);
  return (
    <div className={styles.input__container}>
      {!isInputOpen && !openStoreContext.openStore.isInputSearchOpen && (
        <div className={styles.input_close} onClick={handleOnClick}></div>
      )}
      {openStoreContext.openStore.isInputSearchOpen && (
        <div className={styles.input_open__container}>
          <input
            value={essencesStoreContext.essencesStore.value}
            onChange={handleSetValue}
            className={styles.input_open}
            placeholder="Search Cryptocurrency"
          ></input>
          <div
            className={styles.input_open__cancel}
            onClick={handleCancelOnClick}
          >
            Cancel
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(Input);
