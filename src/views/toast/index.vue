<template>
	<demo-page>
		<demo-section title="基础用法" intro="demo1">
			<demo-button text="显示Toast" @click.native="demo1"></demo-button>
		</demo-section>
		<demo-section title="基础用法" intro="demo2">
			<demo-button text="显示Toast" @click.native="demo2"></demo-button>
		</demo-section>
	</demo-page>
</template>


<script type="text/ecmascript-6">
	import DemoPage from 'components/demo-page';
	import DemoSection from 'components/demo-section';
	import DemoButton from 'components/demo-button';
	import {Toast} from 'mov';

	export default {
		name: 'Toast',

		components: {
			DemoPage,
			DemoSection,
			DemoButton,
		},

		props: {},

		data() {
			return {};
		},

		computed: {},

		watch: {},

		methods: {
			demo1() {
				Toast.show('toast');
			},
			demo2() {
				Toast.show({
					message: 'asd', duration: 1500, onHide: () => {
						alert(1);
					}, type: 'success',
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

