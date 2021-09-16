import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import FontAwesome from "react-fontawesome";
import Modal from "./Modal";

Enzyme.configure({
  adapter: new Adapter(),
});

describe("Modal", () => {
  it("should render", () => {
    const open = true;
    const onClose = jest.fn();
    const style = { backgroundColor: "white" };
    const className = "aClassName";

    const wrapper = mount(
      <div>
        <div className="outside">Outside</div>
        <Modal
          open={open}
          onClose={onClose}
          style={style}
          className={className}
        >
          <Modal.Header closeButton>Title</Modal.Header>
          <Modal.Body>Content</Modal.Body>
          <Modal.Footer>Footer</Modal.Footer>
        </Modal>
      </div>
    );

    expect(wrapper.find("div.commonModal").prop("className")).toContain(
      className
    );
    expect(wrapper.find("div.commonModal").prop("style")).toEqual(style);

    expect(wrapper.find(Modal.Header).text()).toEqual("Title");

    const closeButton = wrapper.find(FontAwesome);
    expect(closeButton.exists()).toEqual(true);
    closeButton.simulate("click");
    expect(onClose).toHaveBeenCalled();

    expect(wrapper.find(Modal.Body).text()).toEqual("Content");

    expect(wrapper.find(Modal.Footer).text()).toEqual("Footer");
  });
});
