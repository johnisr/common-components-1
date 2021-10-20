import React from "react";
import { Controller } from "react-hook-form";
import classNames from "classnames/bind";
import styles from "./FormInputWrapper.module.scss";
import FormLabel from "../FormLabel";
import FormError from "../FormError";
import FormInputWrapperProps from "../../types/Form/FormInputs/FormInputWrapper";

const cx = classNames.bind(styles);

/**
 * Adds extra props or updates current props to connect an input to be managed
 * by react hook form.
 */
export const FormInputWrapper = ({ as, ...props }: FormInputWrapperProps) => {
  return (
    <Controller
      name={props.name}
      rules={{
        validate: props.validate || undefined,
        required: props.isRequired && `${props.label} is required`,
      }}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error, isTouched },
        formState: { isSubmitted },
      }) => {
        const isValidated = isTouched || isSubmitted;
        const errorMessage = error?.message;

        const handleChange = (...args: any[]) => {
          props.onChange?.(...args);
          onChange(...args);
        };

        const handleBlur = () => {
          props.onBlur?.();
          onBlur();
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

export default FormInputWrapper;
