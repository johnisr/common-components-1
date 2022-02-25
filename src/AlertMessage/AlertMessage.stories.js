import React from "react";
import AlertMessage from "./AlertMessage";

const Template = ({ ...args }) => (
  <AlertMessage {...args}>{args.children}</AlertMessage>
);

export const Default = Template.bind({});
Default.args = {
  type: "warning",
  simplified: false,
  onClose: true,
  children:
    "Changing the schedule will cause this workflow to restart the new scheduling period and cancel all current tasks under this window.",
};

export default {
  title: "AlertMessage",
  component: AlertMessage,
  parameters: {
    componentSubtitle:
      "A wrapper component that shows message below the child component on some trigger.",
  },
};
