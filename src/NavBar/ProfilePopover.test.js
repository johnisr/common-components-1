import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProfilePopover from "./ProfilePopover";

describe("ProfilePopover tests", () => {
  test("Should render ProfilePopover", () => {
    const name = "Validere";
    const onSignOut = jest.fn();
    const onProfileClick = jest.fn();
    const className = "aClassName";
    const style = { background: "red" };
    const version = "a version";

    const { getAllByRole } = render(
      <ProfilePopover onProfileClick={onProfileClick} onSignOut={onSignOut} />
    );

    const menuItems = getAllByRole("menuItem");
    const viewProfileItem = menuItems[0];
    const signoutItem = menuItems[1];

    userEvent.click(viewProfileItem);
    userEvent.click(signoutItem);

    expect(onProfileClick).toHaveBeenCalledTimes(1);
    expect(onSignOut).toHaveBeenCalledTimes(1);
    expect(signoutItem).toBeTruthy();
  });
});
