import { Category } from "components/CoinItemContainer/CoinItemContainer";
import { action, computed, makeObservable, observable } from "mobx";
import { AUTOACTION_BOUND } from "mobx/dist/internal";
import { CoinsData, CurrenciesArrayItemData } from "src/types";
import { getDate } from "utils/getDate";

import { ChartData } from "../GlobalApiStore/GlobalApiStore";

type PrivateFields =
  | "_currentCurrency"
  | "_currentCategory"
  | "_coins"
  | "_currenciesArray"
  | "_coin"
  | "_value"
  | "_chartData"
  | "_currentChartInterval";

export default class EssencesStore {
  private _coins: CoinsData[] = [];
  private _currentCurrency: string = "usd";
  private _currentCategory: Category = Category.all;
  private _currenciesArray: CurrenciesArrayItemData[] = [];
  private _coin: CoinsData | null = null;
  private _value: string = "";
  private _chartData: ChartData[] = [];
  private _currentChartInterval: string = "24 H";
  _interval: string = "hourly";
  _days: number = 1;
  constructor() {
    makeObservable<EssencesStore, PrivateFields>(this, {
      _currentCurrency: observable,
      _currentCategory: observable,
      _coins: observable.ref,
      _currenciesArray: observable.ref,
      _coin: observable.ref,
      _value: observable,
      _chartData: observable.ref,
      _currentChartInterval: observable.ref,
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
      currentCoinsSort: computed,
      chartData: computed,
      setChartData: action,
      chartDataTime: computed,
      chartDataPrice: computed,
      setInterval: action,
      setDays: action,
      days: computed,
      interval: computed,
      _days: observable,
      _interval: observable,
      currentChartInterval: computed,
      setCurrentChartInterval: action,
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
  get chartData() {
    return this._chartData;
  }
  setChartData(chartData: ChartData[]) {
    this._chartData = chartData;
  }
  get chartDataTime() {
    let timeArray: string[] = getDate(this._chartData, this.interval);
    if (timeArray.length < 9) {
      return timeArray;
    }
    return timeArray.filter(
      (elem, index) => (index + 1) % Math.floor(timeArray.length / 6) === 1
    );
  }
  get chartDataPrice() {
    let priceArray: number[] = [];
    this._chartData?.map((elem: any) => {
      priceArray.push(elem.price?.toFixed(0));
    });
    if (priceArray.length < 9) {
      return priceArray;
    }
    return priceArray.filter(
      (elem, index) => (index + 1) % Math.floor(priceArray.length / 6) === 1
    );
  }
  get currentCoinsSort() {
    if (this._currentCategory === Category.all) {
      return this._coins;
    } else if (this._currentCategory === Category.gainer) {
      return this._coins.slice().sort((a, b) => b.priceChange - a.priceChange);
    } else if (this._currentCategory === Category.loser) {
      return this._coins.slice().sort((a, b) => a.priceChange - b.priceChange);
    } else {
      return this._coins;
    }
  }
  setInterval(interval: string) {
    this._interval = interval;
  }
  setDays(days: number) {
    this._days = days;
  }
  get days() {
    return this._days;
  }
  get interval() {
    return this._interval;
  }
  get currentChartInterval() {
    return this._currentChartInterval;
  }
  setCurrentChartInterval(interval: string) {
    this._currentChartInterval = interval;
  }
}
