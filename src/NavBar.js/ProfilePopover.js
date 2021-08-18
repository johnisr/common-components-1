import React from "react";
import * as PropTypes from "prop-types";
import "./ProfilePopover.css";

const MenuItem = (props) => {
  return (
    <div
      className={`profilePopover__menuItem ${
        props.disabled ? "profilePopover__menuItem--disabled" : ""
      }`}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

const PropfilePopover = (props) => {
  return (
    <div className="profilePopover">
      <MenuItem disabled={!props.onSignOut} onClick={props.onSignOut}>
        Sign Out
      </MenuItem>

      {props.version && (
        <>
          <div className="profilePopover__menuDivider"></div>

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
};

export default PropfilePopover;
