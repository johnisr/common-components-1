import React from "react";
import { getAlertStyling, isPositionTop } from "./AlertHelper";

describe("Alert Helper tests", () => {
  test("Success icon gets displayed when variant is success", () => {
    const variant = "success";
    const result = getAlertStyling(variant);
    expect(result).toMatchObject({
      className: "alert--success",
      icon: "check-circle-o",
    });
  });

  test("warning icon gets displayed when variant is warning", () => {
    const variant = "warning";
    const result = getAlertStyling(variant);
    expect(result).toMatchObject({
      className: "alert--warning",
      icon: "exclamation-circle",
    });
  });

  test("notification icon gets displayed when variant is notification", () => {
    const variant = "notification";
    const result = getAlertStyling(variant);
    expect(result).toMatchObject({
      className: "alert--notification",
      icon: "info-circle",
    });
  });

  test("question icon gets displayed when variant is other than success, warning, notification", () => {
    const variant = "";
    const result = getAlertStyling(variant);
    expect(result).toMatchObject({
      className: "alert--normal",
      icon: "question-circle-o",
    });
  });

  test("isPositionTop should return true when position is top", () => {
    const position = "top";
    const result = isPositionTop(position);
    expect(result).toBe(true);
  });

  test("isPositionTop should return true when position is topLeft", () => {
    const position = "topLeft";
    const result = isPositionTop(position);
    expect(result).toBe(true);
  });

  test("isPositionTop should return true when position is topRight", () => {
    const position = "topRight";
    const result = isPositionTop(position);
    expect(result).toBe(true);
  });

  test("isPositionTop should return false when position is other than top, topLeft, topRight", () => {
    const position = "bottomLeft";
    const result = isPositionTop(position);
    expect(result).toBe(false);
  });
});
