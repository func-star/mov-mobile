<template>
	<div ref="hammer" class="mona-hammer fll">
		<slot></slot>
	</div>
</template>
<script type="text/javascript">
	import Tool from '../tool'

	export default {
		props: {
			touchstart: Function,
			pan: Function,
			panstart: Function,
			panmove: Function,
			panend: Function,
			pancancel: Function,
			tap: Function,
			scrollAction: Function
		},
		data () {
			return {
				isTouching: false
			}
		},

		mounted () {
			this.isPC = Tool.isPC()
			if (this.isPC) {
				this.$refs.hammer.addEventListener('mousedown', this.touchStart.bind(this), false)
				this.$refs.hammer.addEventListener('mousemove', this.touchMove.bind(this), false)
				this.$refs.hammer.addEventListener('mouseup', this.touchEnd.bind(this), false)
			} else {
				this.$refs.hammer.addEventListener('touchstart', this.touchStart.bind(this), false)
				this.$refs.hammer.addEventListener('touchmove', this.touchMove.bind(this), false)
				this.$refs.hammer.addEventListener('touchend', this.touchEnd.bind(this), false)
				this.$refs.hammer.addEventListener('touchcancel', this.touchCancel.bind(this), false)
			}
			this.$refs.hammer.addEventListener('scroll', this.scroll.bind(this), false)
		},

		methods: {
			optionEvent (e) {
				if (this.isPC) {
					return {
						x: e.clientX,
						y: e.clientY
					}
				} else {
					return {
						x: e.touches[0].pageX,
						y: e.touches[0].pageY
					}
				}
			},

			getInfo (prev, next) {
				let angle
				if (prev.pageY === next.pageY) {
					angle = prev.pageX - next.pageX < 0 ? 0 : 180
				} else if (prev.pageX === next.pageX) {
					angle = prev.pageY - next.pageY < 0 ? -90 : 90
				} else {
					angle = 180 / (Math.PI / Math.atan((prev.pageY - next.pageY) / (prev.pageX - next.pageX)))
				}
				return {
					velocityY: (next.pageY - prev.pageY) / (next.time - prev.time),
					velocityX: (next.pageX - prev.pageX) / (next.time - prev.time),
					deltaY: next.pageY - this.startInfo.pageY,
					deltaX: next.pageX - this.startInfo.pageX,
					angle: angle
				}
			},

			setInfo (e, isStart) {
				let pageX, pageY
				let now = Date.now()

				const ePoint = this.optionEvent(e)
				const nextData = {
					pageY: ePoint.y,
					pageX: ePoint.x,
					time: now
				}

				if (isStart) {
					pageX = this.startInfo.pageX
					pageY = this.startInfo.pageY
				} else {
					pageX = this.prevInfo.pageX
					pageY = this.prevInfo.pageY
				}

				const preData = {
					pageY: pageY,
					pageX: pageX,
					time: this.prevInfo.time
				}

				let info = this.getInfo(preData, nextData)
				info.center = {
					y: ePoint.y,
					x: ePoint.x
				}

				this.prevInfo = nextData
				this.currentInfo = Object.assign({}, info)

				Object.assign(e, info)
//				console.log(e);
			},

			touchStart (e) {
				this.isTouching = true
				const ePoint = this.optionEvent(e)
				this.prevInfo = {
					time: Date.now(),
					pageY: ePoint.y,
					pageX: ePoint.x
				}
				this.startInfo = {
					time: Date.now(),
					pageY: ePoint.y,
					pageX: ePoint.x
				}
				this.touchstart && this.touchstart(e)
				clearTimeout(this.pressTimer)
				this.pressTimer = setTimeout(() => {
					this.hammerPress(e)
				}, 500)
			},

			touchMove (e) {
				if (!this.isTouching) {
					return
				}
				clearTimeout(this.pressTimer)

				// 是否为touchmove的第一次动作
				const isStart = !this.currentInfo
				// 是否触发了touchmove的第一次动作
				this.isPan = true
				this.setInfo(e, isStart)
				isStart && this.pan && this.pan(e)
				isStart && this.panstart && this.panstart(e)
				this.panmove && this.panmove(e)
			},

			touchEnd (e) {
				if (!this.isTouching) {
					return
				}
				this.isTouching = false
				Object.assign(e, this.currentInfo)
				clearTimeout(this.pressTimer)

				const duration = Date.now() - this.startInfo.time
				this.startInfo = null
				this.prevInfo = null
				this.currentInfo = null

				if (this.isPan) {
					this.pan && this.pan(e)
					this.panend && this.panend(e)
				} else {
					// 没有移动，没有触发touchmove
					(duration < 250) && this.hammerTap(e)
				}
				this.isPan = false
			},

			touchCancel (e) {
				this.startInfo = null
				this.prevInfo = null
				this.currentInfo = null
				this.isPan = false
				clearTimeout(this.pressTimer)
				this.pancancel && this.pancancel(e)
			},

			scroll (e) {
				this.scrollAction && this.scrollAction(e)
			},

			hammerTap (e) {
				this.tap && this.tap(e)
			},

			hammerPress (e) {
				this.press && this.press(e)
			}
		}
	}

</script>
