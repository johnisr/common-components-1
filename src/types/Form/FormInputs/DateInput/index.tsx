import FormInputProps from "..";
import FormInputWrapperProps from "../FormInputWrapper";
import DayPickerInput from "react-day-picker/types/DayPickerInput";
import { DayModifiers } from "react-day-picker/types";

export interface DateInputProps
  extends FormInputProps,
    Omit<FormInputProps, "value" | "onChange"> {
  /** The Date value of the input */
  value: Date;
  /** The function called with the value(s) returned as arguments after input is changed */
  onChange: (
    day: Date,
    DayModifiers?: DayModifiers,
    dayPickerInput?: DayPickerInput
  ) => void;
  /** The moment string format used to show the date in text form */
  format?: string;
}

type ControlledDateInputProps = DateInputProps & FormInputWrapperProps;

export default ControlledDateInputProps;
