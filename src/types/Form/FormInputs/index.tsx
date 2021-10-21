import React from "react";

type FormInputProps = {
  /** The class given to the input container */
  className?: string;
  /** The style given to the input container */
  style?: React.CSSProperties;

  /** The id associated with the input and htmlFor */
  name: string;
  /** Hint displayed in the input that disappears after input is entered */
  placeholder?: string;

  /** The current value of the input */
  value: any;
  /** The function called with the value(s) returned as arguments after input is changed */
  onChange: (...event: any[]) => void;
  /** The function called after the input is blurred*/
  onBlur?: () => void | React.FocusEvent;

  /** Show an icon in the input or not */
  showIcon: boolean;
  /** is the input disabled */
  isDisabled: boolean;
  /** Is the input dirty (touched and blurred) or form submit has been attempted */
  isValidated: boolean;
  /** The input validation has failed  */
  isError: boolean;
  /** A ref for the input element */
  inputRef?: React.RefCallback<HTMLInputElement>;
};

export default FormInputProps;
