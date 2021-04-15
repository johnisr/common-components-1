import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Breadcrumbs from "./Breadcrumbs";

Enzyme.configure({
  adapter: new Adapter(),
});

describe("Breadcrumbs", () => {
  it("should render one breadcrumb", () => {
    const title = "A title";
    const onClick = jest.fn();
    const breadcrumbs = [{ title, onClick }];

    const style = { background: "red" };
    const className = "A className";

    const wrapper = mount(
      <Breadcrumbs
        style={style}
        className={className}
        breadcrumbs={breadcrumbs}
      />
    );

    expect(wrapper.find(".common__breadcrumbs").prop("style")).toEqual(
      expect.objectContaining(style)
    );
    expect(wrapper.find(".common__breadcrumbs").prop("className")).toContain(
      className
    );

    expect(wrapper.find(".breadcrumb__item").text()).toEqual(title);

    // If only 1 breadcrumb, not clickable (current page open)
    wrapper.find(".breadcrumb__item").simulate("click");
    expect(onClick).not.toHaveBeenCalled();
  });

  it("should render multiple breadcrumbs", () => {
    const firstTitle = "A title";
    const firstOnClick = jest.fn();

    const secondTitle = "A title too";
    const secondOnClick = jest.fn();
    const breadcrumbs = [
      { title: firstTitle, onClick: firstOnClick },
      { title: secondTitle, onClick: secondOnClick },
    ];

    const wrapper = mount(<Breadcrumbs breadcrumbs={breadcrumbs} />);

    const firstBreadcrumb = wrapper.find(".breadcrumb__link");

    expect(firstBreadcrumb.text()).toEqual(firstTitle);

    firstBreadcrumb.simulate("click");
    expect(firstOnClick).toHaveBeenCalled();

    const secondBreadcrumb = wrapper.find(".breadcrumb__item").at(1);

    expect(secondBreadcrumb.text()).toEqual(secondTitle);

    secondBreadcrumb.simulate("click");
    expect(secondOnClick).not.toHaveBeenCalled();
    expect(firstOnClick).toHaveBeenCalledTimes(1);
  });

  it("should render no breadcrumbs", () => {
    const breadcrumbs = [];

    const wrapper = mount(<Breadcrumbs breadcrumbs={breadcrumbs} />);

    expect(wrapper.find(".breadcrumb__item").exists()).toEqual(false);
  });
});
