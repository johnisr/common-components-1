import React, { useState } from "react";
import TextInput from "./FormInputs/TextInput";
import { useArgs } from "@storybook/client-api";
import Page from "../Page/Page";
import Panel from "../Panel/Panel";
import CommonForm from "./Form";
import FormButton from "./FormButton";
import FormLabel from "./FormLabel";
import FormError from "./FormError";
import ControlledSelectInput, {
  SelectInput,
} from "./FormInputs/SelectInput/SelectInput";
import FormInputWrapper from "./FormInputs/FormInputWrapper";
import useForm from "../utils/hooks/useForm";
import moment from "moment";
import ControlledDateInput, {
  DateInput,
} from "./FormInputs/DateInput/DateInput";
import ControlledTimeInput, {
  TimeInput,
} from "./FormInputs/TimeInput/TimeInput";
import ControlledDateTimeInput, {
  DateTimeInput,
} from "./FormInputs/DateTimeInput/DateTimeInput";
import config from "../../config";
import ControlledFileInput, {
  FileInput,
} from "./FormInputs/FileInput/FileInput";
import ControlledTextAreaInput, {
  TextAreaInput,
} from "./FormInputs/TextAreaInput/TextAreaInput";
import ControlledTextWithFileInput, {
  TextWithFileInput,
} from "./FormInputs/TextWithFileInput/TextWithFileInput";

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

const ButtonContainer = (props) => {
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

const ExtraControls = (props) => {
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

const Template = (args) => {
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

  const { children, ...props } = args;

  return (
    <Page title="Form">
      <Form onSubmit={onSubmit} defaultValues={state.defaultValues}>
        <Panel>
          {children(props)}

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
  isRequired: true,
  showIcon: true,
  isDisabled: false,
  className: "",
  style: {},
  unit: "",
  type: "string",
  children: (props) => <TextInput {...props} />,
};
TextInputForm.storyName = "TextInput";

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
  isRequired: true,
  showIcon: true,
  isDisabled: false,
  isClearable: true,
  isMulti: false,
  isLoading: false,
  closeMenuOnSelect: true,
  className: "",
  style: null,
  options: ["one", "two", "three"],

  children: (props) => (
    <div>
      <ControlledSelectInput {...props} />
    </div>
  ),
};
SelectInputForm.storyName = "SelectInput";

export const DateInputForm = Template.bind({});
DateInputForm.args = {
  name: "dateInput",
  label: "Enter Date",
  placeholder: null,
  validate: {
    laterThanToday: (date) => {
      return (
        (!!date && moment(date).isSameOrAfter(moment())) ||
        "Date must be later than today"
      );
    },
  },
  isRequired: true,
  showIcon: true,
  isDisabled: false,
  format: config.DATE_FORMAT,
  className: "",
  style: {},
  children: (props) => <ControlledDateInput {...props} />,
};
DateInputForm.storyName = "DateInput";

export const TimeInputForm = Template.bind({});
TimeInputForm.args = {
  name: "timeInput",
  label: "Enter Time",
  placeholder: null,
  validate: {
    laterThanPresent: (date) => {
      return (
        (!!date && moment(date).isSameOrAfter(moment(), "second")) ||
        "Time must be in the future"
      );
    },
  },
  isRequired: true,
  showIcon: true,
  isDisabled: false,
  format: config.TIME_FORMAT,
  className: "",
  style: {},
  use12Hours: true,
  showSecond: false,
  children: (props) => <ControlledTimeInput {...props} />,
};
TimeInputForm.storyName = "TimeInput";

export const DateTimeInputForm = Template.bind({});
DateTimeInputForm.args = {
  name: "dateTimeInput",
  label: "Enter Time",
  placeholder: null,
  validate: {
    laterThanPresentMinute: (date) => {
      return (
        (!!date && moment(date).isSameOrAfter(moment(), "minute")) ||
        "Date and time must be later than the present minute"
      );
    },
  },
  isRequired: true,
  showIcon: true,
  isDisabled: false,
  format: "HH:mm:ss",
  className: "",
  style: {},
  use12Hours: true,
  showSecond: false,
  children: (props) => <ControlledDateTimeInput {...props} />,
};
DateTimeInputForm.storyName = "DateTimeInput";

export const FileInputForm = Template.bind({});
FileInputForm.args = {
  name: "fileInput",
  label: "Upload File",
  placeholder: "Drag files here (max. 20 MB)",
  multiple: true,
  attached: false,
  validate: {},
  isRequired: true,
  showIcon: true,
  isDisabled: false,
  className: "",
  style: {},
  children: (props) => <ControlledFileInput {...props} />,
};
FileInputForm.storyName = "FileInput";

export const TextAreaInputForm = Template.bind({});
TextAreaInputForm.args = {
  name: "textAreaInput",
  label: "Description",
  placeholder: "Enter Text here",
  validate: {},
  isRequired: true,
  showIcon: true,
  isDisabled: false,
  className: "",
  style: {},
  children: (props) => <ControlledTextAreaInput {...props} />,
};
TextAreaInputForm.storyName = "TextAreaInput";

export const TextWithFileInputForm = Template.bind({});
TextWithFileInputForm.args = {
  name: "textAreaWithFileInput",
  label: "Upload File",
  textAreaPlaceholder: "Type your note here",
  fileInputPlaceholder: "Drag files here (max. 20 MB)",
  validate: {},
  multiple: true,
  isRequired: true,
  showIcon: true,
  isDisabled: false,
  className: "",
  style: {},
  children: (props) => <ControlledTextWithFileInput {...props} />,
};
TextWithFileInputForm.storyName = "TextWithFileInput";

const MultipleInputFormChildren = (props) => {
  const shared = { isDisabled: props.isDisabled };
  return (
    <>
      <div style={{ marginBottom: "20px", textAlign: "right" }}>
        Note: controls only affect Select Input
      </div>

      <TextInput {...shared} name="firstName" label="First Name" showIcon />

      <TextInput
        {...shared}
        name="lastName"
        label="Last Name"
        isRequired
        showIcon
      />

      <ControlledDateInput
        {...shared}
        name="date"
        label="Date"
        isRequired
        showIcon
      />

      <ControlledTimeInput {...shared} name="someTime" label="Time" showIcon />

      <ControlledDateTimeInput
        {...shared}
        name="someDateTime"
        label="DateTime"
        showIcon
        isRequired
      />

      <ControlledTextAreaInput
        {...shared}
        name="description"
        label="Description"
        showIcon
        isRequired
      />

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
  isRequired: true,
  showIcon: true,
  isDisabled: false,
  isClearable: false,
  isMulti: false,
  isLoading: false,
  closeMenuOnSelect: true,
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
MultipleInputForm.storyName = "Multiple Inputs";

export default {
  title: "Form/FormInputs",
  component: TextInput,
  subcomponents: {
    SelectInput,
    DateInput,
    TimeInput,
    DateTimeInput,
    FileInput,
    TextAreaInput,
    TextWithFileInput,
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
