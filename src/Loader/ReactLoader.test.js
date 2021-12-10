import React from "react";
import { render } from "@testing-library/react";
import ReactLoader from "./ReactLoader";

describe("ReactLoader tests", () => {
  test("Children does not get rendered when loading is in progress", () => {
    const { queryByRole, queryByText } = render(
      <ReactLoader loaded={false}>
        <div>Loaded Test</div>
      </ReactLoader>
    );
    expect(queryByText("Loaded Test")).toBeFalsy();
    expect(queryByRole("progressbar").style.top).toBe("0px");
  });

  test("Children does not get rendered and progress bar is shown when loading is in progress", () => {
    const { queryByRole, queryByText } = render(
      <ReactLoader loaded={false} position="70">
        <div>Loaded Test</div>
      </ReactLoader>
    );
    expect(queryByText("Loaded Test")).toBeFalsy();
    expect(queryByRole("progressbar").style.top).toBe("70%");
  });

  test("Children gets rendered and progresss bar disappears when component is fully loaded", () => {
    const { queryByRole, container, getByText } = render(
      <ReactLoader loaded={true} position="50">
        <div>Loaded Test</div>
      </ReactLoader>
    );

    expect(getByText("Loaded Test").textContent).toMatch(/Loaded Test/);
    expect(container.firstChild.className).toMatch(/loadedContent/);
    expect(queryByRole("progressbar")).toBeFalsy();
  });
});
