import React, { HTMLInputTypeAttribute } from "react";
import classNames from "classnames/bind";
import styles from "./TextInput.module.scss";
import FontAwesome from "react-fontawesome";
import ControlledTextInputType, {
  TextInputType,
} from "../../types/Form/FormInputs/TextInput";
import FormInputWrapper from "./FormInputWrapper";

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
          type={type as HTMLInputTypeAttribute}
          step={type === "number" ? "any" : undefined}
        />

        {unit && <div className={styles.unit}>{unit}</div>}

        {showIcon &&
          isValidated &&
          (isError ? (
            <div className={cx("icon", "icon--error")}>
              <FontAwesome name="exclamation-circle" />
            </div>
          ) : (
            <div className={cx("icon", { "icon--disabled": isDisabled })}>
              <FontAwesome name="check" />
            </div>
          ))}
      </div>
    </div>
  );
};

const ControlledTextInput = (props: ControlledTextInputType) => {
  return <FormInputWrapper {...props} as={TextInput} />;
};

export default ControlledTextInput;
