<template>
	<div>
		<demo-page title="Modal - 弹窗" intro="支持自定义弹窗和dialog">
			<demo-section title="自定义title模板" intro="demo1">
				<demo-button text="显示Modal" @click.native="demo1"></demo-button>
			</demo-section>
			<demo-section title="自定义确认和取消文案，无title" intro="demo2">
				<demo-button text="显示Modal" @click.native="demo2"></demo-button>
			</demo-section>
			<demo-section title="自定义底部" intro="demo3">
				<demo-button text="显示Modal" @click.native="demo3"></demo-button>
			</demo-section>
			<demo-section title="点击蒙层不关闭" intro="demo4">
				<demo-button text="显示Modal" @click.native="demo4"></demo-button>
			</demo-section>
			<demo-section title="无取消按钮" intro="demo5">
				<demo-button text="显示Modal" @click.native="demo5"></demo-button>
			</demo-section>
			<demo-section title="API调用方式" intro="Modal.confirm(options)">
				<demo-button text="显示Modal" @click.native="demo6"></demo-button>
			</demo-section>
		</demo-page>
		<Modal :visible="demo1Visible" title="<span style='color: red'>自定义用法</span>" :onClose="cancel"
			   :onConfirm="confirm">
			<div>自定义title模板</div>
		</Modal>
		<Modal :visible="demo2Visible" confirmText="请确认" cancelText="请取消" :onClose="cancel"
			   :onConfirm="confirm">
			<div>自定义确认和取消文案，无title</div>
		</Modal>
		<Modal :visible="demo3Visible" :footer="false" :onClose="cancel" title="自定义用法" :onConfirm="confirm">
			<div>demo3 - 自定义底部，点击蒙层关闭</div>
		</Modal>
		<Modal :visible="demo4Visible" :onClose="cancel" :onConfirm="confirm" :maskClosable="false">
			<div>demo4 - 点击蒙层不关闭</div>
		</Modal>
		<Modal :visible="demo5Visible" :onClose="cancel" :onConfirm="confirm" :enableCancel="false">
			<div>demo5 - 无取消按钮</div>
		</Modal>
	</div>
</template>


<script type="text/ecmascript-6">
	import DemoPage from 'components/demo-page';
	import DemoSection from 'components/demo-section';
	import DemoButton from 'components/demo-button';
	import {Modal, Tool} from 'mov';

	export default {
		name: 'Layout',

		components: {
			DemoPage,
			DemoSection,
			DemoButton,
			Modal,
		},

		props: {},

		data() {
			return {
				demo1Visible: false,
				demo2Visible: false,
				demo3Visible: false,
				demo4Visible: false,
				demo5Visible: false,
			};
		},

		computed: {},

		watch: {},

		methods: {
			demo1() {
				this.demo1Visible = true;
			},
			demo2() {
				this.demo2Visible = true;
			},
			demo3() {
				this.demo3Visible = true;
			},
			demo4() {
				this.demo4Visible = true;
			},
			demo5() {
				this.demo5Visible = true;
			},
			demo6() {
				Modal.confirm({
					title: 'API调用方式',
					content: '自定义内容',
					onConfirm() {
						this.hide();
						Tool.info('确认');
					},
					onCancel() {
						this.hide();
						Tool.info('取消');
					},
				});
			},
			cancel() {
				this.hide();
				Tool.info('取消');
			},
			confirm() {
				this.hide();
				Tool.info('确认');
			},
			hide() {
				this.demo1Visible = false;
				this.demo2Visible = false;
				this.demo3Visible = false;
				this.demo4Visible = false;
				this.demo5Visible = false;
			},
		},

		filters: {},

		created() {
		},

		mounted() {
		},
	};
</script>


<style lang="less" scoped>

</style>

