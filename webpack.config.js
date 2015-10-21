var path = require('path');
module.exports = {
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: "babel-loader" },
      { test: /\.json$/, loader: "json-loader" }
    ]
  }
};
