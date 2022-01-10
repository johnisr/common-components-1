import React, { useState } from "react";
import "./NavBar.scss";
import { NavbarType } from "../types/Navbar";
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
  name,
  version,
  onSignOut,
}: NavbarType) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <div className={`commonNavbar ${className}`} style={style}>
      <div className="validereIcon__container">
        <a
          href={
            activeApplication !== "dashboard"
              ? `${url}${LINKS[0].link}`
              : undefined
          }
        >
          <img
            className="validereIcon"
            aria-label="validere-icon-image"
            src="https://validere.com/wp-content/uploads/logo_validere_full.png"
            alt="Validere Icon"
          />
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
                  activeApplication === link.id ? "activeSelection" : ""
                }
              >
                <a
                  aria-selected={
                    activeApplication === link.id ? "true" : "false"
                  }
                  href={`${url}${link.link}`}
                >
                  {link.name}
                </a>
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
          onClickOutside={() => setIsPopoverOpen(false)}
          content={<ProfilePopover onSignOut={onSignOut} version={version} />}
        >
          <button
            onClick={() => setIsPopoverOpen(true)}
            className="profileIcon"
          >
            {getFirstChar(name)}
          </button>
        </Popover>
      </div>
    </div>
  );
};

export default NavBar;
