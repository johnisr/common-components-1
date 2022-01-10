import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Datatable from "./Datatable";
import {
  getFormattedNumber,
  getFormattedValueWithUnit,
} from "../utils/stringFormatter";

Enzyme.configure({
  adapter: new Adapter(),
});

const data = [
  {
    id: 1,
    name: "Fake Company Facility 1 : Pipe C5+ : Validere Facility 2",
    raw_volume: { unit: "m³", value: 154501.954 },
  },
  {
    id: 2,
    name: "Validere Facility 1 : Pipe Gas : Test Company Facility 1",
    raw_volume: { unit: "m³", value: 144900.463 },
  },
  {
    id: 3,
    name: "Validere Facility 2 : Truck Gas : Test Company Facility 1",
    raw_volume: { unit: "m³", value: 160396.086 },
  },
];

const totalVolumeRenderer = (rowData, columnKey) => {
  const volume = rowData[columnKey];

  if (volume) {
    return `${getFormattedNumber(volume.value)} ${volume.unit}`;
  }

  return "-";
};

const sortByTotalVolume = (list) => {
  return [...list].sort((a, b) => {
    const aValue = a.raw_volume.value ?? -1;
    const bValue = b.raw_volume.value ?? -1;

    return aValue - bValue;
  });
};

const headers = [
  {
    label: "Stream",
    key: "name",
    width: 200,
    fixed: true,
  },
  {
    label: "Total Volume",
    key: "raw_volume",
    cellRenderer: totalVolumeRenderer,
    sort: sortByTotalVolume,
    width: 200,
    fixed: true,
  },
];

