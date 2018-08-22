<template>
	<div>
		<demo-page title="Loading - 加载" intro="加载中">
			<demo-section title="基础用法" intro="demo1">
				<demo-button text="显示Loading" @click.native="demo1"></demo-button>
			</demo-section>
		</demo-page>
	</div>
</template>


<script type="text/ecmascript-6">
	import DemoPage from 'components/demo-page';
	import DemoSection from 'components/demo-section';
	import DemoButton from 'components/demo-button';
	import {Loading} from 'mov';

	export default {
		name: 'Loading',

		components: {
			DemoPage,
			DemoSection,
			DemoButton,
			Loading,
		},

		props: {},

		data() {
			return {};
		},

		methods: {
			demo1() {
				Loading.show();
				setTimeout(() => {
					Loading.hide();
				}, 3000);
			},
		},
	};
</script>


<style lang="less" scoped>

</style>

