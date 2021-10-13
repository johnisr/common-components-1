import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Sidebar from "./Sidebar";
import { getFirstChar } from "../NavBar/NavBarHelper";

Enzyme.configure({
  adapter: new Adapter(),
});

describe("Sidebar", () => {
  it("should render", () => {
    const firstLink = jest.fn();
    const secondLink = jest.fn();

    const activeTab = "manage_workflows";
    const tabs = [
      {
        id: "workflow",
        title: "Workflow",
        icon: "calendar",
        nested: [
          {
            title: "Scheduled Tasks",
            id: "scheduled_task",
            link: firstLink,
          },
          {
            title: "Manage Workflows",
            id: "manage_workflows",
          },
        ],
      },
      {
        id: "samples",
        title: "Samples",
        icon: "code-fork",
        link: secondLink,
      },
    ];
    const name = "Validere";
    const className = "aClassName";
    const style = { background: "red" };
    const version = "a version";
    const onSignOut = jest.fn();
    const isPinned = true;
    const onPinClick = jest.fn();

    const wrapper = mount(
      <Sidebar
        activeTab={activeTab}
        tabs={tabs}
        name={name}
        onSignOut={onSignOut}
        className={className}
        style={style}
        isPinned={isPinned}
        onPinClick={onPinClick}
        version={version}
      />
    );

    // uses style and className props
    expect(wrapper.find(".sidebar").hasClass(className)).toEqual(true);
    expect(wrapper.find(".sidebar").prop("style")).toEqual(
      expect.objectContaining(style)
    );

    // uses first char of profile name in profile icon
    expect(wrapper.find(".profileIcon").text()).toEqual(getFirstChar(name));

    // active tab is Manage workflows
    expect(wrapper.find(".activeTab").text()).toEqual("Manage Workflows");

    // all nested links show up
    expect(
      wrapper.find("li").map((reactwrapper) => reactwrapper.text())
    ).toEqual(["Scheduled Tasks", "Manage Workflows"]);

    // all non-nested tabs show up
    expect(
      wrapper.find(".tabText").map((reactwrapper) => reactwrapper.text())
    ).toEqual(["Workflow", "Samples"]);

    wrapper.find(".settingsIcon").simulate("click");
    // clicking settings button opens a popover where the disabled menu item shows the version
    expect(wrapper.find(".menuItem--disabled").text()).toEqual(
      expect.stringContaining(version)
    );

    // clicking the signout option (first option) will call the onSignOut function
    wrapper.find(".menuItem").at(0).simulate("click");
    expect(onSignOut).toHaveBeenCalled();

    // clicking the pin calls onPinClick
    wrapper.find(".pinContainer").simulate("click");
    expect(onPinClick).toHaveBeenCalled();

    // The name shows up
    expect(wrapper.find(".name").text()).toEqual(name);

    // logo does not show up because showLogo is false
    expect(wrapper.find("img").exists()).toEqual(false);

    // clicking on the links calls the function in specific tab link
    wrapper.find("li").at(0).simulate("click");
    expect(firstLink).toHaveBeenCalled();

    wrapper.find(".tabText").at(1).simulate("click");
    expect(secondLink).toHaveBeenCalled();
  });
});
