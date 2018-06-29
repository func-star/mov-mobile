import Vue from 'vue';
import DatePickerRangeTpl from './datePickerRange.vue';

class DatePickerRange {
    static config (options) {
        if (!this.vm) {
            let datePickerRangeTpl = Vue.extend(DatePickerRangeTpl);
            this.vm = new datePickerRangeTpl();
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

export default DatePickerRange;
