import React from "react";
import classNames from "classnames/bind";
import styles from "./TextWithFileInput.module.scss";
import FormInputWrapper from "../FormInputWrapper";
import { TextAreaInput } from "../TextAreaInput/TextAreaInput";
import { FileInput } from "../FileInput/FileInput";
import DragAndDropWrapper, {
  dragOverlayText,
} from "../FileInput/DragAndDropWrapper";
import ControlledTextWithFileInputType, {
  TextWithFileInputType,
  TextWithFileInputValueType,
} from "../../../types/Form/FormInputs/TextWithFileInput";

const cx = classNames.bind(styles);

export const TextWithFileInput: React.FC<TextWithFileInputType> = ({
  onChange,
  onBlur,
  value,
  isDisabled,
  showIcon,
  isValidated = false,
  isError,
  inputRef,
  name,
  multiple = false,
  textAreaPlaceholder = "Type your note here",
}) => {
  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      text: e.target.value,
      files: value?.files,
    });
  };

  const onFileChange = (files: FileList | null | undefined) => {
    onChange({
      text: value?.text,
      files,
    });
  };

  const sharedProps = {
    name,
    onBlur,
    isDisabled,
    isValidated,
    isError,
    showIcon,
  };
  return (
    <DragAndDropWrapper
      onChange={onFileChange}
      isDisabled={isDisabled}
      render={({
        dragClassName,
        onDragEnter,
        onDragOver,
        onDragLeave,
        onDrop,
        wrapperRef,
      }) => (
        <div
          className={cx("wrapper", dragClassName, {
            "wrapper--error": isError,
            "wrapper--disabled": isDisabled,
          })}
          onDragEnter={onDragEnter}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          ref={wrapperRef}
        >
          {dragClassName && dragOverlayText}

          <TextAreaInput
            {...sharedProps}
            inputRef={inputRef}
            placeholder={textAreaPlaceholder}
            value={value?.text}
            onChange={onTextChange}
            className={cx("textArea")}
          />
          <FileInput
            {...sharedProps}
            // a unique name so its labels' `htmlFor` link to FileInput, not TextAreaInput
            name={`${name}-fileInput`}
            value={value?.files}
            onChange={onFileChange}
            className={cx("fileInput")}
            multiple={multiple}
            attached={true}
          />
        </div>
      )}
    />
  );
};

const ControlledTextWithFileInput = (
  props: ControlledTextWithFileInputType
) => {
  const validate = {
    ...props.validate,
    notEmptyValue: (value: TextWithFileInputValueType) => {
      return !!value?.text || `${props.label ?? "Input"} is required`;
    },
  };
  return (
    <FormInputWrapper {...props} validate={validate} as={TextWithFileInput} />
  );
};

export default ControlledTextWithFileInput;
