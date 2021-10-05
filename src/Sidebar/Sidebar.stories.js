import React, { useEffect, useLayoutEffect } from "react";
import { useArgs } from "@storybook/client-api";
import Sidebar from "./Sidebar";
import { useSidebar } from "..";
import Button from "../Button/Button";

const Template = (_args) => {
  const [state, updateState] = useArgs();
  const { isExpanded, isPinned, expandSidebar, collapseSidebar, onPinClick } =
    useSidebar();

  // The expand/collapse sidebar functions are linked to the `isExpanded` variable
  // returned by useSidebar(). The controls are linked to state.
  useLayoutEffect(() => {
    updateState({ isExpanded });
  }, [isExpanded]);

  useLayoutEffect(() => {
    updateState({ isPinned });
  }, [isPinned]);

  // replace all links with toggleActiveTab
  useEffect(() => {
    updateState({
      tabs: state.tabs.map((tab) => {
        const newTabs = { ...tab, link: () => toggleActiveTab(tab.id) };
        if (tab.nested) {
          newTabs.nested = newTabs.nested.map((newTab) => {
            return { ...newTab, link: () => toggleActiveTab(newTab.id) };
          });
        }
        return newTabs;
      }),
    });
  }, []);

  const toggleActiveTab = (activeTab) => {
    updateState({ activeTab });
  };

  const toggleBackLink = () => {
    updateState({
      onBackClick: state.onBackClick ? null : () => alert("onBackClick"),
    });
  };

  return (
    <div>
      <div
        onMouseEnter={(e) => expandSidebar(e)}
        onMouseLeave={(e) => collapseSidebar(e)}
      >
        <Sidebar {...state} onPinClick={onPinClick} />
      </div>

      <div
        style={{
          marginLeft: "220px",
        }}
      >
        <div>
          Add/remove functions from props here (as it can not be done in
          storybook controls)
        </div>

        <Button
          style={{ marginRight: "10px" }}
          onClick={toggleBackLink}
          outline={true}
        >
          {state.onBackClick ? "Hide" : "Show"} Back Tab
        </Button>
      </div>
    </div>
  );
};

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
  onSignOut: () => alert("onSignout button clicked"),
  name: "Validere",
  isPinned: false,
  onPinClick: () => alert("onPinClick"),
  isExpanded: false,
  homeTabText: "Operations",
  onBackClick: () => alert("onBackClick"),
};

export default {
  title: "Sidebar",
  component: Sidebar,
  parameters: {
    componentSubtitle:
      "A collapsible sidebar containing links to app features. Collapses to 60px and Expands to 220px",
  },
};
