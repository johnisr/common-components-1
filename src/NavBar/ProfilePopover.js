import React from "react";
import * as PropTypes from "prop-types";
import styles from "./ProfilePopover.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const MenuItem = (props) => {
  return (
    <div
      className={cx("menuItem", { "menuItem--disabled": props.disabled })}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

const PropfilePopover = (props) => {
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

MenuItem.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

PropfilePopover.propTypes = {
  version: PropTypes.string,
  onSignOut: PropTypes.func.isRequired,
  onProfileClick: PropTypes.func,
};

export default PropfilePopover;
