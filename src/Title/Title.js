import React from "react";
import * as PropTypes from "prop-types";

export const HEADER_STYLE = {
  fontSize: "20px",
  fontWeight: "bold",
};

export const SUBHEADER_STYLE = {
  ...HEADER_STYLE,
  fontSize: "14px",
};

export const PANELHEADER_STYLE = {
  ...HEADER_STYLE,
  fontSize: "16px",
};

const getFontStyle = (type) => {
  switch (type) {
    case "subheader":
      return SUBHEADER_STYLE;
    case "panelheader":
      return PANELHEADER_STYLE;
    default:
      return HEADER_STYLE;
  }
};

/**
 * The component to use whenever a short, descriptive summary of the upcoming
 * section is needed. Enforces the font-size and font-weight guidelines that
 * should be used throughout the app for titles.
 */
const Title = ({ style, className, type = "header", children }) => {
  const fontStyle = getFontStyle(type);

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
  type: PropTypes.oneOf(["header", "subheader", "panelheader"]),
  /** The className applied to the containing div, useful for positioning */
  className: PropTypes.string,
  /** The content displayed */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Title;
