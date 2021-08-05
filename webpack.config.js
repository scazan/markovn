//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

const clientConfig = {
  mode: 'production',
  watch: false,
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build'),
    library: "MarkovN",
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },
 module: {
    rules: [
      {
      test: /\.ts?$/,
      loader: 'awesome-typescript-loader'
    }
    ]
  }
};

module.exports = clientConfig;
