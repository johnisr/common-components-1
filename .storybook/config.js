import { addDecorator, configure, addParameters } from "@storybook/react";
import { version, homepage } from "../package.json";

function loadStories() {
  require("../examples");
  require("../examples/Brand/Brand.js");
  require("../examples/Table/Table.js");
  // You can require as many stories as you need.
}

// Option defaults:
addParameters({
  options: {
    /**
     * name to display in the top left corner
     * @type {String}
     */
    brandTitle: `Validere ${version}`,
    /**
     * URL for name in top left corner to link to
     * @type {String}
     */
    brandUrl: `${homepage}`,
    /**
     * show story component as full screen
     * @type {Boolean}
     */
    isFullScreen: false,
    /**
     * display panel that shows a list of stories
     * @type {Boolean}
     */
    showNav: true,
    /**
     * display panel that shows addon configurations
     * @type {Boolean}
     */
    showPanel: true,
    /**
     * where to show the addon panel
     * @type {String}
     */
    panelPosition: "right",
    /**
     * sorts stories
     * @type {Boolean}
     */
    sortStoriesByKind: false,
    /**
     * regex for finding the hierarchy separator
     * @example:
     *   null - turn off hierarchy
     *   /\// - split by `/`
     *   /\./ - split by `.`
     *   /\/|\./ - split by `/` or `.`
     * @type {Regex}
     */
    hierarchySeparator: /\/|\./,
    /**
     * regex for finding the hierarchy root separator
     * @example:
     *   null - turn off multiple hierarchy roots
     *   /\|/ - split by `|`
     * @type {Regex}
     */
    hierarchyRootSeparator: /\|/,
    /**
     * sidebar tree animations
     * @type {Boolean}
     */
    sidebarAnimations: true,
    /**
     * enable/disable shortcuts
     * @type {Boolean}
     */
    enableShortcuts: true,
    /**
     * theme storybook, see link below
     */
    theme: undefined
  }
});

configure(loadStories, module);
