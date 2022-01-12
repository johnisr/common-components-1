import React from "react";
import { render } from "@testing-library/react";
import SidebarTabs from "./SidebarTabs";
import userEvent from "@testing-library/user-event";

describe("Sidebar tab tests", () => {
  test("Should render SidebarTab", () => {
    const activeTab = "manage_workflows";
    const setOpenListTab = jest.fn();
    const sampleLink = jest.fn();
    const sampleTabDetail = {
      id: "samples",
      title: "Samples",
      icon: "code-fork",
      link: sampleLink,
    };

    const { getByRole } = render(
      <SidebarTabs
        tabDetails={sampleTabDetail}
        activeTab={activeTab}
        openListTab={activeTab}
        setOpenListTab={setOpenListTab}
        isSidebarExpanded={true}
      />
    );

    const sampleItem = getByRole("tabTitle", {
      hidden: true,
    });
    userEvent.click(sampleItem);
    expect(sampleLink).toHaveBeenCalledTimes(1);
  });

  test("Should click links that appears in dropdown list", () => {
    const manageTestsLink = jest.fn();
    const manageInstrumentsLink = jest.fn();
    const instrumentsListLink = jest.fn();

    const activeTab = "manage_workflows";
    const setOpenListTabMock = jest.fn();

    const tabDetail = {
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
    };

    const { getByRole } = render(
      <SidebarTabs
        tabDetails={tabDetail}
        activeTab={activeTab}
        openListTab={activeTab}
        setOpenListTab={setOpenListTabMock}
        isSidebarExpanded={true}
      />
    );

    const tasks = getByRole("list");
    const scheduledTask = tasks.children[0];
    userEvent.click(getByRole("listdropdown"));
    userEvent.click(scheduledTask);

    expect(instrumentsListLink).toHaveBeenCalledTimes(1);
  });
});
