module.exports = {
  plugins: [
    require("autoprefixer"),
    require("postcss-custom-properties")({
      preserve: false,
      importFrom: ["src/constants/index.js"],
    }),
  ],
};
