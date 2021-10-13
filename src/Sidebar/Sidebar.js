import React, { useState, useEffect } from "react";
import * as PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import styles from "./Sidebar.module.scss";
import SidebarTabs, { SidebarTabText } from "./SidebarTabs";
import { Popover } from "react-tiny-popover";
import { getFirstChar } from "../NavBar/NavBarHelper";
import ProfilePopover from "../NavBar/ProfilePopover";
import config from "../../config";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const SIDEBAR_WIDTH = "220px";
const MINI_SIDEBAR_WIDTH = "60px";

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
  onProfileClick,
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
      className={`${cx("sidebar")} ${className || ""}`}
      style={{
        ...style,
        width: isSidebarExpanded ? SIDEBAR_WIDTH : MINI_SIDEBAR_WIDTH,
      }}
    >
      {onBackClick && (
        <div
          className={cx("tabContainer", "tabContainer--back", {
            "tabContainer--back--collapse": !isSidebarExpanded,
          })}
          onClick={() => onBackClick?.()}
        >
          <FontAwesome className={cx("backIcon")} name="arrow-circle-o-left" />

          <SidebarTabText isVisible={isSidebarExpanded}>
            Back to hubs
          </SidebarTabText>
        </div>
      )}

      {homeTabText && (
        <div className={cx("tabContainer", "tabContainer--home")}>
          <img
            className={cx("validereIcon")}
            src={config.VALIDERE_ICON_URL}
            alt="Validere"
          />

          <SidebarTabText isVisible={isSidebarExpanded}>
            {homeTabText}
          </SidebarTabText>
        </div>
      )}

      <div
        className={cx("tabsWrapper", {
          "tabsWrapper--scrollable": isExpanded,
        })}
      >
        <div className={cx("tabsContent")}>
          {tabs.map((tab) => {
            return (
              <SidebarTabs
                activeTab={activeTab}
                openListTab={openListTab}
                setOpenListTab={setOpenListTab}
                isSidebarExpanded={isSidebarExpanded}
                key={tab.id}
                tabDetails={tab}
              />
            );
          })}
        </div>
      </div>

      <div className={cx("footer")}>
        {onPinClick && (
          <div className={cx("pinContainer")} onClick={onPinClick}>
            <SidebarTabText isVisible={isSidebarExpanded}>
              Lock Sidebar
            </SidebarTabText>

            <FontAwesome
              className={cx("pinIcon")}
              name={isPinned ? "toggle-on" : "toggle-off"}
            />
          </div>
        )}

        <div key="profileButton" className={cx("profileContainer")}>
          <button className={cx("profileIcon")}>{getFirstChar(name)}</button>

          <div
            className={cx("greeting", {
              visible: isSidebarExpanded,
              invisible: !isSidebarExpanded,
            })}
          >
            {name && <div className={cx("name")}>{name}</div>}

            {onProfileClick && (
              <div className={cx("profileLabel")} onClick={onProfileClick}>
                View Profile
              </div>
            )}
          </div>

          <Popover
            isOpen={isPopoverOpen}
            positions={["top"]}
            align="end"
            padding={10}
            reposition={false}
            onClickOutside={() => setIsPopoverOpen(false)}
            containerClassName={cx("popoverContainer")}
            content={
              <ProfilePopover
                onSignOut={onSignOut}
                onProfileClick={onProfileClick}
                version={version}
              />
            }
          >
            <div
              className={cx("settingsIcon")}
              onClick={() => setIsPopoverOpen((isOpen) => !isOpen)}
            >
              <FontAwesome name="cog" />
            </div>
          </Popover>
        </div>
      </div>
    </div>
  );
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
  /** The function called when View profile is clicked */
  onProfileClick: PropTypes.func,
};

export default Sidebar;
