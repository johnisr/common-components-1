import React, { useMemo } from "react";
import * as PropTypes from "prop-types";
import "./PaginationController.scss";
import { ROW_PER_PAGE_OPTIONS } from "./PaginationControllerConstant";
import Select, { StylesConfig, GroupBase, SingleValue } from "react-select";
import styles from "../../constants/index";
import {
  PaginationOptionsType,
  RowPerPageSelectorPropsType,
} from "../../types/Table/PaginationController";

const customStyles: StylesConfig<
  PaginationOptionsType,
  false,
  GroupBase<any>
> = {
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
      width: "72px",
      color: state.isDisabled ? styles.text["400"] : `${styles.text["800"]}`,
      caretColor: `${styles.primary["500"]}`,
      boxShadow: "none",
      "&:hover": {
        border: `1px solid ${styles.primary["300"]}`,
      },
      ...borderStyles,
      margin: "0px 10px",
      minHeight: "25px",
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
    padding: "0px 5px",
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
    transform: !state.selectProps.menuIsOpen ? "rotate(180deg)" : undefined,
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
    zIndex: styles.layer.second,
  }),
};

const ROW_PER_PAGE_SELECT_OPTIONS = ROW_PER_PAGE_OPTIONS.map((option) => ({
  label: option,
  value: option,
}));

const RowPerPageSelector = (props: RowPerPageSelectorPropsType) => {
  const { rowPerPage } = props.paginationDetail;

  const rowPerPageSelectValue = useMemo(
    () => (rowPerPage ? { label: rowPerPage, value: rowPerPage } : undefined),
    [rowPerPage]
  );

  const onSelect = (newValue: SingleValue<PaginationOptionsType>) => {
    if (newValue) {
      props.onRowPerPageSelect(newValue.value);
    }
  };

  return (
    <div className="rowPerPageSelector">
      Items per page:
      <Select
        styles={customStyles}
        options={ROW_PER_PAGE_SELECT_OPTIONS}
        value={rowPerPageSelectValue}
        onChange={onSelect}
        menuPlacement="top"
        placeholder=""
      />
    </div>
  );
};

RowPerPageSelector.propTypes = {
  paginationDetail: PropTypes.object.isRequired,
  onRowPerPageSelect: PropTypes.func.isRequired,
};

export default RowPerPageSelector;
