import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { havePermission, getFirstChar } from "./NavBarHelper";

describe("NavBar Helper tests", () => {
  test("Should return the first character of input in upper case", () => {
    const str = "Validere";
    const result = getFirstChar(str);
    expect(result).toEqual("V");
  });

  test("Should return null in case of input other than string", () => {
    const str = null;
    const result = getFirstChar(str);
    expect(result).toEqual(null);
  });

  test("Should return true when user has read permission for specific application", () => {
    const application = "dashboard";
    const permissions = {
      dashboard: ["read"],
      operations: ["read"],
      commercial: ["read"],
      esg: ["read"],
    };
    const result = havePermission(permissions, application);
    expect(result).toEqual(true);
  });

  test("Should return false when user does not have read permission for specific application", () => {
    const application = "dashboard";
    const permissions = {
      dashboard: [],
    };
    const result = havePermission(permissions, application);
    expect(result).toEqual(false);
  });

  test("Should return false when user permission is not at all specified", () => {
    const application = "dashboard";
    const permissions = undefined;
    const result = havePermission(permissions, application);
    expect(result).toEqual(false);
  });
});
