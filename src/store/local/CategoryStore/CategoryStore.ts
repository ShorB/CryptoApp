import { Category } from "@components/CoinItemContainer/CoinItemContainer";
import { action, makeObservable, observable } from "mobx";

type PrivateFields = "_category";

export default class CategoryStore {
  private _category: Category = Category.all;
  constructor(category: Category) {
    this._category = category;
    makeObservable<CategoryStore, PrivateFields>(this, {
      _category: observable,
      changeCategory: action,
    });
  }
  changeCategory(category: Category) {
    this._category = category;
  }
  get category() {
    return this._category;
  }
}
