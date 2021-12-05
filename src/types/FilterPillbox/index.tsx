export type FilterType = {
  filterKey: string;
  name?: string;
};

export type PillboxType = {
  filter: FilterType;
  onClearFilterClick: (filter?: FilterType) => void;
};

export type FilterPillboxType = {
  filterBy: Record<string, string[] | object[]>;
  onClearFilterClick: (filter?: FilterType) => void;
  filteredListCount: number;
  noFilterListCount: number;
};
