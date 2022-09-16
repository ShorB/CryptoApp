import { ChangeEvent, useEffect, useState, useContext } from "react";

import styles from "components/Header/components/Input/Input.module.scss";
import Glass from "img/Glass.svg";
import { action } from "mobx";
import { observer } from "mobx-react-lite";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { EssencesStoreContext, OpenStoreContext } from "src/App";

type InputData = {
  show: () => void;
  isInputSearchOpen: boolean;
};

const Input = ({ show, isInputSearchOpen }: InputData) => {
  const { essencesStore } = useContext(EssencesStoreContext);
  const { openStore } = useContext(OpenStoreContext);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const navigate = useNavigate();
  const [isInputOpen, setIsInputOpen] = useState(false);
  function handleOnClick() {
    setIsInputOpen(false);
    show();
    openStore.changeIsInputSearchOpen();
    essencesStore.setValue("");
  }
  function handleCancelOnClick() {
    show();
    openStore.setSearch("");
    openStore.dropInputSearch();
    openStore.setSearch(search);
    openStore.setIsCancelClick();
    essencesStore.setValue("");
  }
  function handleSetValue(event: ChangeEvent<HTMLInputElement>) {
    essencesStore.setValue(event.target.value);
  }
  useEffect(
    action(() => {
      navigate({
        pathname: "/",
        search: createSearchParams({
          search: essencesStore.value,
        }).toString(),
      });
    }),
    [navigate, essencesStore.value]
  );
  useEffect(() => {
    let search = searchParams.get("search");
    if (search) {
      essencesStore.setValue(search);
    }
  }, [searchParams, essencesStore]);
  return (
    <>
      {!isInputOpen && !isInputSearchOpen && (
        <div className={styles["input-container__close-input"]}>
          <img
            className={styles["input__close-input"]}
            onClick={handleOnClick}
            src={Glass}
            alt="glass"
          ></img>
        </div>
      )}
      {isInputSearchOpen && (
        <div className={styles["input-container__open-input"]}>
          <input
            value={essencesStore.value}
            onChange={handleSetValue}
            className={styles["input-container__open-input_open"]}
            placeholder="Search Cryptocurrency"
          ></input>
          <button
            className={styles["input-container__cancel"]}
            onClick={handleCancelOnClick}
          >
            Cancel
          </button>
        </div>
      )}
    </>
  );
};

export default observer(Input);
