const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: path.resolve(__dirname, "./src/index.js"),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "file-loader?limit=10000&mimetype=image/svg+xml",
      },
      {
        test: /\.gif/,
        exclude: /(node_modules|bower_components)/,
        loader: "file-loader?limit=10000&mimetype=image/gif",
      },
      {
        test: /\.jpg/,
        exclude: /(node_modules|bower_components)/,
        loader: "file-loader?limit=10000&mimetype=image/jpg",
      },
      {
        test: /\.png/,
        exclude: /(node_modules|bower_components)/,
        loader: "file-loader?limit=10000&mimetype=image/png&name=[name].[ext]",
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
    libraryTarget: 'umd',
    libraryExport: 'default',
    library: 'validere-common',
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    hot: true,
  },
};
