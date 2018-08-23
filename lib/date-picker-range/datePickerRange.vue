<template>
	<popup :visible="visible" placement="bottom" :onClose="cancel">
		<div class="mona-date-picker-range w-full">
			<div class="mona-date-picker-range-header d-f">
				<div class="flex-1 h-full item flex-center-y" @click="cancel">取消</div>
				<div class="flex-1 h-full item flex-center-y flex-right-x" @click="confirm">确定</div>
			</div>
			<div class="full d-f">
				<date-item class="flex-1 h-full" :defaultOpt="options" itemKey="start" ref="dateItemStart"></date-item>
				<div class="mona-date-to flex-center"></div>
				<date-item class="flex-1 h-full" :defaultOpt="options" itemKey="end" ref="dateItemEnd"></date-item>
			</div>
		</div>
	</popup>
</template>
<script>
	import MainServer from './index.js';
	import Generate from './generate';
	import PickerView from '../picker-view';
	import Popup from '../popup';
	import DateItem from './item';

	export default {
		components: {
			Popup,
			PickerView,
			DateItem,
		},
		data () {
			return {
				defaultOpt: {},
				options: {},
				visible: false,
			};
		},

		methods: {
			setOptions (options) {
				let ctrl = Generate.generateCtrl(options.format);
				this.options = Object.assign({}, this.defaultOpt, options, ctrl);
			},
			show () {
				this.visible = true;
			},
			hide () {
				this.visible = false;
				MainServer.hide();
			},
			onClean () {
				this.options.onClean && this.options.onClean();
				this.hide();
			},
			cancel () {
				this.options.onCancel && this.options.onCancel();
				this.hide();
			},
			confirm () {
				let start = this.getVal('dateItemStart');
				let end = this.getVal('dateItemEnd');

				this.options.onOk && this.options.onOk({
					start: start,
					end: end,
				});
				this.hide();
			},
			getVal (key) {
				const {dayVisible} = this.options;
				let {year, month, day} = this.$refs[key].getValue();
				day = dayVisible ? day : '01';
				return (key === 'dateItemStart') ? new Date(year, month - 1, day, 0, 0, 0).getTime() : new Date(year, month - 1, day, 23, 59, 59).getTime();
			},
		},
	};

</script>
