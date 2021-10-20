import moment from "moment";
import "moment-timezone";

export const DEFAULT_TIMEZONE: string = "Etc/UTC";

export const TIMEZONE: string = moment.tz.guess()
  ? moment.tz.guess()
  : DEFAULT_TIMEZONE;

export function getTimeStringFromUTC(utcTime: number, format: string): string {
  if (utcTime) {
    return moment.unix(utcTime).tz(TIMEZONE).format(format);
  }
  return "-";
}

export function getTimeStringFromDate(date: Date, format: string): string {
  if (date) {
    return moment(date).tz(TIMEZONE).format(format);
  }

  return "-";
}
