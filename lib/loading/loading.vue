<template>
	<mount-root :visible="visible">
		<div class="mona-loading pos-f pos-f-full flex-center" @touchmove="preventDefault($event)">
			<div class="mona-loading-con" :style=" 'margin-top:' + (-1 * hdpHeader / 2) + 'px'"></div>
		</div>
	</mount-root>
</template>
<script>
	import MountRoot from '../mount-root';
	import Tool from '../tool';

	export default {
		data () {
			return {
				visible: false,
				bodyHeight: 0,
				screenHeight: 0,
				hdpHeader: 0,
			};
		},

		components: {
			'mount-root': MountRoot,
		},

		created () {
			this.bodyHeight = document.body.offsetHeight;
			this.screenHeight = window.screen.height;
			this.hdpHeader = this.screenHeight - this.bodyHeight;
		},

		methods: {
			preventDefault (e) {
				e.preventDefault();
			},
			show () {
				Tool.preventScroll();
				this.visible = true;
			},
			hide () {
				Tool.cancelPreventScroll();
				this.visible = false;
			},
		},
	};

</script>
