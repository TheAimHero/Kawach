// webpack.config.js

const path = require('path');

module.exports = {
  devtool: 'nosources-source-map',
  stats: { errors: true },
  mode: 'production',
  entry: {
    content_script: './src/content_script.js',
    content_script_video: './src/content_script_video.js',
    content_script_doc_end: './src/content_script_doc_end.js',
    background: './src/background.js',
  },
  output: {
    filename: '[name].bundle.js',
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
