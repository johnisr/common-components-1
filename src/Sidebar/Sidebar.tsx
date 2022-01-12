import React, { useState, useEffect } from "react";
import FontAwesome from "react-fontawesome";
import styles from "./Sidebar.module.scss";
import SidebarTabs, { SidebarTabText } from "./SidebarTabs";
import { SidebarType } from "../types/Sidebar";
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
}: SidebarType) => {
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
        <button
          className={cx("tabContainer", "tabContainer--back", {
            "tabContainer--back--collapse": !isSidebarExpanded,
          })}
          onClick={(e) => onBackClick?.(e)}
          aria-label="backtohub"
        >
          <FontAwesome className={cx("backIcon")} name="arrow-circle-o-left" />

          <SidebarTabText isVisible={isSidebarExpanded}>
            Back to hubs
          </SidebarTabText>
        </button>
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
            <button
              className={cx("settingsIcon", {
                visible: isSidebarExpanded,
                invisible: !isSidebarExpanded,
              })}
              aria-label="settings"
              onClick={() => setIsPopoverOpen((isOpen) => !isOpen)}
            >
              <FontAwesome name="cog" />
            </button>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
