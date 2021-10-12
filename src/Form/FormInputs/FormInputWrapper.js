import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import classNames from "classnames/bind";
import styles from "./FormInputWrapper.module.scss";
import FormLabel from "../FormLabel";
import FormError from "../FormError";

const cx = classNames.bind(styles);

/**
 * Adds extra props or updates current props to connect an input to be managed
 * by react hook form.
 */
export const FormInputWrapper = ({ as, ...props }) => {
  return (
    <Controller
      name={props.name}
      rules={{
        validate: props.validate || false,
        required: props.isRequired && `${props.label} is required`,
        disabled: props.isDisabled || false,
      }}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error, isTouched },
        formState: { isSubmitted },
      }) => {
        const isValidated = isTouched || isSubmitted;
        const errorMessage = error?.message;

        const handleChange = (args) => {
          props.onChange?.(args);
          onChange(args);
        };

        const handleBlur = (args) => {
          props.onBlur?.(args);
          onBlur(args);
        };

        return (
          <div className={cx("wrapper", props.className)} style={props.style}>
            <FormLabel
              name={props.name}
              label={props.label}
              isRequired={props.isRequired}
              isDisabled={props.isDisabled}
            />

            {as({
              ...props,
              onChange: handleChange,
              onBlur: handleBlur,
              value,
              inputRef: ref,
              isValidated,
              isError: !!errorMessage,
            })}

            <FormError message={!props.isDisabled ? errorMessage : null} />
          </div>
        );
      }}
    />
  );
};

FormInputWrapper.propTypes = {
  /** The id associated with the input and htmlFor, uniquely identifies this input from others */
  name: PropTypes.string.isRequired,
  /** The string to be shown at top left giving context what the input needs */
  label: PropTypes.string,
  /**
   * An object with property values as functions that validate the input.
   * Each function is of the form `(value: any): boolean || string` where
   * the value is the textInput state and it returns either true or a the error
   * string to be shown
   */
  validate: PropTypes.object,
  /**
   * Whether or not the input is needed for a valid form submission
   */
  isRequired: PropTypes.bool,
  /** is the input disabled */
  isDisabled: PropTypes.bool,
  /** Show an icon in the input or not */
  showIcon: PropTypes.bool,

  /** The className to the div surrounding the input and labels */
  className: PropTypes.string,
  /** The style object appled to the div surrounding the input and labels */
  style: PropTypes.object,
  /** The function called with the value(s) returned as arguments after input is changed */
  onChange: PropTypes.func,
  /** The function called with the value(s) returned as arguments after input is blurred */
  onBlur: PropTypes.func,
  /** The text shown when no text is written in the input */
  placeholder: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  /** The Form Input component to be connected to the useForm state management */
  as: PropTypes.elementType.isRequired,
};

export default FormInputWrapper;
