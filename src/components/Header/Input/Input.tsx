import { ChangeEvent, useEffect, useState, useContext } from "react";

import styles from "@components/Header/Input/Input.module.scss";
import { action } from "mobx";
import { observer } from "mobx-react-lite";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { GlobalStoreContext } from "../../../App";

type InputData = {
  show: () => void;
  setIsInputSearchOpen: () => void;
  isInputSearchOpen: boolean;
};

const Input = ({
  show,
  setIsInputSearchOpen,
  isInputSearchOpen,
}: InputData) => {
  const globalStoreContext = useContext(GlobalStoreContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isInputOpen, setIsInputOpen] = useState(false);
  function handleOnClick() {
    setIsInputOpen(false);
    show();
    setIsInputSearchOpen();
    globalStoreContext.globalStore.setValue("");
  }
  function handleCancelOnClick() {
    show();
    setIsInputSearchOpen();
    globalStoreContext.globalStore.setValue("");
    globalStoreContext.globalStore.fetch();
  }
  function handleSetValue(event: ChangeEvent<HTMLInputElement>) {
    globalStoreContext.globalStore.setValue(event.target.value);
  }
  useEffect(
    action(() => {
      navigate({
        pathname: "/",
        search: createSearchParams({
          search: globalStoreContext.globalStore.value,
        }).toString(),
      });
    }),
    [navigate, globalStoreContext.globalStore.value]
  );
  useEffect(() => {
    let search = searchParams.get("search");
    if (search) {
      globalStoreContext.globalStore.setValue(search);
    }
  }, [globalStoreContext.globalStore, searchParams]);
  return (
    <div className={styles.input__container}>
      {!isInputOpen && !isInputSearchOpen && (
        <div className={styles.input_close} onClick={handleOnClick}></div>
      )}
      {isInputSearchOpen && (
        <div className={styles.input_open__container}>
          <input
            value={globalStoreContext.globalStore.value}
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
