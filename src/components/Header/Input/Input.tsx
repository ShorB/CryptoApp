import { useState } from "react";

import styles from "@components/Header/Input/Input.module.scss";

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
  const [isInputOpen, setIsInputOpen] = useState(false);
  function handleOnClick() {
    setIsInputOpen(false);
    show();
    setIsInputSearchOpen();
  }
  return (
    <div className={styles.input__container}>
      {!isInputOpen && !isInputSearchOpen && (
        <div className={styles.input_close} onClick={handleOnClick}></div>
      )}
      {isInputSearchOpen && (
        <div className={styles.input_open__container}>
          <input
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
