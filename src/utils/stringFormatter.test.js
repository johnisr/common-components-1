import { getFormattedValueWithUnit } from "./stringFormatter";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({
  adapter: new Adapter(),
  disableLifecycleMethods: true,
});

describe("stringFormatter test", function () {
  it("getFormattedValueWithUnit test", () => {
    const object = { value: "123456.78", unit: "e3m3" };

    const expectedString = "123,456.78 e3m3";
    expect(getFormattedValueWithUnit(object)).toEqual(expectedString);

    const emptyObject = {};
    expect(getFormattedValueWithUnit(emptyObject)).toEqual("-");
  });
});
