import React, { useState } from "react";
import TextInput from "./FormInputs/TextInput";
import { useArgs } from "@storybook/client-api";
import CommonForm from "./Form";
import FormButton from "./FormButton";
import FormLabel from "./FormLabel";
import FormError from "./FormError";
import ControlledSelectInput, { SelectInput } from "./FormInputs/SelectInput";
import FormInputWrapper from "./FormInputs/FormInputWrapper";
import { useForm } from "react-hook-form";
import styles from "../constants/index";

/* eslint-disable react/prop-types */

const PrintJson = ({ data }) => (
  <div style={{ marginTop: "20px" }}>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>
);

// Putting the useForm declaration inside the Template function causes
// error (Storybook related)
const Form = (props) => {
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

const ExtraControls = (props) => {
  return (
    <div
      style={{
        marginTop: "50px",
        border: `1px solid ${styles.background.lines}`,
        padding: "10px",
      }}
    >
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
    </div>
  );
};

const Template = (_args) => {
  const [state, updateState] = useArgs(_args);
  const [submittedArgs, setSubmittedArgs] = useState(null);
  const [responseTime, setResponseTime] = useState(1000);

  const onReset = () => {
    setSubmittedArgs(null);
  };

  const onSubmit = async (args) => {
    updateState({ isDisabled: true });

    await new Promise((resolve) => setTimeout(resolve, responseTime));
    setSubmittedArgs(args);

    updateState({ isDisabled: false });
  };

  const { children, ...props } = _args;

  return (
    <Form onSubmit={onSubmit} defaultValues={state.defaultValues}>
      <div
        style={{
          padding: "15px 10px",
          border: `1px solid ${styles.background.lines}`,
        }}
      >
        <div className="font-headline-md" style={{ marginBottom: "20px" }}>
          Form
        </div>

        {children(props)}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <FormButton type="danger" isReset onClick={onReset}>
            Reset
          </FormButton>

          <FormButton type="primary" isSubmit onClick={() => {}}>
            Submit Button
          </FormButton>
        </div>
      </div>

      <ExtraControls
        responseTime={responseTime}
        setResponseTime={setResponseTime}
        onReset={onReset}
        submittedArgs={submittedArgs}
      />
    </Form>
  );
};

export const TextInputForm = Template.bind({});
TextInputForm.args = {
  name: "textInput",
  label: "Enter text",
  placeholder: "Hello...",
  validate: {
    someValidation: (v) => {
      return v.length > 2 || "Text length must be greater than 2";
    },
  },
  isRequired: false,
  showIcon: false,
  isDisabled: false,
  className: "",
  style: {},
  children: (props) => <TextInput {...props} />,
};
TextInputForm.storyName = "Form with TextInput";

export const SelectInputForm = Template.bind({});
SelectInputForm.args = {
  name: "selectInput",
  label: "Select Option",
  placeholder: "Select Option...",
  validate: {
    someValidation: (v) => {
      return v !== "one" || "Don't select one";
    },
  },
  isRequired: false,
  showIcon: false,
  isDisabled: false,
  isClearable: false,
  isMulti: false,
  isLoading: false,
  closeMenuOnSelect: false,
  className: "",
  style: null,
  options: ["one", "two", "three"],

  children: (props) => (
    <div>
      <ControlledSelectInput {...props} />
    </div>
  ),
};
SelectInputForm.storyName = "Form with SelectInput";

const MultipleInputFormChildren = (props) => {
  return (
    <>
      <div style={{ marginBottom: "20px", textAlign: "right" }}>
        Note: controls only affect Select Input
      </div>

      <TextInput name="firstName" label="First Name" />

      <TextInput name="lastName" label="Last Name" isRequired showIcon />

      <ControlledSelectInput {...props} />
    </>
  );
};
export const MultipleInputForm = Template.bind({});
MultipleInputForm.args = {
  name: "selectInput",
  label: "Select Option",
  placeholder: "Select an Option",
  defaultValues: { firstName: "Bob" },
  isRequired: false,
  showIcon: false,
  isDisabled: false,
  isClearable: false,
  isMulti: false,
  isLoading: false,
  closeMenuOnSelect: false,
  className: "",
  style: null,
  validate: {
    someValidation: (v) => {
      if (Array.isArray(v)) {
        return (
          v.every((value) => value?.someProperty !== 10) || "Don't select ten"
        );
      }
      return v?.someProperty !== 10 || "Don't select ten";
    },
  },
  labelKey: "name",
  options: [
    { name: "ten", someProperty: 10 },
    { name: "twenty", someProperty: 20 },
    { name: "thirty", someProperty: 30 },
  ],
  children: (props) => <MultipleInputFormChildren {...props} />,
};
MultipleInputForm.storyName = "Form with Multiple Inputs";

export default {
  title: "Form",
  component: TextInput,
  subcomponents: {
    SelectInput,
    Form: CommonForm,
    FormLabel,
    FormError,
    FormButton,
    FormInputWrapper,
  },
  parameters: {
    componentSubtitle:
      "A wrapper component that controls form state and passes it down to its children",
  },
};
