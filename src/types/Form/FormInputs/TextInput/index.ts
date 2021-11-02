import FormInputType from "..";
import FormInputWrapperType from "../FormInputWrapper";

enum InputTypeOptions {
  "text",
  "number",
}

export type TextInputType = FormInputType & {
  value: string;
  /** The function called with the value(s) returned as arguments after input is changed */
  onChange: (...event: any[]) => void;
  /** The function called after the input is blurred*/
  onBlur?: () => void | React.FocusEvent;
  unit?: string;
  type?: InputTypeOptions;
  /** Set attribute specifies the interval between each legal numbers */
  step?: number | "any";
};

type ControlledTextInputType = TextInputType & FormInputWrapperType;

export default ControlledTextInputType;
