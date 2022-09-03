import { action, makeObservable, observable } from "mobx";

type PrivateFields = "_curCurrency";

export default class CurrentCurrencyApiStore {
  private _curCurrency: string = "usd";
  constructor(currency: string) {
    this._curCurrency = currency;
    makeObservable<CurrentCurrencyApiStore, PrivateFields>(this, {
      _curCurrency: observable,
      changeCurrency: action,
    });
  }
  changeCurrency(currency: string) {
    this._curCurrency = currency;
  }
  get curCurrency() {
    return this._curCurrency;
  }
}
