import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./TextInput.module.scss";
import FormLabel from "../FormLabel";
import { useFormContext } from "react-hook-form";
import FontAwesome from "react-fontawesome";
import FormError from "../FormError";

const cx = classNames.bind(styles);

const TextInput = ({
  className = "",
  style,
  name,
  label,
  validate = null,
  isRequired = false,
  isDisabled = false,
  showIcon = false,
  placeholder = "",
}) => {
  const {
    register,
    formState: { errors, isSubmitted, touchedFields },
  } = useFormContext();

  const errorMessage = errors[name]?.message;

  const isValidated = !!touchedFields[name] || isSubmitted;

  return (
    <div className={`${styles.wrapper} ${className}`} style={style}>
      <FormLabel
        name={name}
        label={label}
        isRequired={isRequired}
        isDisabled={isDisabled}
      />

      <div className={styles.inputContainer}>
        <input
          id={name}
          className={cx("input", {
            "input--error": errorMessage,
            "input--disabled": isDisabled,
            "input--truncated": showIcon,
          })}
          placeholder={placeholder}
          {...register(name, {
            validate,
            required: isRequired && `${label} is required`,
            disabled: isDisabled,
          })}
        />

        {showIcon &&
          isValidated &&
          (errorMessage ? (
            <div className={cx("icon", "icon--error")}>
              <FontAwesome name="exclamation-circle" />
            </div>
          ) : (
            <div className={cx("icon", { "icon--disabled": isDisabled })}>
              <FontAwesome name="check" />
            </div>
          ))}
      </div>

      <FormError message={!isDisabled ? errors[name]?.message : null} />
    </div>
  );
};

TextInput.propTypes = {
  /** The className given to the Text Input Container */
  className: PropTypes.string,
  /** The style given to the Text Input Container */
  style: PropTypes.object,
  /** The id associated with the input and htmlFor */
  name: PropTypes.string,
  /** The string to be shown at top left  */
  label: PropTypes.string,
  /**
   * An object with property values as functions that validate the input.
   * Each function is of the form `(value: any): boolean || string` where
   * the value is the textInput state and it returns either true or a the error
   * string to be shown
   */
  validate: PropTypes.object,
  /**
   * Whether or not the input is required
   */
  isRequired: PropTypes.bool,
  /** is the input disabled */
  isDisabled: PropTypes.bool,
  /** Show an icon in the input or not */
  showIcon: PropTypes.bool,
  /** Hint displayed in the input that disappears after input is entered */
  placeholder: PropTypes.string,
};

export default TextInput;
