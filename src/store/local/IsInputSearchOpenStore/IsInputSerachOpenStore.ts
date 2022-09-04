import { action, computed, makeObservable, observable } from "mobx";

type PrivateFields = "_isInputSearchOpen";

export default class IsInputSearchOpenStore {
  private _isInputSearchOpen: boolean;
  constructor(isInputSearchOpen: boolean, value: string) {
    this._isInputSearchOpen = value ? true : isInputSearchOpen;
    makeObservable<IsInputSearchOpenStore, PrivateFields>(this, {
      _isInputSearchOpen: observable,
      changeIsInputSearchOpen: action,
      isInputSearchOpen: computed,
    });
  }
  get isInputSearchOpen() {
    return this._isInputSearchOpen;
  }
  changeIsInputSearchOpen() {
    this._isInputSearchOpen = !this._isInputSearchOpen;
  }
}
