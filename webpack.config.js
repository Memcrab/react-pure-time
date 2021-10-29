const path = require("path");
const webpack = require("webpack");
const env = process.env.NODE_ENV;
const TerserPlugin = require("terser-webpack-plugin");

const reactExternal = {
  root: "React",
  commonjs2: "react",
  commonjs: "react",
  amd: "react",
};

const config = {
  entry: {
    "react-pure-time": path.join(__dirname, "./src/react-pure-time.tsx"),
  },
  module: {
    rules: [
      {
        test: /\.(js|(j|t)sx?)$/,
        exclude: /(node_modules|dist)/,
        use: [{ loader: "babel-loader" }, { loader: "ts-loader" }],
      },
    ],
  },
  output: {
    path: path.join(__dirname, "dist/"),
    filename: "[name].min.js",
    libraryTarget: "umd",
    globalObject: "this",
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
  externals: {
    react: reactExternal,
  },
};

if (env === "production") {
  config.optimization = {
    minimize: true,
    minimizer: [new TerserPlugin()],
  };
}

module.exports = config;
