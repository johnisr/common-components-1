import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NavBar from "./NavBar";

describe("Navbar tests", () => {
  test("Should render Navbar with Dashboard, Operations, ESG links", () => {
    const activeApplication = "dashboard";
    const permissions = {
      "dashboard:core": ["read"],
      "operations:core": ["read"],
      "commercial:core": ["read"],
      "esg:core": ["read"],
    };
    const name = "Validere";
    const onSignOut = jest.fn();
    const className = "ClassNameTest";
    const style = { background: "red" };
    const version = "version test";

    const { getByRole } = render(
      <NavBar
        activeApplication={activeApplication}
        permissions={permissions}
        name={name}
        onSignOut={onSignOut}
        className={className}
        style={style}
        version={version}
        url="https://validere.com"
      />
    );
    const validereImage = getByRole("img", {
      name: /validere-icon-image/i,
    });

    const operationLink = getByRole("link", {
      name: /Operations/i,
    });

    const dashboardLink = getByRole("link", {
      name: /Dashboard/i,
    });

    const commercialLink = getByRole("link", {
      name: /Commercial/i,
    });

    const esgLink = getByRole("link", {
      name: /ESG/i,
    });

    expect(validereImage.getAttribute("src")).toEqual(
      "https://validere.com/wp-content/uploads/logo_validere_full.png"
    );

    expect(dashboardLink.getAttribute("href")).toEqual(
      "https://validere.com/app/dashboard"
    );
    expect(commercialLink.getAttribute("href")).toEqual(
      "https://validere.com/app/commercial"
    );
    expect(operationLink.getAttribute("href")).toEqual(
      "https://validere.com/app/operations"
    );
    expect(esgLink.getAttribute("href")).toEqual(
      "https://validere.com/app/esg"
    );
  });

  test("Should show Sign out button when logo button gets clicked and should disappear when clicked out of the logo Icon", () => {
    const activeApplication = "dashboard";
    const permissions = {
      "dashboard:core": ["read"],
      "operations:core": ["read"],
      "commercial:core": ["read"],
      "esg:core": ["read"],
    };
    const name = "Validere";
    const onSignOut = jest.fn();
    const className = "ClassNameTest";
    const style = { background: "red" };
    const version = "version test";

    const { getByRole, getAllByRole, queryAllByRole, container } = render(
      <NavBar
        activeApplication={activeApplication}
        permissions={permissions}
        name={name}
        onSignOut={onSignOut}
        className={className}
        style={style}
        version={version}
        url="https://validere.com"
      />
    );
    const validereLogoButton = getByRole("button");

    expect(queryAllByRole("menuItem")[0]).toBeFalsy();

    userEvent.click(validereLogoButton);

    const menuItems = getAllByRole("menuItem");

    expect(menuItems[0].textContent).toMatch("Sign Out");

    userEvent.click(container);
    expect(queryAllByRole("menuItem")[0]).toBeFalsy();
  });

  test("Active application is not dashboard", () => {
    const activeApplication = "operations";
    const permissions = {
      "dashboard:core": ["read"],
      "operations:core": ["read"],
      "commercial:core": ["read"],
      "esg:core": ["read"],
    };
    const name = "Validere";
    const onSignOut = jest.fn();
    const style = { background: "red" };
    const version = "a version";

    const { container, getByRole } = render(
      <NavBar
        activeApplication={activeApplication}
        permissions={permissions}
        name={name}
        onSignOut={onSignOut}
        style={style}
        version={version}
        url="https://validere.com"
      />
    );
    const dashboardLink = getByRole("link", {
      name: /Dashboard/i,
    });
    expect(dashboardLink.getAttribute("aria-selected")).toEqual("false");
  });

  test("Should not render Dashboard, Operation and ESG link if user does not have read permission", () => {
    const activeApplication = "dashboard";
    const permissions = {
      "dashboard:core": [],
      "operations:core": [],
      "commercial:core": [],
      "esg:core": [],
    };
    const name = "Validere";
    const onSignOut = jest.fn();
    const className = "aClassName";
    const style = { background: "red" };
    const version = "a version";

    const { queryByRole, getByRole } = render(
      <NavBar
        activeApplication={activeApplication}
        permissions={permissions}
        name={name}
        onSignOut={onSignOut}
        className={className}
        style={style}
        version={version}
        url="https://validere.com"
      />
    );

    const validereImage = getByRole("img", {
      name: /validere-icon-image/i,
    });
    expect(validereImage.getAttribute("src")).toEqual(
      "https://validere.com/wp-content/uploads/logo_validere_full.png"
    );
    const operationLink = queryByRole("link", {
      name: /Operations/i,
    });

    const dashboardLink = queryByRole("link", {
      name: /Dashboard/i,
    });

    const commercialLink = queryByRole("link", {
      name: /Commercial/i,
    });

    const esgLink = queryByRole("link", {
      name: /ESG/i,
    });

    expect(operationLink).toBeFalsy();
    expect(dashboardLink).toBeFalsy();
    expect(commercialLink).toBeFalsy();
    expect(esgLink).toBeFalsy();
  });
});
