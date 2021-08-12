import React, { useState } from "react";
import * as PropTypes from "prop-types";
import "./NavBar.css";
import icon from "../../static/logo_validere.png";
import { havePermission, getFirstChar } from "./NavBarHelper";
import { Popover } from "react-tiny-popover";
import ProfilePopover from "./ProfilePopover";

const LINKS = [
  {
    id: "dashboard",
    name: "Dashboard",
    link: `/app/dashboard`,
    permission: "dashboard:core",
  },
  {
    id: "operations",
    name: "Operations",
    link: `/app/operations`,
    permission: "operations:core",
  },
  {
    id: "commercial",
    name: "Commercial",
    link: `/app/commercial`,
    permission: "commercial:core",
  },
  {
    id: "esg",
    name: "ESG",
    link: `/app/esg`,
    permission: "esg:core",
  },
];

const NavBar = ({
  className = "",
  style,
  url,
  activeApplication,
  permissions,
  profile,
  version,
  onSignOut,
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <div className={`commonNavbar ${className}`} style={style}>
      <div className="validereIcon__container">
        <a
          href={
            activeApplication !== "dashboard" ? `${url}${LINKS[0].link}` : null
          }
        >
          <img className="validereIcon" src={icon} alt="Validere Icon" />
        </a>
      </div>

      <div className="link__container">
        <ul>
          {LINKS.map((link) => {
            if (!havePermission(permissions, link.permission)) {
              return null;
            }

            return (
              <li
                key={link.id}
                className={
                  activeApplication === link.id ? "activeSelection" : null
                }
              >
                <a href={`${url}${link.link}`}>{link.name}</a>
                {activeApplication === link.id && (
                  <div className="activeSelectionLine"></div>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="profileIcon__container">
        <Popover
          isOpen={isPopoverOpen}
          positions={["bottom"]}
          align="end"
          padding={10}
          onClickOutside={() => setIsPopoverOpen(false)} // handle click events outside of the popover/target here!
          content={<ProfilePopover onSignOut={onSignOut} version={version} />}
        >
          <button
            onClick={() => setIsPopoverOpen(true)}
            className="profileIcon"
          >
            {getFirstChar(profile?.name)}
          </button>
        </Popover>
      </div>
    </div>
  );
};

NavBar.propTypes = {
  /** The className given to the NavBar */
  className: PropTypes.string,
  /** The style given to the NavBar */
  style: PropTypes.object,
  /** A string indicating the active application */
  activeApplication: PropTypes.string,
  /** The base url of the environment being linked to */
  url: PropTypes.string,
  /** The object containing user's permissions */
  permissions: PropTypes.object,
  /** The user profile returned by the request @me */
  profile: PropTypes.object,
  /** app version */
  version: PropTypes.string,
  /** sign out function */
  onSignOut: PropTypes.func,
};

export default NavBar;
