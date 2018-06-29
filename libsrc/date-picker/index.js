import Vue from 'vue';
import DatePickerTpl from './datePicker.vue';

class DatePicker {
	static config (options) {
		if (!this.vm) {
			let datePickerTpl = Vue.extend(DatePickerTpl);
			this.vm = new datePickerTpl();
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

export default DatePicker;
