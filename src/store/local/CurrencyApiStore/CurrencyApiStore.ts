import axios from "axios";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { CurrenciesArrayItemData } from "src/types";

type PrivateFields = "_currenciesArray";

export default class CurrencyApiStore {
  private _currenciesArray: CurrenciesArrayItemData[] = [];
  constructor() {
    makeObservable<CurrencyApiStore, PrivateFields>(this, {
      _currenciesArray: observable.ref,
      fetchCur: action,
      сurrenciesArray: computed,
    });
  }
  async fetchCur() {
    this._currenciesArray = [];
    const result = await axios({
      method: "get",
      url: "https://api.coingecko.com/api/v3/simple/supported_vs_currencies",
    });
    runInAction(() => {
      this._currenciesArray = result.data.map(
        (raw: CurrenciesArrayItemData) => ({
          id: result.data.indexOf(raw),
          currency: raw,
        })
      );
    });
  }
  get сurrenciesArray() {
    return this._currenciesArray;
  }

  destroy(): void {}
}
