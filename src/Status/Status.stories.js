import React from "react";
import Status from "./Status";

const Template = (args) => <Status {...args}>{args.children}</Status>;

export const Default = Template.bind({});
Default.args = {
  type: "warning",
  children: "Error",
};

export default {
  title: "Status",
  component: Status,
  parameters: {
    componentSubtitle:
      "A component that contains its children in different colours depending on the type",
  },
};
