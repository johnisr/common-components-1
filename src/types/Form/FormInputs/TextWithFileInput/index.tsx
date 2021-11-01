import { ReactElement, DragEvent } from "react";
import FormInputType from "..";
import FormInputWrapperType from "../FormInputWrapper";

export type TextWithFileInputValueType = {
  text: string | undefined;
  files: FileList | File[] | null | undefined;
};

export type TextWithFileInputType = FormInputType & {
  /** The current value of the TextWithFileInput */
  value: TextWithFileInputValueType;
  /** The function called after the input is changed */
  onChange: (newValues: TextWithFileInputValueType) => void;
  /** The function called after the input is blurred */
  onBlur: () => void;
  /** Does the file input accept more than one file or not */
  multiple: boolean;
  /** The placeholder text for the text area input */
  textAreaPlaceholder: string | undefined;
  /** The placeholder text for the file input */
  fileInputPlaceholder: string | undefined;
};

type ControlledTextWithFileInputType = TextWithFileInputType &
  FormInputWrapperType;

export default ControlledTextWithFileInputType;
