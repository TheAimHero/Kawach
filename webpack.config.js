// webpack.config.js

const path = require('path');

module.exports = {
  entry: './src/content_script.js',
  mode: 'development',
  output: {
    filename: 'content_script.bundle.js',
    path: path.resolve(__dirname, 'src/dist'),
  },
  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
    static: {
      directory: path.join(__dirname, 'src/dist'),
    },
    compress: true,
    port: 9000,
  },
};
