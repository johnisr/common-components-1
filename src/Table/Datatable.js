import React, { Component } from "react";
import * as PropTypes from "prop-types";
import { InputIsMatched, SortListByType } from "./DatatableHelper";
import DatatableGrid from "./DatatableGrid";
import intersectionBy from "lodash/intersectionBy";
import { AutoSizer } from "react-virtualized";
import findIndex from "lodash/findIndex";
import unionBy from "lodash/unionBy";
import differenceBy from "lodash/differenceBy";
import "./CustomTable.css";

const DEFAULT_ROW_HEIGHT = 40;

const getSortedList = (headers, list, sortBy, sortDirection) => {
  const sortByColumn = sortBy
    ? headers.find((header) => header.key === sortBy)
    : null;

  if (sortByColumn && sortByColumn.sort) {
    return sortDirection === "asc"
      ? sortByColumn.sort(list, sortBy)
      : sortByColumn.sort(list, sortBy).reverse();
  } else if (sortBy) {
    return SortListByType(list, sortBy, sortDirection);
  } else {
    return list;
  }
};

class Datatable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateTable: false,
      filterValue: "",
      checkedList: [],
      selectedHeaders: [],
      sortBy: props.defaultSortBy || "",
      sortDirection: props.defaultSortDirection || "asc",
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
    this.setSortBy = this.setSortBy.bind(this);
    this.setSortDirection = this.setSortDirection.bind(this);
    this.updateHeaders = this.updateHeaders.bind(this);
    this.onCheckboxClicked = this.onCheckboxClicked.bind(this);
  }

  componentDidMount() {
    this.setState({
      selectedHeaders: this.props.headers,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.headers !== prevProps.headers) {
      this.updateHeaders(this.props.headers, this.state.selectedHeaders);
    }
  }

  handleSearch(event) {
    let value = event.target.value;
    this.setState({
      filterValue: value,
    });
  }

  getFilterList(list, filterBy, value) {
    return list.filter((row) => InputIsMatched(value, row[filterBy]));
  }

  csvDownload(list) {
    this.props.csvDownload(list);
  }

  onSelect(selectedHeaders) {
    this.updateHeaders(this.props.headers, selectedHeaders);
  }

  onCheckboxClicked(rowData) {
    const newCheckedList = [...this.state.checkedList];
    const checkedListIndex = findIndex(newCheckedList, {
      id: rowData.id,
    });

    if (checkedListIndex !== -1) {
      newCheckedList.splice(checkedListIndex, 1);
    } else {
      newCheckedList.push(rowData);
    }

    // Return all the checked list to the parent
    this.props.onCheckboxClick(newCheckedList);

    this.setState({
      checkedList: newCheckedList,
    });
  }

  onCheckAllClick(filteredList, checkAllState) {
    let newCheckedList = [];
    const nextCheckedAllState = !checkAllState;

    if (nextCheckedAllState) {
      newCheckedList = unionBy(this.state.checkedList, filteredList, "id");
    } else {
      newCheckedList = differenceBy(this.state.checkedList, filteredList, "id");
    }

    // Return all the checked list to the parent
    this.props.onCheckboxClick(newCheckedList);

    this.setState({
      checkedList: newCheckedList,
    });
  }

  updateHeaders(headers, selectedHeader) {
    if (this.props.customizableColumns) {
      this.setState({
        selectedHeaders: intersectionBy(headers, selectedHeader, "key"),
      });
    } else {
      this.setState({ selectedHeaders: headers });
    }
  }

  setSortDirection(sortDirection) {
    this.setState({ sortDirection });
  }

  setSortBy(sortBy) {
    this.setState({ sortBy });
  }

  onAddClick() {
    this.props.onAddClick();
  }

  getErrorMessage(isLoading, headers) {
    if (headers.length === 0) {
      return "No data is available.";
    }

    if (isLoading) {
      return "Loading...";
    }

    return null;
  }

  render() {
    const {
      title,
      width,
      filterKey,
      filterPillbox,
      list,
      collapseBorder,
      isLoading,
      rowHeight,
      customSearch,
      noFilterListCount,
      height,
    } = this.props;

    const {
      updateTable,
      filterValue,
      selectedHeaders,
      sortBy,
      sortDirection,
      isPaginationEnabled,
    } = this.state;

    let filteredList = [];
    if (isPaginationEnabled) {
      filteredList = list;
    } else if (customSearch) {
      filteredList = customSearch(list, filterValue);
    } else {
      filteredList = this.getFilterList(list, filterKey, filterValue);
    }

    const sortedFilteredList = getSortedList(
      selectedHeaders,
      filteredList,
      sortBy,
      sortDirection
    );

    const errorMessage = this.getErrorMessage(isLoading, selectedHeaders);

    let filterPillBoxWithCount = null;
    if (filterPillbox) {
      filterPillBoxWithCount = noFilterListCount
        ? React.cloneElement(filterPillbox, {
            filteredListCount: sortedFilteredList.length,
            noFilterListCount,
          })
        : filterPillbox;
    }

    return (
      <div
        className="customTable"
        style={{
          width: width,
          display: "flex",
          flexDirection: "column",
          height,
        }}
      >
        <div className="customTable__titleContainer">
          {title ? <div className="customTable__title">{title}</div> : null}
        </div>

        {filterPillBoxWithCount}

        {errorMessage ? (
          <div className="noDataRow">{errorMessage}</div>
        ) : (
          <div style={{ marginTop: "10px", flex: "1 1 auto" }}>
            <AutoSizer disableWidth>
              {({ height }) => (
                <DatatableGrid
                  headers={selectedHeaders}
                  list={sortedFilteredList}
                  height={height}
                  width={width}
                  rowHeight={rowHeight || DEFAULT_ROW_HEIGHT}
                  sortBy={sortBy}
                  sortDirection={sortDirection}
                  setSortBy={this.setSortBy}
                  setSortDirection={this.setSortDirection}
                  updateTable={updateTable}
                  highlightRow={this.props.highlightRow}
                  onCellClick={this.props.onCellClick}
                  getRowClassName={this.props.getRowClassName}
                  collapseBorder={collapseBorder}
                  ref={this.props.forwardedRef}
                  highlightSelected={this.props.highlightSelected}
                />
              )}
            </AutoSizer>
          </div>
        )}
      </div>
    );
  }
}

Datatable.propTypes = {
  title: PropTypes.string,
  headers: PropTypes.array.isRequired,
  list: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  filterRow: PropTypes.oneOfType([
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
  csvDownload: PropTypes.func,
  highlightRow: PropTypes.bool,
  addButtonName: PropTypes.string,
  onCellClick: PropTypes.func,
  onAddClick: PropTypes.func,
  onCheckboxClick: PropTypes.func,
  customizableColumns: PropTypes.bool,
  collapseBorder: PropTypes.bool,
  isLoading: PropTypes.bool,
  rowHeight: PropTypes.number,
  customSearch: PropTypes.func,
  forwardedRef: PropTypes.object,
  noFilterListCount: PropTypes.number,
  highlightSelected: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  getRowClassName: PropTypes.func,
  gaAction: PropTypes.string,
  paginationDetail: PropTypes.object,
};

export default Datatable;
