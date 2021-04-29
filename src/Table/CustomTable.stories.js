import React from "react";
import { CustomTable } from "../index";
import {
  Column,
  CellMeasurerCache,
  CellMeasurer,
  SortIndicator,
} from "react-virtualized";
import "react-virtualized/styles.css";

const example = [
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

const cache = new CellMeasurerCache({
  fixedWidth: true,
  minHeight: 60,
});

function printList(list) {
  return list;
}

function defaultHeaderRenderer(props) {
  const { label } = props;
  const children = [
    <span
      className="ReactVirtualized__Table__headerTruncatedText"
      key="label"
      title={typeof label === "string" ? label : null}
    >
      {label}
    </span>,
  ];
  return children;
}

function dynamicHeightRenderer({
  dataKey,
  parent,
  rowIndex,
  columnIndex,
  cellData,
}) {
  return (
    <CellMeasurer
      cache={cache}
      columnIndex={0}
      key={dataKey}
      parent={parent}
      rowIndex={rowIndex}
    >
      {({ measure, registerChild }) => (
        <div
          onLoad={measure}
          ref={registerChild}
          style={{ "overflow-wrap": "break-word", "whiteSpace": "normal" }}
        >
          {cellData}
        </div>
      )}
    </CellMeasurer>
  );
}

const NUM_OF_COLUMNS = 3;
export const Primary = (args) => (
  <CustomTable {...args}>
    <Column
      label="Name"
      dataKey="name"
      width={args.width / NUM_OF_COLUMNS}
      cellRenderer={dynamicHeightRenderer}
    />
    <Column
      label="Role"
      dataKey="role"
      width={args.width / NUM_OF_COLUMNS}
      cellRenderer={dynamicHeightRenderer}
    />
    <Column
      label="email"
      dataKey="email"
      width={args.width / NUM_OF_COLUMNS}
      cellRenderer={dynamicHeightRenderer}
    />
  </CustomTable>
);

Primary.args = {
  width: 500,
  height: 500,
  list: example,
  headerHeight: 50,
  filterKey: "name",
  defaultSortBy: "name",
  defaultSortDirection: "asc",
  rowHeight: cache.rowHeight,
  deferredMeasurementCache: cache,
  csvDownload: printList,
};

export default {
  title: "Table/CustomTable",
  component: CustomTable,
};
