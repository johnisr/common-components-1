export type FormIconType = {
  /** has the input been touched or the form submitted */
  isValidated: boolean;
  /** has input validation failed */
  isError: boolean;
  /** is the input in a non-interactive state */
  isDisabled: boolean;
  /** The FontAwesome Icon used when the input has not been validated yet */
  name?: string;
};

export default FormIconType;
