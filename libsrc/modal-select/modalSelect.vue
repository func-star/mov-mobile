<template>
    <popup :visible="visible" placement="bottom" :onClose="cancel">
        <div class="mov-modal-select w-full">
            <div class="mov-modal-select-header d-f">
                <div class="flex-1 item flex-center-y" @click="cancel">取消</div>
                <div class="flex-1 item flex-center-y flex-right-x" @click="confirm">确定</div>
            </div>
            <div class="mov-modal-select-con o-a">
                <div class="mov-modal-select-item flex-center-y pos-r"
                    :class="{'selected': index === selectedIndex}"
                    v-for="(item, index) in source"
                    @click="select(index)">
                    {{isKV ? item[nameKey] : item}}
                </div>
            </div>
        </div>
    </popup>
</template>
<script>
    import MainServer from './index.js';
    import Popup from '../popup';

    export default {
        components: {
            'popup': Popup,
        },
        data () {
            return {
                isKV: true,
                nameKey: 'name',
                valueKey: 'value',
                source: [],
                selectedIndex: -1,
                defaultValue: null,
                visible: false,
            };
        },

        methods: {
            setOptions () {
                this.source.forEach((item, index) => {
                    if (this.isKV) {
                        if (typeof this.defaultValue === 'object') {
                            item[this.valueKey] === this.defaultValue[this.valueKey] && (this.selectedIndex = index);
                        } else {
                            item[this.valueKey] === this.defaultValue && (this.selectedIndex = index);
                        }
                    } else {
                        item === this.defaultValue && (this.selectedIndex = index);
                    }
                });
            },
            select (index) {
                this.selectedIndex = index;
            },
            show () {
                this.visible = true;
            },
            hide () {
                this.visible = false;
                MainServer.hide();
            },
            onClean () {
                this.onClean && this.onClean();
                this.hide();
            },
            cancel () {
                this.onCancel && this.onCancel();
                this.hide();
            },
            confirm () {
                this.selectedIndex !== -1 && this.onOk && (this.onOk(this.source[this.selectedIndex]));
                this.hide();
            },
        },
    };

</script>
