import { useEffect } from "react";
import { useForm as useHookForm } from "react-hook-form";
import { usePrevious } from "./usePrevious";
import isEqual from "lodash/isEqual";

export const useForm = (props) => {
  const methods = useHookForm({ mode: "onTouched", ...props });

  // if defaultValues is updated, reset the form with those values
  const previousDefaultValues = usePrevious(props?.defaultValues);
  useEffect(() => {
    if (
      props?.defaultValues &&
      !isEqual(previousDefaultValues, props?.defaultValues)
    ) {
      methods.reset(props.defaultValues);
    }
  }, [props?.defaultValues]);

  return methods;
};

export default useForm;
