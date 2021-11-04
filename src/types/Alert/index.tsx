import { ReactNode } from "react";

export enum AlertVariants {
  Success = "success",
  Warning = "warning",
  Notification = "notification",
  Normal = "normal",
}

export enum AlertPosition {
  Topleft = "topLeft",
  Top = "top",
  Topright = "topRight",
  Bottomleft = "bottomLeft",
  Bottom = "bottom",
  Bottomright = "bottomRight",
}

type AlertType = {
  /** The classname given to the Alert */
  className?: string;
  /** The style given to the Alert */
  style?: React.CSSProperties;
  /** decides the background color, color, and icon of the Alert */
  variant?: AlertVariants;
  /** Show associated icon or not */
  showIcon?: boolean;
  /** The element to be displayed, usually a string */
  message: ReactNode;
  /** Function called when clicking the close icon. Close icon won't appear if undefined. */
  onClose: () => void;
};

export type AlertProviderType = {
  /** The duration of time it takes in the appear / enter / exit phases of animation. */
  timeout?: number;
  /** The maximum number of alerts that can appear at one time */
  maxAlerts?: number;
  /** THe position the <Alerts> will appear in */
  position?: AlertPosition;
  /** The components where useAlert() will be available in */
  children: React.ReactNode | React.ReactNode[];
};

export type addAlertType = {
  /** unique identifier used for removeById */
  id?: string;
  /** The style the Alert will be, defaults to success */
  variant?: AlertVariants | undefined;
  /** Show variant-specific icon if true, defaults to success */
  showIcon?: boolean;
  /** The element displayed to the user */
  message: ReactNode;
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

export default AlertType;
