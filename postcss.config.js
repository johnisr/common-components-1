const constants = require("./src/constants/index");

module.exports = {
  plugins: [
    require("autoprefixer"),
    require("postcss-custom-properties")({
      preserve: false,
      importFrom: [constants],
    }),
  ],
};
