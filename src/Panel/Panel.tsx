import React from "react";
import ReactLoader from "../Loader/ReactLoader";
import Title from "../Title/Title";
import "./Panel.css";
import PanelTypes from "../types/Panel";

const Panel = ({
  className = "",
  style,
  title,
  loaded,
  onClick,
  children,
}: PanelTypes) => {
  const isClickable = onClick && (loaded === undefined || loaded);

  return (
    <div
      className={`commonPanel ${
        isClickable ? "commonPanel__clickable" : ""
      } ${className}`}
      style={style}
      onClick={isClickable ? onClick : () => null}
    >
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

export default Panel;
