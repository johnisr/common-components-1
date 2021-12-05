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
import PaginationController from "./PaginationController/PaginationController";
import DatatableType, {
  DatatableHeaderType,
  DatatableSortDirection,
} from "../types/Table/Datatable";
import { PaginationDetailType } from "../types/Table/PaginationController";

const DEFAULT_ROW_HEIGHT = 40;

const Datatable = <T extends Record<string, any>>(props: DatatableType<T>) => {
  const [filterValue, setFilterValue] = useState<string>("");
  const [checkedList, setCheckedList] = useState<T[]>([]);
  const [selectedHeaders, setSelectedHeaders] = useState(props.headers || []);
  const [sortBy, setSortBy] = useState(props.defaultSortBy || "");
  const [sortDirection, setSortDirection] = useState(
    props.defaultSortDirection || "asc"
  );

  const isPaginationEnabled =
    !!props.paginationDetail && !!props.onPaginationChange;

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

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setFilterValue(value);

    // ToDo: If Pagination API starts to include text search
    // onPaginationChange();
  };

  const onSelect = (selectedHeaders: DatatableHeaderType<T>[]) => {
    updateHeaders(props.headers, selectedHeaders);
  };

  const onCheckboxClicked = (
    rowData: T,
    isChecked: boolean,
    checkedListIndex: number
  ) => {
    if (!props.onCheckboxClick) return;

    const newCheckedList: T[] = [...checkedList];

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

  const onCheckAllClick = (filteredList: T[], checkAllState: boolean) => {
    let newCheckedList = [];
    const nextCheckedAllState = !checkAllState;

    if (nextCheckedAllState) {
      newCheckedList = unionBy(checkedList, filteredList, "id");
    } else {
      newCheckedList = differenceBy(checkedList, filteredList, "id");
    }

    // Return all the checked list to the parent
    props.onCheckboxClick?.(newCheckedList);

    // set checked list if not controlled by parent
    if (!props.checkedList) {
      setCheckedList(newCheckedList);
    }
  };

  const updateHeaders = (
    headers: DatatableHeaderType<T>[],
    selectedHeader: DatatableHeaderType<T>[]
  ) => {
    if (props.customizableColumns) {
      setSelectedHeaders(intersectionBy(headers, selectedHeader, "key"));
    } else {
      setSelectedHeaders(headers);
    }
  };

  const handleSetSortBy = (sortBy: string) => {
    setSortBy(sortBy);
    setSortDirection("desc");

    if (props.paginationDetail) {
      onPaginationChange({
        ...props.paginationDetail,
        sort: { [sortBy]: "desc" },
      });
    }
  };

  const handleSetSortDirection = (
    sortDirection: typeof DatatableSortDirection[number]
  ) => {
    setSortDirection(sortDirection);

    if (props.paginationDetail) {
      onPaginationChange({
        ...props.paginationDetail,
        sort: { [sortBy]: sortDirection },
      });
    }
  };

  const onPaginationChange = (paginationDetail: PaginationDetailType) => {
    if (props.onPaginationChange) {
      props.onPaginationChange({
        ...paginationDetail,
        filter: {
          [props.filterKey as string]: filterValue,
        },
      });
    }
  };

  const checkboxRenderer = (rowData: T) => {
    const checkedListIndex = checkedList.findIndex(
      (listItem) => listItem.id === rowData.id
    );
    const isChecked = checkedListIndex !== -1;

    const isDisabled =
      props.getCheckboxDisabledState?.(rowData) ?? props.disableCheckbox;

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
    props.list,
    filterValue,
    props.filterKey,
    props.customSearch,
    isPaginationEnabled
  );

  const sortedFilteredList = getSortedList(
    selectedHeaders,
    filteredList,
    sortBy,
    sortDirection,
    isPaginationEnabled
  );

  const errorMessage = getErrorMessage(selectedHeaders, props.isLoading);

  const checkAllState = isAllRowChecked(
    sortedFilteredList,
    checkedList,
    props.getCheckboxDisabledState
  );

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
          <Title className="customTable__title">{props.title}</Title>
        ) : null}

        <div className="datatable__buttonRow">
          {props.onAddClick ? (
            <Button variant="primary" onClick={props.onAddClick}>
              add {`${props.addButtonName || props.title}`}
            </Button>
          ) : null}

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

        <div className="datatable__actionRow">
          {props.customizableColumns && (
            <MultiDropdownInputWithSearch
              label="columns"
              value={selectedHeaders}
              options={props.headers}
              labelKey="label"
              onChange={onSelect}
            />
          )}

          {props.csvDownload && (
            <Button
              className="csvDownloadButton"
              onClick={() => props.csvDownload?.(filteredList)}
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
                {props.showOverlayLoader && <OverlayLoader text="Loading..." />}

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
                  innerRef={props.forwardedRef}
                  highlightSelected={props.highlightSelected}
                  headerHeight={props.headerHeight}
                  actionDropdown={props.actionDropdown}
                />
              </>
            )}
          </AutoSizer>
        </div>
      )}

      {props.paginationDetail && (
        <div className="datatable__footer">
          <PaginationController
            paginationDetail={props.paginationDetail}
            onPaginationChange={onPaginationChange}
            disabled={props.showOverlayLoader || props.isLoading}
          />
        </div>
      )}
    </div>
  );
};

export default Datatable;
