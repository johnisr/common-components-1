import React from "react";
import classNames from "classnames/bind";
import styles from "./TextAreaInput.module.scss";
import FormIcon from "../FormIcon";
import FormInputWrapper from "../FormInputWrapper";
import ControlledTextAreaInputType, {
  TextAreaInputType,
} from "../../../types/Form/FormInputs/TextAreaInput";

const cx = classNames.bind(styles);

export const TextAreaInput: React.FC<TextAreaInputType> = ({
  name,
  className = "",
  style,
  placeholder = "",
  showIcon = false,
  isDisabled = false,
  isValidated = false,
  isError = true,
  inputRef,
  onChange,
  onBlur,
  value = "",
}) => {
  return (
    <div className={`${cx("inputContainer")} ${className}`} style={style}>
      <textarea
        id={name}
        className={cx("input", {
          "input--error": isError,
          "input--disabled": isDisabled,
          "input--truncated": showIcon,
        })}
        value={value}
        placeholder={placeholder}
        ref={inputRef}
        onChange={onChange}
        onBlur={onBlur}
        disabled={isDisabled}
      />

      {showIcon && (
        <FormIcon
          isValidated={isValidated}
          isError={isError}
          isDisabled={isDisabled}
        />
      )}
    </div>
  );
};

const ControlledTextAreaInput = (props: ControlledTextAreaInputType) => {
  return <FormInputWrapper {...props} as={TextAreaInput} />;
};

export default ControlledTextAreaInput;
