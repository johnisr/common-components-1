import React from "react";
import * as PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Collapse = ({ isOpen, children }) => {
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

export const SidebarTabText = ({ isVisible, children }) => (
  <span
    className={cx({
      visible: isVisible,
      invisible: !isVisible,
    })}
  >
    {children}
  </span>
);

export const SidebarTab = (props) => {
  const {
    details,
    activeTab,
    isSidebarExpanded,
    onDropdownClicked,
    isNestedTabOpen,
    isTabContainerActive,
  } = props;

  return (
    <>
      <div
        className={cx("tabContainer", {
          "tabContainer--active": isTabContainerActive,
        })}
        onClick={details.nested ? onDropdownClicked : () => details.link?.()}
      >
        <div className={cx("tab")}>
          <div className={cx("tabText")}>
            <FontAwesome
              className={cx("tabIcon", "fa-fw")}
              name={details.icon}
            />

            <SidebarTabText isVisible={isSidebarExpanded}>
              {details.title}
            </SidebarTabText>

            {details.nested && (
              <div className={cx("collapseIcon")} onClick={onDropdownClicked}>
                <FontAwesome
                  className="fa-fw"
                  name={isNestedTabOpen ? "angle-up" : "angle-down"}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {details.nested && (
        <Collapse isOpen={isNestedTabOpen && isSidebarExpanded}>
          <ul className={cx("nestedTabContainer")}>
            {details.nested.map((detail, index) => {
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

const SidebarListTab = (props) => {
  const { details, activeTab, openListTab, setOpenListTab, isSidebarExpanded } =
    props;

  const isNestedTabOpen =
    openListTab === details.id ||
    !!details.nested?.find((detail) => detail.id === openListTab);

  const isTabContainerActive =
    activeTab === details.id ||
    !!details.nested?.find((tab) => tab.id === activeTab);

  const onDropdownClicked = () => {
    // Collapse the dropdown when the user click on the dropdown twice
    if (openListTab === details.id) {
      setOpenListTab(null);
    } else {
      setOpenListTab(details.id);
    }
  };

  return (
    <SidebarTab
      details={details}
      activeTab={activeTab}
      isSidebarExpanded={isSidebarExpanded}
      onDropdownClicked={onDropdownClicked}
      isNestedTabOpen={isNestedTabOpen}
      isTabContainerActive={isTabContainerActive}
    />
  );
};

Collapse.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

SidebarTabText.propTypes = {
  isVisible: PropTypes.bool,
  children: PropTypes.elementType,
};

SidebarTab.propTypes = {
  details: PropTypes.object.isRequired,
  activeTab: PropTypes.string,
  isSidebarExpanded: PropTypes.bool,
  onDropdownClicked: PropTypes.func,
  isNestedTabOpen: PropTypes.bool,
  isTabContainerActive: PropTypes.bool,
};

SidebarListTab.propTypes = {
  details: PropTypes.object,
  activeTab: PropTypes.string,
  openListTab: PropTypes.string,
  setOpenListTab: PropTypes.func,
  isSidebarExpanded: PropTypes.bool,
};

export default SidebarListTab;
