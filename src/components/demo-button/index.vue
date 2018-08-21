<template>
	<div class="demo-button flex f-center">{{text}}</div>
</template>


<script type="text/ecmascript-6">
	export default {
		name: 'DemoButton',

		components: {},

		props: {
			text: {
				type: String,
				default: '打开'
			}
		}
	};
</script>


<style lang="less" scoped>
	.demo-button {
		user-select: none;
		padding-left: 15px;
		padding-right: 15px;
		border: 1px solid #e5e5e5;
		font-size: 14px;
		height: 40px;
		border-radius: 3px;
		background: #f9f9f9;
	}
</style>

