import React from "react";
import useForm from "../utils/hooks/useForm";
import CommonForm from "./Form";
import FormButton from "./FormHelpers/FormButton";

/* eslint-disable react/prop-types */

export const PrintJson = ({ data }) => (
  <div style={{ marginTop: "20px" }}>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>
);

// Putting the useForm declaration inside the Template function causes
// error (Storybook related)
export const Form = (props) => {
  const formMethods = useForm({
    mode: "onTouched",
    defaultValues: props.defaultValues,
  });

  return (
    <CommonForm onSubmit={props.onSubmit} {...formMethods}>
      {props.children}
    </CommonForm>
  );
};

export const ButtonContainer = (props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      <FormButton variant="error" type="reset" onClick={props.onReset}>
        Reset
      </FormButton>

      <FormButton variant="primary" type="submit">
        Submit Button
      </FormButton>
    </div>
  );
};

export const ExtraControls = (props) => {
  return (
    <>
      <div className="font-headline-sm">Extra Controls / Results</div>

      <div style={{ textAlign: "right" }}>
        <label style={{ marginRight: "10px" }} htmlFor="responseTime">
          Response Time
        </label>
        <input
          id="responseTime"
          style={{ marginTop: "20px" }}
          type="number"
          value={props.responseTime}
          onChange={(e) => props.setResponseTime(e.target.value)}
          step={500}
        />
      </div>

      {props.submittedArgs && <PrintJson data={props.submittedArgs} />}
    </>
  );
};
