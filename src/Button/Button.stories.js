import React from "react";
import Button from "./Button";

const Template = (args) => <Button {...args}></Button>;

export const Default = Template.bind({});
Default.args = {
  children: "button text",
};

export default {
  title: "Button",
  component: Button,
  parameters: {
    componentSubtitle: "A button component",
  },
};
