'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _aureliaPalBrowser = require('./aurelia-pal-browser');

Object.keys(_aureliaPalBrowser).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _aureliaPalBrowser[key];
    }
  });
});