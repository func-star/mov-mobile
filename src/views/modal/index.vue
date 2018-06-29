<template>
	<div class="flex-center">
		<div>
			<div class="modal-item flex-center" @click="open">自定义弹层</div>
			<div class="modal-item flex-center" @click="open1">有title</div>
			<div class="modal-item flex-center" @click="open2">无title</div>
			<div class="modal-item flex-center" @click="open3">无取消</div>
			<div class="modal-item flex-center" @click="open4">自定义confirm</div>
		</div>
		<modal
			:visible="isOpen"
			title="自定义弹层"
			confirmText="确定吗？"
			:enableCancel="true"
			cancelText="取消吗？"
			:onClose="closeModal"
			:maskClosable="true"
			contentClass="content-cls"
			:onConfirm="callback"
			:onCancel="callback"
			:footer="true"
			:isHaveMask="true">
			<div style="height: 100px;">
				<img src="https://s10.mogucdn.com/mlcdn/c024f5/180410_6fla7fghhkillkcd8831577hg52k1_600x600.jpg_100x100.jpg" alt="">
			</div>
		</modal>
	</div>
</template>
<script type="text/javascript">
	import { Modal, Tool } from 'mov';
	import './index.less';

	export default {
		components: {
			Modal,
		},

		data () {
			return {
				isOpen: false,
			};
		},

		methods: {
			open () {
				this.isOpen = true;
			},
			closeModal () {
				this.isOpen = false;
			},
			callback (type) {
				console.log(type);
			},
			open1 () {
				Modal.confirm({
					title: 'title1',
					maskClosable: false,
					content: 'content1',
					onConfirm: () => {
						Tool.info('confirm');
					},
					onCancel: () => {
						Tool.info('cancel');
					},
				});
			},
			open2 () {
				Modal.confirm({
					content: 'content2',
					onConfirm: () => {
						Tool.info('confirm');
					},
					onCancel: (type) => {
						Tool.info(type);
					},
				});
			},
			open3 () {
				Modal.confirm({
					title: 'title3',
					content: 'content3',
					enableCancel: false,
					onConfirm: () => {
						Tool.info('confirm');
					},
				});
			},
			open4 () {
				Modal.confirm({
					title: '<span style="color: red;">title4</span>',
					content: 'content4',
					confirmText: '知道了',
					cancelText: '算了呗',
					onConfirm: () => {
						Tool.info('confirm');
					},
				});
			},
		},

	};

</script>
