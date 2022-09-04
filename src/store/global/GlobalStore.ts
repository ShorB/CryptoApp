import axios from "axios";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { CoinsData, RawData } from "src/types";

type PrivateFields = "_currency" | "_coins" | "_value" | "_coinsSearch";

export default class GlobalStore {
  private _currency: string = "usd";
  private _coins: CoinsData[] = [];
  private _value: string = "";
  private _coinsSearch: CoinsData[] = [];
  constructor(currency: string) {
    this._currency = currency;
    makeObservable<GlobalStore, PrivateFields>(this, {
      _currency: observable,
      _coins: observable.ref,
      _coinsSearch: observable,
      coins: computed,
      currency: computed,
      fetch: action,
      load: action,
      setCoins: action,
      fetchInf: action,
      _value: observable,
      setValue: action,
      value: computed,
    });
  }
  fetch = async (page: number = 1) => {
    const result = await axios({
      method: "get",
      url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${this._currency}&page=${page}&per_page=10`,
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
  fetchInf = async (page: number = 1) => {
    const result = await axios({
      method: "get",
      url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${this._currency}&page=${page}&per_page=10`,
    });
    runInAction(() => {
      let resultCoins = result.data.map((raw: RawData) => ({
        id: raw.id,
        image: raw.image,
        name: raw.name,
        symbol: raw.symbol,
        curPrice: raw.current_price,
        priceChange: raw.price_change_percentage_24h,
        priceChangeFlat: raw.price_change_24h,
      }));
      this._coins = [...this._coins, ...resultCoins];
    });
  };
  fetchSearch = async (value: string, page: number = 1) => {
    const result = await axios({
      method: "get",
      url: `https://api.coingecko.com/api/v3/search?query=${value}`,
    });
    runInAction(() => {
      let resultSearchCoins = result.data.coins.map((raw: RawData) => ({
        id: raw.id,
        image: raw.image,
        name: raw.name,
        symbol: raw.symbol,
        curPrice: raw.current_price,
        priceChange: raw.price_change_percentage_24h,
        priceChangeFlat: raw.price_change_24h,
      }));
      this._coins = resultSearchCoins;
      if ((value = "")) {
        this.fetch();
      }
    });
  };
  get coins() {
    return this._coins;
  }
  get currency() {
    return this._currency;
  }
  get coinsSearch() {
    return this._coinsSearch;
  }
  load(currency: string) {
    this._currency = currency;
  }

  setCoins(coins: CoinsData[]) {
    this._coins = [...this._coins, ...coins];
  }

  setValue(value: string) {
    this._value = value;
  }
  get value() {
    return this._value;
  }
}
