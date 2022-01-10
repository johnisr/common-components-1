import React from "react";
import { render } from "@testing-library/react";
import Modal from "./Modal";
import { ModalSize } from "../types/Modal";
import userEvent from "@testing-library/user-event";

describe("Modal  tests", () => {
  test("Modal component should be rendered", () => {
    const open = true;
    const onClose = jest.fn();
    const style = { backgroundColor: "white" };
    const className = "aClassName";

    const { getByRole } = render(
      <Modal
        open={open}
        onClose={onClose}
        style={style}
        className={className}
        aria-hidden={false}
        size={ModalSize.Large}
      >
        <Modal.Header>Title Test</Modal.Header>
        <Modal.Body>Content Test</Modal.Body>
        <Modal.Footer>Footer Test</Modal.Footer>
      </Modal>
    );
    expect(getByRole("dialog").children[0].textContent).toEqual("Title Test");
    expect(getByRole("dialog").children[1].textContent).toEqual("Content Test");
    expect(getByRole("dialog").children[2].textContent).toEqual("Footer Test");
  });

  test("Initial focus should be disabled when Modal component is rendered", () => {
    const open = true;
    const onClose = jest.fn();
    const style = { backgroundColor: "white" };
    const className = "aClassName";

    const { getByRole } = render(
      <Modal
        open={open}
        onClose={onClose}
        style={style}
        className={className}
        aria-hidden={false}
        disableInitialFocus={true}
        size={ModalSize.Small}
      >
        <Modal.Header>Title Test</Modal.Header>
        <Modal.Body>Content Test</Modal.Body>
        <Modal.Footer>Footer Test</Modal.Footer>
      </Modal>
    );
    expect(getByRole("dialog").children[0].textContent).toEqual("Title Test");
    expect(getByRole("dialog").children[1].textContent).toEqual("Content Test");
    expect(getByRole("dialog").children[2].textContent).toEqual("Footer Test");
  });

  test("Dialog gets closed when close button gets clicked", () => {
    const open = true;
    const onClose = jest.fn();
    const style = { backgroundColor: "white" };

    const { getByRole } = render(
      <Modal open={open} onClose={onClose} style={style} aria-hidden={false}>
        <Modal.Header>Title Test</Modal.Header>
        <Modal.Body>Content Test</Modal.Body>
        <Modal.Footer>Footer Test</Modal.Footer>
      </Modal>
    );
    const closeButton = getByRole("button");
    userEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
