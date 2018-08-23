<template>
    <mount-root :visible="visible">
        <div class="mona-modal flex-center pos-f pos-f-full" :class="{'mask': isHaveMask}" @touchmove="preventDefault($event)">
            <div class="mona-modal-mask pos-a pos-a-full" @click="closeMask()"></div>
            <div class="mona-modal-content pos-r o-h" :class="contentClass">
                <div class="mona-modal-content-header" v-if="title" v-html="title"></div>
                <div class="mona-modal-content-content" :class="title ? '' : 'no-title'">
                    <slot></slot>
                </div>
                <div class="mona-modal-content-footer d-f" v-if="footer">
                    <div class="flex-1 cancel h-full flex-center" v-if="enableCancel" @click="cancel('button')">
                        {{cancelText || '取消'}}
                    </div>
                    <div class="flex-1 confirm h-full flex-center" @click="confirm">{{confirmText || '确认'}}</div>
                </div>
            </div>
        </div>
    </mount-root>
</template>
<script>
    import MountRoot from '../mount-root';
    import Tool from '../tool';

    export default {
        name: 'mona-modal',
        components: {
            'mount-root': MountRoot,
        },
        props: {
            visible: {
                type: Boolean,
                default: false,
            },
            enableCancel: {
                type: Boolean,
                default: true,
            },
            footer: {
                type: Boolean,
                default: true,
            },
            isHaveMask: {
                type: Boolean,
                default: true,
            },
            maskClosable: {
                type: Boolean,
                default: true,
            },
            title: {
                type: String | Number,
                default: '',
            },
            contentClass: String,
            confirmText: {
                type: String | Number,
                default: '确认',
            },
            cancelText: {
                type: String | Number,
                default: '取消',
            },
            onClose: {
                type: Function,
                required: true,
            },
            onConfirm: Function,
            onCancel: Function,
        },

        methods: {
            preventDefault (e) {
                e.preventDefault();
            },
            show () {
                Tool.preventScroll();
                this.visible = true;
            },
            hide () {
                Tool.cancelPreventScroll();
                this.onClose();
            },
            confirm () {
                this.onConfirm && this.onConfirm();
                this.hide();
            },
            cancel (type) {
                this.onCancel && this.onCancel(type);
                this.hide();
            },
            closeMask () {
                if (!this.maskClosable) {
                    return;
                }
                this.cancel('modal');
            },
        },
    };

</script>