describe("Datatable", () => {
  it("should render a table with no data", () => {
    const wrapper = mount(
      <Datatable list={[]} width={1000} height={1000} headers={headers} />
    );

    // Error message exists because of empty list passed in
    const errorMessage = wrapper.find(".datatable__errorMessage");
    expect(errorMessage.exists()).toEqual(true);
    expect(errorMessage.text()).toEqual("No data available");

    const headerLabels = wrapper
      .find(".datatable__headerCell")
      .map((reactWrapper) => reactWrapper.text());

    // headers are displayed even if no list elements
    expect(headerLabels).toEqual(
      expect.arrayContaining(headers.map((header) => header.label))
    );
  });

  it("should render a table", () => {
    const title = "A table";
    const wrapper = mount(
      <Datatable
        list={data}
        width={1000}
        height={1000}
        headers={headers}
        title={title}
      />
    );

    // no error message
    expect(wrapper.find(".datatable__errorMessage").exists()).toEqual(false);

    const titleNode = wrapper.find("div.customTable__title");
    expect(titleNode.exists()).toEqual(true);
    expect(titleNode.text()).toEqual(title);

    const cellValues = wrapper
      .find(".datatable__bodyGrid .datatable__row")
      .map((reactWrapper) => reactWrapper.text());

    // There are two columns for each row, name and total volume
    const firstRow = cellValues.slice(0, 2);
    expect(firstRow).toEqual([
      data[0].name,
      getFormattedValueWithUnit(data[0].raw_volume),
    ]);

    const secondRow = cellValues.slice(2, 4);
    expect(secondRow).toEqual([
      data[1].name,
      getFormattedValueWithUnit(data[1].raw_volume),
    ]);

    const thirdRow = cellValues.slice(4, 6);
    expect(thirdRow).toEqual([
      data[2].name,
      getFormattedValueWithUnit(data[2].raw_volume),
    ]);

    // Click the "Volume" header which sorts the table by volume desc
    const headerCells = wrapper.find(".datatable__headerContent");
    headerCells.at(1).simulate("click");

    const volumeSortedCellValues = wrapper
      .find(".datatable__bodyGrid .datatable__row")
      .map((reactWrapper) => reactWrapper.text());

    // Volumes are every 2nd cell (e.g. 1, 3, 5)
    const volumeCellValues = volumeSortedCellValues.filter(
      (cell, index) => index % 2 !== 0
    );

    expect(volumeCellValues).toEqual([
      getFormattedValueWithUnit(data[2].raw_volume), // 160,396.086
      getFormattedValueWithUnit(data[0].raw_volume), // 154,501.954
      getFormattedValueWithUnit(data[1].raw_volume), // 144,900.463
    ]);
  });

  it("should filter values each rowData's [filterKey] property", () => {
    const filterTitle = "Search name";
    const wrapper = mount(
      <Datatable
        list={data}
        width={1000}
        height={1000}
        headers={headers}
        filterKey="name"
        filterTitle={filterTitle}
      />
    );

    const searchBar = wrapper.find(".datatable__filterRow input");
    expect(searchBar.exists()).toEqual(true);
    expect(searchBar.prop("placeholder")).toEqual(` ${filterTitle}`);

    searchBar.simulate("change", {
      target: { value: "Gas" },
    });

    // force rerender so useEffects/setState show up
    wrapper.setProps();

    // streams are the first column (e.g. 0, 2nd, 4th cell value)
    const streamCellValues = wrapper
      .find(".datatable__bodyGrid .datatable__row")
      .map((reactWrapper) => reactWrapper.text())
      .filter((_text, index) => index % 2 === 0);

    expect(streamCellValues).toEqual([
      data[1].name, // Validere Facility 1 : Pipe Gas : Test Company Facility 1
      data[2].name, // Validere Facility 2 : Truck Gas : Test Company Facility 1
    ]);
  });

  it("should show checkbox column and call onCheckboxClick when clicked", () => {
    const checkboxesSelector =
      ".datatable__bodyGrid .datatable__checkboxCell input";
    const onCheckboxClick = jest.fn();
    const wrapper = mount(
      <Datatable
        list={data}
        width={1000}
        height={1000}
        headers={headers}
        onCheckboxClick={onCheckboxClick}
      />
    );

    // checkbox column appears
    const checkAllCheckbox = wrapper.find(".datatable__headerGrid input").at(0);
    expect(checkAllCheckbox.exists()).toEqual(true);

    // Clicking the checkbox header calls onCheckboxClick with entire list
    checkAllCheckbox.simulate("change");
    expect(onCheckboxClick).toHaveBeenLastCalledWith(data);

    // It also makes entire checkbox column "checked"
    const checkboxCells = wrapper
      .find(checkboxesSelector)
      .map((reactWrapper) => reactWrapper);

    expect(
      checkboxCells.every((checkbox) => checkbox.prop("checked") === true)
    ).toEqual(true);

    // Clicking it when everything is checked calls onCheckbox click with []
    checkAllCheckbox.simulate("change");
    expect(onCheckboxClick).toHaveBeenLastCalledWith([]);

    // It also makes entire checkbox column "checked" === false
    const updatedCheckboxCells = wrapper
      .find(".datatable__bodyGrid .datatable__checkboxCell input")
      .map((reactWrapper) => reactWrapper);

    expect(
      updatedCheckboxCells.every(
        (checkbox) => checkbox.prop("checked") === false
      )
    ).toEqual(true);

    // Click the second checkbox, onCheckboxClick is called with data[1]
    // and checks the checkbox
    updatedCheckboxCells[1].simulate("change");
    wrapper.setProps();

    expect(onCheckboxClick).toHaveBeenLastCalledWith([data[1]]);
    expect(wrapper.find(checkboxesSelector).at(1).prop("checked")).toEqual(
      true
    );

    // Click the second checkbox again, onCheckboxClick is called
    // and unselects the checkbox
    updatedCheckboxCells[1].simulate("change");
    wrapper.setProps();

    expect(onCheckboxClick).toHaveBeenLastCalledWith([]);
    expect(wrapper.find(checkboxesSelector).at(1).prop("checked")).toEqual(
      false
    );
  });
});
