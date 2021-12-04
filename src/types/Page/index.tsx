import React from "react";
import TitleType from "../Title";
import { BreadcrumbType } from "../Breadcrumbs";

type PageType = {
  /** The className given to the Page Container */
  className?: string;
  /** The style given to the Page Container */
  style?: React.CSSProperties;
  /** The content to be displayed below the title */
  children: React.ReactNode | React.ReactNode[];
  /** The given title of the content */
  title?: TitleType;
  /** If present, displays a button that executes a function on click */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /** If present, shows uses the ReactLoader component to show a loading image while content is loading */
  loaded?: boolean;
  /** An array of { title, onClick } objects, with title being what is displayed
   *  and onClick the function called when the breadcrumb is clicked
   */
  breadcrumbs?: BreadcrumbType[];
  /** The className applied to the breadcrumbs container */
  headerClassName?: string;
};

export default PageType;
