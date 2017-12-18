const path = require("path");
const webpack = require("webpack");
const util = require("util");
//
// console.log(`process? ${util.inspect(process)}`)

var lib_dir = __dirname + '/lib',
    node_dir = __dirname + '/node_modules';

module.exports = {
  target: "node",

  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [
          path.resolve(__dirname, "tests")
        ],
        exclude: [
          path.resolve(__dirname, "node_modules")
        ],

        loader: "babel-loader",
        options: {
          presets: ["es2015"]
        }
      }
    ]
  },

  // output: {
  //   path: path.resolve(__dirname, "dist"),
  //   filename: "script.js",
  //   pathinfo: true
  // },

  resolve: {
    extensions: [".js"],
    modules: [__dirname, path.resolve(__dirname, "./node_modules")]
  },

  // node: {
  //   console: false,
  //   global: true,
  //   process: true,
  //   http: true,
  //   querystring: true,
  //   os: true
  //   // url: false,
  //   // __dirname: "mock",
  //   // Buffer: true,
  //   // setImmediate: true
  // }

  externals: {
    http: "http",
    url: "url",
    querystring: "querystring",
    os: "os"
  }

  // plugins: [
    // new webpack.DefinePlugin({
    //   'process.env': JSON.stringify('testing'),
    // }),
    // new webpack.ProvidePlugin({
    //   url: 'url'
    // })
  // ]
};
