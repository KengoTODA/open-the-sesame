const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "public")
  },
  plugins: [
    new HtmlWebpackPlugin({
      inlineSource: ".js$",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        collapseInlineTagWhitespace: true
      },
      template: "src/index.ejs"
    }),
    new HtmlWebpackInlineSourcePlugin()
  ]
};
