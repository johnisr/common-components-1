import moment from "moment";
import React, { useEffect, useState } from "react";
import { getTimeStringFromDate } from "../../../utils/timeFormatter";
import {
  DayClickEventHandler,
  MonthChangeEventHandler,
} from "react-day-picker";
import config from "../../../../config";
import {
  AssertIsAfterOrEqualDate,
  AssertIsBeforeOrEqualDate,
} from "../../../utils/assert";

const STRICT_MATCHING = true;
const TODAY = new Date();

export const useInput = ({
  value,
  format = config.DATE_FORMAT,
  fromDate,
  toDate,
  placeholder,
  onChange,
  onBlur,
}: useInputProps) => {
  const [month, setMonth] = useState(value ?? TODAY);
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(
    value ?? TODAY
  );

  const defaultInputValue = getTimeStringFromDate(
    value ?? TODAY,
    config.DATE_FORMAT
  );
  const [inputValue, setInputValue] = useState(defaultInputValue);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleDayClick: DayClickEventHandler = (day) => {
    setSelectedDay(day);
    setInputValue(day ? getTimeStringFromDate(day, format) : "");
  };

  const handleMonthChange: MonthChangeEventHandler = (month) => {
    setMonth(month);
  };

  // When changing the input field, save its value in state and check if the
  // string is a valid date. If it is a valid day, set it as selected and update
  // the calendar’s month.
  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);

    const day = moment(e.target.value, format, STRICT_MATCHING);

    const isBefore = fromDate && AssertIsBeforeOrEqualDate(day, fromDate);
    const isAfter = toDate && AssertIsAfterOrEqualDate(day, toDate);

    if (day.isValid() && !isBefore && !isAfter) {
      setMonth(day.toDate());
    }
    setSelectedDay(day.toDate() ?? undefined);
  };

  const handleInputClick = () => {
    setIsPopoverOpen(true);
  };

  const handleOnClickOutside = () => {
    setIsPopoverOpen(false);
    onBlur?.();

    if (moment(selectedDay, format).isValid()) {
      onChange?.(selectedDay);
    }
  };

  // When popover closes, ensure the internal state controlling input/calendar
  // matches outside state
  useEffect(() => {
    if (!isPopoverOpen) {
      setSelectedDay(value ?? TODAY);
      setMonth(value ?? TODAY);
      setInputValue(getTimeStringFromDate(value ?? TODAY, format));
    }
  }, [value, isPopoverOpen]);

  const dayPickerProps = {
    month: month,
    onDayClick: handleDayClick,
    onMonthChange: handleMonthChange,
    selected: selectedDay,
    fromDate,
    toDate,
  };

  const inputProps = {
    onChange: handleInputChange,
    onClick: handleInputClick,
    value: inputValue,
    placeholder: getTimeStringFromDate(placeholder ?? TODAY, format),
  };

  const popoverProps = {
    isOpen: isPopoverOpen,
    onClickOutside: handleOnClickOutside,
  };

  return { dayPickerProps, inputProps, popoverProps };
};

type useInputProps = {
  value?: Date;
  fromDate?: Date;
  toDate?: Date;
  format?: string;
  placeholder?: string;
  onBlur?: () => void;
  onChange?: (date?: Date) => void;
};

export default useInput;
