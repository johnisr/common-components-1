import { ReactNode, Ref } from "react";

export type actionDropdownType<T> = {
  title: string;
  onClick: (data: T) => void;
  disabled?: (data: T) => boolean;
};

export type DatatableHeaderType<T> = {
  /** The displayed element at the top of each column */
  label: ReactNode;
  /** The unique string used to identify a column */
  key: string;
  /** How wide a column is in pixels */
  width: number;
  /** A function that returns the displayed element for each cell */
  cellRenderer?: (rowData: T, columnKey: string) => ReactNode;
  /** Will the column stay on the screen as the table is scrolled to the right */
  fixed?: boolean;
  /** Can the list of data be sorted by the contents of this column */
  disableSort?: boolean;
  /** A custom function that sorts the given list of data by the contents of this column */
  sort?: (list: T[], columnKey: string) => T[];
  /** Will the displayed text be aligned to the right? Useful for measurements */
  rightAlign?: boolean;
  /** Can the column header wrap if it extends past the width of the column */
  wrap?: boolean;
  /** The className applied to each cell */
  className?: string;
};

export const DatatableSortDirection = ["asc", "desc"] as const;

type DatatableType<T> = {
  /** The text disabled at the top of the table */
  title?: string;
  /** The array of objects depicting the properties of each column. The properties
   *  label (header title), key (object property name), and width are required for
   *  every column. The cellRenderer property can be provided for custom rendering.
   *  the fixed boolean indicates whether or not it stays visible while scrolling
   *  right. sort property is given a function to sort more complex properties, and
   *  rightAlign boolean is to change it from the default left align
   **/
  headers: DatatableHeaderType<T>[];
  /** The array of objects, each represented as a row in the table */
  list: T[];
  /** The horizontal length in pixels of the visible portion of the table */
  width: number;
  /**  The vertical length in pixels of the visible portion of the table */
  height: number;
  /** The element that contains all the dropdowns, inputs, and date selectors for filtering */
  filterRow?: ReactNode | ReactNode[];
  /** Shows the selected filter values in a row of pillboxes */
  filterPillbox?: JSX.Element;
  /** Which column (identified by key) is the table originally sorted by */
  defaultSortBy?: string;
  /** Is the table originally sorted ascending (asc) or descending (desc) */
  defaultSortDirection?: typeof DatatableSortDirection[number];
  /** Provides an input field that filters the list of objects based on "filterKey" property */
  filterKey?: keyof T;
  /** The placeholder text if the input field is present  */
  filterTitle?: string;
  /** Highlights a given row on mouse hover */
  highlightRow?: boolean;
  /** Adds a button with label `Add ${title}` which runs the function when clicked */
  onAddClick?: () => void;
  /** Updates the add button label with the given string */
  addButtonName?: string;
  /** The function executed when any cell is clicked, with the row data as the argument **/
  onCellClick?: (rowData: T) => void;
  /** Provides a checkbox for each row, and each click runs the given method
   *  with the row data as the argument
   **/
  onCheckboxClick?: (list: T[], rowData?: T) => void;
  /** Allows the parent to control the check list state by passing in the
   *  array of objects they want checked
   **/
  checkedList?: T[];
  /** allow the addition/removal of columns */
  customizableColumns?: boolean;
  /** Removes the internal divider between rows */
  collapseBorder?: boolean;
  /** Displays a loading indicator while true */
  isLoading?: boolean;
  /** Displays an overlay with a loading indicator while true */
  showOverlayLoader?: boolean;
  /** The height in pixels of every row */
  rowHeight?: number;
  /** Supersedes the search input with a custom function */
  customSearch?: (list: T[], searchValue: string) => T[];
  /** A ref to the div enclosing the datatable */
  forwardedRef?: Ref<HTMLDivElement>;
  /** Given the unfiltered list length, augments the filterPillbox to show how many rows are left
   *  compared to the original length
   */
  noFilterListCount?: number;
  /** To enable constant highlight of a row instead of just during mouse hover. Takes in an object
   *  which is matched to the list, or a function to help compare
   */
  highlightSelected?: T extends object ? T : (list: T[]) => number;
  /** Applies the rowClassName to the whole row instead of just a cell */
  getRowClassName?: (rowData: T) => string;
  /** Where to place buttons and other interactable components */
  actionRow?: ReactNode | ReactNode[];
  /** Removes the check all checkbox */
  disableSelectAll?: boolean;
  /** Disables every checkbox from being checked */
  disableCheckbox?: boolean;
  /** Given rowData, returns a boolean to determine if the row should be locked */
  getCheckboxDisabledState?: (rowData: T) => boolean;
  /** Renders a button with label `.CSV` and runs the function with entire list as argument onClick */
  csvDownload?: (list: T[]) => void;
  /** The height of the header in pixels */
  headerHeight?: number;
  /** Enables a right fixed column whose dropdown will be populated by these actions */
  actionDropdown: actionDropdownType<T>[];
};

export default DatatableType;
