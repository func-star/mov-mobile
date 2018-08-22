<template>
	<demo-page title="layout - 布局组件" intro="24栅格以及flex布局">
		<demo-section title="24栅格布局" intro="demo1">
			<row class="layout-wrap m-t-10">
				<column :span="12" class="layout-item flex f-center">span: 12</column>
				<column :span="12" class="layout-item flex f-center">span: 12</column>
			</row>
			<row class="layout-wrap m-t-10">
				<column :span="8" class="layout-item flex f-center">span: 8</column>
				<column :span="8" class="layout-item flex f-center">span: 8</column>
				<column :span="8" class="layout-item flex f-center">span: 8</column>
			</row>
			<row class="layout-wrap m-t-10">
				<column :span="6" class="layout-item flex f-center">span: 6</column>
				<column :span="6" class="layout-item flex f-center">span: 6</column>
				<column :span="6" class="layout-item flex f-center">span: 6</column>
				<column :span="6" class="layout-item flex f-center">span: 6</column>
			</row>
		</demo-section>
		<demo-section title="列元素之前增加间隙" intro="demo2">
			<row class="layout-wrap m-t-10" gutter="20px">
				<column :span="12" class="layout-item flex f-center">span: 12</column>
				<column :span="12" class="layout-item flex f-center">span: 12</column>
			</row>
		</demo-section>
		<demo-section title="flex布局 - 水平垂直居中" intro="demo2">
			<row class="layout-wrap m-t-10" justify="center" align="center">
				<column :span="12" class="layout-item flex f-center">span: 12</column>
				<column :span="12" class="layout-item flex f-center">span: 12</column>
			</row>
		</demo-section>
		<demo-section title="flex布局 - 垂直布局水平居右" intro="demo2">
			<row class="layout-wrap m-t-10" direction="column"  align="flex-end">
				<column :span="12" class="layout-item flex f-center">span: 12</column>
				<column :span="12" class="layout-item flex f-center">span: 12</column>
			</row>
		</demo-section>
	</demo-page>
</template>


<script type="text/ecmascript-6">
	import DemoPage from 'components/demo-page';
	import DemoSection from 'components/demo-section';
	import DemoButton from 'components/demo-button';
	import {Row, Column} from 'mov';

	export default {
		name: 'Layout',

		components: {
			DemoPage,
			DemoSection,
			DemoButton,
			Row,
			Column,
		},

		props: {},

		data() {
			return {};
		},

		computed: {},

		watch: {},

		methods: {},

		filters: {},

		created() {
		},

		mounted() {
		},
	};
</script>


<style lang="less" scoped>
	.layout-wrap .layout-item:nth-child(2n) {
		background-color: #8bc34a;
	}

	.layout-wrap .layout-item:nth-child(2n -1) {
		background-color: #03a9f4;
	}

	.layout-item {
		height: 40px;
		padding: 3px 5px;
		color: #fff;
		font-size: 14px;
		background-clip: content-box;
	}
</style>

