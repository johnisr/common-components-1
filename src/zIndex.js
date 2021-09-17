const zIndex = require("./zindex-vars.json");

module.exports = {
  zIndex,
  customProperties: {
    "--zindex-dropdown": zIndex.zIndexDropdown,
    "--zindex-sticky": zIndex.zIndexSticky,
    "--zindex-fixed": zIndex.zIndexFixed,
    "--zindex-modal-backdrop": zIndex.zIndexModalBackdrop,
    "--zindex-off-canvas": zIndex.zIndexOffCanvas,
    "--zindex-modal": zIndex.zIndexModal,
    "--zindex-popover": zIndex.zIndexPopover,
    "--zindex-tooltip": zIndex.zIndexTooltip,
    "--zindex-alert": zIndex.zIndexAlert,
    "--zindex-loader": zIndex.zIndexLoader,
  },
};
