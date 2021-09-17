module.exports = {
  plugins: [
    require("autoprefixer"),
    require("postcss-custom-properties")({
      preserve: false,
      importFrom: ["src/colours.js", "src/zIndex.js"],
    }),
  ],
};
