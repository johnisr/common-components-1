import React, { useEffect, useState } from "react";
import * as PropTypes from "prop-types";
import "./CustomTable.css";
import DatatableGrid from "./DatatableGrid";
import { AutoSizer } from "react-virtualized";
import findIndex from "lodash/findIndex";
import unionBy from "lodash/unionBy";
import differenceBy from "lodash/differenceBy";
import {
  getFilteredList,
  getErrorMessage,
  getSortedList,
  isAllRowChecked,
} from "./DatatableHelper";

const DEFAULT_ROW_HEIGHT = 40;

const Datatable = (props) => {
  const [filterValue, setFilterValue] = useState("");
  const [checkedList, setCheckedList] = useState([]);
  const [selectedHeaders, setSelectedHeaders] = useState(props.headers || []);
  const [sortBy, setSortBy] = useState(props.defaultSortBy || "");
  const [sortDirection, setSortDirection] = useState(
    props.defaultSortDirection || "asc"
  );

  useEffect(() => {
    if (props.headers) {
      updateHeaders(props.headers, selectedHeaders);
    }
  }, [props.headers]);

  useEffect(() => {
    if (props.checkedList) {
      setCheckedList(props.checkedList);
    }
  }, [props.checkedList]);

  const handleSearch = (event) => {
    const value = event.target.value;

    setFilterValue(value);
  };

  const onCheckboxClicked = (rowData, isChecked, checkedListIndex) => {
    const newCheckedList = [...checkedList];

    if (isChecked) {
      newCheckedList.splice(checkedListIndex, 1);
    } else {
      newCheckedList.push(rowData);
    }

    if (props.checkedList) {
      props.onCheckboxClick(newCheckedList, rowData);
    } else {
      props.onCheckboxClick(newCheckedList);

      setCheckedList(newCheckedList);
    }
  };

  const onCheckAllClick = (filteredList, checkAllState) => {
    let newCheckedList = [];
    const nextCheckedAllState = !checkAllState;

    if (nextCheckedAllState) {
      newCheckedList = unionBy(checkedList, filteredList, "id");
    } else {
      newCheckedList = differenceBy(checkedList, filteredList, "id");
    }

    // Return all the checked list to the parent
    props.onCheckboxClick(newCheckedList);

    // set checked list if not controlled by parent
    if (!props.checkedList) {
      setCheckedList(newCheckedList);
    }
  };

  const updateHeaders = (headers) => {
    setSelectedHeaders(headers);
  };

  const handleSetSortBy = (sortDirection) => {
    setSortBy(sortDirection);
  };

  const handleSetSortDirection = (sortBy) => {
    setSortDirection(sortBy);
  };

  const checkboxRenderer = (rowData) => {
    const checkedListIndex = findIndex(checkedList, { id: rowData.id });
    const isChecked = checkedListIndex !== -1;

    return (
      <div className="datatable__checkboxCell">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() =>
            onCheckboxClicked(rowData, isChecked, checkedListIndex)
          }
          disabled={props.disableCheckbox}
        />
      </div>
    );
  };

  const filteredList = getFilteredList(
    props.list,
    props.filterKey,
    filterValue,
    props.customSearch
  );

  const sortedFilteredList = getSortedList(
    selectedHeaders,
    filteredList,
    sortBy,
    sortDirection
  );

  const errorMessage = getErrorMessage(props.isLoading, selectedHeaders);

  const checkAllState = isAllRowChecked(sortedFilteredList, checkedList);

  const checkboxColumn = {
    label: !props.disableSelectAll ? (
      <input
        type="checkbox"
        checked={checkAllState}
        onChange={() => onCheckAllClick(sortedFilteredList, checkAllState)}
        disabled={props.disableCheckbox}
      />
    ) : null,
    key: "checkbox",
    width: 35,
    cellRenderer: checkboxRenderer,
    fixed: true,
  };

  let filterPillBoxWithCount = null;
  if (props.filterPillbox) {
    filterPillBoxWithCount = props.noFilterListCount
      ? React.cloneElement(props.filterPillbox, {
          filteredListCount: sortedFilteredList.length,
          noFilterListCount: props.noFilterListCount,
        })
      : props.filterPillbox;
  }

  return (
    <div
      className="customTable"
      style={{
        width: props.width,
        display: "flex",
        flexDirection: "column",
        height: props.height,
      }}
    >
      <div className="customTable__titleContainer">
        {props.title ? (
          <div className="customTable__title">{props.title}</div>
        ) : null}

        <div className="customTable__buttonRow">
          {props.actionRow ? (
            <div className="customTable__actionRow">{props.actionRow}</div>
          ) : null}
        </div>
      </div>

      <div className="datatable__actionContainer">
        <div className="datatable__filterRow">
          {(props.filterKey || props.customSearch) && (
            <input
              className="inputbox-compress"
              placeholder={` ${
                props.filterTitle ? props.filterTitle : "Search"
              }`}
              onChange={handleSearch}
            />
          )}

          {props.filterRow}
        </div>
      </div>

      {filterPillBoxWithCount}

      {errorMessage ? (
        <div className="noDataRow">{errorMessage}</div>
      ) : (
        <div style={{ marginTop: "10px", flex: "1 1 auto" }}>
          <AutoSizer disableWidth>
            {({ height }) => (
              <DatatableGrid
                headers={
                  props.onCheckboxClick
                    ? [checkboxColumn, ...selectedHeaders]
                    : selectedHeaders
                }
                list={sortedFilteredList}
                height={height}
                width={props.width}
                rowHeight={props.rowHeight || DEFAULT_ROW_HEIGHT}
                sortBy={sortBy}
                sortDirection={sortDirection}
                setSortBy={handleSetSortBy}
                setSortDirection={handleSetSortDirection}
                highlightRow={props.highlightRow}
                onCellClick={props.onCellClick}
                getRowClassName={props.getRowClassName}
                collapseBorder={props.collapseBorder}
                ref={props.forwardedRef}
                highlightSelected={props.highlightSelected}
              />
            )}
          </AutoSizer>
        </div>
      )}
    </div>
  );
};

