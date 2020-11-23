import React from "react";
import { storiesOf } from "@storybook/react";
import { Datatable } from "../../src/index";
import PropTypeRow from "../Common/PropTypeRow";
import "react-virtualized/styles.css";
import "./Table.css";
import { AutoSizer } from "react-virtualized";

const data = [
  { col_1: 1, col_2: 1, col_3: 1 },
  { col_1: 2, col_2: 2, col_3: 2 },
  { col_1: 3, col_2: 3, col_3: 3 },
  { col_1: 4, col_2: 4, col_3: 4 },
];

const Headers = [
  {
    label: "col_1",
    key: "col_1",
    width: 150,
    fixed: true,
  },
  {
    label: "col_2",
    key: "col_2",
    width: 150
  },
  {
    label: "col_3",
    key: "col_3",
    width: 150
  }
];

function printList(list) {
  return list;
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
          {({ height, width }) => (
            <Datatable
              title="Datatable"
              width={width}
              height={height}
              headers={Headers}
              list={data}
              filterKey="col_1"
              filterTitle="col_1"
              defaultSortBy="col_1"
              defaultSortDirection="desc"
            />
          )}
        </AutoSizer>
      </div>
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
    </section>
  </div>
));
