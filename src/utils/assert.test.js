import {
  AssertIsSameDate,
  AssertIsBeforeDate,
  AssertIsBeforeOrEqualDate,
  AssertIsAfterDate,
  AssertIsAfterOrEqualDate,
} from "./assert";

describe("assert test", function () {
  it("AssertIsSameDate", () => {
    let time = "2018-07-30T11:44:37.000";
    let expectTime = "2018-07-30T11:44:37.000";
    let compareType = "day";

    let testArray = AssertIsSameDate(time, expectTime, compareType);
    expect(testArray).toEqual(true);
  });

  it("AssertIsBeforeDate", () => {
    let time = "2018-07-30T11:44:37.000";
    let expectTime = "2018-07-31T11:44:37.000";

    let testArray = AssertIsBeforeDate(time, expectTime, "day");
    expect(testArray).toEqual(true);
  });

  it("AssertIsBeforeDate", () => {
    let time = "2018-07-31T11:44:37.000";
    let expectTime = "2018-07-31T11:44:37.000";

    let testArray = AssertIsBeforeOrEqualDate(time, expectTime, "day");
    expect(testArray).toEqual(true);
  });

  it("AssertIsAfterDate", () => {
    let time = "2018-08-02T11:44:37.000";
    let expectTime = "2018-07-31T11:44:37.000";

    let testArray = AssertIsAfterDate(time, expectTime, "day");
    expect(testArray).toEqual(true);
  });

  it("AssertIsAfterOrEqualDate", () => {
    let time = "2018-07-31T12:44:37.000";
    let expectTime = "2018-07-31T11:44:37.000";

    let testArray = AssertIsAfterOrEqualDate(time, expectTime, "hour");
    expect(testArray).toEqual(true);
  });
});
