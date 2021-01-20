import React from "react";
import { Datatable } from "../index";

const headers = [
  {
    label: "Status",
    key: "status",
    width: 100,
    fixed: true,
  },
  {
    label: "Name",
    key: "name",
    width: 130,
  },
  {
    label: "Issued By",
    key: "issuedBy",
    width: 160,
  },
  {
    label: "Issued To",
    key: "type",
    width: 130,
  },
];

const list = [
  {
    id: 1,
    status: "issued",
    name: "Maxxam CoC",
    issuedBy: "admin@validere.com",
    type: "Maxxam",
  },
  {
    id: 2,
    status: "completed",
    name: "Sample 1 CoC",
    issuedBy: "validere@validere.com",
    type: "Husky",
  },
  {
    id: 3,
    status: "pending",
    name: "Validere CoC",
    issuedBy: "user1@validere.com",
    type: "Element",
  },
];

const Template = (args) => <Datatable {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: "Title",
  headers: headers,
  list: list,
  width: 600,
  height: 600,
  rowHeight: 40,
};

export const WithCheckbox = Template.bind({});
WithCheckbox.storyName = "Datatable with checkboxes";
WithCheckbox.args = {
  ...Primary.args,
  onCheckboxClick: (item) => item,
};
WithCheckbox.parameters = {
  docs: {
    storyDescription:
      "Given onCheckboxClick prop, adds checkboxes to be able to select specific rows",
  },
};

export const WithSearch = Template.bind({});
WithSearch.storyName = "Datatable with inputSearch";
WithSearch.args = {
  ...Primary.args,
  filterKey: "name",
};
WithSearch.parameters = {
  docs: {
    storyDescription: "filters the list based on the filterKey prop",
  },
};

export const WithCustomHeaders = Template.bind({});
WithCustomHeaders.storyName = "Datatable with custom headers";
WithCustomHeaders.args = {
  ...Primary.args,
  headers: [
    {
      label: "Status",
      key: "status",
      width: 100,
      fixed: true,
    },
    {
      label: "Name",
      key: "name",
      width: 130,
      rightAlign: true,
    },
    {
      label: "Issued By",
      key: "issuedBy",
      width: 160,
      cellRenderer: (rowData) => `${rowData.issuedBy.split("@")[0]}`,
    },
    {
      label: "Issued To",
      key: "type",
      width: 130,
    },
  ],
  filterKey: "name",
};
WithCustomHeaders.parameters = {
  docs: {
    storyDescription:
      "Headers can be customized by adding extra properties such as `fixed`, `rightAlign`, and `cellRenderer`",
  },
};

export default {
  title: "Table/Datatable",
  component: Datatable,
  argTypes: {
    headers: {
      table: {
        category: "Content",
      },
    },
    list: {
      table: {
        category: "Content",
      },
    },
    title: {
      table: {
        category: "Table Properties",
      },
    },
    height: {
      table: {
        category: "Table Properties",
      },
    },
    width: {
      table: {
        category: "Table Properties",
      },
    },
    collapseBorder: {
      table: {
        category: "Table Properties",
      },
    },
    isLoading: {
      table: {
        category: "Table Properties",
      },
    },
    highlightRow: {
      table: {
        category: "Row Properties",
      },
    },
    onCellClick: {
      table: {
        category: "Row Properties",
      },
    },
    rowHeight: {
      table: {
        category: "Row Properties",
      },
    },
    highlightSelected: {
      control: { type: "none" },
      table: {
        category: "Row Properties",
      },
    },
    getRowClassName: {
      table: {
        category: "Row Properties",
      },
    },
    onCheckboxClick: {
      table: {
        category: "Checkbox",
      },
    },
    checkedList: {
      table: {
        category: "Checkbox",
      },
    },
    disableSelectAll: {
      table: {
        category: "Checkbox",
      },
    },
    disableCheckbox: {
      table: {
        category: "Checkbox",
      },
    },
    filterKey: {
      control: {
        type: "inline-radio",
        options: ["status", "name", "issuedBy", "type"],
      },
      table: {
        category: "Filtering",
      },
    },
    filterTitle: {
      table: {
        category: "Filtering",
      },
    },
    customSearch: {
      table: {
        category: "Filtering",
      },
    },
    noFilterListCount: {
      table: {
        category: "Filtering",
      },
    },
    defaultSortBy: {
      control: { type: "none" },
      table: {
        category: "Sorting",
      },
    },
    defaultSortDirection: {
      control: { type: "none" },
      table: {
        category: "Sorting",
      },
    },
    filterRow: {
      control: { type: "none" },
      table: {
        category: "Passed in Components",
      },
    },
    filterPillbox: {
      control: { type: "none" },
      table: {
        category: "Passed in Components",
      },
    },
    actionRow: {
      control: { type: "none" },
      table: {
        category: "Passed in Components",
      },
    },
    forwardedRef: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    componentSubtitle:
      "The table component used when the table's size is fixed or requires selection of multiple rows",
  },
};
