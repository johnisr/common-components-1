import { ReactElement, DragEvent } from "react";
import { FileInputType } from "..";
import FormInputType from "../..";

export type DragAndDropHookType = {
  /** The function called when a onDragEnter event is called */
  onDragEnter: (event: DragEvent) => void;
  /** The function called when a onDragOver event is called */
  onDragOver: (event: DragEvent) => void;
  /** The function called when a onDragLeave event is called */
  onDragLeave: (event: DragEvent) => void;
  /** The function called when a onDrop event is called */
  onDrop: (event: DragEvent) => void;
  /** The className given to the wrapper that changes as a function of the above event handlers */
  dragClassName: string;
};

type DragAndDropWrapperType = {
  /** The component to be rendered with the extra Drag and Drop hook props */
  render: (props: any) => React.FC<FileInputType> | any;
  /** The function called when a Drop Event occurs */
  onChange: (files: FileList | undefined | null) => void;
  /** Whether or not the rendered input should respond to Drag Events */
  isDisabled: boolean;
};

export default DragAndDropWrapperType;
