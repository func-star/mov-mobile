'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _modalSelect = require('./modalSelect.vue');

var _modalSelect2 = _interopRequireDefault(_modalSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ModalSelect = function () {
	function ModalSelect() {
		_classCallCheck(this, ModalSelect);
	}

	_createClass(ModalSelect, null, [{
		key: 'config',
		value: function config(options) {
			if (!this.vm) {
				var modalSelectTpl = _vue2.default.extend(_modalSelect2.default);
				this.vm = new modalSelectTpl();
			}
			this.tpl = this.vm.$mount().$el;

			_extends(this.vm, options);
			this.vm.setOptions(options);
			this.vm.show();
		}
	}, {
		key: 'hide',
		value: function hide() {
			this.vm = null;
			this.tpl = null;
		}
	}]);

	return ModalSelect;
}();

exports.default = ModalSelect;