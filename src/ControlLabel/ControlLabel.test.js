import React from "react";
import { render } from "@testing-library/react";
import ControlLabel from "./ControlLabel";

describe("ControlLabel tests", () => {
  it("should render the control with a label", () => {
    const label = "some label";
    const control = "some control";

    const { queryByText } = render(
      <ControlLabel label={label}>
        <div>{control}</div>
      </ControlLabel>
    );
    expect(queryByText(label)).toBeTruthy();

    expect(queryByText(control)).toBeTruthy();
  });
});
