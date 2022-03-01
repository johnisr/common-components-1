import React, { useState } from "react";
import Page from "../Page/Page";
import ControlLabel from "./ControlLabel";
import { MultiDropdownInputWithSearch } from "..";

const Template = (args) => {
  const [value, setValue] = useState(undefined);

  return (
    <Page title="ControlLabel">
      <ControlLabel {...args}>
        <MultiDropdownInputWithSearch
          options={[
            { name: "Validere Calgary Facility 1", id: 1 },
            { name: "Validere Houston Facility 2", id: 1 },
            { name: "Validere Toronto Facility 3", id: 1 },
          ]}
          label="Sites"
          labelKey="name"
          width={100}
          onChange={(value) => setValue(value)}
          value={value}
        />
      </ControlLabel>
    </Page>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "A label",
};

export default {
  title: "ControlLabel",
  component: ControlLabel,
  parameters: {
    componentSubtitle:
      "A wrapper component that enforces label and spacing for a control not bound to a form",
  },
};
