import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import NavBar from "./NavBar";
import { getFirstChar } from "./NavBarHelper";

Enzyme.configure({
  adapter: new Adapter(),
});

const URL = "https://validere.com";

describe("Page", () => {
  it("should render", () => {
    const activeApplication = "dashboard";
    const permissions = {
      "dashboard:core": ["read"],
      "operations:core": ["read"],
      "commercial:core": ["read"],
      "esg:core": ["read"],
    };
    const name = "Validere";
    const onSignOut = jest.fn();
    const className = "aClassName";
    const style = { background: "red" };
    const version = "a version";

    const wrapper = mount(
      <NavBar
        activeApplication={activeApplication}
        permissions={permissions}
        name={name}
        onSignOut={onSignOut}
        className={className}
        style={style}
        version={version}
        url={URL}
      />
    );

    // uses style and className props
    expect(wrapper.find(".commonNavbar").hasClass(className)).toEqual(true);
    expect(wrapper.find(".commonNavbar").prop("style")).toEqual(style);

    // uses first char of profile name in profile icon
    expect(wrapper.find(".profileIcon").text()).toEqual(getFirstChar(name));

    // active application is Dashboard
    expect(wrapper.find(".activeSelection").text()).toEqual("Dashboard");

    // given the permissions, all 4 links should be visible
    expect(
      wrapper.find("li").map((reactwrapper) => reactwrapper.text())
    ).toEqual(["Dashboard", "Operations", "Commercial", "ESG"]);

    wrapper.find(".profileIcon").simulate("click");

    // clicking profile button opens a popover where the disabled menu item shows the version
    expect(wrapper.find(".profilePopover__menuItem--disabled").text()).toEqual(
      expect.stringContaining(version)
    );

    // clicking the signout option (first option) will call the onSignOut function
    wrapper.find(".profilePopover__menuItem").at(0).simulate("click");
    expect(onSignOut).toHaveBeenCalled();
  });

  it("should not render any links if it does not have permissions", () => {
    const permissions = {
      "dashboard:core": [],
      "operations:core": [],
      "commercial:core": [],
      "esg:core": [],
    };

    const wrapper = mount(
      <NavBar permissions={permissions} onSignOut={() => {}} url={URL} />
    );

    expect(
      wrapper.find("li").map((reactwrapper) => reactwrapper.text())
    ).toEqual([]);
  });
});
