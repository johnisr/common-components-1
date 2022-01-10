import React, { useMemo, useState } from "react";
import Select, { createFilter, StylesConfig, GroupBase } from "react-select";
import { OptionType } from "../types/Form/FormInputs/SelectInput";
import styles from "../constants/index";
import filter from "lodash/filter";
import FontAwesome from "react-fontawesome";
import classNames from "classnames/bind";
import cssStyles from "./MultipleDropdownInputWithsearch.module.scss";
import MultiDropdownInputWithSearchType, {
  MultiDropdownInputWithSearchHintType,
  MultiDropdownInputWithSearchIndicatorType,
} from "../types/MultiDropdownInputWithSearch";
import { Popover } from "react-tiny-popover";

const cx = classNames.bind(cssStyles);

const INPUT_WIDTH = 50;

const OptionHint = ({ limit }: MultiDropdownInputWithSearchHintType) => {
  return (
    <div className={cx("optionHint")}>
      You can only select {limit} options or less
    </div>
  );
};

const DropdownIndicator = ({
  selectProps,
}: MultiDropdownInputWithSearchIndicatorType) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={["right", "left"]}
      align="center"
      content={<OptionHint limit={selectProps.selectLimit} />}
    >
      <div
        className={cx("icon", "icon--error")}
        onMouseEnter={() => setIsPopoverOpen(true)}
        onMouseLeave={() => setIsPopoverOpen(false)}
      >
        <FontAwesome name="exclamation-circle" />
      </div>
    </Popover>
  );
};

function getOptionsWithLabels(options: any, labelKey?: string) {
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

const customStyles: StylesConfig<OptionType, true, GroupBase<any>> = {
  container: (provided) => {
    return {
      ...provided,
      display: "inline-block",
    };
  },
  control: (provided, state) => {
    let borderStyles = { border: `1px solid ${styles.background.dark}` };

    if (state.isDisabled) {
      borderStyles = { border: `1px solid ${styles.background.lines}` };
    } else if (state.isFocused) {
      borderStyles = { border: `1px solid ${styles.primary["300"]}` };
    }

    return {
      ...provided,
      cursor: "pointer",
      borderRadius: "6px",
      color: state.isDisabled ? styles.text["400"] : `${styles.text["800"]}`,
      caretColor: `${styles.primary["500"]}`,
      boxShadow: "none",
      "&:hover": {
        border: `1px solid ${styles.primary["300"]}`,
      },
      ...borderStyles,
    };
  },
  input: (provided, state) => ({
    ...provided,
    margin: 0,
    padding: 0,
    // @ts-expect-error unreachable type
    width: state.selectProps.width,
  }),
  placeholder: (provided) => ({ ...provided, margin: 0 }),
  valueContainer: (provided) => ({
    ...provided,
    padding: "5px",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    padding: 0,
    fill: styles.surface.dark,
    stroke: styles.surface.dark,
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    padding: "0px 5px",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : undefined,
    transition: "transform 0.3s",
  }),
  option: (provided, state) => ({
    ...provided,
    cursor: "pointer",
    backgroundColor: state.isSelected
      ? styles.primary["50"]
      : state.isFocused
      ? styles.background.default
      : "#fff",
    ":active": {
      backgroundColor: styles.primary["50"],
    },
    padding: "8px 12px",
    color: styles.text["800"],
    position: "relative",
  }),
  menu: (provided) => ({
    ...provided,
    width: "max-content",
    maxWidth: "350px",
    marginTop: "12px",
    zIndex: styles.layer.third,
  }),
};

const MultiDropdownInputWithSearch = <T,>({
  options,
  label,
  labelKey,
  dropdownKey,
  onChange,
  value,
  isDisabled,
  width = 50,
  selectLimit,
}: MultiDropdownInputWithSearchType<T>) => {
  const [interimValue, setInterimValue] = useState<T[] | undefined>(undefined);

  const option = useMemo(
    () => getOptionsWithLabels(options, labelKey),
    [options, labelKey]
  );

  const onMenuOpen = () => {
    setInterimValue(value);
  };

  const onMenuClose = () => {
    if (interimValue && (!selectLimit || interimValue?.length <= selectLimit)) {
      onChange(interimValue, dropdownKey);
    }

    setInterimValue(undefined);
  };

  const onMultipleSelectChange = (selectedValues: any) => {
    if (!labelKey) {
      selectedValues =
        selectedValues?.map((value: OptionType) => value.label) ?? [];
    }

    setInterimValue(selectedValues);
  };

  const selectValue = interimValue ?? value ?? [];

  return (
    <Select
      styles={customStyles}
      value={getOptionsWithLabels(selectValue, labelKey)}
      options={option}
      onMenuOpen={onMenuOpen}
      onMenuClose={onMenuClose}
      onChange={onMultipleSelectChange}
      filterOption={createFilter({
        ignoreAccents: false,
        ignoreCase: true,
      })}
      isDisabled={isDisabled}
      closeMenuOnSelect={false}
      isMulti={true}
      controlShouldRenderValue={false}
      backspaceRemovesValue={false}
      placeholder={label}
      hideSelectedOptions={false}
      isClearable={false}
      // @ts-expect-error unreachable type
      components={
        selectLimit && selectValue?.length > selectLimit
          ? { DropdownIndicator }
          : undefined
      }
      // extra props to pass to custom components
      width={width && width >= INPUT_WIDTH ? width : INPUT_WIDTH}
      selectLimit={selectLimit}
    />
  );
};

export default MultiDropdownInputWithSearch;
