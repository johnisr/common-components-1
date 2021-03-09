import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FontAwesome from "react-fontawesome";
import Page from "../Page/Page";

Enzyme.configure({
  adapter: new Adapter(),
});

describe("Page", () => {
  it("should render", () => {
    const title = "Title text";
    const pageContent = "Page Content";

    const wrapper = mount(
      <Page title={title}>
        <div className="content">{pageContent}</div>
      </Page>
    );

    expect(wrapper.find(".page__titleContainer").text()).toEqual(title);
    expect(wrapper.find(".content").text()).toEqual(pageContent);
  });

  it("should render an icon that when given onClick", () => {
    const title = "Title text";
    const pageContent = "Page Content";
    const onClick = jest.fn();

    const wrapper = mount(
      <Page title={title} onClick={onClick}>
        <div className="content">{pageContent}</div>
      </Page>
    );

    expect(wrapper.find("div.page__title").text()).toEqual(title);
    expect(wrapper.find(".content").text()).toEqual(pageContent);

    wrapper.find(FontAwesome).simulate("click");
    expect(onClick).toHaveBeenCalled();
  });

  it("should render a loader if loaded prop is false", () => {
    const title = "Title text";
    const pageContent = "Page Content";

    const wrapper = mount(
      <Page title={title} loaded={false}>
        <div className="content">{pageContent}</div>
      </Page>
    );

    expect(wrapper.find(".page__titleContainer").text()).toEqual(title);
    expect(wrapper.find(".content").exists()).toEqual(false);
    expect(wrapper.find(".loader").exists()).toEqual(true);
  });
});
