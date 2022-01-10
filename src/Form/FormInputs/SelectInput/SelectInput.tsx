import React, { useMemo } from "react";
import Select, {
  createFilter,
  components,
  StylesConfig,
  GroupBase,
} from "react-select";
import FontAwesome from "react-fontawesome";
import styles from "../../../constants/index";
import classNames from "classnames/bind";
import cssStyles from "./SelectInput.module.scss";
import FormInputWrapper from "../FormInputWrapper";
import ControlledSelectInputType, {
  DropdownIndicatorType,
  OptionType,
  SelectInputType,
} from "../../../types/Form/FormInputs/SelectInput";
import filter from "lodash/filter";

const cx = classNames.bind(cssStyles);

const DropdownIndicator = (props: DropdownIndicatorType) => {
  const { isValidated, isDisabled, isError } = props.selectProps;

  return (
    <components.DropdownIndicator {...props}>
      {isValidated && !isDisabled && isError ? (
        <div className={cx("icon", "icon--error")}>
          <FontAwesome name="exclamation-circle" />
        </div>
      ) : (
        <div className={cx("icon", { "icon--disabled": isDisabled })}>
          <FontAwesome name="check" />
        </div>
      )}
    </components.DropdownIndicator>
  );
};

function getOptionsWithLabels(options: any, labelKey: string) {
  if (labelKey) {
    return options.map((option: any) => {
      option.label = option[labelKey];
      option.value = option[labelKey];
      return option;
    });
  } else {
    return filter(options, (option: any) => option).map((option: any) => ({
      label: option,
      value: option,
    }));
  }
}

const customStyles: StylesConfig<OptionType, boolean, GroupBase<any>> = {
  control: (provided, state) => {
    // @ts-expect-error unreachable type
    const hasError = state?.selectProps?.isError;

    let borderStyles = { border: `1px solid ${styles.background.dark}` };

    if (state.isDisabled) {
      borderStyles = { border: `1px solid ${styles.background.lines}` };
    } else if (hasError) {
      borderStyles = { border: `1px solid ${styles.status.error}` };
    } else if (state.isFocused) {
      borderStyles = { border: `1px solid ${styles.primary["300"]}` };
    }

    const paddingStyles = state.isMulti
      ? { padding: "5px 16px", minHeight: "50px" }
      : { padding: "12px 16px" };

    return {
      ...provided,
      minWidth: "120px",
      cursor: "pointer",
      borderRadius: "6px",
      ...paddingStyles,
      color: state.isDisabled ? styles.text["400"] : `${styles.text["800"]}`,
      fontSize: "16px",
      lineHeight: "24px",
      letterSpacing: "0.01em",
      caretColor: hasError ? styles.status.error : `${styles.primary["500"]}`,
      boxShadow: "none",
      "&:hover": {
        border: hasError
          ? `1px solid ${styles.status.error}`
          : `1px solid ${styles.primary["300"]}`,
      },
      ...borderStyles,
    };
  },
  input: (provided) => ({
    ...provided,
    margin: 0,
    padding: 0,
  }),
  placeholder: (provided) => ({ ...provided, margin: 0 }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    padding: 0,
    fill: styles.surface.dark,
    stroke: styles.surface.dark,
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    margin: 0,
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: 0,
    paddingLeft: "8px",
  }),
  clearIndicator: (provided) => ({
    ...provided,
    padding: 0,
    paddingRight: "8px",
  }),
  loadingIndicator: (provided) => ({
    ...provided,
    padding: 0,
    paddingRight: "8px",
  }),
  multiValue: (provided, state) => ({
    ...provided,
    backgroundColor: state.isDisabled
      ? styles.background.default
      : styles.background.dark,
  }),
  multiValueLabel: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? styles.text["400"] : styles.text["800"],
    fontSize: "16px",
    lineHeight: "24px",
    letterSpacing: "0.01em",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    "&:hover": { backgroundColor: styles.status.errorLight },
  }),
  option: (provided, state) => ({
    ...provided,
    cursor: "pointer",
    backgroundColor: state.isSelected
      ? styles.primary["200"]
      : state.isFocused
      ? styles.primary["50"]
      : "#fff",
    ":active": {
      backgroundColor: styles.primary["200"],
    },
    padding: "8px 12px",
  }),
  menu: (provided) => ({
    ...provided,
    marginTop: "12px",
    zIndex: styles.layer.third,
  }),
};

export const SelectInput = ({
  options,
  labelKey,
  onChange,
  isMulti,
  value,
  onBlur,
  ignoreCase,
  showIcon,
  isValidated,
  isDisabled,
  isLoading,
  closeMenuOnSelect,
  placeholder,
  isClearable,
  name,
  inputRef,
  isError,
  classNamePrefix,
}: SelectInputType) => {
  const option = useMemo(
    () => getOptionsWithLabels(options, labelKey),
    [options, labelKey]
  );

  const onMultipleSelectChange = (selectedValues: any) => {
    if (!labelKey) {
      selectedValues =
        selectedValues?.map((value: OptionType) => value.label) ?? [];
    }

    onChange(selectedValues ?? []);
  };

  const onSelectChange = (selectedValue: any) => {
    if (!labelKey) {
      selectedValue = selectedValue?.value;
    }

    onChange(selectedValue);
  };

  const selectValue = value ? (isMulti ? value : [value]) : [];

  return (
    <Select
      styles={customStyles}
      value={getOptionsWithLabels(selectValue, labelKey)}
      options={option}
      classNamePrefix={classNamePrefix}
      onChange={(selectedValue) =>
        isMulti
          ? onMultipleSelectChange(selectedValue)
          : onSelectChange(selectedValue)
      }
      onBlur={onBlur}
      isMulti={isMulti}
      filterOption={createFilter({
        ignoreAccents: false,
        ignoreCase: ignoreCase,
      })}
      // @ts-expect-error unreachable type
      components={showIcon && isValidated ? { DropdownIndicator } : undefined}
      isDisabled={isDisabled}
      isLoading={isLoading}
      closeMenuOnSelect={closeMenuOnSelect}
      placeholder={placeholder}
      isClearable={isClearable}
      inputId={name}
      ref={inputRef}
      // extra props to pass to custom components
      isValidated={isValidated}
      isError={isError}
    />
  );
};

const ControlledSelectInput = (props: ControlledSelectInputType) => {
  return <FormInputWrapper {...props} as={SelectInput} />;
};

export default ControlledSelectInput;
