import Vue from 'vue';
import ToastTpl from './toast.vue';

class Toast {
	static install (Vue, options) {}
	
	static hide () {
		this.vm.show = false;
		this.vm = null;
		this.tpl = null;
		this.timer = null;
	}
	
	static show (options = '', type = 'info') {
		if (this.vm) {
			return;
		}
		
		let toastTpl = Vue.extend(ToastTpl);
		this.vm = new toastTpl();
		this.tpl = this.vm.$mount().$el;
		
		if (typeof options === 'string') {
			this.vm.message = options;
		} else if (typeof options === 'object') {
			if (options instanceof Array) {
				console.error('参数格式不支持数组！');
			}
			Object.assign(this.vm, options);
		} else if (typeof options === 'number') {
			this.vm.message = String(options);
		} else {
			console.error('参数格式出错！');
		}
		if (!this.vm.type) {
			Object.assign(this.vm, {type: type});
		}
		this.vm.show = true;
		
		clearTimeout(this.timer);
		this.timer = setTimeout(() => {
			let {onHide} = this.vm;
			this.hide();
			onHide && onHide();
		}, options.duration || 1500);
	}
}

export default Toast;
