import React from "react";
import { ProfilePopoverType, MenuItemType } from "../types/Navbar";
import styles from "./ProfilePopover.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const MenuItem = (props: MenuItemType) => {
  return (
    <div
      className={cx("menuItem", { "menuItem--disabled": props.disabled })}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

const ProfilePopover = (props: ProfilePopoverType) => {
  return (
    <div className={cx("profilePopover")}>
      {props.onProfileClick && (
        <MenuItem onClick={props.onProfileClick}>View Profile</MenuItem>
      )}

      <MenuItem disabled={!props.onSignOut} onClick={props.onSignOut}>
        Sign Out
      </MenuItem>

      {props.version && (
        <>
          <div className={cx("menuDivider")}></div>

          <MenuItem disabled={true}>Version: {props.version}</MenuItem>
        </>
      )}
    </div>
  );
};

export default ProfilePopover;
