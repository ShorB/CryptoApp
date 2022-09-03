import axios from "axios";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { CoinsData } from "src/types";

type PrivateFields = "_currency" | "_coin";

export default class CoinCardApiStore {
  private _coin: CoinsData | null = null;
  private _currency: string = "usd";
  private _location: any = {};
  constructor(currency: string, location: any) {
    this._currency = currency;
    this._location = location;
    makeObservable<CoinCardApiStore, PrivateFields>(this, {
      _coin: observable.ref,
      _currency: observable,
      fetch: action,
      coin: computed,
      currency: computed,
    });
  }
  fetch = async () => {
    const result = await axios({
      method: "get",
      url: `https://api.coingecko.com/api/v3/coins${this._location.pathname}`,
    });
    runInAction(() => {
      this._coin = {
        id: result.data.id,
        image: result.data.image.large,
        name: result.data.name,
        symbol: result.data.symbol,
        curPrice: result.data.market_data.current_price[this._currency],
        priceChange:
          result.data.market_data.price_change_percentage_24h_in_currency[
            this._currency
          ],
        priceChangeFlat:
          result.data.market_data.price_change_24h_in_currency[this._currency],
      };
    });
  };
  get coin() {
    return this._coin;
  }
  get currency() {
    return this._currency;
  }
}
