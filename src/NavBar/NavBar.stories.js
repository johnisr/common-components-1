import React from "react";
import NavBar from "./NavBar";

const Template = (args) => <NavBar {...args}>Content</NavBar>;

export const Default = Template.bind({});
Default.args = {
  url: "http://localhost:9001/?path=/story/navbar--default&",
  activeApplication: "dashboard",
  permissions: {
    "dashboard:core": ["read"],
    "operations:core": ["read"],
    "commercial:core": ["read"],
    "esg:core": ["read"],
  },
  name: "Validere",
  onSignOut: () => alert("onSignOut button clicked"),
};

export default {
  title: "NavBar",
  component: NavBar,
};
