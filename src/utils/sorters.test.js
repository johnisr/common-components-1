import { SortListByType } from "./sorters";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({
  adapter: new Adapter(),
  disableLifecycleMethods: true,
});

describe("sorters test", function () {
  it("SortListByType test", () => {
    let array = [{ name: 3 }, { name: 2 }, { name: 1 }];

    let sortedArray = [{ name: 1 }, { name: 2 }, { name: 3 }];

    let sortList = SortListByType(array, "name", "asc");
    expect(sortList).toEqual(sortedArray);
  });

  it("SortListByType case sensitive test", () => {
    let array = [{ name: "abc" }, { name: "def" }, { name: "Abc" }];

    let sortedArray = [{ name: "abc" }, { name: "Abc" }, { name: "def" }];

    let sortList = SortListByType(array, "name", "asc");
    expect(sortList).toEqual(sortedArray);
  });
});
