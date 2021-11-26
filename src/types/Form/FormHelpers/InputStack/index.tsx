import React from "react";
import FormInputWrapperType from "../../FormInputs/FormInputWrapper";

type InputStackType = {
  name: string;
  label?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  children: Array<FormInputWrapperType> | FormInputWrapperType;
  isDisabled: boolean;
};

export default InputStackType;
