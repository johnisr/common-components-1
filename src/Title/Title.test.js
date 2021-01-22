import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Title, { HEADER_STYLE, SUBHEADER_STYLE } from "./Title";
Enzyme.configure({
  adapter: new Adapter(),
});

describe("Title", () => {
  it("should render a title with default header style", () => {
    const headerText = "Header title";
    const style = { backgroundColor: "green" };
    const className = "titleClassName";

    const wrapper = mount(
      <Title style={style} className={className}>
        {headerText}
      </Title>
    );

    const title = wrapper.find(`.${className}`).at(1);

    // enforces header style as default
    expect(title.prop("style")).toEqual(expect.objectContaining(HEADER_STYLE));

    expect(title.prop("style")).toEqual(expect.objectContaining(style));
    expect(title.prop("className")).toEqual(className);
    expect(title.text()).toEqual(headerText);
  });

  it("should use subheader styling", () => {
    const headerText = "Header title";

    const wrapper = mount(<Title type="subheader">{headerText}</Title>);

    const title = wrapper.find("div");

    // enforces subheader style
    expect(title.prop("style")).toEqual(
      expect.objectContaining(SUBHEADER_STYLE)
    );
  });
});
