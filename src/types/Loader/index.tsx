import React from "react";

type LoaderType = {
  /** A boolean to show the loading indicator or not */
  loaded: boolean;
  /** The vertical position of the loader in terms of percentage */
  position?: number;
  /** The content displayed if loaded is true */
  children?: React.ReactNode[] | React.ReactNode;
};

export default LoaderType;
