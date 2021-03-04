import React from "react";
import * as PropTypes from "prop-types";
import ReactLoader from "../Loader/ReactLoader";
import FontAwesome from "react-fontawesome";
import Title from "../Title/Title";
import "./Page.css";

/** The default margins are 15px */
const Page = ({ className = "", style, title, onClick, children, loaded }) => {
  return (
    <div className={`page ${className}`} style={style}>
      <div className="page__titleContainer">
        {onClick && (
          <FontAwesome
            name="arrow-left"
            onClick={onClick}
            className="page__link"
          />
        )}

        {title && <Title className="page__title">{title}</Title>}
      </div>

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

Page.propTypes = {
  /** The className given to the Page Container */
  className: PropTypes.string,
  /** The style given to the Page Container */
  style: PropTypes.object,
  /** The content to be displayed below the title */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  /** The given title of the content */
  title: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),
  /** If present, displays a button that executes a function on click */
  onClick: PropTypes.func,
  /** If present, shows uses the ReactLoader component to show a loading image while content is loading */
  loaded: PropTypes.bool,
};

export default Page;
