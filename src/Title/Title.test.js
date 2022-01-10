import React from "react";
import { render } from "@testing-library/react";
import Title from "./Title";

describe("Title tests", () => {
  test("Should render header title", () => {
    const headerText = "Header title";
    const style = { backgroundColor: "green" };
    const className = "titleClassName";

    const { getByRole } = render(
      <Title style={style} className={className}>
        {headerText}
      </Title>
    );

    const title = getByRole("text");
    expect(title.textContent).toEqual("Header title");
  });

  test("Should render sub header title", () => {
    const headerText = "Sub header";
    const { getByRole } = render(<Title type="subheader">{headerText}</Title>);
    const title = getByRole("text");

    expect(title.textContent).toEqual("Sub header");
  });

  test("Should render panel header title", () => {
    const panelText = "Panel header";

    const { getByRole } = render(<Title type="panelheader">{panelText}</Title>);
    const title = getByRole("text");

    expect(title.textContent).toEqual("Panel header");
  });
});
