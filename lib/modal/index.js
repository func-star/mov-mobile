'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _modal = require('./modal.vue');

var _modal2 = _interopRequireDefault(_modal);

var _confirm = require('./confirm');

var _confirm2 = _interopRequireDefault(_confirm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_modal2.default.confirm = _confirm2.default.confirm;
_modal2.default.hide = _confirm2.default.hide;
_modal2.default.update = _confirm2.default.update;
exports.default = _modal2.default;