import axios from "axios";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { CoinsData, CurrenciesArrayItemData, RawData } from "src/types";

type SearchData = {
  id: string;
  large: string;
  name: string;
  symbol: string;
};

type PrivateFields = "_currenciesArray" | "_coins" | "_currency" | "_coin";

export default class GlobalApiStore {
  private _currenciesArray: CurrenciesArrayItemData[] = [];
  private _coins: CoinsData[] = [];
  private _currency: string = "usd";
  private _coin: CoinsData | null = null;
  constructor() {
    makeObservable<GlobalApiStore, PrivateFields>(this, {
      _currenciesArray: observable.ref,
      _coins: observable.ref,
      _currency: observable,
      _coin: observable.ref,
      fetch: action,
      currenciesArray: computed,
      coins: computed,
    });
  }
  fetch = async (
    url: string,
    requestType: string,
    queryParams: string,
    page: number = 1,
    value: string,
    currency: string,
    location?: any
  ) => {
    if (requestType === "getCoin") {
      const result = await axios({
        method: "get",
        url: `${url}${location.pathname}`,
      });
      runInAction(() => {
        this._coin = GlobalApiStore.normalizeLoadCoin(result, currency);
      });
    }
    if (requestType === "getCurrencies") {
      this._currenciesArray = [];
      const result = await axios({
        method: "get",
        url: `${url}`,
      });
      runInAction(() => {
        this._currenciesArray = result.data.map(
          (raw: CurrenciesArrayItemData) =>
            GlobalApiStore.normalizeCurrencies(result, raw)
        );
      });
    }
    if (requestType === "getCoins") {
      const result = await axios({
        method: "get",
        url: `${url}?&page=${page}&per_page=10&vs_currency=${currency}${queryParams}`,
      });
      runInAction(() => {
        this._coins = result.data.map((raw: RawData) =>
          GlobalApiStore.normalizeLoadCoins(raw)
        );
      });
    }
    if (requestType === "loadMoreCoins") {
      const result = await axios({
        method: "get",
        url: `${url}?&page=${page}&per_page=10&vs_currency=${currency}${queryParams}`,
      });
      runInAction(() => {
        let resultCoins = result.data.map((raw: RawData) =>
          GlobalApiStore.normalizeLoadCoins(raw)
        );
        this._coins = [...this._coins, ...resultCoins];
      });
    }
    if (requestType === "searchCoins") {
      const result = await axios({
        method: "get",
        url: `${url}?query=${value}`,
      });
      runInAction(() => {
        let resultSearchCoins = result.data.coins.map((raw: SearchData) =>
          GlobalApiStore.normalizeSearchCoins(raw)
        );
        this._coins = resultSearchCoins;
        if ((value = "")) {
          this.fetch(
            "https://api.coingecko.com/api/v3/coins/markets",
            "getCoins",
            "",
            1,
            value,
            currency
          );
        }
      });
    }
  };
  get currenciesArray() {
    return this._currenciesArray;
  }
  get coins() {
    return this._coins;
  }
  get currency() {
    return this._currency;
  }
  get coin() {
    return this._coin;
  }
  static normalizeLoadCoins(from: RawData): CoinsData {
    return {
      id: from.id,
      image: from.image,
      name: from.name,
      symbol: from.symbol,
      curPrice: from.current_price,
      priceChange: from.price_change_percentage_24h,
      priceChangeFlat: from.price_change_24h,
    };
  }
  static normalizeSearchCoins(from: SearchData) {
    return {
      id: from.id,
      image: from.large,
      name: from.name,
      symbol: from.symbol,
    };
  }
  static normalizeLoadCoin(from: any, currency: string): CoinsData {
    return {
      id: from.data.id,
      image: from.data.image.large,
      name: from.data.name,
      symbol: from.data.symbol,
      curPrice: from.data.market_data.current_price[currency],
      priceChange:
        from.data.market_data.price_change_percentage_24h_in_currency[currency],
      priceChangeFlat:
        from.data.market_data.price_change_24h_in_currency[currency],
    };
  }
  static normalizeCurrencies(result: any, from: CurrenciesArrayItemData) {
    return {
      id: result.data.indexOf(from),
      currency: from,
    };
  }
}
