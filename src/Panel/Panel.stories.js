import React from "react";
import FontAwesome from "react-fontawesome";
import Panel from "./Panel";

const Template = (args) => <Panel {...args}>Content</Panel>;

export const Default = Template.bind({});
Default.args = {
  title: "Title Text",
  style: { height: "500px", width: "500px" },
};

export const WithCustomTitle = Template.bind({});
WithCustomTitle.storyName = "Panel With custom title";
WithCustomTitle.args = {
  ...Default.args,
  title: (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      Panel with a close button
      <FontAwesome name="times" />
    </div>
  ),
};

export default {
  title: "Panel",
  component: Panel,
  parameters: {
    componentSubtitle:
      "A wrapper component that enforces the same padding and border around content",
  },
};
