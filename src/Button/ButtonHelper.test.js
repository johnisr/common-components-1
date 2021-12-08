import React from "react";
import { getVariantClassName, getSizeClassName, getIcon } from "./ButtonHelper";
import FontAwesome from "react-fontawesome";

describe("Button Helper tests", () => {
  test("Primary button classname should be returned when variant is primary", () => {
    const variant = "primary";
    const result = getVariantClassName(variant);
    expect(result).toEqual("button--primary");
  });

  test("Error button classname should be returned when variant is error", () => {
    const variant = "error";
    const result = getVariantClassName(variant);
    expect(result).toEqual("button--error");
  });

  test("Error outline button classname should be returned when variant is error-outline", () => {
    const variant = "error-outline";
    const result = getVariantClassName(variant);
    expect(result).toEqual("button--error-outline");
  });

  test("Default button classname should be returned when variant is other than primary, error, error-outline", () => {
    const variant = "";
    const result = getVariantClassName(variant);
    expect(result).toEqual("button--outline");
  });

  test("Large size button classname should be returned when variant is large", () => {
    const size = "large";
    const result = getSizeClassName(size);
    expect(result).toEqual("button--large");
  });

  test("Medium size button classname should be returned when size is medium", () => {
    const size = "medium";
    const result = getSizeClassName(size);
    expect(result).toEqual("button--medium");
  });

  test("Small size button classname should be returned when size is other than large, medium  ", () => {
    const size = "block";
    const result = getSizeClassName(size);
    expect(result).toEqual("button--small");
  });

  test("Specified icon should be displayed", () => {
    const isLoading = false;
    const icon = "twitter";
    const iconClassName = "fa-brands fa-twitter";
    const result = getIcon(isLoading, icon, iconClassName);
    expect(result).toMatchObject(
      <FontAwesome name={icon} className={`${iconClassName}`} />
    );
  });

  test("Null should be returned when isLoading is false and no icon is specified", () => {
    const isLoading = false;
    const icon = "";
    const iconClassName = "";
    const result = getIcon(isLoading, icon, iconClassName);
    expect(result).toBe(null);
  });

  test("Loading icon should be displayed when isLoading is true  ", () => {
    const isLoading = true;
    const result = getIcon(isLoading);
    expect(result).toMatchObject(
      <FontAwesome className="loadingIcon fa-pulse" name="spinner" />
    );
  });
});
