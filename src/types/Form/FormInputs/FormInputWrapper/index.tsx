import React from "react";
import { Validate } from "react-hook-form";
import FormInputType from "..";
import { DateInputType } from "../DateInput";
import { SelectInputType } from "../SelectInput";
import { TextInputType } from "../TextInput";

type FormInputWrapperType = {
  /** The Form input component to be connected to react hook form */
  as:
    | React.FC<DateInputType>
    | React.FC<TextInputType>
    | React.FC<FormInputType>
    | React.FC<SelectInputType>
    | any;
  /** The string to be shown at top left giving context what the input needs */
  label: React.ReactNode;
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

export default FormInputWrapperType;
