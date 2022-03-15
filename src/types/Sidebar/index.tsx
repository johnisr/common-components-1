import React from "react";

export type SidebarType = TabDetail & {
  /** The className given to the Sidebar Container */
  className: string;
  /** The style given to the Sidebar Container */
  style: React.CSSProperties;
  /**
   * The array of features available to the user given their permission level
   * has the following properties:
   *   <p>id: Unique string which is used for identifying if feature is the activeTab</p>
   *   <p>title: The display string on the sidebar</p>
   *   <p>icon: The FontAwesome icon name to be used</p>
   *   <p>link: The function called when the tab is clicked</p>
   *   <p>nested: An array of collapsible tabs that have the properties above</p>
   */
  tabs: TabDetail[];
  /** The current tab id being displayed in the main page */
  activeTab: string | null | undefined;
  /** If given, the sidebar shows the pinIcon which calls this function when clicked */
  onPinClick: React.MouseEventHandler<HTMLDivElement>;
  /** Boolean determining if sidebar is pinned or not */
  isPinned: boolean;
  /** Name to be shown in the greeting/profile icon */
  name: string;
  /** App version shown in the menu */
  version: string;
  /** Sign out function */
  onSignOut: React.MouseEventHandler<HTMLDivElement>;
  /**  Boolean function determining is sidebar is currently expanded */
  isExpanded: boolean;
  /** The function called when View profile is clicked */
  onProfileClick: React.MouseEventHandler<HTMLDivElement>;
};

export type CollapseType = {
  isOpen: boolean;
  children: React.ReactNode[] | React.ReactNode;
};

export type SidebarTabTextType = {
  isVisible: boolean;
  children: React.ElementType | string;
};

export type TabDetail = {
  id: string;
  title: string;
  icon: string;
  link: () => void;
  nested: TabDetail[];
};

export type SidebarTabType = {
  tabDetails: TabDetail;
  activeTab: string | null | undefined;
  isSidebarExpanded: boolean;
  onDropdownClicked: React.MouseEventHandler<HTMLDivElement>;
  isNestedTabOpen: boolean;
  isTabContainerActive: boolean;
};

export type SidebarTabsType = {
  tabDetails: TabDetail;
  activeTab: string | null | undefined;
  openListTab: string | null | undefined;
  setOpenListTab: React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >;
  isSidebarExpanded: boolean;
};
