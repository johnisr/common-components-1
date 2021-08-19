const colours = require("./css-vars.json");

module.exports = {
  colours,
  customProperties: {
    "--validere-colour": colours.validereColour,
    "--link-colour": colours.linkColour,
    "--navLink-colour": colours.navLinkColour,
    "--navButton-colour": colours.navButtonColour,
    "--light-text-colour": colours.lightTextColour,
    "--statusCompletedColour": colours.statusCompletedColour,
    "--statusPendingColour": colours.statusPendingColour,
    "--statusErrorColour": colours.statusErrorColour,
    "--borderColour": colours.borderColour,
    "--menuHighlightColour": colours.menuHighlightColour,
    "--menuItemColour": colours.menuItemColour,
    "--disabledFontColour": colours.disabledFontColour,
    "--buttonFocusColour": colours.buttonFocusColour,
    "--alarmColour": colours.alarmColour,
    "--textColour": colours.textColour,
    "--disabledRowColour": colours.disabledRowCOlour,
  },
};
