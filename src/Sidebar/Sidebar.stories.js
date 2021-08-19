import React from "react";
import Sidebar from "./Sidebar";

const Template = (args) => <Sidebar {...args} />;

export const Default = Template.bind({});

Default.args = {
  activeTab: "scheduled_task",
  tabs: [
    {
      id: "workflow",
      title: "Workflow",
      icon: "calendar",
      nested: [
        {
          id: "scheduled_task",
          title: "Scheduled Tasks",
          link: () => alert("Scheduled Tasks clicked"),
        },
        {
          id: "manage_workflows",
          title: "Manage Workflows",
          link: () => alert("Manage Workflows clicked"),
        },
      ],
    },
    {
      id: "field_labs",
      title: "Instruments",
      icon: "cubes",
      nested: [
        {
          id: "field_labs",
          title: "Instruments List",
          link: () => alert("Instruments List clicked"),
        },
        {
          id: "instruments_manage",
          title: "Manage Instruments",
          link: () => alert("Manage Instruments clicked"),
        },
        {
          id: "tests_manage",
          title: "Manage Tests",
          link: () => alert("Manage Tests clicked"),
        },
      ],
    },
    {
      id: "samples",
      title: "Samples",
      icon: "code-fork",
      link: () => alert("Samples clicked"),
    },
  ],
  style: {
    position: "absolute",
    top: "0px",
    left: "0px",
    bottom: "0px",
  },
  showLogo: true,
  onSignOut: () => alert("onSignout button clicked"),
  name: "Validere",
  isPinned: false,
  onPinClick: () => alert("onPinClick"),
  isExpanded: false,
};

export default {
  title: "Sidebar",
  component: Sidebar,
  parameters: {
    componentSubtitle:
      "A collapsible sidebar containing links to app features. Collapses to 60px and Expands to 220px",
  },
};
