export type PaginationDetailType = {
  /** The current page number */
  page: number;
  /** How many entries per page */
  rowPerPage: number;
  /** Determines how the table is sorted based on given properties and asc/desc */
  sort: Record<string, any>;
  /** The number of entries for the whole request */
  totalRowCount: number;
  /** The object whose properties are the columns to filter as and values to filter with */
  filter: Record<string, any>;
};

export type PaginationControllerType = {
  paginationDetail: PaginationDetailType;
  onPaginationChange: (newValue: PaginationDetailType) => void;
  disabled?: boolean;
};

export type PaginationPagesInputPropsType = {
  paginationDetail: PaginationDetailType;
  onPageChange: (newValue: number) => void;
  disabled?: boolean;
};

export type PaginationOptionsType = {
  label: number;
  value: number;
};

export type RowPerPageSelectorPropsType = {
  paginationDetail: PaginationDetailType;
  onRowPerPageSelect: (newValue: number) => void;
};

export type PaginationPositionType = {
  paginationDetail: PaginationDetailType;
};
