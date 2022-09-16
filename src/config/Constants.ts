import { Category } from "components/CoinItemContainer/CoinItemContainer";

export const timeInterval = ["24 H", "1 W", "1 M", "6 M", "1 Y", "All"];
export const categoryList: Category[] = [
  Category.all,
  Category.gainer,
  Category.loser,
  Category.favourites,
];

export enum Interval {
  hourly = "hourly",
  daily = "daily",
  mounthly = "mounthly",
  yearly = "yearly",
}

export let timeIntervalMap = new Map();
timeIntervalMap.set("24 H", {
  setInterval: Interval.hourly,
  setDays: 1,
  setCurrentChartInterval: "24 H",
});
timeIntervalMap.set("1 W", {
  setInterval: Interval.daily,
  setDays: 7,
  setCurrentChartInterval: "1 W",
});
timeIntervalMap.set("1 M", {
  setInterval: Interval.daily,
  setDays: 30,
  setCurrentChartInterval: "1 M",
});
timeIntervalMap.set("6 M", {
  setInterval: Interval.mounthly,
  setDays: 183,
  setCurrentChartInterval: "6 M",
});
timeIntervalMap.set("1 Y", {
  setInterval: Interval.mounthly,
  setDays: 366,
  setCurrentChartInterval: "1 Y",
});
timeIntervalMap.set("All", {
  setInterval: Interval.yearly,
  setDays: 100500,
  setCurrentChartInterval: "All",
});
