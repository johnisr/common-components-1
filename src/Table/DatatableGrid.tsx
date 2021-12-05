import React, { useState, useRef, useEffect, useMemo } from "react";
import { ScrollSync, Grid, AutoSizer, GridCellProps } from "react-virtualized";
import "./Datatable.scss";
import FontAwesome from "react-fontawesome";
import filter from "lodash/filter";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import DatatablePopover from "./DatatablePopover/DatatablePopover";
import { Popover } from "react-tiny-popover";
import DatatableGridType, {
  getColumnWidthProps,
} from "../types/Table/DatatableGrid";
import {
  actionDropdownType,
  DatatableHeaderType,
} from "../types/Table/Datatable";

const DEFAULT_HEADER_ROW_HEIGHT = 40;

// IE and Edge have 17 width scrollbars while the rest have 15. Use the higher
// of the two (and have slightly smaller tables) but have consistent styling
const SCROLL_BAR_SIZE = 17;

// The above will cause problems for right justified columns. Placing them at
// `right: 0` will leave 2 pixels that will show what's underneath. Instead
// place at `right: -2` to not have any gap (tradeoff of slightly covering the
// larger IE and edge scrollbars)
const SCROLL_BAR_BORDER = 2;

const ACTION_COLUMN_WIDTH = 30;

const ACTION_COLUMN_HEADER = {
  label: "",
  width: ACTION_COLUMN_WIDTH,
  key: "action_column_header",
  cellRenderer: () => "",
};

const HIGHLIGHT_COLOR = "rgba(69, 192, 193, 0.2)";

function getNumFixedColumn<T>(headers: DatatableHeaderType<T>[]) {
  return filter(headers, "fixed").length;
}

