<template>
	<demo-page title="ModalSelect - 列表数据选择器" intro="列表选择器">
		<demo-section title="基础用法" intro="demo1">
			<demo-button text="显示选择器" @click.native="demo1"></demo-button>
		</demo-section>
		<demo-section title="默认选择第二项" intro="demo2">
			<demo-button text="显示选择器" @click.native="demo2"></demo-button>
		</demo-section>
	</demo-page>
</template>


<script type="text/ecmascript-6">
	import DemoPage from 'components/demo-page';
	import DemoSection from 'components/demo-section';
	import DemoButton from 'components/demo-button';
	import ModalSelect from '../../../libsrc/modal-select/index.js';

	export default {
		name: 'ModalSelect',

		components: {
			DemoPage,
			DemoSection,
			DemoButton,
			ModalSelect,
		},

		props: {},

		data() {
			return {
				demo2Value: 2,
				demo1Value: undefined,
			};
		},

		computed: {},

		watch: {},

		methods: {
			demo1() {
				ModalSelect.config({
					source: [{
						n: 'item - 1', v: 1,
					}, {
						n: 'item - 2', v: 2,
					}, {
						n: 'item - 3', v: 3,
					}, {
						n: 'item - 4', v: 4,
					}, {
						n: 'item - 5', v: 5,
					}],
					defaultValue: this.demo1Value,
					nameKey: 'n', // 默认 name
					valueKey: 'v', // 默认 value
					onConfirm: (data) => {
						console.log(data);
						this.demo1Value = data.v;
					},
				});
			},
			demo2() {
				ModalSelect.config({
					source: [1, 2, 3, 4, 5, 6],
					defaultValue: this.demo2Value,
					isKV: false,
					onConfirm: (data) => {
						console.log(data);
						this.demo2Value = data;
					},
					onCancel: (type) => {
						console.log(type);
					},
				});
			},
		},

		filters: {},

		created() {
		},

		mounted() {
		},
	};
</script>


<style lang="less" scoped>

</style>

