import Vue from 'vue';
import LoadingTpl from './loading.vue';

class Loading {
    static show () {
        if (!this.vm) {
            let loadingTpl = Vue.extend(LoadingTpl);
            this.vm = new loadingTpl();
        }
        this.tpl = this.vm.$mount().$el;
        this.vm.show();
    }
    
    static hide () {
        if (!this.vm) {
            return;
        }
        this.vm.hide();
        this.vm = null;
        this.tpl = null;
    }
}

export default Loading;
