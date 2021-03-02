import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ReactLoader from "../Loader/ReactLoader";

Enzyme.configure({
  adapter: new Adapter(),
});

describe("ReactLoader", () => {
  it("should render the loader only when loaded is false", () => {
    const wrapper = mount(
      <div style={{ position: "relative", height: "500px" }}>
        <ReactLoader loaded={false}>
          <div className="content">content</div>
        </ReactLoader>
      </div>
    );

    expect(wrapper.find(".loader").exists()).toEqual(true);
    expect(wrapper.find(".content").exists()).toEqual(false);
  });

  it("should render the content when loaded is true", () => {
    const wrapper = mount(
      <div style={{ position: "relative", height: "500px" }}>
        <ReactLoader loaded={true}>
          <div className="content">content</div>
        </ReactLoader>
      </div>
    );

    expect(wrapper.find(".loader").exists()).toEqual(false);
    expect(wrapper.find(".content").exists()).toEqual(true);
  });
});
