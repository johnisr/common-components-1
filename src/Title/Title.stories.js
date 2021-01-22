import React from "react";
import FontAwesome from "react-fontawesome";
import Title from "./Title";

const Template = (args) => <Title {...args} />;

export const Header = Template.bind({});
Header.args = {
  children: "Title Text",
};

const customTitle = (
  <div>
    <FontAwesome name="arrow-left" style={{ marginRight: "10px" }} />
    Title
  </div>
);

export const CustomChildren = Template.bind({});
CustomChildren.args = {
  children: customTitle,
};
CustomChildren.argTypes = {
  children: {
    control: { type: "none" },
  },
};

export default {
  title: "Title",
  component: Title,
  parameters: {
    componentSubtitle:
      "The <Title> component adheres to and enforces the Design Guidelines on its children text",
  },
};
