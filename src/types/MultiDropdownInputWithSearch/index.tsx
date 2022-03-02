import React from "react";

type OptionType = {
  label: React.ReactNode;
  value: string;
};

type MultiDropdownInputWithSearchType<T> = {
  options: T[];
  label: string;
  labelKey?: string;
  dropdownKey?: string;
  onChange: (newValues: T[], dropdownKey?: string) => void;
  value: T[];
  isDisabled?: boolean;
  width?: number;
  selectLimit?: number;
  customLabelFormat: (value: string | Record<string, any>) => string;
  isMulti: true | undefined;
};

export type MultiDropdownInputWithSearchHintType = {
  limit?: number;
};

type MultiDropdownInputWithSearchSelectPropsType = {
  selectLimit?: number;
};

export type MultiDropdownInputWithSearchIndicatorType = {
  selectProps: MultiDropdownInputWithSearchSelectPropsType;
};

export default MultiDropdownInputWithSearchType;
