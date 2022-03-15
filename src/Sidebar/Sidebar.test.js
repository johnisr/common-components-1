import React from "react";
import { render } from "@testing-library/react";
import Sidebar from "./Sidebar";
import userEvent from "@testing-library/user-event";

describe("Sidebar tests", () => {
  const scheduledTaskLink = jest.fn();
  const manageWorkflowLink = jest.fn();
  const instrumentsListLink = jest.fn();
  const manageInstrumentsLink = jest.fn();
  const manageTestsLink = jest.fn();
  const sampleLink = jest.fn();
  const tabs = [
    {
      id: "workflow",
      title: "Workflow",
      icon: "calendar",
      nested: [
        {
          id: "scheduled_task",
          title: "Scheduled Tasks",
          link: scheduledTaskLink,
        },
        {
          id: "manage_workflows",
          title: "Manage Workflows",
          link: manageWorkflowLink,
        },
      ],
    },
    {
      id: "field_lab",
      title: "Instruments",
      icon: "cubes",
      nested: [
        {
          id: "field_labs",
          title: "Instruments List",
          link: instrumentsListLink,
        },
        {
          id: "instruments_manage",
          title: "Manage Instruments",
          link: manageInstrumentsLink,
        },
        {
          id: "tests_manage",
          title: "Manage Tests",
          link: manageTestsLink,
        },
      ],
    },
    {
      id: "samples",
      title: "Samples",
      icon: "code-fork",
      link: sampleLink,
    },
  ];

  test("Should render Sidebar", () => {
    const activeTab = "manage_workflows";
    const name = "Validere";
    const style = { background: "red" };
    const version = "a version";
    const onSignOut = jest.fn();
    const isPinned = true;
    const onPinClick = jest.fn();
    const onProfileClick = jest.fn();

    const { container, getByRole, getAllByRole, queryAllByRole } = render(
      <Sidebar
        activeTab={activeTab}
        tabs={tabs}
        name={name}
        onSignOut={onSignOut}
        style={style}
        isPinned={isPinned}
        onPinClick={onPinClick}
        version={version}
        onProfileClick={onProfileClick}
      />
    );

    const settingButton = getByRole("button", { name: /settings/i });

    expect(queryAllByRole("menuItem")[0]).toBeFalsy();
    expect(queryAllByRole("menuItem")[1]).toBeFalsy();

    userEvent.click(settingButton);

    const menuItems = getAllByRole("menuItem");
    const viewProfileItem = menuItems[0];
    const signoutItem = menuItems[1];

    expect(viewProfileItem).toBeTruthy();
    expect(signoutItem).toBeTruthy();

    userEvent.click(container);

    expect(queryAllByRole("menuItem")[0]).toBeFalsy();
    expect(queryAllByRole("menuItem")[1]).toBeFalsy();
  });

  test("Should render sidebar features even though sidebar not pinned", () => {
    const activeTab = "manage_workflows";
    const name = "Validere";
    const className = "aClassName";
    const style = { background: "red" };
    const version = "a version";
    const onSignOut = jest.fn();
    const onPinClick = jest.fn();
    const onProfileClick = jest.fn();

    const { getAllByRole } = render(
      <Sidebar
        activeTab={activeTab}
        tabs={tabs}
        name={name}
        onSignOut={onSignOut}
        className={className}
        style={style}
        onPinClick={onPinClick}
        version={version}
        onProfileClick={onProfileClick}
      />
    );

    const tabTitles = getAllByRole("tabTitle");
    expect(tabTitles.map((reactNode) => reactNode.textContent)).toEqual([
      "Workflow",
      "Instruments",
      "Samples",
      "Lock Sidebar",
    ]);
  });

  test("Should render Collapse sidebar text when Sidebar is pinned", () => {
    const activeTab = "manage_workflows";
    const name = "Validere";
    const className = "aClassName";
    const style = { background: "red" };
    const version = "a version";
    const onSignOut = jest.fn();
    const onPinClick = jest.fn();
    const onProfileClick = jest.fn();

    const { getAllByRole } = render(
      <Sidebar
        activeTab={activeTab}
        tabs={tabs}
        name={name}
        onSignOut={onSignOut}
        className={className}
        style={style}
        onPinClick={onPinClick}
        version={version}
        onProfileClick={onProfileClick}
        isPinned={true}
      />
    );

    const tabTitles = getAllByRole("tabTitle");
    expect(tabTitles.map((reactNode) => reactNode.textContent)).toEqual([
      "Workflow",
      "Instruments",
      "Samples",
      "Collapse Sidebar",
    ]);
  });

  test("Should expand and collapse dropdown ", () => {
    const activeTab = "manage_workflows";
    const name = "Validere";
    const className = "aClassName";
    const style = { background: "red" };
    const version = "a version";
    const onSignOut = jest.fn();
    const onPinClick = jest.fn();
    const onProfileClick = jest.fn();
    const onBackClick = jest.fn();

    const { getAllByRole, container } = render(
      <Sidebar
        activeTab={activeTab}
        tabs={tabs}
        name={name}
        onSignOut={onSignOut}
        className={className}
        style={style}
        onPinClick={onPinClick}
        version={version}
        onProfileClick={onProfileClick}
        onBackClick={onBackClick}
        homeTabText="Operations"
      />
    );

    userEvent.click(getAllByRole("listdropdown")[1]);

    expect(getAllByRole("listdropdown")[1].firstChild.className).toMatch(
      /fa fa-angle-up/i
    );

    userEvent.click(getAllByRole("listdropdown")[1]);

    expect(getAllByRole("listdropdown")[1].firstChild.className).toMatch(
      /fa fa-angle-down/i
    );
  });
});
