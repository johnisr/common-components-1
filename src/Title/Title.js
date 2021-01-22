import React from "react";
import * as PropTypes from "prop-types";

export const HEADER_STYLE = {
  fontSize: "20px",
  fontWeight: "bold",
};

export const SUBHEADER_STYLE = {
  fontSize: "14px",
  fontWeight: "bold",
};

/**
 * The component to use whenever a short, descriptive summary of the upcoming
 * section is needed. Enforces the font-size and font-weight guidelines that
 * should be used throughout the app for titles.
 */
const Title = ({ style, className, type = "header", children }) => {
  const fontStyle = type === "subheader" ? SUBHEADER_STYLE : HEADER_STYLE;

  return (
    <div style={{ ...fontStyle, ...style }} className={className}>
      {children}
    </div>
  );
};

Title.propTypes = {
  /** The inline style object applied to the containing div */
  style: PropTypes.object,
  /** Determines the default inline style the Title will use */
  type: PropTypes.oneOf(["header", "subheader"]),
  /** The className applied to the containing div, useful for positioning */
  className: PropTypes.string,
  /** The content displayed */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Title;
