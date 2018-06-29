'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _loading = require('./loading.vue');

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Loading = function () {
    function Loading() {
        _classCallCheck(this, Loading);
    }

    _createClass(Loading, null, [{
        key: 'show',
        value: function show() {
            if (!this.vm) {
                var loadingTpl = _vue2.default.extend(_loading2.default);
                this.vm = new loadingTpl();
            }
            this.tpl = this.vm.$mount().$el;
            this.vm.show();
        }
    }, {
        key: 'hide',
        value: function hide() {
            if (!this.vm) {
                return;
            }
            this.vm.hide();
            this.vm = null;
            this.tpl = null;
        }
    }]);

    return Loading;
}();

exports.default = Loading;