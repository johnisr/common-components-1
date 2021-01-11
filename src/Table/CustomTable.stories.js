import React from "react";
import { CustomTable } from "../index";
import { Column, CellMeasurerCache, CellMeasurer } from "react-virtualized";
import "react-virtualized/styles.css";

const example = [
  {
    col_1:
      "Some very very very very long text that is too big for the minHeight",
    col_2: 1,
    col_3: 1,
  },
  { col_1: 2, col_2: 2, col_3: 2 },
  { col_1: 3, col_2: 3, col_3: 3 },
  { col_1: 4, col_2: 4, col_3: 4 },
];

const NUM_OF_COLUMNS = 3;

const cache = new CellMeasurerCache({
  fixedWidth: true,
  minHeight: 60,
});

function printList(list) {
  return list;
}

function headerRowRenderer(props) {
  const { className, columns, style } = props;
  return (
    <div className={className} role="row" style={style}>
      {columns}
    </div>
  );
}

function defaultHeaderRenderer(props) {
  const { dataKey, label, sortBy, sortDirection } = props;
  return (
    <span
      className="CustomTable__header"
      key="label"
      title={typeof label === "string" ? label : null}
    >
      {`Custom ${label}`}
    </span>
  );
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
          style={{ "overflow-wrap": "break-word", whiteSpace: "normal" }}
        >
          {cellData}
        </div>
      )}
    </CellMeasurer>
  );
}

export const Primary = (args) => (
  <CustomTable {...args}>
    <Column
      label="Col 1"
      dataKey="col_1"
      width={args.width / NUM_OF_COLUMNS}
      headerRenderer={defaultHeaderRenderer}
      cellRenderer={dynamicHeightRenderer}
    />
    <Column label="Col 2" dataKey="col_2" width={args.width / NUM_OF_COLUMNS} />
    <Column
      label="Col 3"
      dataKey="col_3"
      width={args.width / NUM_OF_COLUMNS}
      headerRenderer={defaultHeaderRenderer}
    />
  </CustomTable>
);
Primary.args = {
  width: 500,
  height: 500,
  list: example,
  headerHeight: 50,
  rowHeight: cache.rowHeight,
  filterKey: "col_1",
  filterTitle: "Column 1",
  defaultSoryBy: "col_1",
  deferredMeasurementCache: cache,
  csvDownload: printList,
};

export default {
  title: "Table/CustomTable",
  component: CustomTable,
};
