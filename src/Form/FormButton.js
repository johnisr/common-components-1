import React from "react";
import * as PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import Button from "../Button/Button";

/** An extension of the Button component to work with Forms (submission and reset) */
const FormButton = ({ children, ...props }) => {
  const { formState, reset } = useFormContext();

  const onReset = () => {
    reset();
    props.onClick?.();
  };

  return (
    <Button
      {...props}
      isLoading={props.isLoading || formState.isSubmitting}
      disabled={props.disabled || formState.isSubmitting}
      onClick={props.type === "reset" ? onReset : props.onClick}
    >
      {children}
    </Button>
  );
};

FormButton.propTypes = {
  /** If true, the button will become greyed-out and not responsive to actions */
  disabled: PropTypes.bool,
  /** Shows a loader in the button as well as greying out the button */
  isLoading: PropTypes.bool,
  /** The content of the button */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  /** The function called if the button is pressed */
  onClick: PropTypes.func,
  /** Determines whether it's just a button or has interactions with forms (reset, submit) */
  type: PropTypes.oneOf(["button", "reset", "submit"]),
};

export default FormButton;
