import React, { Component } from "react";
import * as PropTypes from "prop-types";
import { Table } from "react-virtualized";
import findIndex from "lodash/findIndex";
import FontAwesome from "react-fontawesome";
import { sortListByType } from "./CustomTableHelper";
import "./CustomTable.css";

const HEIGHT_OFFSET = 50; // Account height for the things outside of the table (title, searchbox, and etc)

const HIGHLIGHTED_TABLE_ROW_COLOR = "rgba(69, 192, 193, 0.2)";

const BORDER_OFFSET = 2;

class CustomTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateTable: false,
      highlightIndex: -1,
      filterValue: "",
      sortDirection: "asc",
      sortBy: null,
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.getRowColor = this.getRowColor.bind(this);
    this.headerRenderer = this.headerRenderer.bind(this);
    this.getSortedList = this.getSortedList.bind(this);
    this.getRowClassName = this.getRowClassName.bind(this);
  }

  componentDidMount() {
    this.setState({
      sortBy: this.props.defaultSortBy,
      sortDirection: this.props.defaultSortDirection,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const { highlightRow, list } = this.props;
      const sortedList = this.getSortedList(list);

      if (highlightRow) {
        let highlightIndex = findIndex(sortedList, { id: highlightRow.id });

        this.setState({
          highlightIndex: highlightIndex,
        });
      }
    }
  }

  noRowsRenderer() {
    return <div className="noDataRow">No data available</div>;
  }

  getRowColor = (index) => {
    const { highlightIndex } = this.state;

    if (highlightIndex !== -1 && index === highlightIndex) {
      return { backgroundColor: HIGHLIGHTED_TABLE_ROW_COLOR };
    }

    return { backgroundColor: "#fff" };
  };

  handleSearch(event) {
    let value = event.target.value;
    this.setState({
      filterValue: value,
    });
  }

  headerRenderer({ dataKey, label, disableSort }) {
    const { sortBy, sortDirection } = this.state;
    return (
      <div
        onClick={() => {
          disableSort ? null : this.setSortingOrder(dataKey);
        }}
        className={disableSort ? "disablePointerEvent" : "clickable"}
      >
        {sortBy === dataKey ? (
          <FontAwesome
            name={sortDirection === "asc" ? "sort-asc" : "sort-desc"}
            className="icon"
          />
        ) : null}

        {label}
      </div>
    );
  }

  setSortingOrder(columnKey) {
    let { sortDirection, sortBy } = this.state;

    if (columnKey !== sortBy) {
      this.setState({
        sortBy: columnKey,
        sortDirection: "asc",
      });
    } else {
      let nextSortDirection = sortDirection === "asc" ? "desc" : "asc";
      this.setState({
        sortDirection: nextSortDirection,
      });
    }
  }

  csvDownload(list) {
    this.props.csvDownload(list);
  }

  getSortedList(list) {
    const { customSort } = this.props;
    const { sortBy, sortDirection } = this.state;

    if (!sortBy) {
      return list;
    }
    if (customSort && customSort[sortBy]) {
      return sortDirection === "asc"
        ? customSort[sortBy](list, sortBy)
        : customSort[sortBy](list, sortBy).reverse();
    } else {
      return sortListByType(list, sortBy, sortDirection);
    }
  }

  getRowClassName(row) {
    const { rowClassName } = this.props;
    if (rowClassName) {
      if (typeof rowClassName === "string") {
        return rowClassName;
      } else {
        return row ? rowClassName(row) : "";
      }
    }
  }

  getTableHeight(title, filterPillbox, csvDownload, filterKey, filterRow) {
    if (title || filterPillbox || csvDownload || filterKey || filterRow) {
      return this.props.height - HEIGHT_OFFSET;
    } else {
      return this.props.height;
    }
  }

  render() {
    const {
      title,
      list,
      children,
      width,
      rowHeight,
      headerHeight = 40,
      headerRowRenderer,
      filterKey,
      filterTitle,
      csvDownload,
      cellClassName,
      filterRow,
      filterPillbox,
      deferredMeasurementCache,
    } = this.props;

    const { highlightIndex, updateTable } = this.state;

    let TableHeight = this.getTableHeight(
      title,
      filterPillbox,
      csvDownload,
      filterKey,
      filterRow
    );

    const sortedlist = this.getSortedList(list);

    let childrenWithProps = null;

    if (children) {
      childrenWithProps = React.Children.map(children, (child) => {
        if (!child.props.headerRenderer) {
          return React.cloneElement(child, {
            headerRenderer: this.headerRenderer,
          });
        }
        return child;
      });
    }

    return sortedlist && Array.isArray(sortedlist) ? (
      <div
        className={`customTable ${this.props.className}`}
        style={{ width: width }}
      >
        {title ? (
          <div
            className="customTable__titleContainer"
            style={{ marginBottom: filterKey ? null : "20px" }}
          >
            {title && <div className="customTable__title">{title}</div>}
          </div>
        ) : null}

        <Table
          deferredMeasurementCache={deferredMeasurementCache}
          width={width - BORDER_OFFSET}
          height={TableHeight}
          headerHeight={headerHeight}
          rowCount={sortedlist.length}
          rowGetter={({ index }) => sortedlist[index]}
          rowHeight={rowHeight ? rowHeight : 40}
          noRowsRenderer={this.noRowsRenderer}
          headerRowRenderer={headerRowRenderer}
          rowStyle={({ index }) => this.getRowColor(index)}
          scrollToIndex={highlightIndex}
          updateTable={updateTable}
          gridClassName={cellClassName}
          onRowClick={this.props.onRowClick}
          rowClassName={({ index }) => this.getRowClassName(sortedlist[index])}
        >
          {childrenWithProps}
        </Table>
      </div>
    ) : (
      <div>Table error</div>
    );
  }
}

