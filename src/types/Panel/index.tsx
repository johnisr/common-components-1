import React from "react";

type PanelTypes = {
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

export default PanelTypes;
