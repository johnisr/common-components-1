import React, { useState, useRef, useEffect, useMemo } from "react";
import * as PropTypes from "prop-types";
import { ScrollSync, Grid, AutoSizer } from "react-virtualized";
import "./Datatable.css";
import FontAwesome from "react-fontawesome";
import filter from "lodash/filter";
import isEmpty from "lodash/isEmpty";

const DEFAULT_HEADER_ROW_HEIGHT = 40;

const SCROLL_BAR_SIZE = 15;

const HIGHLIGHT_COLOR = "rgba(69, 192, 193, 0.2)";

function getNumFixedColumn(headers) {
  return filter(headers, "fixed").length;
}

const DatatableGrid = React.forwardRef((props, ref) => {
  const {
    height,
    width,
    headers,
    list,
    collapseBorder,
    sortBy,
    sortDirection,
    rowHeight,
    highlightSelected,
  } = props;

  const numFixedColumn = getNumFixedColumn(headers);
  const tableHeight = height - DEFAULT_HEADER_ROW_HEIGHT - SCROLL_BAR_SIZE;

  const [hoverRowIndex, setHoverRowIndex] = useState(null);
  const [forceScroll, setForceScroll] = useState(false);

  const bodyRef = useRef(null);

  const columnCount = headers.length;
  const rowCount = list.length;

  const rowBorder = collapseBorder ? null : "1px solid #ddd";

  const highlightIndex = useMemo(() => {
    let index = -1;
    if (highlightSelected) {
      if (typeof highlightSelected === "object") {
        index = !isEmpty(highlightSelected)
          ? list.findIndex((item) => item === highlightSelected)
          : -1;
      } else {
        index = highlightSelected(list);
      }
    }
    return index;
  }, [highlightSelected, list]);

  useEffect(() => {
    setForceScroll(true);
  }, [highlightIndex]);

  const onCellClick = (rowValue) => {
    props.onCellClick(rowValue);
    trackEvent(DATATABLE, CLICK_CELL, toLabel({ value: rowValue.name }));
  };

  const onMouseEnter = (rowValue) => {
    setHoverRowIndex(rowValue);
  };

  // eslint-disable-next-line react/prop-types
  const headerRenderer = ({ columnIndex, key, style }) => {
    const column = headers[columnIndex];

    style = {
      ...style,
      justifyContent: column.rightAlign ? "flex-end" : null,
      width: `${column.width}px`,
    };

    const contentStyle = {
      textAlign: column.rightAlign ? "right" : null,
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
            className="clipText datatable__headerContent"
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

  /* eslint-disable react/prop-types */
  const rowRenderer = ({ columnIndex, key, rowIndex, style }) => {
    let columnKey = headers[columnIndex].key;
    let rowValue = list[rowIndex];

    style = {
      ...style,
      borderBottom: rowBorder,
      paddingTop: "8px",
      textAlign: headers[columnIndex].rightAlign ? "right" : null,
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
          {headers[columnIndex].cellRenderer
            ? headers[columnIndex].cellRenderer(rowValue, columnKey)
            : rowValue[columnKey] ?? "-"}
        </div>
      </div>
    );
  };
  /* eslint-enable react/prop-types */

  const noContentRenderer = () => {
    return <div className="datatable__errorMessage">No data available</div>;
  };

  const setSortingOrder = (columnKey) => {
    if (columnKey !== sortBy) {
      props.setSortBy(columnKey);
      props.setSortDirection("desc");
      trackEvent(
        DATATABLE,
        SORT_BY,
        toLabel({ value: columnKey, sortDirection: "desc" })
      );
    } else {
      let nextSortDirection = sortDirection === "asc" ? "desc" : "asc";
      props.setSortDirection(nextSortDirection);
      trackEvent(
        DATATABLE,
        SORT_BY,
        toLabel({ value: columnKey, sortDirection: nextSortDirection })
      );
    }
  };

  const getColumnWidth = ({ index }) => {
    const isLastColumn = index === headers.length - 1;
    const remainderWidth = getRemainderWidth();

    if (isLastColumn && remainderWidth > 0) {
      return headers[index].width + remainderWidth;
    }

    return headers[index] ? headers[index].width : 0;
  };

  const getLeftGridColumnWidth = () => {
    let firstColumnIndex = 0;

    let columnWidth = headers[firstColumnIndex].width;

    if (numFixedColumn > 1) {
      for (let index = 1; index < numFixedColumn; index++) {
        columnWidth = columnWidth + headers[index].width;
      }
    }

    return columnWidth;
  };

  function getRemainderWidth() {
    let totalColumnWidth = headers.reduce(
      (totalWidth, value) => totalWidth + value.width,
      0
    );

    return width - totalColumnWidth;
  }

  function recomputeColumnWidth() {
    if (bodyRef) {
      bodyRef.current.recomputeGridSize();
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
            <div className="datatable" ref={ref}>
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
                          height={DEFAULT_HEADER_ROW_HEIGHT}
                          cellRenderer={headerRenderer}
                          rowHeight={DEFAULT_HEADER_ROW_HEIGHT}
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
                          top: DEFAULT_HEADER_ROW_HEIGHT,
                        }}
                      >
                        <Grid
                          className="LeftSideGrid"
                          width={leftGridWidth}
                          height={tableHeight - SCROLL_BAR_SIZE}
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
                              height: DEFAULT_HEADER_ROW_HEIGHT,
                              width: width - SCROLL_BAR_SIZE,
                            }}
                          >
                            <Grid
                              className="datatable__headerGrid"
                              width={width - SCROLL_BAR_SIZE}
                              height={DEFAULT_HEADER_ROW_HEIGHT}
                              cellRenderer={headerRenderer}
                              rowHeight={DEFAULT_HEADER_ROW_HEIGHT}
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
});

// Used for debugging, React.forwardRef messes with automatic naming
DatatableGrid.displayName = "DatatableGrid";

DatatableGrid.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  rowHeight: PropTypes.number.isRequired,
  headers: PropTypes.array.isRequired,
  list: PropTypes.array.isRequired,
  onCellClick: PropTypes.func,
  fixedColumn: PropTypes.number,
  sortBy: PropTypes.string,
  sortDirection: PropTypes.string,
  setSortBy: PropTypes.func,
  setSortDirection: PropTypes.func,
  highlightRow: PropTypes.bool,
  collapseBorder: PropTypes.bool,
  highlightSelected: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

export default DatatableGrid;
