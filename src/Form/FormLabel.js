import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./FormLabel.module.scss";

const cx = classNames.bind(styles);

/** Component for the label component of an input in a form */
const FormLabel = ({ label, name, isRequired, isDisabled, ...props }) => {
  if (!label && !isRequired) return null;

  return (
    <div htmlFor={name} className={cx("labelContainer")} {...props}>
      <label className={cx("label", { "label--disabled": isDisabled })}>
        {label}
      </label>

      {isRequired && (
        <div
          className={cx("label--required", { "label--disabled": isDisabled })}
        >
          Required
        </div>
      )}
    </div>
  );
};

FormLabel.propTypes = {
  /** The className given to the FormLabel container */
  label: PropTypes.string,
  /** The style given to the FormLabel Container */
  name: PropTypes.string,
  /** Shows the required label if true */
  isRequired: PropTypes.bool,
  /** Grey out the entire label if true */
  isDisabled: PropTypes.bool,
};

export default FormLabel;
