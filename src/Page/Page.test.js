import React from "react";
import { render } from "@testing-library/react";
import Page from "./Page";
import userEvent from "@testing-library/user-event";

describe("Page tests", () => {
  test("Page content should be rendered alongwith breadcrumbs", () => {
    const title = "Title test";
    const pageContent = "Page Content Test";
    const previousBreadcrumbFunction = jest.fn();
    const navigatedBreadcrumbFunction = jest.fn();
    const pageBreadcrumbFunction = jest.fn();
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

    const { getAllByRole, getByLabelText } = render(
      <Page title={title} breadcrumbs={breadcrumbs}>
        <div className="content" aria-label="page-content-test">
          {pageContent}
        </div>
      </Page>
    );

    expect(getAllByRole("breadcrumbs")).toBeTruthy();
    expect(getByLabelText("page-content-test").textContent).toEqual(
      "Page Content Test"
    );
  });

  test("Page content should be rendered without breadcrumbs", () => {
    const title = "Title test";
    const pageContent = "Page Content Test";

    const { queryAllByRole, getByLabelText } = render(
      <Page title={title}>
        <div className="content" aria-label="page-content-test">
          {pageContent}
        </div>
      </Page>
    );
    expect(queryAllByRole("breadcrumbs")).toEqual([]);
    expect(getByLabelText("page-content-test").textContent).toEqual(
      "Page Content Test"
    );
  });

  test("Page content should be rendered without breadcrumbs and with ReactLoader progress bar", () => {
    const title = "Title test";
    const pageContent = "Page Content Test";
    const loaded = false;

    const { queryAllByRole, queryByRole } = render(
      <Page title={title} loaded={loaded}>
        <div className="content" aria-label="page-content-test">
          {pageContent}
        </div>
      </Page>
    );
    expect(queryAllByRole("breadcrumbs")).toEqual([]);
    expect(queryByRole("progressbar")).toBeTruthy();
  });

  test("Page content should be rendered without breadcrumbs and without ReactLoader progresss bar", () => {
    const title = "Title test";
    const pageContent = "Page Content Test";
    const loaded = true;

    const { queryAllByRole, getByLabelText, queryByRole } = render(
      <Page title={title} loaded={loaded}>
        <div className="content" aria-label="page-content-test">
          {pageContent}
        </div>
      </Page>
    );
    expect(queryAllByRole("breadcrumbs")).toEqual([]);
    expect(getByLabelText("page-content-test").textContent).toEqual(
      "Page Content Test"
    );
    expect(queryByRole("progressbar")).toBeFalsy();
  });

  test("Page content should be rendered with left arrow", () => {
    const onClick = jest.fn();
    const title = "Title test";
    const pageContent = "Page Content Test";

    const { queryAllByRole, getByLabelText, getByRole } = render(
      <Page title={title} onClick={onClick}>
        <div className="content" aria-label="page-content-test">
          {pageContent}
        </div>
      </Page>
    );

    const leftArrowButtpon = getByRole("button");
    userEvent.click(leftArrowButtpon);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(queryAllByRole("breadcrumbs")).toEqual([]);
    expect(getByLabelText("page-content-test").textContent).toEqual(
      "Page Content Test"
    );
  });
});
