<template>
	<demo-page title="Tabs - Tab面板" intro="支持手势滑动切换">
		<demo-section title="基础用法" intro="demo1">
			<tabs class="tabs" :tabs="tabs" :defaultIndex="0" :afterChange="afterChange">
				<tabs-item class="flex f-center">
					<div style="height: 50px">第一个面板</div>
				</tabs-item>
				<tabs-item class="flex f-center">
					<div>第二个面板</div>
				</tabs-item>
				<tabs-item class="flex f-center">
					<div>第三个面板</div>
				</tabs-item>
			</tabs>
		</demo-section>
		<demo-section title="调用api切换面板,初始化在第二面板" intro="demo2">
			<tabs class="tabs" :tabs="tabs" ref="tabs" :defaultIndex="1" :afterChange="afterChange">
				<tabs-item class="flex f-center">
					<div style="height: 50px" @click="onChangeTab">切换至第一个面板</div>
				</tabs-item>
				<tabs-item class="flex f-center">
					<div style="height: 50px" @click="onChangeTab">切换至第一个面板</div>
				</tabs-item>
				<tabs-item class="flex f-center">
					<div style="height: 50px" @click="onChangeTab">切换至第一个面板</div>
				</tabs-item>
			</tabs>
		</demo-section>
		<demo-section title="禁用手势" intro="demo3">
			<tabs class="tabs" :canPan="false" :tabs="tabs" ref="tabs" :defaultIndex="0" :afterChange="afterChange">
				<tabs-item class="flex f-center">
					<div style="height: 50px">第一个面板</div>
				</tabs-item>
				<tabs-item class="flex f-center">
					<div>第二个面板</div>
				</tabs-item>
				<tabs-item class="flex f-center">
					<div>第三个面板</div>
				</tabs-item>
			</tabs>
		</demo-section>
	</demo-page>
</template>


<script type="text/ecmascript-6">
	import DemoPage from 'components/demo-page';
	import DemoSection from 'components/demo-section';
	import Tabs from '../../../libsrc/tabs/index.js';

	const TabsItem = Tabs.Item;

	// TODO 取消默认头部，采用自定义头部  禁用弹性阻尼效果  canPan统一为enableTouch

	export default {

		components: {
			DemoPage,
			DemoSection,
			Tabs,
			TabsItem,
		},

		props: {},

		data() {
			return {
				tabs: [
					{title: 'Tab - 1'},
					{title: 'Tab - 2'},
					{title: 'Tab - 3'},
				],
			};
		},

		computed: {},

		watch: {},

		methods: {
			afterChange(index) {
				console.log(index);
			},
			onChangeTab() {
				this.refs.tabs.changeIndex(0);
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
	.tabs {
		height: 200px;
	}
</style>
