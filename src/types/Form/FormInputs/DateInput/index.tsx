import FormInputType from "..";
import DayPickerInput from "react-day-picker/types/DayPickerInput";
import { DayModifiers } from "react-day-picker/types";
import FormInputWrapperType from "../FormInputWrapper";

export type DateInputType = FormInputType & {
  /** The Date value of the input */
  value: Date;
  /** The function called with the value(s) returned as arguments after input is changed */
  onChange: (
    day: Date,
    DayModifiers?: DayModifiers,
    dayPickerInput?: DayPickerInput
  ) => void;
  /** The function called after the input is blurred*/
  onBlur?: () => void | React.FocusEvent;
  /** The moment string format used to show the date in text form */
  format?: string;
};

type ControlledDateInputType = DateInputType & FormInputWrapperType;

export default ControlledDateInputType;
