import { AlertVariants, AlertPosition } from "../types/Alert";

export const getVariantClassName = (variant: string | undefined): string => {
  switch (variant) {
    case AlertVariants.Success:
      return "alert--success";
    case AlertVariants.Warning:
      return "alert--warning";
    case AlertVariants.Notification:
      return "alert--notification";
    default:
      return "alert--normal";
  }
};

export const getIcon = (variant: string | undefined): string => {
  switch (variant) {
    case AlertVariants.Success:
      return "check-circle-o";
    case AlertVariants.Warning:
      return "exclamation-circle";
    case AlertVariants.Notification:
      return "info-circle";
    default:
      return "question-circle-o";
  }
};

export const isPositionTop = (position: AlertPosition) => {
  return [
    AlertPosition.Top,
    AlertPosition.Topleft,
    AlertPosition.Topright,
  ].includes(position);
};
