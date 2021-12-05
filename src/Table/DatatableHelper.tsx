import differenceBy from "lodash/differenceBy";
import filter from "lodash/filter";
import {
  DatatableHeaderType,
  DatatableSortDirection,
} from "../types/Table/Datatable";
import { InputIsMatched } from "../utils/filters";
import { SortListByType } from "../utils/sorters";

// With a font-size of 13px, the average character width is 8px for Roboto font
export const CHARACTER_WIDTH_IN_PIXELS = 8;

/**
 * Useful for describing the width of a group of columns with variable header
 * label width but roughly the same width in cell values (e.g. Mole Percentage
 * measurement columns)
 */
export function getColumnWidth(label: string, minColumnWidth: number) {
  const labelLength = label?.length ?? 0;

  return Math.max(minColumnWidth, labelLength * CHARACTER_WIDTH_IN_PIXELS);
}

export function getFilteredList<T>(
  list: T[],
  value: string,
  filterBy?: keyof T,
  customSearch?: (list: T[], searchValue: string) => T[]
) {
  if (customSearch) {
    return customSearch(list, value);
  }

  if (!filterBy) return list;

  return list.filter((row) => InputIsMatched(value, row[filterBy]));
}

export function getErrorMessage<T>(
  headers: DatatableHeaderType<T>[],
  isLoading?: boolean
) {
  if (headers.length === 0) {
    return "No data is available";
  }

  if (isLoading) {
    return "Loading...";
  }

  return null;
}

export function getSortedList<T>(
  headers: DatatableHeaderType<T>[],
  list: T[],
  sortBy: string,
  sortDirection: typeof DatatableSortDirection[number]
) {
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

export function getAllEnabledItem<T>(
  filteredList: T[],
  getCheckboxDisabledState?: (rowData: T) => boolean
) {
  if (getCheckboxDisabledState) {
    return filter(filteredList, (row) => !getCheckboxDisabledState(row));
  }

  return filteredList;
}

// Only need to check the row that is filtered and enabled
export function isAllRowChecked<T>(
  filteredList: T[],
  checkedList: T[],
  getCheckboxDisabledState?: (rowData: T) => boolean
) {
  const allFilteredAndEnabledList = getAllEnabledItem(
    filteredList,
    getCheckboxDisabledState
  );

  return (
    !!filteredList.length &&
    differenceBy(allFilteredAndEnabledList, checkedList, "id").length === 0
  );
}
