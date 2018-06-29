<template>
    <div>
        <div class="d-f picker-select">
            <div class="key">简单数组数据源</div>
            <div class="flex-1 text-right value" @click="open">{{value || '请点击选择 >'}}</div>
        </div>
        <div class="d-f picker-select">
            <div class="key">json数组数据源</div>
            <div class="flex-1 text-right value" @click="open2">{{value2.n || '请点击选择 >'}}</div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { ModalSelect } from 'mov';

    export default {
        data () {
            return {
                value: '',
                value2: {},
            };
        },
        methods: {
            open () {
                ModalSelect.config({
                    source: [1, 2, 3, 4, 5],
                    defaultValue: this.value,
                    isKV: false,
                    onOk: (data) => {
                        this.value = data;
                    },
                    onCancel: () => {
                        console.log('cancel');
                    },
                });
            },
            open2 () {
                ModalSelect.config({
                    source: [{
                        n: '测试1', v: 1,
                    }, {
                        n: '测试2', v: 2,
                    }, {
                        n: '测试3', v: 3,
                    }, {
                        n: '测试4', v: 4,
                    }, {
                        n: '测试5', v: 5,
                    }, {
                        n: '测试6', v: 6,
                    }],
                    defaultValue: this.value2, // 或者ths.value2.v
                    nameKey: 'n', // 默认 name
                    valueKey: 'v', // 默认 value
                    onOk: (data) => {
                        this.value2 = data;
                    },
                    onCancel: () => {
                        console.log('cancel');
                    },
                });
            },
        },
    };

</script>
