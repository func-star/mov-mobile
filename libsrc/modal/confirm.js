import Vue from 'vue';
import ConfirmTpl from './confirm.vue';

class Confirm {
    static confirm (options) {
        if (!this.vm) {
            let confirmTpl = Vue.extend(ConfirmTpl);
            this.vm = new confirmTpl();
        }
        this.tpl = this.vm.$mount().$el;
        Object.assign(this.vm, options);
        this.vm.show();
    }
    
    static hide () {
        this.vm = null;
        this.tpl = null;
    }
    
    static update (options) {
        if (!this.vm) {
            return;
        }
        Object.assign(this.vm, options);
    }
}

export default Confirm;
