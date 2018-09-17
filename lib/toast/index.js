'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _toast = require('./toast.vue');

var _toast2 = _interopRequireDefault(_toast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Toast = function () {
	function Toast() {
		_classCallCheck(this, Toast);
	}

	_createClass(Toast, null, [{
		key: 'install',
		value: function install(Vue, options) {}
	}, {
		key: 'hide',
		value: function hide() {
			this.vm.show = false;
			this.vm = null;
			this.tpl = null;
			this.timer = null;
		}
	}, {
		key: 'show',
		value: function show() {
			var _this = this;

			var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
			var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info';

			if (this.vm) {
				return;
			}

			var toastTpl = _vue2.default.extend(_toast2.default);
			this.vm = new toastTpl();
			this.tpl = this.vm.$mount().$el;

			if (typeof options === 'string') {
				this.vm.message = options;
			} else if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
				if (options instanceof Array) {
					console.error('参数格式不支持数组！');
				}
				_extends(this.vm, options);
			} else if (typeof options === 'number') {
				this.vm.message = String(options);
			} else {
				console.error('参数格式出错！');
			}
			if (!this.vm.type) {
				_extends(this.vm, { type: type });
			}
			this.vm.show = true;

			clearTimeout(this.timer);
			this.timer = setTimeout(function () {
				var onHide = _this.vm.onHide;

				_this.hide();
				onHide && onHide();
			}, options.duration || 1500);
		}
	}]);

	return Toast;
}();

exports.default = Toast;