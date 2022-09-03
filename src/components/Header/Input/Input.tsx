import { ChangeEvent, useEffect, useState } from "react";

import styles from "@components/Header/Input/Input.module.scss";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

type InputData = {
  show: () => void;
  setIsInputSearchOpen: () => void;
  isInputSearchOpen: boolean;
  value: string;
  setValue: (value: string) => void;
};

const Input = ({
  show,
  setIsInputSearchOpen,
  isInputSearchOpen,
  value,
  setValue,
}: InputData) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isInputOpen, setIsInputOpen] = useState(false);
  function handleOnClick() {
    setIsInputOpen(false);
    show();
    setIsInputSearchOpen();
    setValue("");
  }
  function handleSetValue(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }
  useEffect(() => {
    navigate({
      pathname: "/",
      search: createSearchParams({
        search: value,
      }).toString(),
    });
  }, [navigate, value]);
  useEffect(() => {
    let search = searchParams.get("search");
    if (search) {
      setValue(search);
    }
  }, []);
  return (
    <div className={styles.input__container}>
      {!isInputOpen && !isInputSearchOpen && (
        <div className={styles.input_close} onClick={handleOnClick}></div>
      )}
      {isInputSearchOpen && (
        <div className={styles.input_open__container}>
          <input
            value={value}
            onChange={handleSetValue}
            className={styles.input_open}
            placeholder="Search Cryptocurrency"
          ></input>
          <div className={styles.input_open__cancel} onClick={handleOnClick}>
            Cancel
          </div>
        </div>
      )}
    </div>
  );
};

export default Input;
