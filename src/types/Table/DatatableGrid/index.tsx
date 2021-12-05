import {
  actionDropdownType,
  DatatableHeaderType,
  DatatableSortDirection,
} from "../Datatable";

type DatatableGridType<T> = {
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
  /** Removes the internal divider between rows */
  collapseBorder?: boolean;
  /** Which column (identified by key) is the table originally sorted by */
  sortBy: string;
  /** Is the table originally sorted ascending (asc) or descending (desc) */
  sortDirection: typeof DatatableSortDirection[number];
  /** The height in pixels of every row */
  rowHeight: number;
  /** The height in pixels of the headers */
  headerHeight?: number;
  /** To enable constant highlight of a row instead of just during mouse hover. Takes in an object
   *  which is matched to the list, or a function to help compare
   */
  highlightSelected?: T extends object ? T : (list: T[]) => number;
  /** Enables a right fixed column whose dropdown will be populated by these actions */
  actionDropdown?: actionDropdownType<T>[];
  /** A ref to the div enclosing the datatable */
  innerRef?: React.Ref<HTMLDivElement>;
  /** The function executed when any cell is clicked, with the row data as the argument **/
  onCellClick?: (rowData: T) => void;
  /** Applies the rowClassName to the whole row instead of just a cell */
  getRowClassName?: (rowData: T) => string;
  /** Highlights a given row on mouse hover */
  highlightRow?: boolean;
  /** function called to change which column the table will be sorted by */
  setSortBy: (columnKey: string) => void;
  /** function called to change which direction (asc or desc) the sorting will be done */
  setSortDirection: (
    sortDirection: typeof DatatableSortDirection[number]
  ) => void;
};

export type getColumnWidthProps = {
  index: number;
};

export default DatatableGridType;
