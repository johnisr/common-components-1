import React from "react";
import TitleType from "../types/Title";
import styles from "../constants/index";

export const HEADER_STYLE = {
  fontSize: "20px",
  lineHeight: "26px",
  letterSpacing: "0.01em",
  fontWeight: "bold",
  color: styles.text["800"],
};

export const SUBHEADER_STYLE = {
  ...HEADER_STYLE,
  fontSize: "16px",
  lineHeight: "24px",
};

export const PANELHEADER_STYLE = {
  ...HEADER_STYLE,
  fontSize: "18px",
  lineHeight: "26px",
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
const Title = ({ style, className, type = "header", children }: TitleType) => {
  const fontStyle = getFontStyle(type);

  return (
    <div style={{ ...fontStyle, ...style }} className={className}>
      {children}
    </div>
  );
};

export default Title;
