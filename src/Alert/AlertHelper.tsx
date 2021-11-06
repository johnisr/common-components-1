import { AlertPositionType, AlertVariantsType } from "../types/Alert";

export const getVariantClassName = (variant?: AlertVariantsType): string => {
  switch (variant) {
    case "success":
      return "alert--success";
    case "warning":
      return "alert--warning";
    case "notification":
      return "alert--notification";
    default:
      return "alert--normal";
  }
};

export const getIcon = (variant?: AlertVariantsType): string => {
  switch (variant) {
    case "success":
      return "check-circle-o";
    case "warning":
      return "exclamation-circle";
    case "notification":
      return "info-circle";
    default:
      return "question-circle-o";
  }
};

export const isPositionTop = (position: AlertPositionType) => {
  return ["top", "topLeft", "topRight"].includes(position);
};
