import CoinItemContainer from "@components/CoinItemContainer/CoinItemContainer";
import styles from "@components/CoinItemList/CoinItemList.module.scss";
import { CoinsData } from "src/App";

type CoinItemListData = {
  coins: CoinsData[];
  category: string;
  isInputSearchOpen: boolean;
};

const CoinItemList = ({
  coins,
  category,
  isInputSearchOpen,
}: CoinItemListData) => {
  let coinListClassNames = "coin__list__container_input_close";
  if (isInputSearchOpen === true) {
    coinListClassNames = "coin__list__container_input_open";
  }
  return (
    <div className={styles.coin__container}>
      <div className={styles[coinListClassNames]}>
        <CoinItemContainer category={category} coins={coins} />
      </div>
    </div>
  );
};

export default CoinItemList;
