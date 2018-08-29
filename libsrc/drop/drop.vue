<template>
	<div class="mona-drop">
		<slot></slot>
	</div>
</template>

<script>
	import DropTitle from './title'
	import DropContent from './content'
	import DropCtrl from './ctrl'

	export default {
		props: {
			isOpen: {
				type: Boolean,
				default: false
			},
			onChange: Function
		},

		created () {
			this.ctrl = new DropCtrl

			this.ctrl.on('monaDropCtrl', isOpen => {
				this.onChange && this.onChange(isOpen)
			})

			this.optionSlot()
			console.log(this)
		},

		beforeDestroy () {
			this.ctrl.off('monaDropCtrl')
		},
		methods: {
			optionSlot () {
				this.$slots.default.map(v => {
					if (!v.componentInstance) {
						return
					}
					v.componentInstance.ctrl = this.ctrl
//					if (v.context === DropTitle || v.context === DropContent) {
//						v.context.ctrl = this.ctrl
//						return v
//					} else {
//						if (v.context.$slots.default && v.context.$slots.default.length > 0) {
//							v.context.$slots.default = this.optionSlot(v.context)
//							return v
//						}
//						return v
//					}
				})
			}
		}
	}
</script>
