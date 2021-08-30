const path = require("path");
const webpack = require("webpack");
const jsonImporter = require("node-sass-json-importer");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "./src/index.js"),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(sass|scss|css)$/i,
        use: [
          "style-loader",
          "css-loader",
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
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "file-loader",
          options: {
            limit: 10000,
            mimetype: "image/svg+xml",
          },
        },
      },
      {
        test: /\.gif/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "file-loader",
          options: {
            limit: 10000,
            mimetype: "image/gif",
          },
        },
      },
      {
        test: /\.jpg/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "file-loader",
          options: {
            limit: 10000,
            mimetype: "image/jpg",
          },
        },
      },
      {
        test: /\.png/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "file-loader",
          options: {
            limit: 10000,
            mimetype: "image/png",
            name: "[name].[ext]",
          },
        },
      },
      // treats dependencies with type: "module" the same as js files
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
    libraryTarget: "umd",
    libraryExport: "default",
    library: "validere-common",
  },
  externals: {
    // Use external version of React
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
      root: "React",
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "react-dom",
      root: "ReactDOM",
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new CleanWebpackPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(), //Merge chunks
  ],
  devServer: {
    static: {
      directory: "./dist",
    },
    hot: true,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: true,
        parallel: true,
      }),
      new CssMinimizerPlugin(),
    ],
  },
};