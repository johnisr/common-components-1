export const havePermission = (permissions, application) => {
  if (!permissions) {
    return false;
  }

  return permissions?.[application]?.includes("read");
};

export const getFirstChar = (string) => {
  if (string && typeof string === "string") {
    return string.charAt(0).toUpperCase();
  } else {
    return null;
  }
};