CustomTable.propTypes = {
  /** The title of the table shown above */
  title: PropTypes.string,
  /** The  className given to table container */
  className: PropTypes.string,
  /** The array of objects, each representing a row */
  list: PropTypes.array,
  /** How many pixels from left to right does the table take up */
  width: PropTypes.number,
  /** How many pixels from top to bottom does the table take up */
  height: PropTypes.number,
  /** How many pixels in height is the header row */
  headerHeight: PropTypes.number,
  headerRenderer: PropTypes.func,
  /** Highlights the row with data matching the passed in object */
  highlightRow: PropTypes.object,
  /** The row containing the dropdowns, inputs, and dateselectors for filtering */
  filterRow: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  /** The children of this table are usually the react-virtualized Column components  */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  /** Shows the selected values of the dropdown in a pillbox */
  filterPillbox: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  /** Which column (identified by key) is what the table is originally sorted by */
  defaultSortBy: PropTypes.string,
  /** Is the table originally sorted ascending (asc) or descending (desc) */
  defaultSortDirection: PropTypes.string,
  /** Provides an input field that filters the list of objects based on the value
   *  of the given property
   **/
  filterKey: PropTypes.string,
  /** The placeholder text if the input field is present  */
  filterTitle: PropTypes.string,
  /** css className given to the inner grid container */
  cellClassName: PropTypes.string,
  /** the height in pixels of each row, defaults to 40 if none given */
  rowHeight: PropTypes.number,
  /** A function that is given the entire list as an argument. Shows a button
   *  with the label ".csv" that triggers the function when clicked
   */
  csvDownload: PropTypes.func,
  /** The function called when a row is clicked. Given the row object as an argument */
  onRowClick: PropTypes.func,
  /** An object with properties corresponding to a column dataKey with the value being
   *  a custom sorter to be used to sort the list by that column
   */
  customSort: PropTypes.object,
  /**
   * A string that gives all row containers the className or a function that takes in
   * the row object and determines the row container className
   */
  rowClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /** a react-virtualized CellMeasurerCache that allows for customizable row heights
   *  depending on the contained data
   */
  deferredMeasurementCache: PropTypes.object,
};

export default CustomTable;
