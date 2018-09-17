import Vue from 'vue';
import ModalSelectTpl from './modalSelect.vue';

class ModalSelect {
	static config (options) {
		if (!this.vm) {
			let modalSelectTpl = Vue.extend(ModalSelectTpl);
			this.vm = new modalSelectTpl();
		}
		this.tpl = this.vm.$mount().$el;
		
		Object.assign(this.vm, options);
		this.vm.setOptions(options);
		this.vm.show();
	}
	
	static hide () {
		this.vm = null;
		this.tpl = null;
	}
}

export default ModalSelect;
