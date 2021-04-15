import React from "react";
import Page from "./Page";

const Template = (args) => <Page {...args}>Content</Page>;

export const Default = Template.bind({});
Default.args = {
  title: "Title Text",
  style: { height: "500px", border: "1px solid black" },
};

export const WithOnClick = Template.bind({});
WithOnClick.storyName = "Page With onClick";
WithOnClick.args = {
  ...Default.args,
  onClick: () => alert("clicked"),
};

export const WithBreadcrumbs = Template.bind({});
WithBreadcrumbs.storyName = "Page With breadcrumbs";
WithBreadcrumbs.args = {
  ...Default.args,
  breadcrumbs: [
    { title: "Previously", onClick: () => alert("First breadcrumb clicked") },
    { title: "Navigated", onClick: () => alert("Second breadcrumb clicked") },
    { title: "Pages", onClick: () => alert("Third breadcrumb clicked") },
    { title: "Current Page", onClick: () => alert("Last breadcrumb disabled") },
  ],
};

export default {
  title: "Page",
  component: Page,
  parameters: {
    componentSubtitle:
      "A wrapper component that enforces the same margins around content and between title and content",
  },
};
