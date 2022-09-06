import { Category } from "@components/CoinItemContainer/CoinItemContainer";
import { action, computed, makeObservable, observable } from "mobx";
import { CoinsData, CurrenciesArrayItemData } from "src/types";

type PrivateFields =
  | "_currentCurrency"
  | "_currentCategory"
  | "_coins"
  | "_currenciesArray"
  | "_coin"
  | "_value";

export default class EssencesStore {
  private _coins: CoinsData[] = [];
  private _currentCurrency: string = "usd";
  private _currentCategory: Category = Category.all;
  private _currenciesArray: CurrenciesArrayItemData[] = [];
  private _coin: CoinsData | null = null;
  private _value: string = "";
  constructor() {
    makeObservable<EssencesStore, PrivateFields>(this, {
      _currentCurrency: observable,
      _currentCategory: observable,
      _coins: observable.ref,
      _currenciesArray: observable.ref,
      _coin: observable.ref,
      _value: observable,
      changeCurrentCurrency: action,
      currentCurrency: computed,
      changeCurrentCategory: action,
      currentCategory: computed,
      setCoins: action,
      coins: computed,
      currenciesArray: computed,
      setCurrenciesArray: action,
      setCoin: action,
      coin: computed,
      setValue: action,
      value: computed,
    });
  }
  changeCurrentCurrency(currency: string) {
    this._currentCurrency = currency;
  }
  get currentCurrency() {
    return this._currentCurrency;
  }
  changeCurrentCategory(category: Category) {
    this._currentCategory = category;
  }
  get currentCategory() {
    return this._currentCategory;
  }
  setCoins(coins: CoinsData[]) {
    this._coins = coins;
  }
  get coins() {
    return this._coins;
  }
  get currenciesArray() {
    return this._currenciesArray;
  }
  setCurrenciesArray(currenciesArray: CurrenciesArrayItemData[]) {
    this._currenciesArray = currenciesArray;
  }
  setCoin(coin: CoinsData | null) {
    this._coin = coin;
  }
  get coin() {
    return this._coin;
  }
  setValue(value: string) {
    this._value = value;
  }
  get value() {
    return this._value;
  }
}
