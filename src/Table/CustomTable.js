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
      addButtonName,
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
        {title || this.props.onAddClick ? (
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
  title: PropTypes.string,
  className: PropTypes.string,
  list: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  headerHeight: PropTypes.number,
  headerRenderer: PropTypes.func,
  highlightRow: PropTypes.object,
  filterRow: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  filterPillbox: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  defaultSortBy: PropTypes.string,
  defaultSortDirection: PropTypes.string,
  filterKey: PropTypes.string,
  filterTitle: PropTypes.string,
  cellClassName: PropTypes.string,
  rowHeight: PropTypes.number,
  addButtonName: PropTypes.string,
  csvDownload: PropTypes.func,
  onAddClick: PropTypes.func,
  onRowClick: PropTypes.func,
  customSort: PropTypes.object,
  rowClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  deferredMeasurementCache: PropTypes.object,
};

export default CustomTable;
