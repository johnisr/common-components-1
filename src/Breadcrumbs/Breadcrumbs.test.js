import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Breadcrumbs from "./Breadcrumbs";
import userEvent from "@testing-library/user-event";

describe("Breadcrumbs tests", () => {
  test("one breadcrumb should be displayed when given as input ", () => {
    const title = "A title";
    const onClick = jest.fn();
    const islastCrumb = true;

    const style = { background: "red" };
    const className = "TestClassName";

    const breadcrumbs = [{ title, onClick, islastCrumb }];
    const { getByRole } = render(
      <Breadcrumbs
        breadcrumbs={breadcrumbs}
        className={className}
        style={style}
      />
    );

    const breadcrumb = getByRole("breadcrumbs");
    expect(breadcrumb.textContent).toEqual("A title");
    expect(breadcrumb.className).toMatch("item item--last");
    expect(breadcrumb.children[0]).toBeFalsy();
  });

  test("More than one clickable breadcrumb should be displayed when given as input", () => {
    const previousBreadcrumbFunction = jest.fn();
    const navigatedBreadcrumbFunction = jest.fn();
    const pageBreadcrumbFunction = jest.fn();

    const style = { background: "red" };
    const className = "TestClassName";
    const breadcrumbs = [
      {
        key: "1",
        title: "Previously",
        onClick: previousBreadcrumbFunction,
        isLastBreadcrumb: false,
      },
      {
        key: "2",
        title: "Navigated",
        onClick: navigatedBreadcrumbFunction,
        isLastBreadcrumb: false,
      },
      {
        key: "3",
        title: "Pages",
        onClick: pageBreadcrumbFunction,
        isLastBreadcrumb: true,
      },
      {
        key: "4",
        title: "Current Pages",
        isLastBreadcrumb: true,
      },
    ];
    const { getAllByRole } = render(
      <Breadcrumbs
        breadcrumbs={breadcrumbs}
        className={className}
        style={style}
      />
    );

    const totalBreadcrumbs = getAllByRole("breadcrumbs");
    let i = 0;
    for (i = 0; i < totalBreadcrumbs.length - 1; i++) {
      expect(totalBreadcrumbs[i].children[0]).toBeTruthy();
      expect(totalBreadcrumbs[i].children[0].textContent).toEqual(
        breadcrumbs[i].title
      );
      userEvent.click(totalBreadcrumbs[i].children[0]);
    }
    expect(totalBreadcrumbs[i].textContent).toEqual(breadcrumbs[i].title);
    expect(previousBreadcrumbFunction).toHaveBeenCalledTimes(1);
    expect(navigatedBreadcrumbFunction).toHaveBeenCalledTimes(1);
    expect(pageBreadcrumbFunction).toHaveBeenCalledTimes(1);
  });

  test("Empty div tag is returned when no breadcrumb is given as an input", () => {
    const breadCrumbs = [];
    const { container } = render(<Breadcrumbs breadcrumbs={breadCrumbs} />);
    expect(container.firstChild).toBeFalsy();
  });
});
