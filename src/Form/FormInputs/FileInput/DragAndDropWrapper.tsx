import React, { useState } from "react";
import DragAndDropWrapperType from "../../../types/Form/FormInputs/FileInput/DragAndDropWrapper";
import FontAwesome from "react-fontawesome";
import classNames from "classnames/bind";
import styles from "./DragAndDropWrapper.module.scss";

const cx = classNames.bind(styles);

const useDragAndDrop = (
  onChange: (files: FileList | undefined | null) => void,
  disabled: boolean
) => {
  const [dragState, setDragState] = useState("");

  const onDragEnter = (event: React.DragEvent) => {
    if (dragState !== "enter") {
      setDragState("enter");
    }

    console.log("onDragEnter");

    event.preventDefault();
    event.stopPropagation();
  };

  const onDragOver = (event: React.DragEvent) => {
    if (dragState !== "enter") {
      setDragState("enter");
    }

    console.log("onDragOver");

    event.preventDefault();
    event.stopPropagation();
  };

  const onDragLeave = (event: React.DragEvent) => {
    if (dragState !== "") {
      setDragState("");
    }

    console.log("onDragLeave");

    event.preventDefault();
    event.stopPropagation();
  };

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setDragState("");
    if (!disabled) {
      onChange(event.dataTransfer.files);
    }
  };

  const dragClassName =
    dragState === "enter" && !disabled ? "draggingOver" : "";

  return { onDragEnter, onDragOver, onDragLeave, onDrop, dragClassName };
};

const uploadIcon = (
  <div className="fa-stack">
    <FontAwesome name="circle" stack="2x" />

    <FontAwesome name="cloud-upload" className={cx("overlayIcon")} stack="1x" />
  </div>
);

export const dragOverlayText = (
  <div className={cx("overlay")}>
    <div className={cx("overlayText")}>{uploadIcon} Drop files to upload</div>
  </div>
);

const DragAndDropWrapper: React.FC<DragAndDropWrapperType> = ({
  onChange,
  isDisabled,
  render,
  ...props
}) => {
  const { dragClassName, ...dragProps } = useDragAndDrop(onChange, isDisabled);

  return render({
    ...props,
    onChange,
    isDisabled,
    dragClassName,
    ...dragProps,
  });
};

export default DragAndDropWrapper;
