import React from "react";
import TitleTypes from "../types/Title";

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

const getFontStyle = (type: string): React.CSSProperties => {
  switch (type) {
    case "subheader":
      return SUBHEADER_STYLE as React.CSSProperties;
    case "panelheader":
      return PANELHEADER_STYLE as React.CSSProperties;
    default:
      return HEADER_STYLE as React.CSSProperties;
  }
};

/**
 * The component to use whenever a short, descriptive summary of the upcoming
 * section is needed. Enforces the font-size and font-weight guidelines that
 * should be used throughout the app for titles.
 */
const Title = ({ style, className, type = "header", children }: TitleTypes) => {
  const fontStyle = getFontStyle(type);

  return (
    <div style={{ ...fontStyle, ...style }} className={className}>
      {children}
    </div>
  );
};

export default Title;
