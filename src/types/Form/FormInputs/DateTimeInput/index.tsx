import FormInputProps from "..";
import FormInputWrapperProps from "../FormInputWrapper";

export type DateTimeInputProps = Omit<FormInputProps, "value" | "onChange"> & {
  /** The Date value of the input */
  value: Date;
  /** The function called with the value(s) returned as arguments after input is changed */
  onChange: (newValue: Date | undefined) => void;
  /** The moment string format used to show the date in text field */
  dateFormat?: string;
  /** The moment string format used to show the time in text field */
  timeFormat?: string;
  /** Hint displayed in the date input that disappears after input is entered */
  datePlaceholder?: string;
  /** Hint displayed in the time input that disappears after input is entered */
  timePlaceholder?: string;
  /** Does the am/pm column in the overlay get shown */
  use12Hours?: boolean;
  /** Does the seconds column section in the overlay get shown */
  showSecond?: boolean;
};

type ControlledDateTimeInputProps = DateTimeInputProps & FormInputWrapperProps;

export default ControlledDateTimeInputProps;
