import React from "react";
import { Validate } from "react-hook-form/dist/types/index";
import FormInputProps from "..";

type FormInputWrapperProps = FormInputProps & {
  /** The Form input component to be connected to react hook form */
  as: React.FC<FormInputProps>;
  /** The string to be shown at top left giving context what the input needs */
  label: string;
  /**
   * An object with property values as functions that validate the input.
   * Each function is of the form `(value: any): boolean || string` where
   * the value is the textInput state and it returns either true or a the error
   * string to be shown
   */
  validate: Validate<any> | Record<string, Validate<any>> | undefined;
  /** Whether or not the input is needed for a valid form submission */
  isRequired: boolean;
};

export default FormInputWrapperProps;
