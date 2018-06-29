<template>
	<div class="flex-center">
		<div>
			<div class="popup-item flex-center" @click="bottom">bottom打开(默认)</div>
			<div class="popup-item flex-center" @click="top">top打开</div>
			<div class="popup-item flex-center" @click="right">right打开</div>
			<div class="popup-item flex-center" @click="noAnimate">无动画</div>
		</div>
		<popup :visible="visible" :placement="placement" :animate="animate" :onClose="toggle">
			<div style="height: 286px;" class="w-full">
				<button @click="toggle">关闭</button>
			</div>
		</popup>
	</div>
</template>
<script type="text/ecmascript-6">
	import { Popup } from 'mov';
	import './index.less';

	export default {
		components: {
			Popup,
		},

		props: {},

		data () {
			return {
				visible: false,
				animate: true,
				placement: '',
			};
		},

		methods: {
			init () {

			},
			bottom () {
				this.placement = 'bottom';
				this.animate = true;
				this.toggle();
			},
			top () {
				this.placement = 'top';
				this.animate = true;
				this.toggle();
			},
			right () {
				this.placement = 'right';
				this.animate = true;
				this.toggle();
			},
			noAnimate () {
				this.placement = 'bottom';
				this.animate = false;
				this.toggle();
			},
			toggle () {
				this.visible = !this.visible;
			},
		},

		created () {},

		mounted () {
			this.init();
		},
	};

</script>
