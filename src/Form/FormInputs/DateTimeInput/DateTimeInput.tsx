import React from "react";
import classNames from "classnames/bind";
import config from "../../../../config";
import { TimeInput } from "../TimeInput/TimeInput";
import { DateInput } from "../DateInput/DateInput";
import styles from "./DateTimeInput.module.scss";
import ControlledDateTimeInputType, {
  DateTimeInputType,
} from "../../../types/Form/FormInputs/DateTimeInput";
import FormInputWrapper from "../FormInputWrapper";

const cx = classNames.bind(styles);

export const DateTimeInput: React.FC<DateTimeInputType> = ({
  onChange,
  onBlur,
  value,
  isDisabled,
  showIcon,
  isValidated = false,
  isError,
  inputRef,
  name,
  dateFormat = config.DATE_FORMAT,
  timeFormat = config.TIME_FORMAT,
  datePlaceholder,
  timePlaceholder = "Time",
  use12Hours,
  showSecond,
}: DateTimeInputType) => {
  return (
    <div className={cx("wrapper")}>
      <DateInput
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        isDisabled={isDisabled}
        isValidated={isValidated}
        isError={isError}
        showIcon={showIcon}
        inputRef={inputRef}
        format={dateFormat}
        placeholder={datePlaceholder}
      />
      <TimeInput
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        isDisabled={isDisabled}
        isValidated={isValidated}
        isError={isError}
        showIcon={showIcon}
        format={timeFormat}
        use12Hours={use12Hours}
        showSecond={showSecond}
        placeholder={timePlaceholder}
      />
    </div>
  );
};

const ControlledDateTimeInput = (props: ControlledDateTimeInputType) => {
  return <FormInputWrapper {...props} as={DateTimeInput} />;
};

export default ControlledDateTimeInput;
