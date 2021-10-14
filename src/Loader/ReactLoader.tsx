import React from "react";
import Loader from "react-loader";
import loaderOptions from "./LoadingBar";

type ReactLoaderProps = {
  /** A boolean to show the loading indicator or not */
  loaded: boolean;
  /** The vertical position of the loader in terms of percentage */
  position?: number;
  /** The content displayed if loaded is true */
  children?: React.ReactNode[] | React.ReactNode;
};

/**
 * The loader's intended parent should have the style `position: relative.`
 */
const ReactLoader = ({ position, loaded, children }: ReactLoaderProps) => {
  if (position) {
    loaderOptions.top = `${position}%`;
  }

  return (
    <Loader loaded={loaded} options={loaderOptions}>
      {children}
    </Loader>
  );
};

export default ReactLoader;
