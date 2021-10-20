import React from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import MomentLocaleUtils from "react-day-picker/moment";
import {
  NavbarElementProps,
  WeekdayElementProps,
} from "react-day-picker/types";
import classNames from "classnames/bind";
import FontAwesome from "react-fontawesome";
import inputStyles from "./DateInput.module.scss";
import overlayStyles from "./DateOverlay.module.scss";
import navbarElementStyles from "./DateNavBar.module.scss";
import config from "../../../../config";
import { getTimeStringFromDate } from "../../../utils/timeFormatter";
import FormInputWrapper from "../FormInputWrapper";
import ControlledDateInputType, {
  DateInputProps,
} from "../../../types/Form/FormInputs/DateInput";

const navCx = classNames.bind(navbarElementStyles);
const inputCx = classNames.bind(inputStyles);

const NavBarElement = ({
  onPreviousClick,
  onNextClick,
  className,
  showNextButton,
  showPreviousButton,
}: NavbarElementProps) => {
  return (
    <div className={className}>
      {showPreviousButton && (
        <FontAwesome
          name="chevron-left"
          className={`fa fa-fw ${navCx("icon")}`}
          onClick={() => onPreviousClick()}
        />
      )}
      {showNextButton && (
        <FontAwesome
          name="chevron-right"
          className={`fa fa-fw ${navCx("icon", "icon--right")}`}
          onClick={() => onNextClick()}
        />
      )}
    </div>
  );
};

const WeekDayElement = ({
  weekday,
  className,
  localeUtils,
  locale,
}: WeekdayElementProps) => {
  const weekdayName = localeUtils.formatWeekdayLong(weekday, locale);
  return (
    <div className={className} title={weekdayName}>
      {weekdayName.slice(0, 1)}
    </div>
  );
};

const getIcon = (
  isValidated: boolean,
  isError: boolean,
  isDisabled: boolean
) => {
  if (!isValidated) {
    return (
      <div className={inputCx("icon")}>
        <FontAwesome name="calendar" />
      </div>
    );
  } else {
    if (isError) {
      return (
        <div className={inputCx("icon", "icon--error")}>
          <FontAwesome name="exclamation-circle" />
        </div>
      );
    } else {
      return (
        <div className={inputCx("icon", { "icon--disabled": isDisabled })}>
          <FontAwesome name="check" />
        </div>
      );
    }
  }
};

export const DateInput: React.FC<DateInputProps> = ({
  onChange,
  onBlur,
  value,
  format = config.DATE_FORMAT,
  isDisabled,
  showIcon,
  isValidated = false,
  isError,
  inputRef,
  name,
  placeholder,
}: DateInputProps) => {
  const onDayChange = (value: Date) => {
    const time = getTimeStringFromDate(value, format);
    if (time !== "-") {
      onChange?.(value);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <DayPickerInput
        classNames={inputStyles}
        placeholder={placeholder || getTimeStringFromDate(value, format)}
        dayPickerProps={{
          classNames: overlayStyles,
          navbarElement: NavBarElement,
          weekdayElement: WeekDayElement,
        }}
        onDayPickerHide={onBlur}
        inputProps={{
          disabled: isDisabled,
          ref: inputRef,
          id: name,
          autoComplete: "off",
          className: inputCx({
            "input--error": isError,
          }),
        }}
        value={value}
        onDayChange={onDayChange}
        format={format}
        formatDate={MomentLocaleUtils.formatDate}
      />

      {showIcon && getIcon(isValidated, isError, isDisabled)}
    </div>
  );
};

const ControlledDateInput = (props: ControlledDateInputType) => {
  return <FormInputWrapper {...props} as={DateInput} />;
};

export default ControlledDateInput;
