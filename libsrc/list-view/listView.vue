<template lang="html">
    <div class="mona-scroll o-a pos-a pos-a-full" id="mona-scroll" :class="{'down':(state===0),'up':(state===1),'refresh':(state===2),'touch':touching}" @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)" @scroll="(onInfinite || infiniteLoading) ? onScroll($event) : undefined">
        <section class="mona-scroll-inner w-full pos-a" ref="movScrollInner" :style="innerSty">
            <header class="pull-refresh w-full flex-center" :style="pullRefreshSty">
                <slot name="pull-refresh">
                   <div class="pull-refresh-icon" :class="{'animate': !touching}"></div>
                </slot>
            </header>
            <slot></slot>
            <footer class="load-more" v-if="enableInfinite&&!isEnd">
                <slot name="load-more">
                    <div class="load-more-icon block-center"></div>
                </slot>
            </footer>
        </section>
    </div>
</template>
<script>
import Tool from '../tool';

export default {
    props: {
        offset: {
            type: Number,
            default: 50,
        },
        bottomEmit: {
            type: Number,
            default: 100,
        },
        enableInfinite: {
            type: Boolean,
            default: true,
        },
        enableRefresh: {
            type: Boolean,
            default: true,
        },
        isEnd: {
            type: Boolean,
            default: false,
        },
        onRefresh: Function,
        onInfinite: Function,
        onMove: Function,
    },
    computed: {
        innerSty() {
            return {
                top: -this.offset + 'px',
            };
        },
        pullRefreshSty() {
            return {
                height: this.offset + 'px',
            };
        },
    },
    data() {
        return {
            top: 0,
            state: 0,
            startY: 0,
            touching: false,
            infiniteLoading: false,
        };
    },
    mounted() {
        this.scrollInnerView = this.$refs.movScrollInner;
    },
    methods: {
        touchStart(e) {
            this.startY = e.targetTouches[0].pageY;
            this.startScroll = this.$el.scrollTop || 0;
            this.touching = true;
        },
        touchMove(e) {
            if (!this.enableRefresh || this.$el.scrollTop > 0 || !this.touching) {
                return;
            }
            let diff = e.targetTouches[0].pageY - this.startY - this.startScroll;
            if (diff > 0) {
                e.preventDefault();
            }
            this.top = Math.pow(diff, 0.8) + (this.state === 2 ? this.offset : 0);
            this.topStyle();

            if (this.state === 2) { // in refreshing
                return;
            }
            if (this.top >= this.offset) {
                this.state = 1;
            } else {
                this.state = 0;
            }
        },
        touchEnd(e) {
            if (!this.enableRefresh || !this.touching) {
                return;
            }
            this.touching = false;
            if (this.state === 2) { // in refreshing
                this.state = 2;
                this.top = this.offset;
                this.topStyle();
                return;
            }
            if (this.top >= this.offset) { // do refresh
                this.refresh();
            } else { // cancel refresh
                this.state = 0;
                this.top = 0;
                this.topStyle();
            }
        },
        refresh() {
            this.state = 2;
            this.top = this.offset;
            this.topStyle();
            this.onRefresh(this.refreshDone);
        },
        refreshDone() {
            this.state = 0;
            this.top = 0;
            this.topStyle();
        },

        topStyle() {
            Tool.css(this.scrollInnerView, {
                'will-change': 'transform',
                transform: this.top ? 'translateY(' + this.top + 'px)' : 'none',
            });
        },

        infinite() {
            this.infiniteLoading = true;
            this.onInfinite(this.infiniteDone);
        },

        infiniteDone() {
            this.infiniteLoading = false;
        },

        onScroll(e) {
            this.onMove && this.onMove(this.$el.scrollTop);
            if (!this.enableInfinite || this.infiniteLoading) {
                return;
            }
            if (this.isEnd) {
                return;
            }
            if (this.isTimeout) {
                return;
            }
            this.isTimeout = true;
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                let outerHeight = this.$el.clientHeight;
                let innerHeight = this.$el.querySelector('.mona-scroll-inner').clientHeight;
                let scrollTop = this.$el.scrollTop;
                let ptrHeight = this.onRefresh ? this.$el.querySelector('.pull-refresh').clientHeight : 0;
                let infiniteHeight = this.$el.querySelector('.load-more').clientHeight;
                let bottom = innerHeight - outerHeight - scrollTop - ptrHeight;
                if (bottom < (infiniteHeight + this.bottomEmit)) {
                    this.infinite();
                }
                this.isTimeout = false;
            }, 200);
        },
    },
};

</script>
