import React, { useState, useEffect } from "react";
import * as PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import "./Sidebar.scss";
import SidebarListTab, { SidebarTab } from "./SidebarListTab";
import { Popover } from "react-tiny-popover";
import { getFirstChar } from "../NavBar/NavBarHelper";
import ProfilePopover from "../NavBar/ProfilePopover";
import config from "../../config";

const SIDEBAR_WIDTH = "220px";
const MINI_SIDEBAR_WIDTH = "60px";

function getGreeting() {
  const date = new Date();
  const hour = date.getHours();

  if (hour > 16) {
    return "Good evening!";
  }
  if (hour > 11) {
    return "Good afternoon!";
  }
  return "Good morning!";
}

const SidebarGreeting = (props) => (
  <div
    className={`sidebarGreeting ${
      props.isSidebarExpanded
        ? "commonSidebar__visible"
        : "commonSidebar__invisible"
    }`}
  >
    <div>{getGreeting()}</div>
    {props?.name && <div className="name">{props.name}</div>}
  </div>
);

const Sidebar = ({
  className = "",
  style,
  tabs,
  activeTab,
  onSignOut,
  name,
  version,
  isPinned = false,
  onPinClick,
  isExpanded = false,
  homeTabText,
  onBackClick,
}) => {
  const [openListTab, setOpenListTab] = useState(activeTab);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    if (activeTab) {
      setOpenListTab(activeTab);
    }
  }, [activeTab]);

  useEffect(() => {
    if (!isExpanded) {
      setOpenListTab(activeTab);
      setIsPopoverOpen(false);
    }
  }, [isExpanded]);

  const isSidebarExpanded = isPinned || isExpanded;

  return (
    <div
      className={`commonSidebar ${className}`}
      style={{
        ...style,
        width: isSidebarExpanded ? SIDEBAR_WIDTH : MINI_SIDEBAR_WIDTH,
      }}
    >
      {onBackClick &&
        (isSidebarExpanded ? (
          <div
            className={`commonSidebar__backTab ${"commonSidebar__visible"}`}
            onClick={() => onBackClick?.()}
          >
            <FontAwesome className="icon fa-fw" name="arrow-circle-o-left" />
            Back to hubs
          </div>
        ) : (
          <div className="commonSidebar__backTab commonSidebar__backTab--collapse">
            <FontAwesome className="icon fa-fw" name="arrow-circle-o-left" />
          </div>
        ))}

      {homeTabText && (
        <div className="commonSidebar__homeTab">
          <img
            className="validere_icon"
            src={config.VALIDERE_ICON_URL}
            alt="Validere"
          />

          <span
            className={
              isSidebarExpanded
                ? "commonSidebar__visible"
                : "commonSidebar__invisible"
            }
          >
            {homeTabText}
          </span>
        </div>
      )}

      {tabs.map((tab) => {
        const key = `${tab.id}-${tab.title}`;

        if (Array.isArray(tab.nested)) {
          return (
            <SidebarListTab
              activeTab={activeTab}
              openListTab={openListTab}
              setOpenListTab={setOpenListTab}
              isSidebarExpanded={isSidebarExpanded}
              key={key}
              details={tab}
            />
          );
        } else {
          return (
            <SidebarTab
              activeTab={activeTab}
              openListTab={openListTab}
              setOpenListTab={setOpenListTab}
              isSidebarExpanded={isSidebarExpanded}
              key={key}
              details={tab}
            />
          );
        }
      })}

      <div className="commonSidebar__bottom">
        {onPinClick && (
          <div className="pinContainer" onClick={onPinClick}>
            <span
              className={
                isSidebarExpanded
                  ? "commonSidebar__visible"
                  : "commonSidebar__invisible"
              }
            >
              Lock Sidebar
            </span>
            <FontAwesome
              className={"pinIcon"}
              name={isPinned ? "toggle-on" : "toggle-off"}
            />
          </div>
        )}

        {name && onSignOut && (
          <Popover
            isOpen={isPopoverOpen}
            positions={["top"]}
            align="start"
            padding={10}
            reposition={false}
            onClickOutside={() => setIsPopoverOpen(false)}
            containerClassName="commonSidebar__popoverContainer"
            content={<ProfilePopover onSignOut={onSignOut} version={version} />}
          >
            <div
              key="profileButton"
              className="commonSidebar__bottom__profile"
              onClick={() => setIsPopoverOpen((isOpen) => !isOpen)}
            >
              <button className="profileIcon">{getFirstChar(name)}</button>

              <SidebarGreeting
                isSidebarExpanded={isSidebarExpanded}
                name={name}
              />
            </div>
          </Popover>
        )}
      </div>
    </div>
  );
};

SidebarGreeting.propTypes = {
  isSidebarExpanded: PropTypes.bool,
  name: PropTypes.string,
};

Sidebar.propTypes = {
  /** The className given to the Sidebar Container */
  className: PropTypes.string,
  /** The style given to the Sidebar Container */
  style: PropTypes.object,
  /**
   * The array of features available to the user given their permission level
   * has the following properties:
   *   <p>id: Unique string which is used for identifying if feature is the activeTab</p>
   *   <p>title: The display string on the sidebar</p>
   *   <p>icon: The FontAwesome icon name to be used</p>
   *   <p>link: The function called when the tab is clicked</p>
   *   <p>nested: An array of collapsible tabs that have the properties above</p>
   */
  tabs: PropTypes.array.isRequired,
  /** The current tab id being displayed in the main page */
  activeTab: PropTypes.string,
  /** If given, the sidebar shows the pinIcon which calls this function when clicked */
  onPinClick: PropTypes.func,
  /** Boolean determining if sidebar is pinned or not */
  isPinned: PropTypes.bool,
  /** Name to be shown in the greeting/profile icon */
  name: PropTypes.string,
  /** App version shown in the menu */
  version: PropTypes.string,
  /** Sign out function */
  onSignOut: PropTypes.func,
  /**  Boolean function determining is sidebar is currently expanded */
  isExpanded: PropTypes.bool,
  /** Text describing the current web app */
  homeTabText: PropTypes.string,
  /** The function called when the back link is clicked */
  onBackClick: PropTypes.func,
};

export default Sidebar;
