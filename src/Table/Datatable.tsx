import React, { ChangeEvent, useEffect, useState } from "react";
import "./CustomTable.css";
import DatatableGrid from "./DatatableGrid";
import { AutoSizer } from "react-virtualized";
import unionBy from "lodash/unionBy";
import differenceBy from "lodash/differenceBy";
import intersectionBy from "lodash/intersectionBy";
import {
  getFilteredList,
  getErrorMessage,
  getSortedList,
  isAllRowChecked,
} from "./DatatableHelper";
import { Button, Title } from "..";
import OverlayLoader from "../OverlayLoader/OverlayLoader";
import MultiDropdownInputWithSearch from "../MultiDropdownInputWithSearch/MultiDropdownInputWithSearch";
import DatatableType, {
  DatatableHeaderType,
  DatatableSortDirection,
} from "../types/Table/Datatable";

const DEFAULT_ROW_HEIGHT = 40;

const Datatable = <T extends { id: string }>({
  headers,
  defaultSortBy,
  defaultSortDirection,
  checkedList,
  onCheckboxClick,
  customizableColumns,
  getCheckboxDisabledState,
  disableCheckbox,
  list,
  filterKey,
  customSearch,
  isLoading,
  disableSelectAll,
  filterPillbox,
  noFilterListCount,
  width,
  height,
  title,
  onAddClick,
  addButtonName,
  actionRow,
  filterTitle,
  filterRow,
  csvDownload,
  showOverlayLoader,
  rowHeight,
  highlightRow,
  onCellClick,
  getRowClassName,
  collapseBorder,
  forwardedRef,
  highlightSelected,
  headerHeight,
  actionDropdown,
}: DatatableType<T>) => {
  const [filterValue, setFilterValue] = useState<string>("");
  const [checkedValues, setCheckedValues] = useState<T[]>([]);
  const [selectedHeaders, setSelectedHeaders] = useState(headers || []);
  const [sortBy, setSortBy] = useState(defaultSortBy || "");
  const [sortDirection, setSortDirection] = useState(
    defaultSortDirection || "asc"
  );

  useEffect(() => {
    if (headers) {
      updateHeaders(headers, selectedHeaders);
    }
  }, [headers]);

  useEffect(() => {
    if (checkedList) {
      setCheckedValues(checkedList);
    }
  }, [checkedList]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setFilterValue(value);
  };

  const onSelect = (selectedHeaders: DatatableHeaderType<T>[]) => {
    updateHeaders(headers, selectedHeaders);
  };

  const onCheckboxClicked = (
    rowData: T,
    isChecked: boolean,
    checkedListIndex: number
  ) => {
    if (!onCheckboxClick) return;

    const newCheckedList: T[] = [...checkedValues];

    if (isChecked) {
      newCheckedList.splice(checkedListIndex, 1);
    } else {
      newCheckedList.push(rowData);
    }

    if (checkedList) {
      onCheckboxClick(newCheckedList, rowData);
    } else {
      onCheckboxClick(newCheckedList);

      setCheckedValues(newCheckedList);
    }
  };

  const onCheckAllClick = (filteredList: T[], checkAllState: boolean) => {
    let newCheckedList = [];
    const nextCheckedAllState = !checkAllState;

    if (nextCheckedAllState) {
      newCheckedList = unionBy(checkedValues, filteredList, "id");
    } else {
      newCheckedList = differenceBy(checkedValues, filteredList, "id");
    }

    // Return all the checked list to the parent
    onCheckboxClick?.(newCheckedList);

    // set checked list if not controlled by parent
    if (!checkedList) {
      setCheckedValues(newCheckedList);
    }
  };

  const updateHeaders = (
    headers: DatatableHeaderType<T>[],
    selectedHeader: DatatableHeaderType<T>[]
  ) => {
    if (customizableColumns) {
      setSelectedHeaders(intersectionBy(headers, selectedHeader, "key"));
    } else {
      setSelectedHeaders(headers);
    }
  };

  const handleSetSortBy = (sortBy: string) => {
    setSortBy(sortBy);
    setSortDirection("desc");
  };

  const handleSetSortDirection = (
    sortDirection: typeof DatatableSortDirection[number]
  ) => {
    setSortDirection(sortDirection);
  };

  const checkboxRenderer = (rowData: T) => {
    const checkedListIndex = checkedValues.findIndex(
      (listItem) => listItem.id === rowData.id
    );
    const isChecked = checkedListIndex !== -1;

    const isDisabled = getCheckboxDisabledState?.(rowData) ?? disableCheckbox;

    return (
      <div
        onClick={(e) => e.stopPropagation()}
        className="datatable__checkboxCell"
      >
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() =>
            onCheckboxClicked(rowData, isChecked, checkedListIndex)
          }
          disabled={isDisabled}
        />
      </div>
    );
  };

  const filteredList = getFilteredList(
    list,
    filterValue,
    filterKey,
    customSearch
  );

  const sortedFilteredList = getSortedList(
    selectedHeaders,
    filteredList,
    sortBy,
    sortDirection
  );

  const errorMessage = getErrorMessage(selectedHeaders, isLoading);

  const checkAllState = isAllRowChecked(
    sortedFilteredList,
    checkedValues,
    getCheckboxDisabledState
  );

  const checkboxColumn = {
    label: !disableSelectAll ? (
      <input
        type="checkbox"
        checked={checkAllState}
        onChange={() => onCheckAllClick(sortedFilteredList, checkAllState)}
        disabled={disableCheckbox}
      />
    ) : null,
    key: "checkbox",
    width: 35,
    cellRenderer: checkboxRenderer,
    fixed: true,
  };

  let filterPillBoxWithCount = null;
  if (filterPillbox) {
    filterPillBoxWithCount = noFilterListCount
      ? React.cloneElement(filterPillbox, {
          filteredListCount: sortedFilteredList.length,
          noFilterListCount: noFilterListCount,
        })
      : filterPillbox;
  }

  return (
    <div
      className="customTable"
      style={{
        width,
        display: "flex",
        flexDirection: "column",
        height,
      }}
    >
      <div className="customTable__titleContainer">
        {title ? <Title className="customTable__title">{title}</Title> : null}

        <div className="datatable__buttonRow">
          {onAddClick ? (
            <Button variant="primary" onClick={onAddClick}>
              add {`${addButtonName || title}`}
            </Button>
          ) : null}

          {actionRow ? (
            <div className="customTable__actionRow">{actionRow}</div>
          ) : null}
        </div>
      </div>

      <div className="datatable__actionContainer">
        <div className="datatable__filterRow">
          {(filterKey || customSearch) && (
            <input
              className="inputbox-compress"
              placeholder={` ${filterTitle ? filterTitle : "Search"}`}
              onChange={handleSearch}
            />
          )}

          {filterRow}
        </div>

        <div className="datatable__actionRow">
          {customizableColumns && (
            <MultiDropdownInputWithSearch
              label="columns"
              value={selectedHeaders}
              options={headers}
              labelKey="label"
              onChange={onSelect}
            />
          )}

          {csvDownload && (
            <Button
              className="csvDownloadButton"
              onClick={() => csvDownload?.(filteredList)}
              disabled={filteredList.length === 0}
              style={{ textTransform: "uppercase" }}
            >
              csv
            </Button>
          )}
        </div>
      </div>

      {filterPillBoxWithCount}

      {errorMessage ? (
        <div className="noDataRow">{errorMessage}</div>
      ) : (
        <div style={{ marginTop: "10px", flex: "1 1 auto" }}>
          <AutoSizer disableWidth>
            {({ height }) => (
              <>
                {showOverlayLoader && <OverlayLoader text="Loading..." />}

                <DatatableGrid
                  headers={
                    onCheckboxClick
                      ? [checkboxColumn, ...selectedHeaders]
                      : selectedHeaders
                  }
                  list={sortedFilteredList}
                  height={height}
                  width={width}
                  rowHeight={rowHeight || DEFAULT_ROW_HEIGHT}
                  sortBy={sortBy}
                  sortDirection={sortDirection}
                  setSortBy={handleSetSortBy}
                  setSortDirection={handleSetSortDirection}
                  highlightRow={highlightRow}
                  onCellClick={onCellClick}
                  getRowClassName={getRowClassName}
                  collapseBorder={collapseBorder}
                  innerRef={forwardedRef}
                  highlightSelected={highlightSelected}
                  headerHeight={headerHeight}
                  actionDropdown={actionDropdown}
                />
              </>
            )}
          </AutoSizer>
        </div>
      )}
    </div>
  );
};

export default Datatable;
