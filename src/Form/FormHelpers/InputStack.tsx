import React from "react";
import classNames from "classnames/bind";
import styles from "./InputStack.module.scss";
import FormLabel from "./FormLabel";
import InputStackType from "../../types/Form/FormHelpers/InputStack";

const cx = classNames.bind(styles);

const InputStack = ({
  name,
  label,
  className,
  style,
  children,
  isDisabled,
}: InputStackType) => (
  <div className={className} style={style}>
    <FormLabel name={`${name}Stack`} label={label} isDisabled={isDisabled} />
    <div className={cx("stack")}>{children}</div>
  </div>
);

export default InputStack;
