import React from "react";

export type ControlLabelType = {
  /** The className applied to the containing div */
  label?: React.ReactNode | React.ReactNode[];
  /** The inline style object applied to the containing div */
  style?: React.CSSProperties;
  /** The className applied to containing div */
  className?: string;
  /** The control to be displayed */
  children: React.ReactNode | React.ReactNode[];
  /** The id associated with the input and htmlFor */
};

export default ControlLabelType;
