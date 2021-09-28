const zIndex = require("./zIndex");
const breakpoints = require("./breakpoints");
const colours = require("./colours");

const styles = {
  ...zIndex.zIndex,
  ...colours.colours,
  ...breakpoints.breakpoints,
};

const customProperties = {
  ...zIndex.customProperties,
  ...colours.customProperties,
  ...breakpoints.customProperties,
};

module.exports = {
  customProperties,
  ...styles,
};
