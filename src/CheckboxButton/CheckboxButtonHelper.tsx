import { checkboxSizeOptions } from "../types/CheckboxButton";

export const getSizeClassName = (size: typeof checkboxSizeOptions[number]) => {
  switch (size) {
    case "large":
      return "container--large";
    case "medium":
      return "container--medium";
    default:
      return "container--small";
  }
};
