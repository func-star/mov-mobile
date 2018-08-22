<template>
	<div class="demo-page">
		<header class="demo-info flex f-dir-top f-cross-center">
			<p class="title">{{title}}</p>
			<p class="intro">{{intro}}</p>
		</header>
		<main>
			<slot></slot>
		</main>
	</div>
</template>


<script type="text/ecmascript-6">
	export default {
		name: 'DemoPage',
		props: {
			title: {
				type: String,
				default: '组件'
			},
			intro: {
				type: String,
				default: '描述'
			}
		}
	};
</script>


<style lang="less" scoped>
	.demo-page {
		padding: 30px 10px;
	}

	.demo-info {
		.title {
			padding-bottom: 8px;
			font-size: 14px;
			color: #a2a2a2;
			border-bottom: 1px solid #b7b6b6;
			font-weight: 500;
		}
		.intro {
			margin-top: 8px;
			font-size: 13px;
			color: #b7b6b6;
		}
	}
</style>

