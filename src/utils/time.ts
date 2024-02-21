import moment from "moment";

export function getTimePeriod(): string {
  const curHour: number = moment().hour();
  let timePeriod: string = "";
  if (curHour >= 5 && curHour < 12) {
    timePeriod = "早上";
  } else if (curHour >= 12 && curHour < 14) {
    timePeriod = "中午";
  } else if (curHour >= 14 && curHour < 18) {
    timePeriod = "下午";
  } else {
    timePeriod = "晚上";
  }

  return timePeriod;
}
