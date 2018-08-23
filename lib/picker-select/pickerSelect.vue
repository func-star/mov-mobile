<template>
	<popup :visible="visible" placement="bottom" :onClose="movSelectClose">
		<div class="mona-picker-select w-full">
			<div class="mona-picker-select-header ui-border-b d-f">
				<div class="flex-1 item flex-center-y" @click="movSelectClose">取消</div>
				<div class="flex-1 item flex-center-y flex-right-x" @click="movSelectConfirm">确定</div>
			</div>
			<div class="mona-picker-select-con">
				<picker-view :source="source" :keyType="keyType" :nameKey="nameKey" :valueKey="valueKey" :defaultValue="defaultValue" :onChange="movSelectOnChange"></picker-view>
			</div>
		</div>
	</popup>
</template>
<script>
	import PickerView from '../picker-view';
	import Popup from '../popup';

	export default {
		components: {
			PickerView,
			Popup,
		},
		data () {
			return {
				movSelectValue: this.defaultValue,
			};
		},
		props: {
			keyType: {
				type: String,
				default: 'key-value',
			},
			nameKey: {
				type: String,
				default: 'name',
			},
			valueKey: {
				type: String,
				default: 'value',
			},
			source: {
				type: Array,
				default: [],
			},
			defaultValue: [String, Number],
			onChange: Function,
			onClose: Function,
			visible: Boolean,
		},

		methods: {
			movSelectClose () {
				this.onClose();
			},
			movSelectOnChange (val) {
				this.movSelectValue = val;
			},
			movSelectConfirm () {
				this.onChange(this.movSelectValue);
				this.movSelectClose();
			},
		},
	};

</script>
