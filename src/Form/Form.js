import React from "react";
import * as PropTypes from "prop-types";
import { useFormContext, FormProvider } from "react-hook-form";

const FormContainer = ({ children, onSubmit, onBlur }) => {
  const { handleSubmit } = useFormContext();

  const onFormSubmit = async (values) => {
    if (onBlur) {
      return await onBlur(values);
    }

    if (onSubmit) {
      return await onSubmit(values);
    }
  };

  return (
    <form
      {...(onSubmit && { onSubmit: handleSubmit(onFormSubmit) })}
      {...(onBlur && { onBlur: handleSubmit(onFormSubmit) })}
    >
      {children}
    </form>
  );
};

const Form = ({ onSubmit, onBlur, children, ...props }) => {
  return (
    <FormProvider {...props}>
      <FormContainer {...{ onSubmit, onBlur }}>{children}</FormContainer>
    </FormProvider>
  );
};

FormContainer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Form.propTypes = {
  /** The function called when all the values of the form if validation passes and form submits */
  onSubmit: PropTypes.func.isRequired,
  /** function called after an onBlur event occurs */
  onBlur: PropTypes.func,
  /** An object of default values to  */
  defaultValues: PropTypes.object,
  /** react hook form useForm methods which is passed via FormProvider and context */
  formMethods: PropTypes.object,
  /** The Form inputs that would have access to the `useFormContext()` hook */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Form;
