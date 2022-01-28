import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Tooltip from "./Tooltip";
import userEvent from "@testing-library/user-event";

describe("Tooltip tests", () => {
  test("Should show tooltip when hovered over the target element", () => {
    const onCloseMock = jest.fn();
    const title = "This is a Headline";
    const content = "This is the tooltip content";
    const { queryByRole, container, getByRole } = render(
      <Tooltip
        message={"Test"}
        onClose={onCloseMock}
        title={title}
        position={["bottom"]}
        show={false}
        shouldShowCloseButton={false}
        isWhiteTheme={false}
        content={content}
      >
        Hover Me
      </Tooltip>
    );

    const children = getByRole("target");

    expect(queryByRole("tooltip")).toBeFalsy();

    userEvent.hover(children);

    expect(getByRole("text").textContent).toEqual(title);
    expect(getByRole("content").textContent).toEqual(content);

    userEvent.unhover(children);

    expect(queryByRole("tooltip")).toBeFalsy();
  });

  test("Should display tooltip when clicked on the target element", () => {
    const onCloseMock = jest.fn();
    const { queryByRole, container, getByRole, getByTestId } = render(
      <Tooltip
        message={"Test"}
        onClose={onCloseMock}
        title="This is a Headline"
        position={["bottom"]}
        show={false}
        shouldShowCloseButton={true}
        isWhiteTheme={false}
        content="This is the tooltip content"
        trigger="click"
      >
        Hover Me
      </Tooltip>
    );

    const children = getByRole("target");

    expect(queryByRole("tooltip")).toBeFalsy();

    userEvent.click(children);

    expect(queryByRole("tooltip")).toBeTruthy();
  });

  test("Should remove tooltip when close button gets clicked", () => {
    const onCloseMock = jest.fn();
    const { queryByRole, container, getByRole } = render(
      <Tooltip
        message={"Test"}
        onClose={onCloseMock}
        title="This is a Headline"
        position={["bottom"]}
        show={false}
        shouldShowCloseButton={true}
        isWhiteTheme={true}
        content="This is the tooltip content"
        trigger="click"
      >
        Hover Me
      </Tooltip>
    );

    const children = getByRole("target");
    userEvent.click(children);

    expect(queryByRole("tooltip")).toBeTruthy();

    const closeButton = getByRole("button", { name: /close/i });
    userEvent.click(closeButton);

    expect(queryByRole("tooltip")).toBeFalsy();
  });

  test("Should remove tooltip when clicked outside the target element", () => {
    const onCloseMock = jest.fn();
    const { queryByRole, container, getByRole, getByTestId } = render(
      <Tooltip
        message={"Test"}
        onClose={onCloseMock}
        title="This is a Headline"
        shouldShowCloseButton={true}
        isWhiteTheme={true}
        content="This is the tooltip content"
        trigger="click"
      >
        Hover Me
      </Tooltip>
    );

    expect(container).toBeTruthy();
    const children = getByRole("target");

    userEvent.click(children);

    expect(queryByRole("tooltip")).toBeTruthy();

    userEvent.click(container);

    expect(queryByRole("tooltip")).toBeFalsy();
  });
});
