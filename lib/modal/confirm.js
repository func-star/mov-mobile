'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _confirm = require('./confirm.vue');

var _confirm2 = _interopRequireDefault(_confirm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Confirm = function () {
    function Confirm() {
        _classCallCheck(this, Confirm);
    }

    _createClass(Confirm, null, [{
        key: 'confirm',
        value: function confirm(options) {
            if (!this.vm) {
                var confirmTpl = _vue2.default.extend(_confirm2.default);
                this.vm = new confirmTpl();
            }
            this.tpl = this.vm.$mount().$el;
            _extends(this.vm, options);
            this.vm.show();
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.vm = null;
            this.tpl = null;
        }
    }, {
        key: 'update',
        value: function update(options) {
            if (!this.vm) {
                return;
            }
            _extends(this.vm, options);
        }
    }]);

    return Confirm;
}();

exports.default = Confirm;