export type MessageType = "alert" | "warning" | "info";

export type AlertMessageIconType = {
  type: MessageType;
};

type AlertMessageType = {
  /** Describes if the message displayed is info, alert or warning */
  type: MessageType;
  /** Displays simple alert message when true and displays custom alert message when false */
  simplified: boolean;
  /** Text to be displayed */
  children: string;
  /** Describes a function that will be executed when close button gets clicked*/
  onClose?: () => void;
};

export default AlertMessageType;
