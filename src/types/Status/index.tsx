import React from "react";

const typeOptions = ["info", "warning", "error", "success"] as const;

type StatusType = {
  /** The semantics that best represents the object */
  type: typeof typeOptions[number];
  /** The className given to the Status Container */
  className?: string;
  /** The style given to the Status Container */
  style?: React.CSSProperties;
  /** The content to be displayed inside the status */
  children: React.ReactNode | React.ReactNode[];
};

export default StatusType;
