import FormInputType from "..";
import FormInputWrapperType from "../FormInputWrapper";

export type TextAreaInputType = FormInputType & {
  value: string | undefined;
  /** The function called with the value(s) returned as arguments after input is changed */
  onChange: (...event: any[]) => void;
  /** The function called after the input is blurred*/
  onBlur?: () => void | React.FocusEvent;
};

type ControlledTextAreaInputType = TextAreaInputType & FormInputWrapperType;

export default ControlledTextAreaInputType;
