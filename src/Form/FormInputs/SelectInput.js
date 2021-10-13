import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Select, { createFilter, components } from "react-select";
import FontAwesome from "react-fontawesome";
import styles from "../../constants/index";
import classNames from "classnames/bind";
import cssStyles from "./SelectInput.module.scss";
import FormInputWrapper from "./FormInputWrapper";

const cx = classNames.bind(cssStyles);

const DropdownIndicator = (props) => {
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

function getOptionsWithLabels(options, labelKey) {
  if (labelKey) {
    return options.map((option) => {
      option.label = option[labelKey];
      option.value = option[labelKey];
      return option;
    });
  } else {
    return options
      .filter((option) => option)
      .map((option) => ({
        label: option,
        value: option,
      }));
  }
}

const customStyles = {
  control: (provided, state) => {
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
  input: (provided) => ({ ...provided, margin: 0, padding: 0 }),
  placeholder: (provided) => ({ ...provided, margin: 0 }),
  valueContainer: (provided) => ({ ...provided, padding: 0 }),
  indicatorsContainer: (provided) => ({
    ...provided,
    padding: 0,
    fill: styles.surface.dark,
    stroke: styles.surface.dark,
  }),
  indicatorSeparator: (provided) => ({ ...provided, margin: 0 }),
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
    backgroundColor: state.isSelected
      ? styles.primary["200"]
      : state.isFocused
      ? styles.primary["50"]
      : "#fff",
    padding: "8px 12px",
  }),
  menu: (provided) => ({
    ...provided,
    marginTop: "12px",
  }),
};

export const SelectInput = (props) => {
  const option = useMemo(
    () => getOptionsWithLabels(props.options, props.labelKey),
    [props.options, props.labelKey]
  );

  const onMultipleSelectChange = (selectedValues) => {
    if (!props.labelKey) {
      selectedValues = selectedValues?.map((value) => value.label) ?? [];
    }

    props.onChange(selectedValues ?? []);
  };

  const onSelectChange = (selectedValue) => {
    if (!props.labelKey) {
      selectedValue = selectedValue?.value;
    }

    props.onChange(selectedValue);
  };

  let selectValue = [];
  if (props.value) {
    selectValue = props.isMulti ? props.value : [props.value];
  }

  const value = getOptionsWithLabels(selectValue, props.labelKey);

  return (
    <Select
      styles={customStyles}
      value={value}
      options={option}
      classNamePrefix={props.classNamePrefix}
      onChange={(selectedValue) =>
        props.isMulti
          ? onMultipleSelectChange(selectedValue)
          : onSelectChange(selectedValue)
      }
      onBlur={props.onBlur}
      isMulti={props.isMulti}
      filterOption={createFilter({
        ignoreAccents: false,
        ignoreCase: props.ignoreCase,
      })}
      components={
        props.showIcon && props.isValidated ? { DropdownIndicator } : null
      }
      isDisabled={props.isDisabled}
      isLoading={props.isLoading}
      closeMenuOnSelect={props.closeMenuOnSelect}
      placeholder={props.placeholder}
      isClearable={props.isClearable}
      inputId={props.name}
      ref={props.inputRef}
      // extra props to pass to custom components
      isValidated={props.isValidated}
      isError={props.isError}
    />
  );
};

const ControlledSelectInput = (props) => {
  return <FormInputWrapper {...props} as={SelectInput} />;
};

DropdownIndicator.propTypes = {
  selectProps: PropTypes.object,
};

ControlledSelectInput.defaultProps = {
  ignoreCase: false,
};

SelectInput.propTypes = {
  /** The id associated with the input and htmlFor */
  name: PropTypes.string,
  /** The string to be shown at top left  */
  label: PropTypes.string,
  /**
   * Whether or not the input is required
   */
  isRequired: PropTypes.bool,
  /** is the input disabled */
  isDisabled: PropTypes.bool,
  /** Show an icon in the input or not */
  showIcon: PropTypes.bool,

  /** The className to the div surrounding the dropdown */
  className: PropTypes.string,
  /** The prefix to add to classNames in the component to uniquely identify them */
  classNamePrefix: PropTypes.string,
  /** The array of values to be chosen from */
  options: PropTypes.array.isRequired,
  /** The current value of the input */
  value: PropTypes.array,
  /** If the array of values are objects, which property is displayed to user */
  labelKey: PropTypes.string,
  /** The function called with the value(s) returned as arguments after input is changed */
  onChange: PropTypes.func.isRequired,
  /** A boolean indicating if multiple values can be chosen at the same time */
  isMulti: PropTypes.bool,
  /** Given the inherent searchbar, will the search term ignore upper/lowercase to find value */
  ignoreCase: PropTypes.bool,
  /** Displays a loading indicator while showing  */
  isLoading: PropTypes.bool,
  /** After a selection is made in the dropdown, will it automatically close */
  closeMenuOnSelect: PropTypes.bool,
  /** The text shown when no text is written in the input */
  placeholder: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  /** A button is added that allows users to discard the current values */
  isClearable: PropTypes.bool,
  /** The function called with the value(s) returned as arguments after the input is blurred*/
  onBlur: PropTypes.func,
  /** Is the input dirty (touched and blurred) or form submit has been attempted */
  isValidated: PropTypes.bool,
  /** The input validation has failed  */
  isError: PropTypes.bool,
  /** A ref for the select input element */
  inputRef: PropTypes.ref,
};

export default ControlledSelectInput;
