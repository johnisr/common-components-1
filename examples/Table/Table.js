import React from "./node_modules/react";
import { storiesOf } from "./node_modules/@storybook/react";
import Table from "./CustomTable";
import { Column, AutoSizer } from "./node_modules/react-virtualized";
import PropTypeRow from "../Common/PropTypeRow";
import "./node_modules/react-virtualized/styles.css";
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
