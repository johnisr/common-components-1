import differenceBy from "lodash/differenceBy";
import { InputIsMatched } from "../utils/filters";
import { SortListByType } from "../utils/sorters";

// With a font-size of 13px, the average character width is 8px for Roboto font
export const CHARACTER_WIDTH_IN_PIXELS = 8;

/**
 * Useful for describing the width of a group of columns with variable header
 * label width but roughly the same width in cell values (e.g. Mole Percentage
 * measurement columns)
 */
export function getColumnWidth(label, minColumnWidth) {
  const labelLength = label?.length ?? 0;

  return Math.max(minColumnWidth, labelLength * CHARACTER_WIDTH_IN_PIXELS);
}

export function getFilteredList(list, filterBy, value, customSearch) {
  if (customSearch) {
    return customSearch(list, value);
  }

  return list.filter((row) => InputIsMatched(value, row[filterBy]));
}

export function getErrorMessage(isLoading, headers) {
  if (headers.length === 0) {
    return "No data is available";
  }

  if (isLoading) {
    return "Loading...";
  }

  return null;
}

export function getSortedList(headers, list, sortBy, sortDirection) {
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
}

// Only need to check the row that is filtered
export function isAllRowChecked(filteredList, checkedList) {
  return (
    !!filteredList.length &&
    differenceBy(filteredList, checkedList, "id").length === 0
  );
}
