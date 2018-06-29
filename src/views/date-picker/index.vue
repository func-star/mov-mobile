<template>
	<div class="d-f picker-select">
		<div class="key">滚动弹层选择器</div>
		<div class="flex-1 text-right value" @click="open">{{value || '请点击选择 >'}}</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import { DatePicker } from 'mov';
	import Util from 'core/util';
	import './index.less';

	export default {
		name: 'date-picker',

		data () {
			return {
				value: '',
			};
		},

		created () {},

		methods: {
			open () {
				let defaultDate = Util.moment(this.value).valueOf();

				DatePicker.config({
					format: 'second',
					date: defaultDate,
					onOk: (data) => {
						this.value = Util.moment(data).format('YYYY-MM-DD HH:mm:ss');
					},
					onCancel: () => {
						console.log('cancel');
					},
				});
			},
		},
	};

</script>
