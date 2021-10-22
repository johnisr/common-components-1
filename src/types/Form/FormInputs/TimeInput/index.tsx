import FormInputType from "..";
import FormInputWrapperProps from "../FormInputWrapper";

export type TimeInputType = FormInputType & {
  /** The Date value of the input */
  value: Date;
  /** The function called with the value(s) returned as arguments after input is changed */
  onChange: (newValue: Date | undefined) => void;
  /** The function called after the input is blurred */
  onBlur?: () => void | React.FocusEvent;
  /** The moment string format used to show the date in text form */
  format?: string;
  /** Does the am/pm column in the overlay get shown */
  use12Hours?: boolean;
  /** Does the seconds column section in the overlay get shown */
  showSecond?: boolean;
};

type ControlledTimeInputType = TimeInputType & FormInputWrapperProps;

export default ControlledTimeInputType;
