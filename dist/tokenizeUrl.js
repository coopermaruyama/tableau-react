'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _url2 = require('url');

var _url3 = _interopRequireDefault(_url2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function tokenizeUrl(_url, token) {
  var parsed = _url3.default.parse(_url, true);
  var protocol = parsed.protocol,
      host = parsed.host,
      pathname = parsed.pathname;


  return protocol + '//' + host + '/trusted/' + token + pathname;
}

exports.default = tokenizeUrl;
module.exports = exports['default'];