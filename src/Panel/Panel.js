import React from "react";
import * as PropTypes from "prop-types";
import ReactLoader from "../Loader/ReactLoader";
import Title from "../Title/Title";
import "./Panel.css";

const Panel = ({ className = "", style, title, loaded, children }) => {
  return (
    <div className={`commonPanel ${className}`} style={style}>
      {title && (
        <Title type="panelheader" className="commonPanel__title">
          {title}
        </Title>
      )}

      {loaded !== undefined ? (
        <ReactLoader loaded={loaded} position={50}>
          {children}
        </ReactLoader>
      ) : (
        children
      )}
    </div>
  );
};

Panel.propTypes = {
  /** The className given to the Panel */
  className: PropTypes.string,
  /** The style given to the Panel */
  style: PropTypes.object,
  /** The content to be displayed inside the Panel */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  /** The given title for the Panel */
  title: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),
  /** If present, shows uses the ReactLoader component to show a loading image while content is loading */
  loaded: PropTypes.bool,
};

export default Panel;
