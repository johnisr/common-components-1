import React from "react";
import ReactLoader from "../Loader/ReactLoader";
import Title from "../Title/Title";
import "./Panel.css";

type PanelProps = {
  /** The className given to the Panel */
  className: string;
  /** The style given to the Panel */
  style: Object;
  /** The content to be displayed inside the Panel */
  children: React.ReactNode | React.ReactNode[];
  /** The given title for the Panel */
  title: React.ReactNode[] | React.ReactNode | string;
  /** If present, shows uses the ReactLoader component to show a loading image while content is loading */
  loaded: boolean;
  /** If present, executes the given function when the panel is clicked */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const Panel = ({
  className = "",
  style,
  title,
  loaded,
  onClick,
  children,
}: PanelProps) => {
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
