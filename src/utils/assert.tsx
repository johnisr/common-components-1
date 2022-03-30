import moment, { Moment } from "moment";

export function AssertIsSameDate(
  time: string | Moment,
  expectTime: Date,
  compareType: compareType = "day"
) {
  return moment(time).isSame(moment(expectTime), compareType);
}

export function AssertIsBeforeDate(
  time: string | Moment,
  expectTime: Date,
  compareType: compareType = "day"
) {
  return moment(time).isBefore(moment(expectTime), compareType);
}

export function AssertIsBeforeOrEqualDate(
  time: string | Moment,
  expectTime: Date,
  compareType: compareType = "day"
) {
  return (
    AssertIsBeforeDate(time, expectTime, compareType) ||
    AssertIsSameDate(time, expectTime, compareType)
  );
}

export function AssertIsAfterOrEqualDate(
  time: string | Moment,
  expectTime: Date,
  compareType: compareType = "day"
) {
  return (
    AssertIsAfterDate(time, expectTime, compareType) ||
    AssertIsSameDate(time, expectTime, compareType)
  );
}

export function AssertIsAfterDate(
  time: string | Moment,
  expectTime: Date,
  compareType: compareType = "day"
) {
  return moment(time).isAfter(moment(expectTime), compareType);
}

export function AssertIsBetweenDate(
  time: string | Moment,
  earlierExpectTime: Date,
  laterExpectTime: Date,
  compareType: compareType = "day"
) {
  return (
    AssertIsAfterOrEqualDate(time, earlierExpectTime, compareType) &&
    AssertIsBeforeOrEqualDate(time, laterExpectTime, compareType)
  );
}

type compareType =
  | "second"
  | "minute"
  | "hour"
  | "day"
  | "week"
  | "month"
  | "year";
