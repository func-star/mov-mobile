<template>
	<modal
		:visible="visible"
		:title="title"
		:confirmText="confirmText"
		:cancelText="cancelText"
		:onClose="closeConfirm"
		:enableCancel="enableCancel"
		:maskClosable="maskClosable"
		:onConfirm="onConfirm"
		:onCancel="onCancel"
		:isHaveMask="isHaveMask">
		{{content}}
	</modal>
</template>
<script>
	import Modal from './modal.vue';

	export default {
		name: 'mona-modal-confirm',
		components: {
			Modal,
		},
		data () {
			return {
				visible: false,
				enableCancel: true,
				title: null,
				content: null,
				confirmText: '',
				cancelText: '',
				onConfirm: null,
				onCancel: null,
				isHaveMask: true,
				maskClosable: true,
			};
		},

		methods: {
			closeConfirm () {
				this.visible = false;
				Modal.hide();
			},
			show () {
				this.visible = true;
			},
		},
	};

</script>
