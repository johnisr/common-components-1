import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./FormError.module.scss";

const cx = classNames.bind(styles);

/** Component showing the error message for an input in a Form */
const FormError = ({ message, ...props }) => {
  return (
    <div className={cx("formError")} {...props}>
      {message ?? " "}
    </div>
  );
};

FormError.propTypes = {
  /** The className given to the FormError container */
  message: PropTypes.string,
};

export default FormError;
