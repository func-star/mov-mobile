<template>
	<div class="demo-section">
		<p class="demo-title">{{title}}</p>
		<div class="demo-wrap">
			<p class="demo-intro">{{intro}}</p>
			<slot></slot>
		</div>
	</div>
</template>


<script type="text/ecmascript-6">
	export default {
		name: 'DemoSection',

		props: {
			title: {
				type: String,
				default: '',
			},
			intro: {
				type: String,
				default: '',
			},
		},
	};
</script>


<style lang="less" scoped>
	.demo-section {
		margin-top: 10px;
		margin-bottom: 20px;
		.demo-title {
			font-size: 14px;
			color: rgba(69, 90, 100, 0.6);
			padding: 20px 15px 10px 5px;
		}
		.demo-wrap {
			padding: 10px;
			background-color: #fff;
		}
		.demo-intro {
			margin-bottom: 10px;
			font-size: 13px;
			color: #b7b6b6;
		}
	}
</style>

