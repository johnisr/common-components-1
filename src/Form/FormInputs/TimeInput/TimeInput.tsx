import React, { useEffect } from "react";
import TimePicker from "rc-time-picker";
import FontAwesome from "react-fontawesome";
import inputStyles from "./TimeInput.module.scss";
import overlayStyles from "./TimeOverlay.module.scss";
import formIconStyles from "../FormIcon.module.scss";
import classNames from "classnames/bind";
import config from "../../../../config";
import moment, { Moment } from "moment";
import FormInputWrapper from "../FormInputWrapper";
import ControlledTimeInputType, {
  TimeInputType,
} from "../../../types/Form/FormInputs/TimeInput";
import FormIcon from "../FormIcon";

const inputCx = classNames.bind(inputStyles);
const overlayCx = classNames.bind(overlayStyles);
const formIconCx = classNames.bind(formIconStyles);

export const TimeInput: React.FC<TimeInputType> = ({
  onChange,
  onBlur,
  value,
  format = config.TIME_FORMAT,
  isDisabled,
  showIcon,
  isValidated = false,
  isError,
  inputRef,
  name,
  placeholder,
  use12Hours = false,
  showSecond = true,
}: TimeInputType) => {
  useEffect(() => {
    const input = document.querySelector<HTMLInputElement>(
      `.${inputCx("input")} input`
    );
    if (input) {
      input.setAttribute("autocomplete", "off");
      inputRef?.(input);
    }
  }, []);

  const onTimeChange = (newTime: Moment) => {
    onChange(newTime?.toDate() ?? undefined);
  };

  const clearIcon = (
    <div
      className={formIconCx("icon", "icon--clear", {
        "icon--bordered": showIcon,
      })}
    >
      <FontAwesome name="times" />
    </div>
  );

  return (
    <TimePicker
      className={inputCx("input", "timeInput", {
        "input--disabled": isDisabled,
        "input--error": isError,
      })}
      popupClassName={overlayCx("overlay", "timeOverlay", {
        "overlay--wide": showSecond && use12Hours,
      })}
      id={name}
      placeholder={placeholder}
      disabled={isDisabled}
      inputIcon={
        showIcon && (
          <FormIcon
            isValidated={isValidated}
            isError={isError}
            isDisabled={isDisabled}
            name="clock-o"
          />
        )
      }
      clearIcon={clearIcon}
      onChange={onTimeChange}
      onClose={onBlur}
      format={format}
      value={value ? moment(value) : undefined}
      use12Hours={use12Hours}
      showSecond={showSecond}
    />
  );
};

const ControlledTimeInput = (props: ControlledTimeInputType) => {
  return <FormInputWrapper {...props} as={TimeInput} />;
};

export default ControlledTimeInput;
