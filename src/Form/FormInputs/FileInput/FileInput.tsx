import React, { useState, useMemo } from "react";
import classNames from "classnames/bind";
import styles from "./FileInput.module.scss";
import FormInputWrapper from "../FormInputWrapper";
import Button from "../../../Button/Button";
import FormIcon from "../FormIcon";
import {
  fileTypeFromExtension,
  getFileIconName,
  getReadableFileSize,
} from "./FileInputHelper";
import FontAwesome from "react-fontawesome";
import DragAndDropWrapper, { dragOverlayText } from "./DragAndDropWrapper";
import ControlledFileInputType, {
  FileInputType,
} from "../../../types/Form/FormInputs/FileInput";

const cx = classNames.bind(styles);

export const FileInput: React.FC<FileInputType> = ({
  name,
  placeholder = "Drag files here (max. 20 MB)",
  className = "",
  style,
  showIcon = false,
  isDisabled = false,
  isValidated = false,
  isError = false,
  inputRef,
  value: files,
  onChange,
  onBlur,
  multiple = false,
  dragClassName,
  onDragEnter,
  onDragOver,
  onDragLeave,
  onDrop,
}) => {
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.files);
  };

  const onFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    onBlur?.();
    onDrop?.(event);
  };

  const fileInputText = useMemo(() => {
    if (files?.length) {
      const fileName = Array.from(files)
        .map((file) => file.name)
        .join(", ");

      return files.length === 1
        ? fileName
        : `${files.length} files attached (${fileName})`;
    }
    return placeholder;
  }, [files, placeholder]);

  const fileSizeString = useMemo(() => {
    if (!files?.length) return null;

    const totalSize = Array.from(files).reduce(
      (total, file) => total + file.size,
      0
    );
    return getReadableFileSize(totalSize);
  }, [files]);

  const fileType = files?.length ? fileTypeFromExtension(files[0]?.name) : "";
  const fileIconName = files?.length ? getFileIconName(fileType) : undefined;

  return (
    <div
      className={`${cx("wrapper", dragClassName, {
        "wrapper--truncated": showIcon,
        "wrapper--fileInfo": files?.length,
        "wrapper--validated": isValidated,
        "wrapper--error": isError,
        "wrapper--disabled": isDisabled,
      })} ${className}`}
      style={style}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onFileDrop}
    >
      {dragClassName && dragOverlayText}

      {showIcon && (
        <FormIcon
          name="paperclip"
          isValidated={isValidated}
          isError={isError}
          isDisabled={isDisabled}
          validatedIconName={fileIconName}
          errorIconName="exclamation-triangle"
          className={cx("icon", {
            disablePointerEvents: dragClassName,
          })}
        />
      )}

      <label
        className={cx("status", {
          disablePointerEvents: dragClassName,
        })}
        htmlFor={name}
      >
        <div className={cx("fileName", "truncated")}>{fileInputText}</div>
        {fileSizeString && (
          <div className={cx("fileSize")}>{fileSizeString}</div>
        )}
      </label>

      <input
        id={name}
        className={cx("input", {
          disablePointerEvents: dragClassName,
        })}
        placeholder={placeholder}
        onBlur={onBlur}
        ref={inputRef}
        disabled={isDisabled}
        onChange={onFileChange}
        type="file"
        multiple={multiple}
      />

      {files?.length ? (
        <div className={cx("closeIconContainer")}>
          <FontAwesome
            name="times-circle-o"
            className={`fa fa-fw ${cx("closeIcon", {
              "closeIcon--disabled": isDisabled,
              disablePointerEvents: dragClassName,
            })}`}
            onClick={!isDisabled ? () => onChange(undefined) : undefined}
          />
        </div>
      ) : (
        <Button
          as="label"
          htmlFor={name}
          className={cx("button", {
            disablePointerEvents: dragClassName,
          })}
          variant="primary"
          disabled={isDisabled}
        >
          Choose File
        </Button>
      )}
    </div>
  );
};

const ControlledFileInput = (props: ControlledFileInputType) => {
  return (
    <FormInputWrapper
      {...props}
      as={(props: FileInputType) => (
        <DragAndDropWrapper render={FileInput} {...props} />
      )}
    />
  );
};

export default ControlledFileInput;
