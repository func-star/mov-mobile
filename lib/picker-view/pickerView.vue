<template>
	<div class="mona-picker-view">
		<div class="h-full flex-center">
			<div class="mona-picker-view-wrap mona-picker-view-transition" ref="movPickerView">
				<div class="mona-picker-view-item" v-if="keyType!=='key-value'" v-for="(item, index) in list">
					{{item}}
				</div>
				<div class="mona-picker-view-item" v-if="keyType==='key-value'" v-for="(item, index) in list">
					{{item[nameKey]}}
				</div>
			</div>
		</div>
		<hammer class="mona-picker-view-mask" :style="'background-size: 100% calc(50% - '+lineHeight/2+'px);'" :panmove="this.panmove" :panend="this.panend" :panstart="this.panstart">
		</hammer>
	</div>
</template>
<script>
	import Tool from '../tool';
	import Hammer from '../hammer';

	export default {
		components: {
			Hammer,
		},
		props: {
			keyType: {
				type: String, // key-value|value
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
		},

		data () {
			return {
				selectIndex: 0,
				list: [],
				y: 0,
				length: 0,
				lineHeight: 34,
			};
		},

		created () {
			this.list = this.source;
			this.selectItem = this.list[0];
		},

		mounted () {
			this.wrap = this.$refs.movPickerView;
			if (this.defaultValue) {
				let index = this.getIndex(this.defaultValue);
				this.setIndex(index, false);
				this.move(-index * this.lineHeight);
			}
		},

		methods: {
			getValue () {
				return this.selectItem;
			},

			setData (data) {
				this.list = data;
				this.setIndex(this.selectIndex);
				this.move(-this.selectIndex * this.lineHeight);
			},

			getIndex (value) {
				let index = 0;
				if (this.keyType === 'key-value') {
					this.list.forEach((v, i) => {
						v[this.valueKey] == value ? index = i : '';
					});
				} else {
					index = this.list.indexOf(value);
				}
				index = index >= 0 ? index : 0;
				return index;
			},

			setIndex (index, checkChange = true) {
				if (index >= this.list.length) {
					index = this.list.length - 1;
				}
				this.selectItem = this.list[index];
				if (index != this.selectIndex && checkChange) {
					this.onChange && this.onChange(this.getValue());
				}
				this.selectIndex = index;
			},

			panstart (e) {
				e.preventDefault();
				this.startY = this.y;
				Tool.removeClass(this.wrap, 'mona-picker-view-transition');
				this.maxHeight = (this.list.length - 1) * this.lineHeight;
			},

			panmove (e) {
				e.preventDefault();
				this.move(this.parseY(e.deltaY));
			},

			panend (e) {
				e.preventDefault();
				Tool.addClass(this.wrap, 'mona-picker-view-transition');

				let speed = this.calcSpeed(e.velocityY);
				let endPoint = this.calcEndPoint(e.deltaY + speed * this.lineHeight); //获取终点位置;
				let index = this.parseY(endPoint) / this.lineHeight; //获取终点位置对应的index,最终运动距离根据index计算
				this.setIndex(Math.abs(index));

				if (Math.abs(e.velocityY) > 0.8) {
					//作缓冲效果
					let buffer = e.velocityY > 0 ? 15 : -15;
					this.move(index * this.lineHeight, buffer);
					clearTimeout(this.moveTimeout);
					this.moveTimeout = setTimeout(() => {
						this.move(index * this.lineHeight);
					}, 400);
				} else {
					this.move(index * this.lineHeight);
				}

				clearTimeout(this.removeTimeout);
				this.removeTimeout = setTimeout(() => {
					Tool.removeClass(this.wrap, 'mona-picker-view-transition');
				}, 1000);
			},

			//手指离开后的运动系数,限制最大速度
			calcSpeed (_v, _maxV = 4) {
				if (Math.abs(_v) > _maxV) {
					return _v > 0 ? _maxV * 4 : -1 * _maxV * 4;
				} else {
					return _v * 4;
				}
			},

			//取整操作，保证终点的位置准确
			calcEndPoint (_y) {
				if (_y % this.lineHeight === 0) {
					return _y;
				} else {
					return Math.round(_y / this.lineHeight) * this.lineHeight;
				}
			},

			parseY (_y) {
				let y = this.startY + _y;
				if (y > 0) {
					return 0;
				}
				if (y < -this.maxHeight) {
					return -this.maxHeight;
				}
				return y;
			},

			move (y, buffer = 0) {
				if (!this.wrap) {
					return;
				}
				this.y = y;
				Tool.css(this.wrap, {
					transform: 'translateY(' + (buffer + y) + 'px)',
				});
			},
		},
	};

</script>
