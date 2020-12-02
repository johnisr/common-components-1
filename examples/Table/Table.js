import React from "react";
import { storiesOf } from "@storybook/react";
import { CustomTable } from "../../src/index";
import { Column, AutoSizer } from "react-virtualized";
import PropTypeRow from "../Common/PropTypeRow";
import "react-virtualized/styles.css";
import "./Table.css";

const example = [
  { col_1: 1, col_2: 1, col_3: 1 },
  { col_1: 2, col_2: 2, col_3: 2 },
  { col_1: 3, col_2: 3, col_3: 3 },
  { col_1: 4, col_2: 4, col_3: 4 },
];

const NUM_OF_COLUMNS = 3;

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

storiesOf("Tables", module).add("Table", () => (
  <div className="tables container">
    <section>
      <div className="header">Table</div>
      <p>
        This table is built on top of the{" "}
        <a href="https://bvaughn.github.io/react-virtualized/#/components/Table">
          react-virtualized
        </a>{" "}
        table component, so the table is flexible and you can define how the
        data is rendered through children component.
      </p>
      <div className="table__example">
        <AutoSizer>
          {({ width, height }) => (
            <CustomTable
              title="Example"
              list={example}
              width={width}
              height={height}
              headerHeight={50}
              filterKey="col_1"
              filterTitle="Column 1"
              defaultSortBy="col_1"
              csvDownload={printList}
            >
              <Column
                label="Col 1"
                dataKey="col_1"
                width={width / NUM_OF_COLUMNS}
                headerRenderer={defaultHeaderRenderer}
              />
              <Column
                label="Col 2"
                dataKey="col_2"
                width={width / NUM_OF_COLUMNS}
              />
              <Column
                label="Col 3"
                dataKey="col_3"
                width={width / NUM_OF_COLUMNS}
                headerRenderer={defaultHeaderRenderer}
              />
            </CustomTable>
          )}
        </AutoSizer>
      </div>
    </section>
    <section>
      <div className="header">Children</div>
      <p>
        Since this component is built on top of the react-virtualized this means
        that you will be able to utilized the table component from
        react-virtualized. In this example we use{" "}
        <a href="https://github.com/bvaughn/react-virtualized/blob/master/docs/Column.md">
          Column{" "}
        </a>
        component to define what the header is and how the table row is going to
        be rendered.
        <br />
        <br />
        <b>
          Please note: If you want to have sort function on the column, you must
          make sure the key value is in the list.
        </b>
      </p>
    </section>
    <section>
      <div className="header">PropTypes</div>
      <PropTypeRow
        title="title"
        type="string"
        description="Title of the table"
        isRequired={false}
      />
      <PropTypeRow
        title="width"
        type="number"
        description="Setting the width of the table"
        isRequired={true}
      />
      <PropTypeRow
        title="height"
        type="number"
        description="Height constraint for list (determines how many actual rows are rendered)"
        isRequired={true}
      />
      <PropTypeRow
        title="headerHeight"
        type="number"
        description="Height constraint for header"
        isRequired={false}
      />
      <PropTypeRow
        title="headerRowRenderer"
        type="function"
        description="Render function for header row."
        isRequired={false}
      />
      <PropTypeRow
        title="list"
        type="array"
        description="List contain all the row that is going to be rendered"
        isRequired={true}
      />
      <PropTypeRow
        title="children"
        type="node"
        description="The children will contain information how the row is going to be rendered."
        isRequired={false}
      />
      <PropTypeRow
        title="filterKey"
        type="string"
        description="The list will filtered by the FilterKey's value"
        isRequired={false}
      />
      <PropTypeRow
        title="filterTitle"
        type="string"
        description="Value to show on the search box"
        isRequired={false}
      />
      <PropTypeRow
        title="defaultSortBy"
        type="string"
        description="The table will be sorted in ascending order with the key provided"
        isRequired={false}
      />
      <PropTypeRow
        title="defaultSortDirection"
        type="string"
        description="The table will be sorted in the order provided"
        isRequired={false}
      />
      <PropTypeRow
        title="rowHeight"
        type="number"
        description="Define table row height"
        isRequired={false}
      />
      <PropTypeRow
        title="csvDownload"
        type="function"
        description="Trigger csv download function"
        isRequired={false}
      />
      <PropTypeRow
        title="filterRow"
        type="node"
        description="An filtering element"
        isRequired={false}
      />
    </section>
  </div>
));
