import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Panel from "../Panel/Panel";

Enzyme.configure({
  adapter: new Adapter(),
});

describe("Panel", () => {
  it("should render", () => {
    const title = "Title text";
    const panelContent = "Panel Content";

    const wrapper = mount(
      <Panel title={title}>
        <div className="content">{panelContent}</div>
      </Panel>
    );

    expect(wrapper.find("div.commonPanel__title").text()).toEqual(title);
    expect(wrapper.find(".content").text()).toEqual(panelContent);
  });

  it("should render a loader if loaded prop is false", () => {
    const title = "Title text";
    const panelContent = "Panel Content";

    const wrapper = mount(
      <Panel title={title} loaded={false}>
        <div className="content">{panelContent}</div>
      </Panel>
    );

    expect(wrapper.find("div.commonPanel__title").text()).toEqual(title);
    expect(wrapper.find(".content").exists()).toEqual(false);
    expect(wrapper.find(".loader").exists()).toEqual(true);
  });
});
