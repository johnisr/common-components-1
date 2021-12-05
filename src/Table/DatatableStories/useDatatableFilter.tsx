import React, { useEffect, useState } from "react";
import difference from "lodash/difference";
import differenceBy from "lodash/differenceBy";
import { GetAllObjectValue } from "../../utils/objectFormatter";
import MultiDropdownInputWithSearch from "../../MultiDropdownInputWithSearch/MultiDropdownInputWithSearch";
import FilterPillbox from "../FilterPillbox/FilterPillbox";
import { ChainOfCustodyType } from "./DatatableWithFilter";
import { FilterType } from "../../types/FilterPillbox";

type FilterDropdownOptionsType = {
  label: string;
  inputs: any[] | null;
  options: any[];
  width: number;
  labelKey?: string;
};

const FILTER_DROPDOWNS: Record<string, FilterDropdownOptionsType> = {
  site: {
    label: "Site",
    inputs: [],
    options: [],
    width: 100,
    labelKey: "name",
  },
  status: {
    label: "Status",
    inputs: [],
    options: [],
    width: 100,
  },
  type: {
    label: "Issued To",
    inputs: [],
    options: [],
    width: 100,
  },
};

export function clearAllInputs(
  filterDropdowns: Record<string, FilterDropdownOptionsType>
) {
  const updatedFilterDropdowns = { ...filterDropdowns };

  Object.keys(updatedFilterDropdowns).map((key) => {
    updatedFilterDropdowns[key].inputs = [];
  });

  return updatedFilterDropdowns;
}

export function getAllFilterInputs(
  filterDropdowns: Record<string, FilterDropdownOptionsType>
) {
  const filterPillbox: Record<string, any[]> = {};

  Object.keys(filterDropdowns).map((key) => {
    const inputs = filterDropdowns[key]?.inputs ?? [];

    if (inputs.length > 0) {
      filterPillbox[key] = inputs;
    }
  });

  return filterPillbox;
}

export function filterList(
  list: ChainOfCustodyType[],
  filters: Record<string, any[]>
) {
  const { site, status, type } = filters;

  const filteredList = list.filter((item) => {
    // if the filter has 0 length, we accept everything
    // we check all the filter values and if all don't match, the item is filtered out
    if (site?.length > 0 && site.every((s) => s.name !== item.site?.name)) {
      return false;
    }

    if (status?.length > 0 && status.every((s) => s !== item.state)) {
      return false;
    }

    if (type?.length > 0 && type.every((t) => t !== item.type)) {
      return false;
    }

    return true;
  });

  return filteredList;
}

const useDatatableFilter = (
  list: ChainOfCustodyType[],
  filterList: (
    list: ChainOfCustodyType[],
    filters: Record<string, any>
  ) => ChainOfCustodyType[]
): [JSX.Element, JSX.Element, ChainOfCustodyType[]] => {
  const [filterDropdowns, setFilterDropdowns] =
    useState<Record<string, FilterDropdownOptionsType>>(FILTER_DROPDOWNS);

  // Fill options with all possible options from the list
  useEffect(() => {
    if (list.length) {
      const updatedFilterDropdowns = { ...filterDropdowns };

      // Get all unique values, filter for null, assign to options array
      const siteOptions = GetAllObjectValue(list, "site", "name").filter(
        (option) => option
      );
      updatedFilterDropdowns.site.options = siteOptions;

      const statusOptions = GetAllObjectValue(list, "state").filter(
        (option) => option
      );
      updatedFilterDropdowns.status.options = statusOptions;

      const typeOptions = GetAllObjectValue(list, "type").filter(
        (option) => option
      );
      updatedFilterDropdowns.type.options = typeOptions;

      setFilterDropdowns(updatedFilterDropdowns);
    }
  }, [list]);

  const onDropdownSelect = (selectedValue: any[], key: string) => {
    const filterDropdown = { ...filterDropdowns[key] };
    if (filterDropdown) {
      filterDropdown.inputs = selectedValue;

      setFilterDropdowns({ ...filterDropdowns, [key]: filterDropdown });
    }
  };

  const onClearFilterClick = (filterObject?: FilterType) => {
    if (filterObject) {
      const { filterKey, name } = filterObject;
      const updatedFilterDropdown = { ...filterDropdowns[filterKey] };

      // If options are an object with the identifying property "filterKey"
      if (filterDropdowns[filterKey].labelKey) {
        updatedFilterDropdown.inputs = differenceBy(
          updatedFilterDropdown.inputs,
          [filterObject],
          "id"
        );
      } else {
        updatedFilterDropdown.inputs = difference(
          updatedFilterDropdown.inputs,
          [name]
        );
      }

      setFilterDropdowns({
        ...filterDropdowns,
        [filterKey]: updatedFilterDropdown,
      });
    } else {
      setFilterDropdowns(clearAllInputs(filterDropdowns));
    }
  };

  const filterRow = (
    <div className="filterRow">
      {Object.keys(filterDropdowns).map((key) => {
        const { label, labelKey, options, inputs } = filterDropdowns[key];

        return (
          <MultiDropdownInputWithSearch
            key={key}
            label={label}
            labelKey={labelKey ? labelKey : undefined}
            dropdownKey={key}
            value={inputs ? inputs : []}
            options={options}
            onChange={onDropdownSelect}
          />
        );
      })}
    </div>
  );

  const filterInputs = getAllFilterInputs(filterDropdowns);

  const filteredList = filterList(list, filterInputs);

  const filterPillbox = (
    <FilterPillbox
      filterBy={filterInputs}
      onClearFilterClick={onClearFilterClick}
    />
  );

  return [filterRow, filterPillbox, filteredList];
};

export default useDatatableFilter;
