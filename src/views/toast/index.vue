<template>
	<demo-page title="Toast - 提示" intro="提示">
		<demo-section title="基础用法" intro="demo1">
			<demo-button text="显示Toast" @click.native="demo1"></demo-button>
		</demo-section>
		<demo-section title="成功提示" intro="demo2">
			<demo-button text="显示Toast" @click.native="demo2"></demo-button>
		</demo-section>
		<demo-section title="失败提示" intro="demo3">
			<demo-button text="显示Toast" @click.native="demo3"></demo-button>
		</demo-section>
		<demo-section title="展示3s" intro="demo4">
			<demo-button text="显示Toast" @click.native="demo4"></demo-button>
		</demo-section>
		<demo-section title="带回调" intro="demo5">
			<demo-button text="显示Toast" @click.native="demo5"></demo-button>
		</demo-section>
	</demo-page>
</template>

<script type="text/ecmascript-6">
	import DemoPage from 'components/demo-page'
	import DemoSection from 'components/demo-section'
	import DemoButton from 'components/demo-button'
	import { Toast } from 'mona'

	export default {
		name: 'Toast',

		components: {
			DemoPage,
			DemoSection,
			DemoButton
		},

		props: {},

		data () {
			return {}
		},

		computed: {},

		watch: {},

		methods: {
			demo1 () {
				Toast.show('普通提示')
			},
			demo2 () {
				Toast.show({
					message: '成功提示', type: 'success'
				})
			},
			demo3 () {
				Toast.show({
					message: '失败提示', type: 'error'
				})
			},
			demo4 () {
				Toast.show({
					message: '提示3s', duration: 3000
				})
			},
			demo5 () {
				Toast.show({
					message: '带回调的提示', onHide () {
						Toast.show({
							message: '回调', type: 'error'
						})
					}
				})
			}
		},

		filters: {},

		created () {
		},

		mounted () {
		}
	}
</script>

<style lang="less" scoped>

</style>

