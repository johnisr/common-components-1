import React, { ReactNode } from "react";

export type PositionType = "top" | "right" | "bottom" | "left";
export type triggerType = "hover" | "click";
export type alignType = "start" | "end" | "center";

type TooltipType = {
  /** A boolean to force the tooltip to become visible*/
  show: boolean;
  /** Represents the position of tooltip w.r.t to the target. Value that is first in the array is given priority. When the tooltip does not fit at the provided position then latter values get considered, if present */
  position: PositionType[];
  /** Boolean value on whether close button should be shown or not on the tooltip */
  shouldShowCloseButton: boolean;
  /** The heading of the tooltip. */
  title: string;
  /** The content of the tooltip. */
  content: ReactNode;
  /** The width of the tooltip. */
  width: number;
  /** Background theme of the tooltip. */
  isWhiteTheme: boolean;
  /** Tooltip gets displayed based on the trigger type */
  trigger: triggerType;
  // Align tooltip with respect to the target
  align: alignType;
  /** Element/Entity around which tooltip has to be displayed */
  children: React.ReactNode | React.ReactNode[];
};

export default TooltipType;
