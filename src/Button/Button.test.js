import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import FontAwesome from "react-fontawesome";
import Button from "../Button/Button";

Enzyme.configure({
  adapter: new Adapter(),
});

describe("Button", () => {
  it("should render", () => {
    const buttonContent = "Button Text";
    const className = "a ClassName";
    const icon = "fa-download";
    const iconClassName = "iconClassName";
    const variant = "primary";
    const onClick = jest.fn();

    const wrapper = mount(
      <Button
        className={className}
        icon={icon}
        variant={variant}
        onClick={onClick}
        iconClassName={iconClassName}
      >
        <div className="content">{buttonContent}</div>
      </Button>
    );

    expect(wrapper.find("button").text()).toEqual(buttonContent);
    expect(wrapper.find("button").hasClass(className)).toEqual(true);
    expect(wrapper.find("button").hasClass("button--primary")).toEqual(true);
    expect(wrapper.find(FontAwesome).hasClass(iconClassName)).toEqual(true);
    expect(wrapper.find(".content").text()).toEqual(buttonContent);

    wrapper.find("button").simulate("click");
    expect(onClick).toHaveBeenCalled();
  });

  it("should show loading icon instead of regular icon when loading is true", () => {
    const buttonContent = "Button Text";
    const icon = "fa-download";
    const isLoading = true;
    const onClick = jest.fn();

    const wrapper = mount(
      <Button icon={icon} isLoading={isLoading} onClick={onClick}>
        <div className="content">{buttonContent}</div>
      </Button>
    );

    // loading icon will show
    expect(wrapper.find(".loadingIcon").exists()).toEqual(true);

    // regular icon will not
    expect(wrapper.find(`${icon}`).exists()).toEqual(false);

    // can't click while loading
    wrapper.find("button").simulate("click");
    expect(onClick).not.toHaveBeenCalled();
  });
});
