import FormInputType from "..";
import FormInputWrapperType from "../FormInputWrapper";

enum InputTypeOptions {
  "string",
  "number",
}

export type TextInputType = FormInputType & {
  value: string;
  /** The function called with the value(s) returned as arguments after input is changed */
  onChange: (...event: any[]) => void;
  /** The function called after the input is blurred*/
  onBlur?: () => void | React.FocusEvent;
  unit?: string;
  type: InputTypeOptions;
};

type ControlledTextInputType = TextInputType & FormInputWrapperType;

export default ControlledTextInputType;
