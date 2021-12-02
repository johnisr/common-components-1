import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Alert from "./Alert";

describe("Alert tests", () => {
  test("OnClick method should be called when Close button is clicked", () => {
    const onCloseMock = jest.fn();
    const { queryByRole } = render(
      <Alert message={"Test"} onClose={onCloseMock} />
    );

    const closeButton = queryByRole("button", { name: "close" });
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test("Button should not be displayed when OnClick method not passed", () => {
    const { queryByRole } = render(<Alert message={"Test"} />);

    const closeButton = queryByRole("button", { name: "close" });

    expect(closeButton).toBeFalsy();
  });

  test("Message text that is passed should be displayed", () => {
    const onCloseMock = jest.fn();
    const { queryByRole } = render(
      <Alert message={"Test"} onClose={onCloseMock} />
    );

    const message = queryByRole("text", { name: "message" });

    expect(message.textContent).toMatch("");
  });
});
