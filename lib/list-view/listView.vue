<template lang="html">
	<Hammer
		class="mona-list-view full o-a pos-r"
		:panstart="panstart"
		:panmove="panmove"
		:panend="panend"
		:scrollAction="scroll"
		ref="container">
		<section class="mona-list-view-section pos-a w-full" :style="sectionSty" ref="wrap">
			<header class="list-view-refresh flex-center" :style="headerSty" v-if="enableRefresh">
                <slot name="pull-refresh">
                    <div ref="refreshIcon" class="list-view-refresh-icon"></div>
                </slot>
            </header>
			<slot></slot>
			<footer class="list-view-infinite" v-if="enableInfinite && !isEnd" ref="footerWrap">
                <slot name="load-more">
                    <div class="list-view-infinite-icon block-center"></div>
                </slot>
            </footer>
		</section>
	</Hammer>
</template>
<script>
import Tool from '../tool'
import Hammer from '../hammer'

export default {
	components: {
		Hammer
	},
    props: {
        offset: {
            type: Number,
            default: 50
        },
        bottomEmit: {
            type: Number,
            default: 100
        },
	    infiniteTimer: {
		    type: Number,
		    default: 200
	    },
        enableInfinite: {
            type: Boolean,
            default: true
        },
        enableRefresh: {
            type: Boolean,
            default: true
        },
        isEnd: {
            type: Boolean,
            default: false
        },
	    onScroll: Function,
        onRefresh: Function,
        onInfinite: Function
    },
    computed: {
	    sectionSty() {
            return {
                top: this.enableRefresh? (-this.offset + 'px') : 0
            }
        },
	    headerSty() {
            return {
                height: this.offset + 'px'
            }
        }
    },
    data() {
        return {
	        startY: 0, // 起点的位置
	        startScrollTop: 0, // 开始touch事件时的scrollTop值
	        status: 0,	// 0-下降状态以及初始状态、1-上升状态、2-停止状态，正在刷新
	        top: 0,
	        touching: false,
	        infiniting: false // 加载更多区块处理状态中
        }
    },
	created() {
		if (this.enableRefresh && !this.onRefresh) {
			throw new Error('允许下拉的情况下（enableRefresh: true），onRefresh 回调函数不允许为空')
		}
		if (this.enableInfinite && !this.onInfinite) {
			throw new Error('允许加载更多的情况下（enableInfinite: true），onInfinite 回调函数不允许为空')
		}
	},
    mounted() {
	    this.container = this.$refs.container
	    this.wrap = this.$refs.wrap
	    this.refreshIcon = this.$refs.refreshIcon
	    this.footerWrap = this.$refs.footerWrap
    },
    methods: {
	    panstart(e) {
		    const angleAbs = Math.abs(e.angle)
		    this.startScrollTop = this.container.$el.scrollTop || 0
		    if (e.velocityY > 0 && this.startScrollTop <= 0) {
			    e.preventDefault()
		    }
		    if (angleAbs > 45 && angleAbs < 135) {
			    Tool.removeClass(this.wrap, 'mona-list-view-transition')
			    this.startY = e.center.y
			    this.touching = true
		    }
        },

	    panmove(e) {
	        const diff = e.center.y - this.startY - this.startScrollTop
	        if (diff > 0) {
		        e.preventDefault()
	        }

	        if (!this.enableRefresh || this.container.$el.scrollTop > 0 || !this.touching) {
		        return
	        }

	        this.top = Math.pow(diff, 0.8) + (this.status === 2 ? this.offset : 0) // 弹性阻尼
	        this.setHeaderPosition()

	        if (this.status === 2) {
		        return
	        }
	        if (this.top >= this.offset) {
		        this.status = 1	// 位移过程中，超过header高度
	        } else {
		        this.status = 0	// 位移过程中，未超过header高度
	        }
        },

	    panend(e) {
		    if (!this.enableRefresh || !this.touching) {
			    return
		    }
		    Tool.addClass(this.wrap, 'mona-list-view-transition')
		    this.touching = false

		    if (this.status === 2) {
			    this.top = this.offset
			    this.setHeaderPosition()
			    return
		    }

		    if (this.top >= this.offset) {
			    // 执行刷新
			    this.status = 2
			    this.top = this.offset
			    this.refresh()
		    } else {
			    this.status = 0
			    this.top = 0
		    }
		    this.setHeaderPosition()
        },

        refresh() {
	        Tool.addClass(this.refreshIcon, 'animate')
	        this.onRefresh && this.onRefresh(this.refreshDone.bind(this))
        },

	    // 刷新结束钩子函数，回调
        refreshDone() {
	        this.status = 0
	        this.top = 0
	        Tool.removeClass(this.refreshIcon, 'animate')
	        this.setHeaderPosition()
        },

	    scroll (e) {
		    this.onScroll && this.onScroll({scrollTop: this.$el.scrollTop, ...e})
		    if (!this.enableInfinite || this.infiniting) {
			    return
		    }
		    if (this.isEnd) {
			    return
		    }
		    if (this.isTiming) {
			    return
		    }
		    this.isTiming = true

		    clearTimeout(this.timer)
		    this.timer = setTimeout(() => {
			    this.containerHeight = this.containerHeight || this.container.$el.clientHeight
			    this.sectionHeight = this.wrap.clientHeight
			    const scrollTop = this.container.$el.scrollTop
			    this.headerHeight = this.headerHeight || (this.enableRefresh ? this.offset : 0)
			    this.footerHeight = this.footerHeight || this.footerWrap.clientHeight

			    const bottom = this.sectionHeight - this.containerHeight - scrollTop - this.headerHeight
			    if (bottom < (this.footerHeight + this.bottomEmit)) {
				    this.infinite()
			    }
			    this.isTiming = false
		    }, this.infiniteTimer)
	    },

        infinite() {
	        this.infiniting = true
	        this.onInfinite && this.onInfinite(this.infiniteDone.bind(this))
        },

        infiniteDone() {
	        this.infiniting = false
        },

	    // 头部下拉刷新区块位移
	    setHeaderPosition () {
		    Tool.css(this.wrap, {
			    'will-change': 'transform',
			    transform: this.top ? `translateY(${this.top}px)` : 'none'
		    })
	    },

	    toTop() {
		    this.container.$el.scrollTop = 0
	    }
    }
}

</script>
