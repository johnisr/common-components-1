import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import Page from "./Page";

const Template = (args) => (
  <Router>
    <Page {...args}>Content</Page>
  </Router>
);

export const Default = Template.bind({});
Default.args = {
  title: "Title Text",
  style: { height: "500px", border: "1px solid black" },
};

export const WithLink = Template.bind({});
WithLink.storyName = "Page With BackLink";
WithLink.args = {
  ...Default.args,
  link: "test",
};

export const WithOnClick = Template.bind({});
WithOnClick.storyName = "Page With onClick";
WithOnClick.args = {
  ...Default.args,
  onClick: () => alert("clicked"),
};

export default {
  title: "Page",
  component: Page,
  parameters: {
    componentSubtitle:
      "A wrapper component that enforces the same margins around content and between title and content",
  },
};
