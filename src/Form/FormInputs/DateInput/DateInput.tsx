import React from "react";
import { DayPicker } from "react-day-picker";
import classNames from "classnames/bind";
import inputStyles from "./DateInput.module.scss";
import overlayStyles from "./DateOverlay.module.scss";
import config from "../../../../config";
import FormInputWrapper from "../FormInputWrapper";
import ControlledDateInputType, {
  DateInputType,
} from "../../../types/Form/FormInputs/DateInput";
import FormIcon from "../FormIcon";
import useDateInput from "./useDateInput";
import { Popover } from "react-tiny-popover";
import { getTimeStringFromDate } from "../../../utils/timeFormatter";

const inputCx = classNames.bind(inputStyles);

export const DateInput: React.FC<DateInputType> = ({
  name,
  placeholder,
  value,
  onBlur,
  onChange,
  format = config.DATE_FORMAT,
  isDisabled,
  showIcon,
  isValidated = false,
  isError,
  inputRef,
  disabled,
  hidden,
}: DateInputType) => {
  const { inputProps, dayPickerProps, popoverProps } = useDateInput({
    value,
    onChange,
    onBlur,
    format,
    placeholder,
  });

  return (
    <Popover
      {...popoverProps}
      positions={["bottom"]}
      align="start"
      padding={16}
      containerClassName={overlayStyles.overlay}
      content={() => (
        <DayPicker
          {...dayPickerProps}
          classNames={overlayStyles}
          formatters={{
            formatWeekdayName: (date) =>
              getTimeStringFromDate(date, "ddd").slice(0, 1),
          }}
          disabled={disabled}
          hidden={hidden}
        />
      )}
    >
      <div className={inputCx("container")} style={{ position: "relative" }}>
        <input
          {...inputProps}
          id={name}
          className={inputCx("input", {
            "input--error": isError,
            "input--disabled": isDisabled,
            "input--truncated": showIcon,
          })}
          placeholder={placeholder}
          ref={inputRef}
          disabled={isDisabled}
          autoComplete="off"
        />

        {showIcon && (
          <FormIcon
            isValidated={isValidated}
            isError={isError}
            isDisabled={isDisabled}
            name="calendar"
          />
        )}
      </div>
    </Popover>
  );
};

const ControlledDateInput = (props: ControlledDateInputType) => {
  return <FormInputWrapper {...props} as={DateInput} />;
};

export default ControlledDateInput;
