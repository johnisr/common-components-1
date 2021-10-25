import React from "react";
import classNames from "classnames/bind";
import styles from "./TextInput.module.scss";
import ControlledTextInputType, {
  TextInputType,
} from "../../types/Form/FormInputs/TextInput";
import FormInputWrapper from "./FormInputWrapper";
import FormIcon from "./FormIcon";

const cx = classNames.bind(styles);

const TextInput: React.FC<TextInputType> = ({
  name,
  placeholder = "",
  className = "",
  style,
  showIcon = false,
  isDisabled = false,
  isValidated = false,
  isError = false,
  inputRef,
  onChange,
  onBlur,
}) => {
  return (
    <div className={`${styles.wrapper} ${className}`} style={style}>
      <div className={styles.inputContainer}>
        <input
          id={name}
          className={cx("input", {
            "input--error": isError,
            "input--disabled": isDisabled,
            "input--truncated": showIcon,
          })}
          placeholder={placeholder}
          ref={inputRef}
          onChange={onChange}
          onBlur={onBlur}
        />

        {showIcon && (
          <FormIcon
            isValidated={isValidated}
            isError={isError}
            isDisabled={isDisabled}
          />
        )}
      </div>
    </div>
  );
};

const ControlledTextInput = (props: ControlledTextInputType) => {
  return <FormInputWrapper {...props} as={TextInput} />;
};

export default ControlledTextInput;
