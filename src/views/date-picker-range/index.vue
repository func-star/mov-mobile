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
	import { DatePickerRange, Tool } from 'mona'
	import Util from 'core/util'

	export default {
		name: 'DatePickerRangeDemo',

		components: {
			DemoPage,
			DemoSection,
			DemoButton
		},

		props: {},

		data () {
			return {
				start: '',
				end: ''
			}
		},

		computed: {},

		watch: {},

		methods: {
			demo1 () {
				let start = Util.moment(this.start).valueOf()
				let end = Util.moment(this.end).valueOf()

				DatePickerRange.config({
					date: {
						start: start,
						end: end
					},
					onOk: (data) => {
						this.start = Util.moment(data.start).format('YYYY-MM-DD')
						this.end = Util.moment(data.end).format('YYYY-MM-DD')
						Tool.info(`选中开始时间${Util.moment(data.start).format('YYYY-MM-DD HH:mm:ss')}, 结束时间${Util.moment(data.end).format('YYYY-MM-DD HH:mm:ss')}`)
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

