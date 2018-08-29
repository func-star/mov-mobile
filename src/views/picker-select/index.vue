<template>
	<div>
		<demo-page title="picker-select - 滚动弹层选择器" intro="滚动弹层选择器">
			<demo-section title="基础用法" intro="demo1">
				<demo-button text="显示滚动弹层选择器" @click.native="demo1"></demo-button>
			</demo-section>
		</demo-page>
		<picker-select :visible="visible" :source="source" keyType="value" :defaultValue="value" :onChange="getValue"
					   :onClose="close"></picker-select>
	</div>
</template>


<script type="text/ecmascript-6">
	import DemoPage from 'components/demo-page';
	import DemoSection from 'components/demo-section';
	import DemoButton from 'components/demo-button';
	import {PickerSelect, Tool} from 'mov';

	export default {
		name: 'PickerSelectDemo',

		components: {
			DemoPage,
			DemoSection,
			DemoButton,
			PickerSelect,
		},

		props: {},

		data() {
			return {
				value: '2018年',
				visible: false,
				source: [],
			};
		},

		computed: {},

		watch: {},

		methods: {
			demo1() {
				this.visible = true;
			},
			getValue(val) {
				this.value = val;
				Tool.info(`选择了${val}`);
			},
			close() {
				this.visible = false;
			},
		},

		filters: {},

		created() {
			for (let i = 0; i < 100; i++) {
				this.source.push(2000 + i + '年');
			}
		},

		mounted() {
		},
	};
</script>


<style lang="less" scoped>

</style>

