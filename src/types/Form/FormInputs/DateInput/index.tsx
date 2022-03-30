import FormInputType from "..";
import { Matcher } from "react-day-picker";
import FormInputWrapperType from "../FormInputWrapper";

export type DateInputType = FormInputType & {
  /** The Date value of the input */
  value: Date;
  /** The function called with the value(s) returned as arguments after input is changed */
  onChange: (day?: Date) => void;
  /** The function called after the input is blurred*/
  onBlur?: () => void | React.FocusEvent;
  /** The moment string format used to show the date in text form */
  format?: string;
  /** identify a list of dates to be disabled */
  disabled?: Matcher | Matcher[];
  /** identify a list of dates to be hidden */
  hidden?: Matcher | Matcher[];
};

type ControlledDateInputType = DateInputType & FormInputWrapperType;

export default ControlledDateInputType;
