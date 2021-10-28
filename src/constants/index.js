const zIndex = require("./zIndex");
const breakpoints = require("./breakpoints");
const colours = require("./colours");
const typography = require("./typography");

const styles = {
  ...zIndex.zIndex,
  ...colours.colours,
  ...breakpoints.breakpoints,
  ...typography.typography,
};

const customProperties = {
  ...zIndex.customProperties,
  ...colours.customProperties,
  ...breakpoints.customProperties,
  ...typography.customProperties,
};

module.exports = {
  customProperties,
  ...styles,
};
