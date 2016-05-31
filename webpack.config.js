/* @flow */

module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname + '/dist',
    filename: "bundle.js",
    libraryTarget: "var",
    library: "DraftMD",
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
      },
    ],
  },
  devtool: 'source-map',
}
