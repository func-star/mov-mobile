<template></template>
<script type="text/javascript">
	import Vue from 'vue';

	export default {
		data () {
			return {};
		},

		props: {
			visible: Boolean,
			onMounted: Function,
			onDestroyed: Function,
			closeDelay: {
				type: Number,
				default: 0,
			},
		},

		mounted () {
			if (this.visible) {
				this.mountRoot();
			}
		},

		updated () {
			if (this.visible) {
				if (this.node) {
					this.domRender();
				} else {
					this.mountRoot();
				}
			} else {
				if (this.node) {
					if (this.closeDelay) {
						this.domRender();
					}
					clearTimeout(this.unmountTimer);
					this.unmountTimer = setTimeout(() => {
						this.unMount();
					}, this.closeDelay);
				}
			}
		},

		beforeDestroy () {
			if (this.node) {
				this.unMount();
			}
		},

		methods: {
			mountRoot () {
				// 创建
				if (this.node) {
					return;
				}
				let Template = Vue.extend({
					render: createElement => {
						let props = this.generateProps();
						return createElement('div',
							props,
							this.$slots.default,
						);
					},
				});
				this.node = new Template();
				this.tpl = this.node.$mount().$el;
				document.body.appendChild(this.tpl);
				setTimeout(() => {
					this.onMounted && this.onMounted();
				});
			},
			generateProps () {
				let props = {
					attrs: {},
					on: {},
				};
				this.$el.className && (props.attrs.class = this.$el.className);
				this.$el.style && (props.attrs.style = this.$el.style.cssText);
				this.$el.id && (props.attrs.id = this.$el.id);
				this._events.click && (props.on.click = this._events.click);
				this._events.touchmove && (props.on.touchmove = this._events.touchmove);
				this._events.touchstart && (props.on.touchstart = this._events.touchstart);
				this._events.touchend && (props.on.touchend = this._events.touchend);
				this._events.scroll && (props.on.scroll = this._events.scroll);
				return props;
			},
			domRender () {
				// 更新
				this.node.$forceUpdate();
			},
			unMount () {
				// 卸载
				this.node.$destroy();
				this.tpl.remove();
				this.node = null;
				this.tpl = null;
				setTimeout(() => {
					this.onDestroyed && this.onDestroyed();
				});
			},
		},
	};

</script>
