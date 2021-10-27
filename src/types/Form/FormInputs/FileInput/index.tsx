import { ReactElement, DragEvent } from "react";
import FormInputType from "..";
import FormInputWrapperType from "../FormInputWrapper";
import { DragAndDropHookType } from "./DragAndDropWrapper";

export type FileInputType = FormInputType & {
  /** The current value of the FileInput */
  value: FileList | null | undefined;
  /** The function called after the input is changed */
  onChange: (files: FileList | null | undefined) => void;
  /** The function called after the input is blurred */
  onBlur: () => void;
  /** Does the file input accept more than one file or not */
  multiple: boolean;
  /** The function called when a onDragEnter event is called */
  onDragEnter?: (event: DragEvent) => void;
  /** The function called when a onDragOver event is called */
  onDragOver?: (event: DragEvent) => void;
  /** The function called when a onDragLeave event is called */
  onDragLeave?: (event: DragEvent) => void;
  /** The function called when a onDrop event is called */
  onDrop?: (event: DragEvent) => void;
  /** The className given to the wrapper that changes as a function of the above event handlers */
  dragClassName?: string;
};

type ControlledFileInputType = FileInputType & FormInputWrapperType;

export default ControlledFileInputType;
