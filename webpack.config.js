const path = require('path');
const webpack = require('webpack');
const env = process.env.NODE_ENV;

const reactExternal = {
  root: 'React',
  commonjs2: 'react',
  commonjs: 'react',
  amd: 'react',
};

const config = {
  entry: {
    'react-pure-time': path.join(__dirname, './src/react-pure-time.js'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|dist)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: '[name].min.js',
    libraryTarget: 'umd',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js'],
  },
  externals: {
    react: reactExternal,
  },
};

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true,
        warnings: false,
      },
    })
  );
}

module.exports = config;
