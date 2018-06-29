'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//消息机制（监听者模式）
var movEvents = function () {
	function movEvents() {
		_classCallCheck(this, movEvents);

		this._movEvents = {};
	}

	_createClass(movEvents, [{
		key: 'emit',
		value: function emit(name) {
			for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				data[_key - 1] = arguments[_key];
			}

			if (!this._movEvents[name]) {
				return;
			}
			this._movEvents[name].forEach(function (v) {
				v.fun.apply(v, data);
				if (v.count > 0) {
					v.count -= 1;
				}
			});
			this._movEvents[name] = this._movEvents[name].filter(function (v) {
				return v.count != 0;
			});
		}
	}, {
		key: 'on',
		value: function on(eName, fun) {
			var count = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;

			if (!eName) {
				throw new Error('事件名不允许为空');
			}
			if (typeof a === 'number') {
				throw new Error('事件名不允许为数字');
			}
			var nameInfo = eName.split('.');
			var name = nameInfo[0];
			if (!this._movEvents[name]) {
				this._movEvents[name] = [];
			}
			this._movEvents[name].push({
				fun: fun,
				count: count,
				key: nameInfo[1]
			});
		}
	}, {
		key: 'once',
		value: function once(name, fun) {
			this.on(name, fun, 1);
		}
	}, {
		key: 'off',
		value: function off(eName, fun) {
			if (!eName) {
				return;
			}
			var nameInfo = eName.split('.');
			var name = nameInfo[0];
			var key = nameInfo[1];
			if (!this._movEvents[name]) {
				return;
			}
			if (!key) {
				if (!fun) {
					this._movEvents[name] = undefined;
					return;
				}
				this._movEvents[name] = this._movEvents[name].filter(function (v) {
					return v.fun != fun;
				});
				return;
			}

			if (key) {
				if (fun) {
					this._movEvents[name] = this._movEvents[name].filter(function (v) {
						return v.key != key && v.fun == fun;
					});
					return;
				}
				this._movEvents[name] = this._movEvents[name].filter(function (v) {
					return v.key != key;
				});
			}
		}
	}]);

	return movEvents;
}();

exports.default = movEvents;