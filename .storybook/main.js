const path = require('path');
const jsonImporter = require("node-sass-json-importer");

const localStylesRegex = /\.module\.(sass|scss|css)$/i;

module.exports = {
  stories: ["./*.stories.@(mdx|js)", "../src/**/*.stories.@(mdx)", "../src/**/*.stories.@(js)"],
  addons: ["@storybook/addon-docs", '@storybook/addon-essentials', 
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  core: {
    builder: "webpack5",
  },
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // ToDo: increase test rule to include css e.g. test: /\.(sass|scss|css)$/i,
    // to allow the usage of css variables in storybook e.g. color: var(--someVar);
    // Currently has problems with comments/non-css keywords
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            importLoaders: 2,
            modules: {
              auto: localStylesRegex,
              localIdentName: "[name]__[local]",
            },
          },
        },
        "postcss-loader",
        {
          loader: "sass-loader",
          options: {
            sassOptions: {
              // adds the ability to import JSON files in to SASS/SCSS variables
              // currently used with `css-vars.json` for importing colour variables to SASS
              importer: jsonImporter(),
            },
          },
        },
      ],
      sideEffects: true,
    },);


    // Return the altered config
    return config;
  },
};