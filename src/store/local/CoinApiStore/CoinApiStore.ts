import axios from "axios";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { CoinsData, RawData } from "src/types";

type PrivateFields = "_currency" | "_coins";

export default class CoinApiStore {
  private _currency: string = "usd";
  private _coins: CoinsData[] = [];
  constructor(currency: string) {
    this._currency = currency;
    makeObservable<CoinApiStore, PrivateFields>(this, {
      _currency: observable,
      _coins: observable,
      coins: computed,
      currency: computed,
      fetch: action,
      load: action,
    });
  }
  fetch = async () => {
    const result = await axios({
      method: "get",
      url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${this._currency}`,
    });
    runInAction(() => {
      this._coins = result.data.map((raw: RawData) => ({
        id: raw.id,
        image: raw.image,
        name: raw.name,
        symbol: raw.symbol,
        curPrice: raw.current_price,
        priceChange: raw.price_change_percentage_24h,
        priceChangeFlat: raw.price_change_24h,
      }));
    });
  };
  get coins() {
    return this._coins;
  }
  get currency() {
    return this._currency;
  }
  load(currency: string) {
    this._currency = currency;
  }
}
