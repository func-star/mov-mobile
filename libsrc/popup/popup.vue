<template>
	<mount-root :visible="visible" :closeDelay="closeDelay" :onMounted="onMountRooted">
		<div class="mov-popup pos-f pos-f-full" :class="[{'show-content': showContent, 'have-animate': animate}, placement]">
			<div class="mov-popup-mask pos-a pos-a-full" @click="maskClick" @touchmove="preventDefault($event)"></div>
			<div class="mov-popup-con pos-a">
				<slot></slot>
			</div>
		</div>
	</mount-root>
</template>
<script type="text/javascript">
	import Tool from '../tool';

	import MountRoot from '../mount-root';

	export default {
		components: {
			MountRoot,
		},

		data () {
			return {
				closeDelay: 300,
				showContent: false,
			};
		},

		props: {
			visible: Boolean,
			placement: {
				type: String,
				default: 'bottom' //top|bottom|right
			},
			maskClosable: {
				type: Boolean,
				default: true,
			},
			onClose: {
				type: Function,
				required: true,
			},
			animate: {
				type: Boolean,
				default: true,
			},
		},

		created () {
			if (this.visible) {
				Tool.addClass(document.body, 'o-h');
			}
		},

		beforeDestroy () {
			Tool.removeClass(document.body, 'o-h');
			this.showContent = false;
		},

		watch: {
			visible (val) {
				if (val) {
					Tool.addClass(document.body, 'o-h');
				} else {
					Tool.removeClass(document.body, 'o-h');
					this.showContent = false;
				}
			},
		},

		methods: {
			preventDefault (e) {
				e.preventDefault();
			},

			maskClick () {
				this.maskClosable && this.onClose && this.onClose();
			},

			// 在mount-root节点挂载后添加动画
			onMountRooted () {
				this.showContent = true;
			},
		},
	};

</script>
