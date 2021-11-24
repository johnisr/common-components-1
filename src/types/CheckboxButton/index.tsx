import React from "react";

export const checkboxSizeOptions = ["small", "medium", "large"] as const;

export type CheckboxButtonType = {
  /** The className applied to the containing div */
  className?: string;
  /** The inline style object applied to the containing div */
  style?: React.CSSProperties;
  /** The label displayed */
  children: React.ReactNode | React.ReactNode[];
  /** The id associated with the input and htmlFor */
  name: string;
  /** Is the checkbox checked or not*/
  value: boolean;
  /** Is the input disabled */
  isDisabled: boolean;
  /** A ref for the input element */
  inputRef?: React.RefCallback<HTMLInputElement> | any;
  /** The function called after the input is changed */
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  /** The function called after the input is blurred*/
  onBlur?: () => void | React.FocusEvent;
  /** Changes it to an outlined button, useful for coloured backgrounds */
  isOutline?: boolean;
  /** The size of the checkboxbutton */
  size?: typeof checkboxSizeOptions[number];
};

export default CheckboxButtonType;
