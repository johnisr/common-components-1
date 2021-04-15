import React from "react";
import Breadcrumbs from "./Breadcrumbs";

const Template = (args) => <Breadcrumbs {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  breadcrumbs: [
    { title: "Previously", onClick: () => alert("First breadcrumb clicked") },
    { title: "Navigated", onClick: () => alert("Second breadcrumb clicked") },
    { title: "Pages", onClick: () => alert("Third breadcrumb clicked") },
    { title: "Current Page", onClick: () => alert("Last breadcrumb disabled") },
  ],
};

export default {
  title: "Breadcrumbs",
  component: Breadcrumbs,
  parameters: {
    componentSubtitle:
      "A component for showing where a user is currently in the website's hierarchy",
  },
};
