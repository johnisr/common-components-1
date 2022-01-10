import React from "react";
import classNames from "classnames/bind";
import styles from "./FilterPillbox.module.scss";
import FontAwesome from "react-fontawesome";
import {
  FilterPillboxType,
  FilterType,
  PillboxType,
} from "../../types/FilterPillbox";

const cx = classNames.bind(styles);

function getFilterKey(filter: string | object, filterKey: string): FilterType {
  if (typeof filter === "object") {
    return { ...filter, filterKey };
  } else {
    return { filterKey, name: filter };
  }
}

function convertToListOfFilters(
  filters: Record<string, string[] | object[]>
): FilterType[] {
  if (filters) {
    return Object.keys(filters).reduce((listOfFilters, filterKey) => {
      if (Array.isArray(filters[filterKey])) {
        const filterWithKeys = filters[filterKey].map((filter) => {
          return getFilterKey(filter, filterKey);
        });

        return [...listOfFilters, ...filterWithKeys];
      } else {
        const filterWithKey = getFilterKey(filters[filterKey], filterKey);
        return [...listOfFilters, filterWithKey];
      }
    }, [] as FilterType[]);
  } else {
    return [];
  }
}

const Pillbox = ({ filter, onClearFilterClick }: PillboxType) => {
  return (
    <div className={cx("pillbox")}>
      <div className={cx("pillbox__text")}>
        <b>{filter.filterKey}:</b>
        {filter.name}
      </div>

      <FontAwesome
        name="times"
        className={cx("pillbox__icon")}
        onClick={() => onClearFilterClick(filter)}
      />
    </div>
  );
};

const FilterPillbox = ({
  filterBy,
  filteredListCount,
  noFilterListCount,
  onClearFilterClick,
}: FilterPillboxType) => {
  const listOfFilterValues = convertToListOfFilters(filterBy);

  if (listOfFilterValues.length > 0) {
    return (
      <div className={cx("container")}>
        <span className={cx("containerTitle")}>Filter:</span>
        {listOfFilterValues.map((filter, index) => {
          return (
            <Pillbox
              key={index}
              filter={filter}
              onClearFilterClick={onClearFilterClick}
            />
          );
        })}

        {noFilterListCount ? (
          <span>{`— ${filteredListCount} out of ${noFilterListCount} items`}</span>
        ) : null}

        <span className={cx("clearLink")} onClick={() => onClearFilterClick()}>
          Clear All Filters
        </span>
      </div>
    );
  } else {
    return null;
  }
};

export default FilterPillbox;
