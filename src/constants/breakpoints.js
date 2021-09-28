const breakpoints = require("./breakpoints-vars.json");

module.exports = {
  breakpoints,
  customProperties: {
    "--mobile-breakpoint": breakpoints.mobileBreakpoint,
    "--tablet-breakpoint": breakpoints.tabletBreakpoint,
    "--desktop-breakpoint": breakpoints.desktopBreakpoint,
    "--xl-breakpoint": breakpoints.extraLargeBreakpoint,
  },
};
