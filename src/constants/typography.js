const typography = require("./typography-vars.json");

module.exports = {
  typography,
  customProperties: {
    "--fontSize-body": typography.bodyFontSize,
    "--fontSize-subheader": typography.subheaderFontSize,
    "--fontSize-panelheader": typography.panelheaderFontSize,
    "--fontSize-header": typography.headerFontSize,
  },
};
