"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Song = new Schema({
  name: {
    type: String
  },
  artists: {
    type: String
  },
  danceability: {
    type: String
  },
  energy: {
    type: String
  },
  rank: {
    type: String
  },
  duration_ms: {
    type: String
  }
});

var _default = mongoose.model('Song', Song);

exports.default = _default;
//# sourceMappingURL=Issue.js.map