import {
  AlertPositionType,
  AlertVariantsType,
  AlertStylingType,
} from "../types/Alert";

export const getAlertStyling = (
  variant?: AlertVariantsType
): AlertStylingType => {
  switch (variant) {
    case "success":
      return { className: "alert--success", icon: "check-circle-o" };
    case "warning":
      return { className: "alert--warning", icon: "exclamation-circle" };
    case "notification":
      return { className: "alert--notification", icon: "info-circle" };
    default:
      return { className: "alert--normal", icon: "question-circle-o" };
  }
};

export const isPositionTop = (position: AlertPositionType) => {
  return ["top", "topLeft", "topRight"].includes(position);
};
