<template>
	<div>
		<demo-page title="date-picker -  时间弹层选择器" intro="时间选择器">
			<demo-section title="基础用法" intro="demo1">
				<demo-button text="显示时间弹层选择器" @click.native="demo1"></demo-button>
			</demo-section>
		</demo-page>

	</div>
</template>

<script type="text/ecmascript-6">
	import DemoPage from 'components/demo-page'
	import DemoSection from 'components/demo-section'
	import DemoButton from 'components/demo-button'
	import { DatePicker, Tool } from 'mona'
	import Util from 'core/util'

	export default {
		name: 'PickerSelectDemo',

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
				let defaultDate = Util.moment(this.value).valueOf()

				DatePicker.config({
					format: 'second',
					date: defaultDate,
					onOk: (data) => {
						this.value = Util.moment(data).format('YYYY-MM-DD HH:mm:ss')
						Tool.info(`选中了时间${this.value }`)
					},
					onCancel: () => {
						Tool.info('取消了选择')
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

