import { ChartData } from "src/store/global/GlobalApiStore/GlobalApiStore";

export const getDate = (chartData: ChartData[], interval: string): string[] => {
  let timeArray: string[] = [];
  if (interval === "hourly") {
    chartData?.map((elem: any) => {
      let date = new Date(elem.time);
      let hours = date.getHours();
      let minutes = "0" + date.getMinutes();
      let formattedTime = hours + ":" + minutes.slice(-2);
      timeArray.push(formattedTime);
      return timeArray;
    });
  } else {
    chartData?.map((elem: any) => {
      let date = new Date(elem.time);
      let year = " " + date.getFullYear();
      let day = date.getDate().toString().padStart(2, "0");
      let mounth = (date.getMonth() + 1).toString().padStart(2, "0");
      let formattedTime = day + "." + mounth + "." + year.slice(3);
      timeArray.push(formattedTime);
      return timeArray;
    });
  }
  return timeArray;
};
