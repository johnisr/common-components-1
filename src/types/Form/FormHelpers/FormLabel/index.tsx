export type FormLabelType = {
  /** The className given to the FormLabel container */
  label?: React.ReactNode;
  /** The style given to the FormLabel Container */
  name: string;
  /** Shows the required label if true */
  isRequired?: boolean;
  /** Grey out the entire label if true */
  isDisabled?: boolean;
};

export default FormLabelType;
