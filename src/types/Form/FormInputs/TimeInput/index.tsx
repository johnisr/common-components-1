import FormInputProps from "..";
import FormInputWrapperProps from "../FormInputWrapper";

export type TimeInputProps = Omit<FormInputProps, "value" | "onChange"> & {
  /** The Date value of the input */
  value: Date;
  /** The function called with the value(s) returned as arguments after input is changed */
  onChange: (newValue: Date | undefined) => void;
  /** The moment string format used to show the date in text form */
  format?: string;
  /** Does the am/pm column in the overlay get shown */
  use12Hours?: boolean;
  /** Does the seconds column section in the overlay get shown */
  showSecond?: boolean;
};

type ControlledTimeInputProps = TimeInputProps & FormInputWrapperProps;

export default ControlledTimeInputProps;
