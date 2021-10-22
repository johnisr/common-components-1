import React from "react";

export enum ActiveApplication {
  Dashboard = "dashboard",
  Operations = "operations",
  Commercial = "commercial",
  ESG = "esg",
}

export type NavbarType = {
  /** The className given to the NavBar */
  className: string;
  /** The style given to the NavBar */
  style: React.CSSProperties;
  /** A string indicating the active application */
  activeApplication: ActiveApplication;
  /** The base url of the environment being linked to */
  url: string;
  /** The object containing user's permissions */
  permissions: Record<string, string[]>;
  /** The user name */
  name: string;
  /** app version */
  version: string;
  /** sign out function */
  onSignOut: React.MouseEventHandler<HTMLDivElement>;
};

export type MenuItemType = {
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  children: React.ReactNode[] | React.ReactNode;
};

export type ProfilePopoverType = {
  version: string;
  onSignOut: React.MouseEventHandler<HTMLDivElement>;
  onProfileClick?: React.MouseEventHandler<HTMLDivElement>;
};
