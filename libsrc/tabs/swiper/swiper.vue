<template lang="html">
    <hammer :panmove="panmove" :panend="panend" :panstart="panstart">
        <div class="mov-swiper o-h full pos-r" ref="movSwiper">
            <div class="content h-full o-h" :style="contentSty" ref="movSwiperContent">
                <slot></slot>
            </div>
        </div>
    </hammer>
</template>
<script>
    import Hammer from '../../hammer';
    import Tool from '../../tool';

    export default {
        components: {
            Hammer,
        },
        data() {
            return {
                childDomList:[],
                itemWidth: 0,
                currentIndex: 0,
                translateX: 0,
                isTranslating: false, // 是否正在滚动
                isTouching: false, // 是否处于touch状态
            };
        },
        computed: {
            contentSty(){
                return {
                    width: this.childDomList.length * this.itemWidth + 'px',
                };
            },
        },
        props: {
            defaultIndex: {
                type: Number,
                default: 0,
            },
            canPan: {
                type: Boolean,
                default: true,
            },
            afterChange: Function,
            beforeChange: Function,
        },
        created() {
            this.currentIndex =  this.defaultIndex;
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                this.wrap = this.$refs.movSwiperContent;
                this.childDomList.length = this.$children[0].$children.length;  // item个数
                this.itemWidth = this.$refs.movSwiper.offsetWidth; // item宽度
                this.move(true);
            },

            verifyPan () {
                if(this.isTranslating) {
                    return;
                }
                if (!this.canPan || this.childDomList.length <= 1) {
                    return;
                }
                return true;
            },

            panstart(e) {
                if(!this.verifyPan() || this.isTouching) {
                    return;
                }

                let angleAbs = Math.abs(e.angle);
                if (angleAbs < 40 || angleAbs > 140) {
                    e.preventDefault();
                }

                this.isTouching = angleAbs < 40 || angleAbs > 140;
                if (this.isTouching) {
                    Tool.removeClass(this.wrap, 'mov-swiper-transition');
                    this.currentTranslateX = this.translateX; // 记录手势开始前的偏移量
                }
            },
            panmove(e) {
                if (!this.verifyPan() || !this.isTouching) {
                    return;
                }
                let angleAbs = Math.abs(e.angle);
                if (angleAbs < 40 || angleAbs > 140) {
                    e.preventDefault();
                }
                if (this.currentIndex === 0 && e.deltaX > 0) {
                    return;
                }
                if (this.currentIndex === (this.childDomList.length-1)&&e.deltaX < 0) {
                    return;
                }
                this.translateX = this.currentTranslateX + e.deltaX;

                Tool.css(this.wrap, {
                    'will-change': 'transform',
                    transform: 'translateX(' + this.translateX + 'px)',
                });
            },
            panend(e) {
                if(!this.verifyPan() || !this.isTouching) {
                    return;
                }
                let angleAbs = Math.abs(e.angle);
                if (angleAbs < 40 || angleAbs > 140) {
                    e.preventDefault();
                }
                this.isTouching = false;
                Tool.addClass(this.wrap, 'mov-swiper-transition');
                this.calcEndIndex(e);
                this.move();
            },

            // 计算手势结束时候的终点下标
            calcEndIndex(e) {
                let distance = ((this.translateX - this.currentTranslateX)/this.itemWidth).toFixed(1);
                let distanceABS = Math.abs(distance);
                let symbol =  distance<0?-1:1;
                let vSymbol =  e.velocityX<0?-1:1;
                let distanceInt = Math.floor(distanceABS);
                let distanceFloat = distanceABS - Math.floor(distanceABS);
                let indexChanged = distanceInt + distanceFloat>0.2?1:0;

                let index;
                if(indexChanged===0) {
                    // 未切换index
                    if(Math.abs(e.velocityX)>0.1&&vSymbol===symbol){ // 速度超过0.1，且速度方向和位移方向一致
                        index = this.currentIndex - vSymbol;
                    }else {
                        index = this.currentIndex;
                    }
                }else {
                    // 已经切换index
                    if(Math.abs(e.velocityX)>0.1&&vSymbol===-symbol){ // 速度超过0.1，且速度方向和位移方向相反
                        index = this.currentIndex - vSymbol;
                    }else {
                        index = this.currentIndex - indexChanged * symbol;
                    }
                }
                if(index === -1) {
                    this.currentIndex = 0;
                }else if(index === this.childDomList.length) {
                    this.currentIndex = this.childDomList.length - 1;
                }else {
                    this.currentIndex = index;
                }
            },

            setIndex(index) {
                if(index === this.currentIndex) {
                    return;
                }
                if(index === this.childDomList.length) {
                    this.currentIndex = 0;
                }else {
                    this.currentIndex = index;
                }
            },

            // 钩子函数
            changeIndex(index) {
                this.setIndex(index);
                this.move();
            },

            move(isFirst) {
                if (!this.wrap) {
                    return;
                }
                this.isTranslating = true;
                !isFirst && Tool.addClass(this.wrap, 'mov-swiper-transition');
                this.translateX = -1 * this.itemWidth * this.currentIndex; // 偏移量

                this.beforeChange && this.beforeChange(this.currentIndex);
                Tool.css(this.wrap, {
                    'will-change': 'transform',
                    transform: 'translateX(' + this.translateX + 'px)',
                });
                this.isTranslating = false;
                this.afterChange && this.afterChange(this.currentIndex);
            },
        },
    };
</script>
