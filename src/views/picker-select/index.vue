<template>
	<div class="d-f picker-select">
		<div class="key">滚动弹层选择器</div>
		<div class="flex-1 text-right value" @click="open">{{value || '请点击选择 >'}}</div>
		<picker-select :visible="visible" :source="source" keyType="value" :defaultValue="value" :onChange="getValue" :onClose="close"></picker-select>
	</div>
</template>
<script type="text/ecmascript-6">
	import { PickerSelect } from 'mov';

	export default {
		components: {
			PickerSelect,
		},

		props: {},

		data () {
			return {
				value: '2018年',
				visible: false,
			};
		},

		created () {
			this.source = [];
			for (let i = 0; i < 100; i++) {
				this.source.push(2000 + i + '年');
			}
		},

		methods: {
			init () {

			},
			getValue (val) {
				this.value = val;
			},
			close () {
				this.visible = false;
			},
			open () {
				this.visible = true;
			},
		},

		mounted () {
			this.init();
		},
	};

</script>
