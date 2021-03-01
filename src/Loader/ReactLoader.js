import React from "react";
import * as PropTypes from "prop-types";
import Loader from "react-loader";
import loaderOptions from "./LoadingBar";

/**
 * The loader's intended parent should have the style `position: relative.`
 */
const ReactLoader = (props) => {
  if (props.position) {
    loaderOptions.top = `${props.position}%`;
  }

  return (
    <Loader loaded={props.loaded} options={loaderOptions}>
      {props.children}
    </Loader>
  );
};

ReactLoader.propTypes = {
  /** A boolean to show the loading indicator or not */
  loaded: PropTypes.bool.isRequired,
  /** The vertical position of the loader in terms of percentage */
  position: PropTypes.number,
  /** The content displayed if loaded is true */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default ReactLoader;
