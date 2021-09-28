import styles from "../constants/index";

const options = {
  lines: 100, // The number of lines to draw
  length: 0, // The length of each line
  width: 9, // The line thickness
  radius: 43, // The radius of the inner circle
  scale: 0.5, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  color: "#45c0c1", // #rgb or #rrggbb or array of colors
  opacity: 0, // Opacity of the lines
  rotate: 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  speed: 1.6, // Rounds per second
  trail: 80, // Afterglow percentage
  fps: 20, // Frames per second when using setTimeout() as a fallback for CSS
  zIndex: styles.zIndexLoader, // The z-index (defaults to 2000000000  if not set)
  className: "commonLoader", // The CSS class to assign to the spinner
  top: "0", // Top position relative to parent
  left: "50%", // Left position relative to parent
  shadow: false, // Whether to render a shadow
  hwaccel: true, // Whether to use hardware acceleration
  position: "absolute", // Element positioning
};

export default options;
