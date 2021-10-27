export type FormIconType = {
  /** has the input been touched or the form submitted */
  isValidated: boolean;
  /** has input validation failed */
  isError: boolean;
  /** is the input in a non-interactive state */
  isDisabled: boolean;
  /** The FontAwesome Icon used when the input has not been validated yet */
  name?: string;
  /** The className given to all the icons */
  className?: string;
  /** The FontAwesome Icon displayed when input passes validation. Defaults to `check`. */
  validatedIconName?: string | undefined;
  /** The FontAwesome Icon displayed when input fails validation. Defaults to `exclamation-circle`*/
  errorIconName?: string | undefined;
};

export default FormIconType;
