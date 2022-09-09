import { action, computed, makeObservable, observable } from "mobx";

type PrivateFields = "_isInputSearchOpen" | "_isCancelClick";

export default class OpenStore {
  private _isInputSearchOpen: boolean = false;
  private _isCancelClick: boolean = false;
  constructor() {
    makeObservable<OpenStore, PrivateFields>(this, {
      _isInputSearchOpen: observable,
      _isCancelClick: observable,
      changeIsInputSearchOpen: action,
      isInputSearchOpen: computed,
      setSearch: action,
      dropInputSearch: action,
      setInputSearch: action,
      setIsCancelClick: action,
      isCancelClick: computed,
    });
  }
  get isInputSearchOpen() {
    return this._isInputSearchOpen;
  }
  changeIsInputSearchOpen() {
    this._isInputSearchOpen = !this._isInputSearchOpen;
  }
  setSearch(value: string | null) {
    if (value) {
      this._isInputSearchOpen = true;
      return;
    }
  }
  dropInputSearch() {
    this._isInputSearchOpen = false;
  }
  setInputSearch(bool: boolean) {
    this._isInputSearchOpen = bool;
  }
  get isCancelClick() {
    return this._isCancelClick;
  }
  setIsCancelClick() {
    this._isCancelClick = !this._isCancelClick;
  }
}
