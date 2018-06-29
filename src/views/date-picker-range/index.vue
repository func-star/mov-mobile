<template>
	<div class="d-f picker-select">
		<div class="key">滚动弹层选择器</div>
		<div class="flex-1 text-right value" @click="open">{{start}} 至 {{end}}</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import { DatePickerRange } from 'mov';
	import Util from 'core/util';
	import './index.less';

	export default {
		name: 'date-picker-ranger',

		data () {
			return {
				start: '',
				end: '',
			};
		},

		created () {},

		methods: {
			open () {
				let start = Util.moment(this.start).valueOf();
				let end = Util.moment(this.end).valueOf();

				DatePickerRange.config({
					date: {
						start: start,
						end: end,
					},
					onOk: (data) => {
						this.start = Util.moment(data.start).format('YYYY-MM-DD');
						this.end = Util.moment(data.end).format('YYYY-MM-DD');
						console.log(Util.moment(data.start).format('YYYY-MM-DD HH:mm:ss'));
						console.log(Util.moment(data.end).format('YYYY-MM-DD HH:mm:ss'));
					},
					onCancel: () => {
						console.log('cancel');
					},
				});
			},
		},
	};

</script>
