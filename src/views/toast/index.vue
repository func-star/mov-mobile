<template>
	<div class="flex-center">
		<div>
			<div class="toast-item flex-center" @click="info">默认</div>
			<div class="toast-item flex-center" @click="error">error</div>
			<div class="toast-item flex-center" @click="success">success</div>
			<div class="toast-item flex-center" @click="callback">回调</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import { Tool } from 'mov';
	import './index.less';

	export default {
		methods: {
			info () {
				Tool.info('默认');
			},
			error () {
				Tool.error({
					message: '请求失败',
					duration: 1000,
				});
			},
			success () {
				Tool.success();
			},
			callback () {
				Tool.success({
					message: 'call',
					onHide () {
						Tool.info('toast关闭时的回调');
					},
				});
			},
		},

	};

</script>
