const webpack = require('webpack');
const packageFile = require('../../package.json');

module.exports = {
  output: {
    filename: "[name].elementos.min.js"
  },
  plugins: [
    new webpack.DefinePlugin({
        "VERSION": JSON.stringify(packageFile.version)
    })
  ],
  externals: {
    "@angular/core": "ng.core",
    "@angular/common": "ng.common",
    "@angular/platform-browser": "ng.platformBrowser",
    "@angular/elements": "ng.elements"
  }
};
