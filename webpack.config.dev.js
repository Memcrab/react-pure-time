const path = require("path");
const webpack = require("webpack");
const env = process.env.NODE_ENV;
const TerserPlugin = require("terser-webpack-plugin");

const config = {
  entry: {
    example: path.join(__dirname, "example/example.tsx"),
  },
  module: {
    rules: [
      {
        test: /\.(js|(j|t)sx?)$/,
        exclude: /(node_modules)/,
        use: [{ loader: "babel-loader" }, { loader: "ts-loader" }],
      },
    ],
  },
  output: {
    path: path.join(__dirname, "example/"),
    filename: "[name].min.js",
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(env),
    }),
  ],
  resolve: {
    modules: ["node_modules"],
    extensions: [".ts", ".js", ".tsx"],
  },
};

if (env === "production") {
  config.optimization = {
    minimize: true,
    minimizer: [new TerserPlugin()],
  };
}

module.exports = config;
