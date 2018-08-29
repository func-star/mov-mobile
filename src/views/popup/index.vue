<template>
	<div>
		<demo-page title="Popup - 弹层" intro="弹层">
			<demo-section title="底部弹出" intro="demo1 - 默认">
				<demo-button text="弹出" @click.native="demo1"></demo-button>
			</demo-section>
			<demo-section title="顶部弹出" intro="demo2">
				<demo-button text="弹出" @click.native="demo2"></demo-button>
			</demo-section>
			<demo-section title="右侧弹出" intro="demo3">
				<demo-button text="弹出" @click.native="demo3"></demo-button>
			</demo-section>
			<demo-section title="无动画效果" intro="demo4">
				<demo-button text="弹出" @click.native="demo4"></demo-button>
			</demo-section>
			<demo-section title="禁止蒙层点击关闭" intro="demo5">
				<demo-button text="弹出" @click.native="demo5"></demo-button>
			</demo-section>
		</demo-page>
		<popup :visible="demo1Visible" placement="bottom" :onClose="hidePopup">
			<div style="height: 286px" class="flex f-dir-top f-center">
				<div class="text-center p-b-10">底部弹出</div>
				<DemoButton @click.native="hidePopup" text="关闭"></DemoButton>
			</div>
		</popup>
		<popup :visible="demo2Visible" placement="top" :onClose="hidePopup">
			<div style="height: 286px" class="flex f-dir-top f-center">
				<div class="p-b-10">顶部弹出</div>
				<DemoButton @click.native="hidePopup" text="关闭"></DemoButton>
			</div>
		</popup>
		<popup :visible="demo3Visible" placement="right" :onClose="hidePopup">
			<div class="flex f-dir-top f-center" style="height: 100vh">
				<div style="width: 200px" class="text-center p-b-10 p-t-10">右侧弹出</div>
				<DemoButton @click.native="hidePopup" text="关闭"></DemoButton>
			</div>
		</popup>
		<popup :visible="demo4Visible" placement="bottom" :onClose="hidePopup" :animate="false">
			<div style="height: 286px" class="flex f-dir-top f-center">
				<div class="text-center p-b-10">无动画效果</div>
				<DemoButton @click.native="hidePopup" text="关闭"></DemoButton>
			</div>
		</popup>
		<popup :visible="demo5Visible" placement="bottom" :onClose="hidePopup" :maskClosable="false">
			<div style="height: 286px" class="flex f-dir-top f-center">
				<div class="text-center p-b-10">禁止蒙层点击关闭</div>
				<DemoButton @click.native="hidePopup" text="关闭"></DemoButton>
			</div>
		</popup>
	</div>
</template>

<script type="text/ecmascript-6">
	import DemoPage from 'components/demo-page'
	import DemoSection from 'components/demo-section'
	import DemoButton from 'components/demo-button'
	import { Popup } from 'mona'

	// TODO 没有左侧弹出

	export default {
		name: 'PopupDemo',

		components: {
			DemoPage,
			DemoSection,
			DemoButton,
			Popup
		},

		data () {
			return {
				visible: false,
				animate: true,
				placement: '',
				demo1Visible: false,
				demo2Visible: false,
				demo3Visible: false,
				demo4Visible: false,
				demo5Visible: false
			}
		},

		methods: {
			demo1 () {
				this.demo1Visible = true
			},

			demo2 () {
				this.demo2Visible = true
			},

			demo3 () {
				this.demo3Visible = true
			},

			demo4 () {
				this.demo4Visible = true
			},

			demo5 () {
				this.demo5Visible = true
			},
			hidePopup () {
				this.demo1Visible = false
				this.demo2Visible = false
				this.demo3Visible = false
				this.demo4Visible = false
				this.demo5Visible = false
			}
		}
	}
</script>

<style lang="less" scoped>

</style>

