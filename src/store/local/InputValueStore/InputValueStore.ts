import { action, computed, makeObservable, observable } from "mobx";

type PrivateFields = "_value";

export default class InputValueStore {
  private _value: string = "";
  constructor() {
    makeObservable<InputValueStore, PrivateFields>(this, {
      _value: observable,
      setValue: action,
      value: computed,
    });
  }
  setValue(value: string) {
    this._value = value;
  }
  get value() {
    return this._value;
  }
}
