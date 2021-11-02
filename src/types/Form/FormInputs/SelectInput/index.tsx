import FormInputType from "..";
import { DropdownIndicatorProps, GroupBase } from "react-select";
import FormInputWrapperType from "../FormInputWrapper";
import { Ref } from "react";
import Select from "react-select/dist/declarations/src/Select";

export type SelectType = {
  isError: boolean;
};

export type DropdownIndicatorType = DropdownIndicatorProps<
  unknown,
  boolean,
  GroupBase<unknown>
> & {
  isSelected: boolean;
  selectProps: {
    isValidated: boolean;
    isDisabled: boolean;
    isError: boolean;
  };
};

export type OptionType = {
  label: React.ReactNode;
  value: string;
  isError: boolean;
};

export type SelectInputType = Omit<FormInputType, "inputRef"> & {
  options: OptionType[];
  labelKey: string;
  onChange:
    | ((selectedValues: object[]) => void)
    | ((selectedValue: any) => void);
  isMulti: boolean;
  value: string[] | object[] | string;
  /** The function called after the input is blurred*/
  onBlur?: () => void | React.FocusEvent;
  ignoreCase: boolean;
  isLoading: boolean;
  closeMenuOnSelect: boolean;
  isClearable: boolean;
  classNamePrefix: string;
  /** A ref for the input element */
  inputRef: Ref<Select<any, boolean, GroupBase<unknown>>> | undefined;
};

type ControlledSelectInputType = SelectInputType & FormInputWrapperType;

export default ControlledSelectInputType;
