import React from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import MomentLocaleUtils from "react-day-picker/moment";
import {
  NavbarElementProps,
  WeekdayElementProps,
  DayPickerProps,
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
  DateInputType,
} from "../../../types/Form/FormInputs/DateInput";
import FormIcon from "../FormIcon";

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
  dayPickerProps,
}: DateInputType) => {
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
          ...dayPickerProps,
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

      {showIcon && (
        <FormIcon
          isValidated={isValidated}
          isError={isError}
          isDisabled={isDisabled}
          name="calendar"
        />
      )}
    </div>
  );
};

const ControlledDateInput = (props: ControlledDateInputType) => {
  return <FormInputWrapper {...props} as={DateInput} />;
};

export default ControlledDateInput;
