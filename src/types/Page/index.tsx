import React from "react";

// Your types here.
type PageTypes = {
  className: string;
  /** The style given to the Page Container */
  style: Object;
  /** The content to be displayed below the title */
  children: React.ReactNode | React.ReactNode[];
  /** The given title of the content */
  title: React.ReactNode[] | React.ReactNode | string;
  /** If present, displays a button that executes a function on click */
  onClick: React.MouseEventHandler<HTMLDivElement>;
  /** If present, shows uses the ReactLoader component to show a loading image while content is loading */
  loaded: boolean;
  /** An array of { title, onClick } objects, with title being what is displayed
   *  and onClick the function called when the breadcrumb is clicked
   */
  breadcrumbs: Array<string>;
  /** The className applied to the breadcrumbs container */
  headerClassName: string;
};

export default PageTypes;
