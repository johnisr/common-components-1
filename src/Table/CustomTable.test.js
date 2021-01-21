import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CustomTable from "./CustomTable";
import { Table, Column } from "react-virtualized";

Enzyme.configure({
  adapter: new Adapter(),
});

// Original ordering is by name asc
const members = [
  {
    name: "Validere Admin User",
    role: "admin",
    id: 3,
    email: "admin@validere.com",
  },
  {
    name: "Validere Validere Drayton Valley TT 550 User 1",
    role: "manager",
    id: 4,
    email: "user1@validere.com",
  },
  {
    name: "Validere Validere Fox Creek TT 229 User 2",
    role: "admin",
    id: 5,
    email: "user2@validere.com",
  },
];

const BORDER_HEIGHT = 2;

describe("CustomTable", () => {
  describe("Full Table", () => {
    let title, width, highlightColor, rowHeight, wrapper;

    beforeEach(() => {
      title = "Members";
      width = 1000;
      highlightColor = "rgba(69, 192, 193, 0.2)";
      rowHeight = 50;
      wrapper = mount(
        <CustomTable
          list={members}
          title={title}
          width={width}
          height={750}
          filterKey="name"
          defaultSortBy="name"
          defaultSortDirection="asc"
          rowHeight={rowHeight}
        >
          <Column label="Name" dataKey="name" width={200} />
          <Column label="Role" dataKey="role" width={200} />
          <Column label="email" dataKey="email" width={200} disableSort />
        </CustomTable>
      );
    });
    afterEach(() => {
      wrapper.unmount();
    });

    it("should render", () => {
      expect(wrapper.find(".customTable__title").text()).toEqual(title);
      expect(wrapper.find(Table).prop("width")).toEqual(width - BORDER_HEIGHT);
      expect(wrapper.find("[aria-rowindex=2]").prop("style").height).toEqual(
        rowHeight
      );

      // All columns there in the order of Name ascending
      expect(
        wrapper.find("[aria-colindex=1]").map((nameCol) => nameCol.text())
      ).toEqual(members.map((member) => member.name));
      expect(
        wrapper.find("[aria-colindex=2]").map((roleCol) => roleCol.text())
      ).toEqual(members.map((member) => member.role));
      expect(
        wrapper.find("[aria-colindex=3]").map((emailCol) => emailCol.text())
      ).toEqual(members.map((member) => member.email));
    });

    it("should be able to highlight/unhighlight a row", () => {
      wrapper.setProps({ highlightRow: members[1] });
      wrapper.update();
      expect(
        wrapper.find("[aria-rowindex=2]").prop("style").backgroundColor
      ).toEqual(highlightColor);

      // if invalid prop, highlighted row stays the same
      wrapper.setProps({ highlightRow: null });
      wrapper.update();
      expect(
        wrapper.find("[aria-rowindex=2]").prop("style").backgroundColor
      ).toEqual(highlightColor);

      wrapper.setProps({ highlightRow: {} });
      wrapper.update();
      expect(
        wrapper.find("[aria-rowindex=2]").prop("style").backgroundColor
      ).toEqual("#fff");
    });

    it("should be able to change sortby and sort order", () => {
      const [nameHeader] = wrapper
        .find(".ReactVirtualized__Table__headerColumn span")
        .map((ReactWrapper) => ReactWrapper);

      // Reverse default sorting order of name by clicking on name header
      nameHeader.simulate("click");
      nameHeader.simulate("click");
      wrapper.setProps();
      wrapper.update();
      const sortedByNameDesc = members.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      expect(
        wrapper.find("[aria-colindex=1]").map((nameCol) => nameCol.text())
      ).toEqual(sortedByNameDesc.map((member) => member.name));
      expect(
        wrapper.find("[aria-colindex=2]").map((roleCol) => roleCol.text())
      ).toEqual(sortedByNameDesc.map((member) => member.role));
      expect(
        wrapper.find("[aria-colindex=3]").map((emailCol) => emailCol.text())
      ).toEqual(sortedByNameDesc.map((member) => member.email));

      // Change sorting order back to name asc
      nameHeader.simulate("click");
      expect(
        wrapper.find("[aria-colindex=1]").map((nameCol) => nameCol.text())
      ).toEqual(members.map((member) => member.name));
      expect(
        wrapper.find("[aria-colindex=2]").map((roleCol) => roleCol.text())
      ).toEqual(members.map((member) => member.role));
      expect(
        wrapper.find("[aria-colindex=3]").map((emailCol) => emailCol.text())
      ).toEqual(members.map((member) => member.email));
    });

    it("should not change sortby if column with prop disableSort is clicked", () => {
      const emailHeader = wrapper
        .find(".ReactVirtualized__Table__headerColumn span")
        .at(2);

      // Original order is by name
      expect(
        wrapper.find("[aria-colindex=1]").map((nameCol) => nameCol.text())
      ).toEqual(members.map((member) => member.name));
      expect(
        wrapper.find("[aria-colindex=2]").map((roleCol) => roleCol.text())
      ).toEqual(members.map((member) => member.role));
      expect(
        wrapper.find("[aria-colindex=3]").map((emailCol) => emailCol.text())
      ).toEqual(members.map((member) => member.email));

      // click a header that has disableSort prop and order stays same
      emailHeader.simulate("click");
      expect(
        wrapper.find("[aria-colindex=1]").map((nameCol) => nameCol.text())
      ).toEqual(members.map((member) => member.name));
      expect(
        wrapper.find("[aria-colindex=2]").map((roleCol) => roleCol.text())
      ).toEqual(members.map((member) => member.role));
      expect(
        wrapper.find("[aria-colindex=3]").map((emailCol) => emailCol.text())
      ).toEqual(members.map((member) => member.email));
    });
  });

  describe("Exceptions", () => {
    let wrapper;
    afterEach(() => {
      if (wrapper && wrapper.length) {
        wrapper.unmount();
      }
    });

    it("should render even with no data rows", () => {
      const width = 1000;
      const height = 750;
      wrapper = mount(
        <CustomTable list={[]} width={width} height={height}>
          {null}
        </CustomTable>
      );
      expect(wrapper.find(".noDataRow").text()).toEqual("No data available");
    });

    it("should render an input fulter and not a csvDownloadButton", () => {
      const width = 1000;
      const height = 750;
      wrapper = mount(
        <CustomTable list={[]} width={width} height={height} filterKey={"name"}>
          {null}
        </CustomTable>
      );
      expect(wrapper.find(".csvDownloadButton").exists()).toEqual(false);
    });
  });
});
