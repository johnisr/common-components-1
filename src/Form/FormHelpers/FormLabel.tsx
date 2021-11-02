import React from "react";
import classNames from "classnames/bind";
import styles from "./FormLabel.module.scss";
import FormLabelType from "../../types/Form/FormHelpers/FormLabel";

const cx = classNames.bind(styles);

/** Component for the label component of an input in a form */
const FormLabel: React.FC<FormLabelType> = ({
  label,
  name,
  isRequired,
  isDisabled,
  ...props
}) => {
  if (!label && !isRequired) return null;

  return (
    <div className={cx("labelContainer")} {...props}>
      <label
        htmlFor={name}
        className={cx("label", { "label--disabled": isDisabled })}
      >
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

export default FormLabel;
