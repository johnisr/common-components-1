import React from "react";
import MultiDropdownInputWithSearch from "./MultiDropdownInputWithSearch";
import { useArgs } from "@storybook/client-api";

const Template = (args) => {
  const [state, setState] = useArgs();

  const onChange = (value) => {
    if (args.isMulti) {
      setState({ value });
    } else {
      setState({ value: [value] });
    }
  };

  return <MultiDropdownInputWithSearch {...args} onChange={onChange} />;
};

export const Default = Template.bind({});
Default.args = {
  options: [
    "Validere Calgary Facility 1",
    "Validere Houston Facility 2",
    "Validere Toronto Facility 3",
  ],
  label: "Sites",
  width: 100,
  selectLimit: 2,
  isMulti: true,
};

export const WithObjectOptions = Template.bind({});
WithObjectOptions.args = {
  options: [
    { name: "Validere Calgary Facility 1", id: 1 },
    { name: "Validere Houston Facility 2", id: 1 },
    { name: "Validere Toronto Facility 3", id: 1 },
  ],
  label: "Sites",
  labelKey: "name",
  width: 100,
  isMulti: true,
};
WithObjectOptions.storyName = "With object options";

export default {
  title: "MultiDropdownInputWithSearch",
  component: MultiDropdownInputWithSearch,
  parameters: {
    componentSubtitle:
      "A standalone component that can be used to select multiple options",
  },
};
