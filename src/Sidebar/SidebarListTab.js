import React from "react";
import * as PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";

const HIGHLIGHT_COLOR = "#ffffff";

const Collapse = ({ isOpen, children }) => {
  return (
    <div className="commonSidebar__collapseContainer">
      <div
        className={` ${
          isOpen ? "commonSidebar__expanded" : "commonSidebar__collapsed"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export const SidebarTab = (props) => {
  const { details, activeTab, isSidebarExpanded } = props;

  return (
    <div className="commonSidebar__tabs" onClick={() => details.link?.()}>
      {activeTab === details.id ? (
        <div className="commonSidebar__activeTabLabel" />
      ) : null}

      <div
        className={`commonSidebar__tabText ${
          activeTab === details.id ? "commonSidebar__activeTab" : ""
        }`}
      >
        <FontAwesome className="icon fa-fw" name={details.icon} />
        <span
          className={
            isSidebarExpanded
              ? "commonSidebar__visible"
              : "commonSidebar__invisible"
          }
        >
          {details.title}
        </span>
      </div>
    </div>
  );
};

const SidebarListTab = (props) => {
  const { details, activeTab, openListTab, setOpenListTab, isSidebarExpanded } =
    props;

  const isOpen =
    openListTab === details.id ||
    details.nested.find((detail) => detail.id === openListTab);

  const isListTabActive =
    activeTab === details.id ||
    !!details.nested.find((tab) => tab.id === activeTab);

  const onDropdownClicked = () => {
    // Collapse the dropdown when the user click on the dropdown twice
    if (openListTab === details.id) {
      setOpenListTab(null);
    } else {
      setOpenListTab(details.id);
    }
  };

  return (
    <div className="commonSidebar__tabs">
      {isListTabActive ? (
        <div className="commonSidebar__activeTabLabel" />
      ) : null}

      <div
        className="commonSidebar__tabContainer"
        style={{ color: isListTabActive ? HIGHLIGHT_COLOR : null }}
      >
        <div className="commonSidebar__tabText" onClick={onDropdownClicked}>
          <FontAwesome className="icon fa-fw" name={details.icon} />
          <span
            className={
              isSidebarExpanded
                ? "commonSidebar__visible"
                : "commonSidebar__invisible"
            }
          >
            {details.title}
          </span>
        </div>
        <div className="commonSidebar__tabIcon" onClick={onDropdownClicked}>
          <FontAwesome
            className="fa-fw"
            name={isOpen ? "angle-up" : "angle-down"}
          />
        </div>
      </div>
      <Collapse isOpen={isOpen && isSidebarExpanded}>
        <ul className="commonSidebar__links">
          {details.nested.map((detail, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  detail.link?.();
                }}
                className={
                  activeTab === detail.id ? "commonSidebar__activeTab" : ""
                }
              >
                {detail.title}
              </li>
            );
          })}
        </ul>
      </Collapse>
    </div>
  );
};

Collapse.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

SidebarTab.propTypes = {
  details: PropTypes.object,
  activeTab: PropTypes.string,
  isSidebarExpanded: PropTypes.bool,
};

SidebarListTab.propTypes = {
  details: PropTypes.object,
  activeTab: PropTypes.string,
  openListTab: PropTypes.string,
  setOpenListTab: PropTypes.func,
  isSidebarExpanded: PropTypes.bool,
};

export default SidebarListTab;
