<template>
	<div class="flex-center">
		<div>
			<div class="loading-item flex-center" @click="show">开始加载</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import { Loading } from 'mov';
	import './index.less';

	export default {
		methods: {
			show () {
				Loading.show();
				setTimeout(() => {
					this.hide();
				}, 2000);
			},
			hide () {
				Loading.hide();
			},
		},

	};

</script>
