import React from "react";

type TitleType = {
  /** The inline style object applied to the containing div */
  style: React.CSSProperties;
  /** Determines the default inline style ("header", "subheader", "panelheader") the Title will use */
  type: "header" | "subheader" | "panelheader";
  /** The className applied to the containing div, useful for positioning */
  className: string;
  /** The content displayed */
  children: React.ReactNode | React.ReactNode[];
};

export default TitleType;
