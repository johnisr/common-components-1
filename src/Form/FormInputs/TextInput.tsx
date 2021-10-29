import React, { HTMLInputTypeAttribute } from "react";
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
  unit,
  type = "string",
  value = "",
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "number") {
      onChange(parseFloat(e.target.value));
    } else {
      onChange(e.target.value);
    }
  };

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
          onChange={handleChange}
          onBlur={onBlur}
          value={value}
          type={type as HTMLInputTypeAttribute}
          step={type === "number" ? "any" : undefined}
        />

        {showIcon && (
          <FormIcon
            isValidated={isValidated}
            isError={isError}
            isDisabled={isDisabled}
          />
        )}
      </div>

      {unit && <div className={styles.unit}>{unit}</div>}
    </div>
  );
};

const ControlledTextInput = (props: ControlledTextInputType) => {
  return <FormInputWrapper {...props} as={TextInput} />;
};

export default ControlledTextInput;
