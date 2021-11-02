import React from "react";
import classNames from "classnames/bind";
import styles from "./FormError.module.scss";
import FormErrorType from "../../types/Form/FormHelpers/FormError";

const cx = classNames.bind(styles);

/** Component showing the error message for an input in a Form */
const FormError: React.FC<FormErrorType> = ({ message, ...props }) => {
  return (
    <div className={cx("formError")} {...props}>
      {message ?? " "}
    </div>
  );
};

export default FormError;
