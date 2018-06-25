//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

const clientConfig = {
  watch: false,
  entry: './src/Markov.ts',
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
