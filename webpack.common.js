const path = require('path');

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './src//dist'),
};

module.exports = {
  entry: {
    content: `${PATHS.src}/content_script.js`,
    background: `${PATHS.src}/background.js`,
  },
  output: {
    path: PATHS.dist,
    filename: '[name].js',
  },
  module: { rules: [] },
  plugins: [],
  resolve: {
    extensions: ['.js'],
  },
};
