<template>
    <div ref="movHammer" class="mona-hammer full" @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)" @touchcancel="touchcancel($event)" @scroll="scroll($event)">
        <slot></slot>
    </div>
</template>
<script type="text/javascript">

    export default {
        props: {
            touchstart: Function,
            pan: Function,
            panstart: Function,
            panmove: Function,
            panend: Function,
            pancancel: Function,
            tap: Function,
            scrollAction: Function,
        },

        data () {
            return {};
        },

        methods: {
            getInfo (prev, next) {
                let angle;
                if (prev.pageY == next.pageY) {
                    angle = prev.pageX - next.pageX < 0 ? 0 : 180;
                } else if (prev.pageX == next.pageX) {
                    angle = prev.pageY - next.pageY < 0 ? -90 : 90;
                } else {
                    angle = 180 / (Math.PI / Math.atan((prev.pageY - next.pageY) / (prev.pageX - next.pageX)));
                }
                return {
                    velocityY: (next.pageY - prev.pageY) / (next.time - prev.time),
                    velocityX: (next.pageX - prev.pageX) / (next.time - prev.time),
                    deltaY: next.pageY - this.startInfo.pageY,
                    deltaX: next.pageX - this.startInfo.pageX,
                    angle: angle,
                };
            },
            setInfo (e, isStart) {
                let now = Date.now();

                let pageY;
                let pageX;

                let nextData = {
                    pageY: e.touches[0].pageY,
                    pageX: e.touches[0].pageX,
                    time: now,
                };

                if (isStart) {
                    pageX = this.startInfo.pageX;
                    pageY = this.startInfo.pageY;
                } else {
                    pageX = this.prevInfo.pageX;
                    pageY = this.prevInfo.pageY;
                }

                let preData = {
                    pageY: pageY,
                    pageX: pageX,
                    time: this.prevInfo.time,
                };

                let info = this.getInfo(preData, nextData);
                info.center = {
                    y: e.touches[0].pageY,
                    x: e.touches[0].pageX,
                };

                this.prevInfo = nextData;
                this.currentInfo = Object.assign({}, info);

                Object.assign(e, info);
            },
            touchStart (e) {
                this.prevInfo = {
                    time: Date.now(),
                    pageY: e.touches[0].pageY,
                    pageX: e.touches[0].pageX,
                };
                this.startInfo = {
                    time: Date.now(),
                    pageY: e.touches[0].pageY,
                    pageX: e.touches[0].pageX,
                };
                this.touchstart && this.touchstart(e);
                this.pressTimer = setTimeout(() => {
                    this.hammerPress(e);
                }, 500);
            },

            touchMove (e) {
                let isStart = !this.currentInfo;
                clearTimeout(this.pressTimer);
                this.isPan = true;
                this.setInfo(e, isStart);
                if (this.isPan) {
                    if (isStart && this.pan) {
                        this.pan(e);
                    }
                    if (isStart && this.panstart) {
                        this.panstart(e);
                    }
                    if (this.panmove) {
                        this.panmove(e);
                    }
                }
            },
            touchEnd (e) {
                Object.assign(e, this.currentInfo);
                clearTimeout(this.pressTimer);
                let duration = Date.now() - this.startInfo.time;

                this.startInfo = null;
                this.prevInfo = null;
                this.currentInfo = null;

                if (this.isPan) {
                    this.pan && this.pan(e);
                    this.panend && this.panend(e);
                } else {
                    if (duration < 250) {
                        this.hammerTap(e);
                    }
                }
                this.isPan = false;
            },
            touchCancel (e) {
                this.startInfo = null;
                this.prevInfo = null;
                this.currentInfo = null;
                this.isPan = false;
                clearTimeout(this.pressTimer);
                if (this.isPan) {
                    this.pancancel && this.pancancel(e);
                }
            },
            scroll (e) {
                this.scrollAction && this.scrollAction(e);
            },
            hammerTap (e) {
                this.tap && this.tap(e);
            },
            hammerPress (e) {
                this.press && this.press(e);
            },
        },

        mounted () {},
    };

</script>
