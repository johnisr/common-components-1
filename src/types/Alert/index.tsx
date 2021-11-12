import { ReactNode } from "react";

export type AlertVariantsType =
  | "success"
  | "warning"
  | "notification"
  | "normal";

export type AlertPositionType =
  | "topLeft"
  | "top"
  | "topRight"
  | "bottomLeft"
  | "bottom"
  | "bottomRight";

export type AlertBaseType = {
  /** decides the background color, color, and icon of the Alert */
  variant?: AlertVariantsType;
  /** Show associated icon or not */
  showIcon?: boolean;
  /** The element to be displayed, usually a string */
  message: ReactNode;
};

type AlertType = AlertBaseType & {
  /** The classname given to the Alert */
  className?: string;
  /** The style given to the Alert */
  style?: React.CSSProperties;
  /** Function called when clicking the close icon. Close icon won't appear if undefined. */
  onClose: () => void;
};

export type AlertProviderType = {
  /** The duration of time it takes in the appear / enter / exit phases of animation. */
  timeout?: number;
  /** The maximum number of alerts that can appear at one time */
  maxAlerts?: number;
  /** THe position the <Alerts> will appear in */
  position?: AlertPositionType;
  /** The components where useAlert() will be available in */
  children: React.ReactNode | React.ReactNode[];
};

export type AlertContextType = {
  addAlert: (messageObject: addAlertType) => void;
  removeAlert: () => void;
};

export type addAlertType = AlertBaseType & {
  /** unique identifier used for removeById */
  id?: string;
};

export type useManageAlertsArgumentsType = {
  maxAlerts: number;
  timeout: number;
  position: AlertPositionType;
};

export type useManageAlertsType = {
  /** The list to be rendered as <Alerts> */
  alertList: addAlertType[];
  /** Add a new alert to the alertList array */
  addAlert: (messageObject: addAlertType) => void;
  /** Remove the earliest alert from the alertList array */
  removeAlert: () => void;
  /** Remove a specific alert from the alertList array if it exists */
  removeById: (id?: string) => void;
};

export type AlertStylingType = {
  className: string;
  icon: string;
};

export default AlertType;
