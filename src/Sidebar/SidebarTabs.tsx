import React from "react";
import {
  SidebarTabsType,
  CollapseType,
  SidebarTabTextType,
  SidebarTabType,
} from "../types/Sidebar";
import FontAwesome from "react-fontawesome";
import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Collapse = ({ isOpen, children }: CollapseType) => {
  return (
    <div
      className={cx("collapseContainer", {
        "collapseContainer--collapse": !isOpen,
      })}
    >
      <div className={cx({ expanded: isOpen, collapsed: !isOpen })}>
        {children}
      </div>
    </div>
  );
};

export const SidebarTabText = ({ isVisible, children }: SidebarTabTextType) => (
  <span
    className={cx({
      visible: isVisible,
      invisible: !isVisible,
    })}
    role="tabTitle"
  >
    {children}
  </span>
);

export const SidebarTab = ({
  tabDetails,
  activeTab,
  isSidebarExpanded,
  onDropdownClicked,
  isNestedTabOpen,
  isTabContainerActive,
}: SidebarTabType) => {
  return (
    <>
      <div
        className={cx("tabContainer", {
          "tabContainer--active": isTabContainerActive,
        })}
        onClick={
          tabDetails.nested ? onDropdownClicked : () => tabDetails.link?.()
        }
      >
        <div className={cx("tab")}>
          <div className={cx("tabText")}>
            <FontAwesome
              className={cx("tabIcon", "fa-fw")}
              name={tabDetails.icon}
            />

            <SidebarTabText isVisible={isSidebarExpanded}>
              {tabDetails.title}
            </SidebarTabText>

            {tabDetails.nested && (
              <div
                className={cx("collapseIcon")}
                onClick={onDropdownClicked}
                role="listdropdown"
              >
                <FontAwesome
                  className="fa-fw"
                  name={isNestedTabOpen ? "angle-up" : "angle-down"}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {tabDetails.nested && (
        <Collapse isOpen={isNestedTabOpen && isSidebarExpanded}>
          <ul className={cx("nestedTabContainer")}>
            {tabDetails.nested.map((detail, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    detail.link?.();
                  }}
                  className={cx("tabContainer", {
                    activeTab: activeTab === detail.id,
                  })}
                >
                  {detail.title}
                </li>
              );
            })}
          </ul>
        </Collapse>
      )}
    </>
  );
};

const SidebarTabs = (props: SidebarTabsType) => {
  const {
    tabDetails,
    activeTab,
    openListTab,
    setOpenListTab,
    isSidebarExpanded,
  } = props;

  const isNestedTabOpen =
    openListTab === tabDetails.id ||
    !!tabDetails.nested?.find((detail) => detail.id === openListTab);

  const isTabContainerActive =
    activeTab === tabDetails.id ||
    !!tabDetails.nested?.find((tab) => tab.id === activeTab);

  const onDropdownClicked = () => {
    // Collapse the dropdown when the user click on the dropdown twice
    if (openListTab === tabDetails.id) {
      setOpenListTab(null);
    } else {
      setOpenListTab(tabDetails.id);
    }
  };

  return (
    <SidebarTab
      tabDetails={tabDetails}
      activeTab={activeTab}
      isSidebarExpanded={isSidebarExpanded}
      onDropdownClicked={onDropdownClicked}
      isNestedTabOpen={isNestedTabOpen}
      isTabContainerActive={isTabContainerActive}
    />
  );
};

export default SidebarTabs;
