var path = require('path');
module.exports = {
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: "babel-loader" },
      { test: /\.json$/, loader: "json-loader" },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "resolve-url", "sass"]
      },
      { test: /\.css$/, loaders: ["style", "css"] },
      { test: /\.png$/, loader: "url-loader?mimetype=image/png" }
    ]
  }
};