const DatatableGrid = <T,>(props: DatatableGridType<T>) => {
  const {
    height,
    width,
    headers: defaultHeaders,
    list,
    collapseBorder,
    sortBy,
    sortDirection,
    rowHeight,
    highlightSelected,
    actionDropdown,
    innerRef,
  } = props;

  const headers = useMemo(() => {
    return actionDropdown
      ? [...defaultHeaders, ACTION_COLUMN_HEADER as DatatableHeaderType<T>]
      : defaultHeaders;
  }, [defaultHeaders]);

  const [tableResized, setTableResized] = useState(new Date());

  const visibleHorizontalScrollbar = useMemo(() => {
    const totalColumnWidth = headers.reduce(
      (totalWidth, value) => totalWidth + value.width,
      0
    );

    return width - totalColumnWidth - SCROLL_BAR_SIZE < 0;
  }, [width, headers, tableResized]);

  const headerHeight = props.headerHeight ?? DEFAULT_HEADER_ROW_HEIGHT;
  const tableHeight = visibleHorizontalScrollbar
    ? height - headerHeight - SCROLL_BAR_SIZE
    : height - headerHeight;

  const visibleVerticalScrollbar = useMemo(() => {
    return tableHeight < list.length * rowHeight;
  }, [tableHeight, list, rowHeight, tableResized]);

  const numFixedColumn = getNumFixedColumn(headers);

  const [hoverRowIndex, setHoverRowIndex] = useState<number | null>(null);
  const [forceScroll, setForceScroll] = useState(false);

  const [openActionDropdownIndex, setOpenActionDropdownIndex] = useState<
    number | null
  >(null);

  const bodyRef = useRef<Grid>(null);

  const columnCount = headers.length;
  const rowCount = list.length;

  const rowBorder = collapseBorder ? undefined : "1px solid #ddd";

  const highlightIndex = useMemo(() => {
    let index = -1;
    if (highlightSelected) {
      if (typeof highlightSelected === "object") {
        index = !isEmpty(highlightSelected)
          ? list.findIndex((item) => item === highlightSelected)
          : -1;
      } else if (typeof highlightSelected === "function") {
        index = highlightSelected(list);
      }
    }
    return index;
  }, [highlightSelected, list]);

  useEffect(() => {
    setForceScroll(true);
  }, [highlightIndex]);

  const onCellClick = (rowValue: T) => {
    props.onCellClick?.(rowValue);
  };

  const onMouseEnter = (rowIndex: number, columnIndex: number) => {
    setHoverRowIndex(rowIndex);
  };

  const headerRenderer = ({ columnIndex, key, style }: GridCellProps) => {
    const column = headers[columnIndex];

    style = {
      ...style,
      justifyContent: column.rightAlign ? "flex-end" : undefined,
      width: `${column.width}px`,
    };

    const contentStyle = {
      textAlign: column.rightAlign ? ("right" as const) : undefined,
    };

    const headerClassName = [
      "datatable__headerCell",
      column.disableSort ? "" : "clickable",
      "clipText",
      "datatable__rightPadding",
    ].join(" ");

    if (column.key === "checkbox") {
      return (
        <div key={key} style={style}>
          {column.label}
        </div>
      );
    } else {
      return (
        <div
          className={headerClassName}
          key={key}
          style={style}
          onClick={() => {
            column.disableSort ? null : setSortingOrder(column.key);
          }}
        >
          <div
            className={`${
              column.wrap ? "datatable__wrapHeader" : "clipText"
            } datatable__headerContent`}
            style={contentStyle}
          >
            {column.label}
          </div>

          {!column.disableSort && sortBy === column.key ? (
            <FontAwesome
              className="datatable__sortIcon"
              name={sortDirection === "asc" ? "sort-asc" : "sort-desc"}
            />
          ) : null}
        </div>
      );
    }
  };

  const rowRenderer = ({
    columnIndex,
    key,
    rowIndex,
    style,
  }: GridCellProps) => {
    const columnKey = headers[columnIndex].key;
    const rowValue = list[rowIndex];

    style = {
      ...style,
      borderBottom: rowBorder,
      paddingTop: "8px",
      textAlign: headers[columnIndex].rightAlign ? "right" : undefined,
    };

    // Set highlight color
    if (rowIndex === hoverRowIndex || rowIndex === highlightIndex) {
      style.background = HIGHLIGHT_COLOR;
    }

    // Set cursor style to be pointer if the cell is actionable
    if (props.onCellClick) {
      style.cursor = "pointer";
    }

    const columnClassName = `${headers[columnIndex]?.className ?? ""}`;

    const cellClassName = [
      "datatable__row",
      "clipText",
      "datatable__rightPadding",
      `${props?.getRowClassName?.(rowValue) ?? ""}`,
      columnClassName,
    ].join(" ");

    const cellRenderer = headers[columnIndex]?.cellRenderer;

    return (
      <div
        className={cellClassName}
        key={key}
        style={style}
        onClick={() => (props.onCellClick ? onCellClick(rowValue) : null)}
        onMouseEnter={() =>
          props.highlightRow ? onMouseEnter(rowIndex, columnIndex) : null
        }
        onMouseLeave={() =>
          props.highlightRow ? setHoverRowIndex(null) : null
        }
      >
        <div
          className={`clipText datatable__rightPadding ${columnClassName}`}
          style={{ width: `${headers[columnIndex].width}px` }}
        >
          {cellRenderer
            ? cellRenderer(rowValue, columnKey)
            : get(rowValue, columnKey) ?? "-"}
        </div>
      </div>
    );
  };

  const noContentRenderer = () => {
    return <div className="datatable__errorMessage">No data available</div>;
  };

  const actionDropdownRenderer = ({
    key,
    rowIndex,
    columnIndex,
    style,
    isVisible,
  }: GridCellProps) => {
    style = {
      ...style,
      borderBottom: rowBorder,
    };

    const rowData = list[rowIndex];
    const availableActions =
      actionDropdown?.filter((action) => !action.disabled?.(list[rowIndex])) ??
      [];

    // Set highlight color
    if (rowIndex === hoverRowIndex || rowIndex === highlightIndex) {
      style.background = HIGHLIGHT_COLOR;
    }

    const actionDropdownPopover = (
      <DatatablePopover
        rowData={rowData}
        availableActions={availableActions as actionDropdownType<unknown>[]}
        closePopover={() => setOpenActionDropdownIndex(null)}
      />
    );

    return (
      <div key={key} style={style}>
        {availableActions.length ? (
          <Popover
            isOpen={openActionDropdownIndex === rowIndex && isVisible}
            positions={["bottom"]}
            align="end"
            containerClassName="datatablePopover__container"
            content={actionDropdownPopover}
          >
            <div
              className="datatablePopover__cell"
              onClick={() =>
                setOpenActionDropdownIndex((openActionDropdownIndex) => {
                  return openActionDropdownIndex !== rowIndex ? rowIndex : null;
                })
              }
              onMouseEnter={() =>
                props.highlightRow ? onMouseEnter(rowIndex, columnIndex) : null
              }
              onMouseLeave={() =>
                props.highlightRow ? setHoverRowIndex(null) : null
              }
            >
              <FontAwesome
                name="ellipsis-h"
                className="datatablePopover__cell__icon"
              />
            </div>
          </Popover>
        ) : null}
      </div>
    );
  };

  const setSortingOrder = (columnKey: string) => {
    if (columnKey !== sortBy) {
      props.setSortBy(columnKey);
    } else {
      const nextSortDirection = sortDirection === "asc" ? "desc" : "asc";
      props.setSortDirection(nextSortDirection);
    }
  };

  const getColumnWidth = ({ index }: getColumnWidthProps) => {
    const isLastColumn = index === headers.length - 1;
    const remainderWidth = getRemainderWidth();

    if (isLastColumn && remainderWidth > 0) {
      return headers[index].width + remainderWidth;
    }

    return headers[index] ? headers[index].width : 0;
  };

  const getLeftGridColumnWidth = () => {
    const firstColumnIndex = 0;

    let columnWidth = headers[firstColumnIndex].width;

    if (numFixedColumn > 1) {
      for (let index = 1; index < numFixedColumn; index++) {
        columnWidth = columnWidth + headers[index].width;
      }
    }

    return columnWidth;
  };

  function getRemainderWidth() {
    const totalColumnWidth = headers.reduce(
      (totalWidth, value) => totalWidth + value.width,
      0
    );

    return visibleVerticalScrollbar
      ? width - totalColumnWidth - SCROLL_BAR_SIZE
      : width - totalColumnWidth;
  }

  function recomputeColumnWidth() {
    if (bodyRef && bodyRef.current) {
      bodyRef.current.recomputeGridSize();
      setTableResized(new Date());
    }
  }

  return (
    <ScrollSync>
      {({ onScroll, scrollLeft, scrollTop, scrollHeight }) => {
        if (headers) {
          const leftGridWidth = getLeftGridColumnWidth();

          if (highlightIndex !== -1 && forceScroll) {
            const selectedTop = highlightIndex * rowHeight;

            // scrollTop (current scroll position, top of grid "viewport")
            // tableHeight (the height of the grid)
            const isCurrentlyVisible =
              selectedTop >= scrollTop && selectedTop < scrollTop + tableHeight;

            if (!isCurrentlyVisible) {
              // scrollHeight (the height of whole list)
              const maxScroll =
                scrollHeight > tableHeight
                  ? scrollHeight - tableHeight
                  : tableHeight;

              // prevents overscrolling if selectedTop is at bottom of list
              scrollTop = Math.min(selectedTop, maxScroll);
            }
            setForceScroll(false);
          }

          return (
            <div className="datatable" ref={innerRef}>
              {headers && (
                <>
                  {numFixedColumn > 0 && (
                    <>
                      <div
                        className={`datatable__leftSideGridContainer ${
                          scrollLeft ? "datatable__overlayShadow" : ""
                        }`}
                        style={{
                          left: 0,
                          top: 0,
                        }}
                      >
                        <Grid
                          className="datatable__headerGrid"
                          width={leftGridWidth}
                          height={headerHeight}
                          cellRenderer={headerRenderer}
                          rowHeight={headerHeight}
                          columnWidth={getColumnWidth}
                          rowCount={1}
                          columnCount={numFixedColumn}
                          estimatedColumnSize={75}
                        />
                      </div>
                      <div
                        className={`datatable__leftSideGridContainer ${
                          scrollLeft ? "datatable__overlayShadow" : ""
                        }`}
                        style={{
                          left: 0,
                          top: headerHeight,
                        }}
                      >
                        <Grid
                          className="datatable__sideBodyGrid"
                          width={leftGridWidth}
                          height={
                            visibleHorizontalScrollbar
                              ? tableHeight - SCROLL_BAR_SIZE
                              : tableHeight
                          }
                          cellRenderer={rowRenderer}
                          rowHeight={rowHeight}
                          columnWidth={getColumnWidth}
                          rowCount={rowCount}
                          columnCount={numFixedColumn}
                          scrollTop={scrollTop}
                          sortBy={sortBy}
                          sortDirection={sortDirection}
                        />
                      </div>
                    </>
                  )}

                  <div
                    className="datatable__gridColumn"
                    style={{ width: width }}
                  >
                    <AutoSizer onResize={recomputeColumnWidth} disableHeight>
                      {({ width }) => (
                        <div>
                          <div
                            style={{
                              height: headerHeight,
                              width: visibleVerticalScrollbar
                                ? width - SCROLL_BAR_SIZE
                                : width,
                            }}
                          >
                            <Grid
                              className="datatable__headerGrid"
                              width={width - SCROLL_BAR_SIZE}
                              height={headerHeight}
                              cellRenderer={headerRenderer}
                              rowHeight={headerHeight}
                              columnWidth={getColumnWidth}
                              rowCount={1}
                              columnCount={columnCount}
                              scrollLeft={scrollLeft}
                            />
                          </div>
                          <div>
                            <Grid
                              className="datatable__bodyGrid"
                              width={width}
                              height={tableHeight}
                              cellRenderer={rowRenderer}
                              rowHeight={rowHeight}
                              columnWidth={getColumnWidth}
                              rowCount={rowCount}
                              columnCount={columnCount}
                              onScroll={onScroll}
                              sortBy={sortBy}
                              sortDirection={sortDirection}
                              noContentRenderer={noContentRenderer}
                              ref={bodyRef}
                              scrollTop={scrollTop}
                            />
                          </div>
                        </div>
                      )}
                    </AutoSizer>
                  </div>

                  {actionDropdown && (
                    <>
                      <div
                        className="datatable__rightSideGridContainer datatable__rightSideGridContainer__header"
                        style={{
                          right: visibleVerticalScrollbar
                            ? SCROLL_BAR_SIZE - SCROLL_BAR_BORDER
                            : -SCROLL_BAR_BORDER,
                          top: 0,
                          backgroundColor: "#fff",
                          height: headerHeight,
                          width: ACTION_COLUMN_WIDTH,
                        }}
                      />

                      <div
                        className="datatable__rightSideGridContainer"
                        style={{
                          right: visibleVerticalScrollbar
                            ? SCROLL_BAR_SIZE - SCROLL_BAR_BORDER
                            : -SCROLL_BAR_BORDER,
                          top: headerHeight,
                        }}
                      >
                        <Grid
                          className="datatable__sideBodyGrid"
                          width={ACTION_COLUMN_WIDTH}
                          height={
                            visibleHorizontalScrollbar
                              ? tableHeight - SCROLL_BAR_SIZE
                              : tableHeight
                          }
                          cellRenderer={actionDropdownRenderer}
                          rowHeight={rowHeight}
                          columnWidth={ACTION_COLUMN_WIDTH}
                          rowCount={rowCount}
                          columnCount={1}
                          scrollTop={scrollTop}
                        />
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          );
        } else {
          return <div>Loading...</div>;
        }
      }}
    </ScrollSync>
  );
};

export default DatatableGrid;
