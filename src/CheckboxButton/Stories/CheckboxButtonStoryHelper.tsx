import React from "react";
import { CheckboxButton } from "../..";
import { checkboxSizeOptions } from "../../types/CheckboxButton";

type MultipleCheckboxType = {
  onChange: (newValue: Record<string, boolean>) => void;
  onBlur: () => void;
  value: Record<string, boolean>;
  isDisabled: boolean;
  isOutline: boolean;
  size: typeof checkboxSizeOptions[number];
  name: string;
  inputRef: React.RefCallback<HTMLInputElement> | any;
};

const CHECKBOXES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/**
 * Example of a custom component that can be used with FormInputWrapper.
 * The Custom component should consider FormInputType and FormActionType
 * props as well as its own unique props.
 * - classname and style omitted for brevity
 * - placeholder, showIcon ignored as custom input has no place for it
 * - isValidated, isError ignored as custom input doesn't have anything
 *    for these states
 * - inputRef is passed by `FormInputWrapper` for focusing on input on error
 * - value, onChange are the key places to shape/control behaviour, value
 *    here is an object and `handleChange` is the intermediate function
 *    where all the inputs' onChange are managed. While values can be
 *    limited here (e.g. don't call onChange based on condition), it
 *    might be better to use the validation function in `FormInputWrapper`
 * - isOutline and size are the unique props for CheckboxButton and
 *    just pass them along in sharedProps
 */
export const MultipleCheckbox = ({
  onChange,
  onBlur,
  value,
  isDisabled,
  isOutline,
  inputRef,
  size,
}: MultipleCheckboxType) => {
  const handleChange = (day: string) => {
    onChange({
      ...value,
      [day]: !value?.[day],
    });
  };

  const sharedProps = {
    isDisabled,
    isOutline,
    onBlur,
    size,
  };

  return (
    <div>
      {CHECKBOXES.map((day) => {
        return (
          <CheckboxButton
            key={day}
            style={{ marginRight: "10px", marginBottom: "10px" }}
            name={day}
            value={value?.[day]}
            onChange={() => handleChange(day)}
            inputRef={inputRef}
            {...sharedProps}
          >
            {day}
          </CheckboxButton>
        );
      })}
    </div>
  );
};
