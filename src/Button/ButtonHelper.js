export const getVariantClassName = (variant) => {
  switch (variant) {
    case "primary":
      return "button--primary";
    case "error":
      return "button--error";
    default:
      return "button--outline";
  }
};

export const getSizeClassName = (size) => {
  switch (size) {
    case "large":
      return "button--large";
    case "medium":
      return "button--medium";
    default:
      return "button--small";
  }
};