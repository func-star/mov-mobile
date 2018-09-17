'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _carousel = require('./carousel.vue');

var _carousel2 = _interopRequireDefault(_carousel);

var _item = require('./item.vue');

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_carousel2.default.Item = _item2.default;
exports.default = _carousel2.default;