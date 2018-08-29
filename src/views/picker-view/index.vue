<template>
	<div class="demo h-full">
		<picker-view :source="source" keyType="value" :defaultValue="year" :onChange="getValue"></picker-view>
	</div>
</template>
<script type="text/ecmascript-6">
	import { PickerView } from 'mona'
	import './index.less'

	export default {
		components: {
			PickerView
		},

		props: {},

		data () {
			return {
				year: '2018年'
			}
		},

		computed: {},

		watch: {},

		methods: {
			init () {

			},
			getValue (val) {
				console.log(val)
			}
		},

		filters: {},

		created () {
			this.source = []
			for (let i = 0; i < 100; i++) {
				this.source.push(2000 + i + '年')
			}
		},

		mounted () {
			this.init()
		}
	}

</script>
