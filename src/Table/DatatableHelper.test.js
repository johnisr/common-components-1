import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import lodashSortBy from "lodash/sortBy";
import {
  getFilteredList,
  getErrorMessage,
  isAllRowChecked,
  getSortedList,
  getColumnWidth,
  CHARACTER_WIDTH_IN_PIXELS,
} from "./DatatableHelper";

Enzyme.configure({
  adapter: new Adapter(),
  disableLifecycleMethods: true,
});

describe("DatatableHelper test", () => {
  it("getColumnWidth", () => {
    let label = null;
    let minColumnWidth = 50;

    // if header label is null, then column width is minColumnWidth
    expect(getColumnWidth(label, minColumnWidth)).toEqual(minColumnWidth);

    // a short label will still have a column width of minColumnWidth
    label = "Date";
    expect(getColumnWidth(label, minColumnWidth)).toEqual(minColumnWidth);

    // If the label is long enough, it will use its length * CHARACTER_WIDTH
    label = "Mole Percentage Methane (C1)";
    expect(getColumnWidth(label, minColumnWidth)).toEqual(
      label.length * CHARACTER_WIDTH_IN_PIXELS
    );
  });

  it("getFilteredList", () => {
    const list = [{ name: "abc" }, { name: "aab" }, { name: "aabc" }];

    const filteredList = getFilteredList(list, "aa", "name");
    expect(filteredList).toEqual(
      expect.arrayContaining([{ name: "aab" }, { name: "aabc" }])
    );

    expect(filteredList).not.toEqual(expect.arrayContaining([{ name: "abc" }]));

    // if given a customSearch function, uses that instead
    const customSearch = jest.fn();
    getFilteredList(list, "aa", "name", customSearch);
    expect(customSearch).toHaveBeenLastCalledWith(list, "aa");
  });

  it("getErrorMessage", () => {
    let header = [];
    let isLoading = false;

    expect(getErrorMessage(header, isLoading)).toEqual("No data is available");

    header = [{ label: "Name", key: "name", width: 75 }];
    isLoading = true;
    expect(getErrorMessage(header, isLoading)).toEqual("Loading...");

    isLoading = false;
    expect(getErrorMessage(header, isLoading)).toEqual(null);
  });

  it("getSortedList", () => {
    let headers = [{ label: "Name", key: "name", width: 75 }];
    let sortBy = null;
    let sortDirection = null;
    let list = [{ name: "z" }, { name: "a" }, { name: "b" }];

    // if no sortDirection and sortBy, returns list as is
    expect(getSortedList(headers, list, sortBy, sortDirection)).toEqual(list);

    // sorts by `sortBy` property, defaults to asc if sortDirection and custom
    //  sort not given e.g. A to Z
    sortBy = "name";
    expect(getSortedList(headers, list, sortBy, sortDirection)).toEqual([
      { name: "a" },
      { name: "b" },
      { name: "z" },
    ]);

    sortDirection = "desc";
    expect(getSortedList(headers, list, sortBy, sortDirection)).toEqual([
      { name: "z" },
      { name: "b" },
      { name: "a" },
    ]);

    // if given a custom sorting function and no sortDirection, defaults to
    // desc e.g. Z to A
    const sort = (list, sortBy) => lodashSortBy(list, sortBy);
    headers = [{ label: "Name", key: "name", width: 75, sort: sort }];
    sortDirection = null;
    expect(getSortedList(headers, list, sortBy, sortDirection)).toEqual([
      { name: "z" },
      { name: "b" },
      { name: "a" },
    ]);

    sortDirection = "asc";
    expect(getSortedList(headers, list, sortBy, sortDirection)).toEqual([
      { name: "a" },
      { name: "b" },
      { name: "z" },
    ]);
  });

  it("isAllRowChecked", () => {
    let filteredList = [];
    let checkedList = [];

    // if there is no items in list, it still returns false
    expect(isAllRowChecked(filteredList, checkedList)).toEqual(false);

    filteredList = [{ id: 1 }, { id: 2 }];
    checkedList = [{ id: 1 }];
    expect(isAllRowChecked(filteredList, checkedList)).toEqual(false);

    filteredList = [{ id: 1 }, { id: 2 }];
    checkedList = [{ id: 1 }, { id: 2 }];
    expect(isAllRowChecked(filteredList, checkedList)).toEqual(true);

    filteredList = [{ id: 1 }];
    checkedList = [{ id: 1 }];
    expect(isAllRowChecked(filteredList, checkedList)).toEqual(true);
  });
});
