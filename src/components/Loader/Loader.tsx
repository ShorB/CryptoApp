import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={styles["loader-container"]}>
      <div className={styles["loader-circle"]}></div>
      <div className={styles["loader-triangle"]}></div>
    </div>
  );
};

export default Loader;