Datatable.propTypes = {
  /** The title of the table shown above */
  title: PropTypes.string,
  /** The array of objects depicting the properties of each column. The properties
   *  label (header title), key (object property name), and width are required for
   *  every column. The cellRenderer property can be provided for custom rendering.
   *  the fixed boolean indicates whether or not it stays visible while scrolling
   *  right. sort property is given a function to sort more complex properties, and
   *  rightAlign boolean is to change it from the default left align
   **/
  headers: PropTypes.array.isRequired,
  /** The array of objects, each representing a row */
  list: PropTypes.array.isRequired,
  /** How many pixels from left to right does the table take up */
  width: PropTypes.number.isRequired,
  /** How many pixels from top to bottom does the table take up */
  height: PropTypes.number.isRequired,
  /** The row containing the dropdowns, inputs, and dateselectors for filtering */
  filterRow: PropTypes.oneOfType([
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
  /** Highlights a given row on hover */
  highlightRow: PropTypes.bool,
  /** The function executed when any cell is clicked, with the row data as the
   * argument
   **/
  onCellClick: PropTypes.func,
  /** Provides a checkbox for each row, and each click runs the given method
   *  with the row data as the argument
   **/
  onCheckboxClick: PropTypes.func,
  /** Allows the parent to control the check list state by passing in the
   *  array of objects they want checked
   **/
  checkedList: PropTypes.array,
  /** Removes the internal divider between rows */
  collapseBorder: PropTypes.bool,
  /** Displays a loading indicator while true */
  isLoading: PropTypes.bool,
  /** The height of every row */
  rowHeight: PropTypes.number,
  /** If the property being searched for by the input field is more complicated that 1 level,
   *  provide a function that takes in the list and column key and returns the filtered list
   */
  customSearch: PropTypes.func,
  forwardedRef: PropTypes.object,
  /** Given the unfiltered list length, augments the filterPillbox to show how many rows are left
   *  compared to the original length
   */
  noFilterListCount: PropTypes.number,
  /** To enable constant highlight of a row instead of just during mouse hover. Takes in an object
   *  which is matched to the list, or a function to help compare
   */
  highlightSelected: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  /** Applies the rowClassName to the whole row instead of just a cell */
  getRowClassName: PropTypes.func,
  /** Where to place buttons and other interactable components */
  actionRow: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  /** Removes the check all checkbox */
  disableSelectAll: PropTypes.bool,
  /** Disables every checkbox from being checked */
  disableCheckbox: PropTypes.bool,
};

export default Datatable;
