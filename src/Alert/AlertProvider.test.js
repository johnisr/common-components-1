import React from "react";
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import AlertProvider, { useAlert } from "./AlertProvider";
import PropTypes from "prop-types";
import { config } from "react-transition-group";

config.disabled = true;

const MockAlerts = ({ message }) => {
  const { addAlert, removeAlert } = useAlert();

  const addButtonClick = () => {
    addAlert({
      variant: "success",
      message: message,
    });
  };

  return (
    <div>
      <button onClick={() => removeAlert()}>Remove Alert</button>
      <button onClick={() => addButtonClick()}>Add Alert</button>
    </div>
  );
};
MockAlerts.propTypes = {
  message: PropTypes.string,
};

describe("Alert Provider tests", () => {
  test("Alert component should not be rendered when alertlist is empty", () => {
    const { queryByRole } = render(
      <AlertProvider timeout={100}></AlertProvider>
    );

    const alertComponent = queryByRole("text", { name: "message" });

    expect(alertComponent).toBeFalsy();
  });

  test("Alert messages should get displayed when alert button is clicked", async () => {
    const message = "Test Message";
    const { queryByText, queryByLabelText, queryByRole, getByRole } = render(
      <AlertProvider timeout={100}>
        <MockAlerts message={message} />
      </AlertProvider>
    );

    const addAlertButton = queryByText("Add Alert");
    fireEvent.click(addAlertButton);
    expect(queryByRole("alert").textContent).toEqual(message);
    expect(queryByLabelText("close")).toBeTruthy();

    await waitForElementToBeRemoved(() => queryByRole("alert"));

    expect(queryByRole("alert")).toBeFalsy();
  });

  test("Remove alert", async () => {
    const message = "Test Message";
    const { queryByText, getAllByRole } = render(
      <AlertProvider timeout={100}>
        <MockAlerts message={message} />
      </AlertProvider>
    );

    const removeAlertButton = queryByText("Remove Alert");
    const addAlertButton = queryByText("Add Alert");
    fireEvent.click(addAlertButton);
    fireEvent.click(addAlertButton);
    fireEvent.click(addAlertButton);
    fireEvent.click(removeAlertButton);

    expect(getAllByRole("alert").length).toEqual(2);
  });

  test("Alert message should get deleted when exceeds max alerts", async () => {
    const message = "Test Message";
    const maxAlerts = 3;
    const { queryByText, queryAllByRole } = render(
      <AlertProvider maxAlerts={maxAlerts}>
        <MockAlerts message={message} />
      </AlertProvider>
    );

    const addAlertButton = queryByText("Add Alert");

    for (let i = 0; i < maxAlerts + 1; i++) {
      fireEvent.click(addAlertButton);
    }

    expect(queryAllByRole("alert").length).toEqual(maxAlerts);
  });
});
