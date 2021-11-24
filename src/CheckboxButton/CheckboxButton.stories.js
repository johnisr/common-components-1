import React, { useState } from "react";
import Page from "../Page/Page";
import { useArgs } from "@storybook/client-api";
import { FormInputWrapper, Panel } from "..";
import CheckboxButton from "./CheckboxButton";
import { Form, ButtonContainer, ExtraControls } from "../Form/FormStoryHelpers";
import { MultipleCheckbox } from "./CheckboxButtonStoryHelper";

/* eslint-disable react/prop-types */

const Template = (_args) => {
  const [state, updateState] = useArgs();

  const onChange = () => {
    updateState({ value: !state.value });
  };

  return (
    <Page>
      <Panel>
        <CheckboxButton {...state} onChange={onChange} />
      </Panel>
    </Page>
  );
};

export const Default = Template.bind({});
Default.args = {
  children: "Hello world",
  isOutline: true,
  isDisabled: false,
  size: "small",
  value: false,
};

const CheckboxButtonWithFormTemplate = (args) => {
  const [state, updateState] = useArgs();
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

  const { component: Component, ...props } = args;

  return (
    <Page title="Form">
      <Form onSubmit={onSubmit} defaultValues={state.defaultValues}>
        <Panel>
          <Component {...props} />

          <ButtonContainer reset={props.reset} />
        </Panel>

        <Panel>
          <ExtraControls
            responseTime={responseTime}
            setResponseTime={setResponseTime}
            onReset={onReset}
            submittedArgs={submittedArgs}
          />
        </Panel>
      </Form>
    </Page>
  );
};

export const CheckboxButtonWithForm = CheckboxButtonWithFormTemplate.bind({});
CheckboxButtonWithForm.args = {
  children: "Hello world",
  isOutline: false,
  isDisabled: false,
  size: "small",
  name: "checkbox",
  component: (props) => <FormInputWrapper as={CheckboxButton} {...props} />,
};
CheckboxButtonWithForm.storyName = "Checkbox in form";

export const MultipleCheckboxWithForm = CheckboxButtonWithFormTemplate.bind({});
MultipleCheckboxWithForm.args = {
  children: "Hello world",
  isOutline: false,
  isDisabled: false,
  size: "medium",
  name: "checkbox",
  isRequired: true,
  label: "Days Selected",
  validate: {
    atMostThreeDaysSelected: (v = {}) => {
      return (
        Object.values(v)?.filter((v) => v)?.length < 4 ||
        "Can only select 3 days at most"
      );
    },
  },
  component: (props) => <FormInputWrapper as={MultipleCheckbox} {...props} />,
};
MultipleCheckboxWithForm.storyName = "Multiple Checkbox in Form";

export default {
  title: "CheckboxButton",
  component: CheckboxButton,
  parameters: {
    componentSubtitle: "A checkbox that looks like a button",
  },
};
