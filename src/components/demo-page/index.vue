<template>
	<div class="demo-page">
		<header class="demo-info flex f-dir-top f-cross-center">
			<p class="title">Toast - 提示</p>
			<p class="intro">提示</p>
		</header>
		<main>
			<slot></slot>
		</main>
	</div>
</template>


<script type="text/ecmascript-6">
	export default {
		name: 'DemoPage',
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

