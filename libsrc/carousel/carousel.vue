<template lang="html">
    <hammer :panmove="panmove" :panend="panend" :panstart="panstart">
        <div class="mov-carousel full pos-r o-h" ref="movCarousel">
            <div class="content h-full o-h" :style="contentSty" ref="movCarouselContent">
                <slot></slot>
            </div>
            <div v-if="dots && originEmptyList.length>1" class="mov-carousel-dots pos-a flex-center w-full">
                <div class="item"
                     v-for="(item, index) in originEmptyList"
                     :class="trueIndex === index?'active':''"
                     @click="changeIndex(index)"></div>
            </div>
        </div>
    </hammer>
</template>
<script>
    import Hammer from '../hammer'
    import Tool from '../tool'

    export default {
        components: {
            Hammer
        },
        data() {
            return {
                childDomList: [],
                originEmptyList: [],
                itemWidth: 0,
                currentIndex: 0,
                trueIndex: 0,
                translateX: 0,
                gapWidth: 0, // childWidth和显示content的宽度差的一半
                isTranslating: false, // 是否正在滚动
                isTouching: false // 是否处于touch状态
            }
        },
        computed: {
            contentSty() {
                return {
                    width: this.childDomList.length * this.itemWidth + 'px'
                }
            },
            touchViewSty() {
                return {
                    width: this.itemWidth + 'px'
                }
            }
        },

        props: {
            autoplay: {
                type: Boolean,
                default: true
            },
            defaultIndex: {
                type: Number,
                default: 0
            },
            autoplayInterval: {
                type: Number,
                default: 3000
            },
            dots: {
                type: Boolean,
                default: true
            },
            canPan: {
                type: Boolean,
                default: true
            },
            loop: {
                type: Boolean,
                default: false
            },
            childWidth: {
                type: Number,
                default: 0
            },
            afterChange: Function,
            beforeChange: Function
        },
        created() {
            this.trueIndex = this.currentIndex = this.defaultIndex
            if (this.loop) {
                this.currentIndex = this.defaultIndex + 2
            }
        },
        mounted() {
            this.init()
        },
        beforeDestroy() {
            clearInterval(this.carouselTimer)
        },
        methods: {
            init() {
                this.initNodeInfo() // 初始化节点信息
                this.move(true)
                this.autoplay && this.autoplayAction()
            },

            initNodeInfo() {
                this.wrap = this.$refs.movCarouselContent
                this.itemWidth = this.childWidth || this.$refs.movCarousel.offsetWidth // item宽度
                this.gapWidth = this.childWidth ? (this.$refs.movCarousel.offsetWidth - this.childWidth) / 2 : 0

                // 用作展示的view的item个数记录
                this.childDomList.length = this.originEmptyList.length = this.$children[0].$children.length

                if (this.defaultIndex > this.originEmptyList.length - 1) {
                    console.error('默认下标超过长度，请检查')
                    return
                }

                if ((this.loop || this.autoplay) && this.originEmptyList.length === 1) {
                    console.error('carousel-item长度为1时不允许循环播放或者自动播放，请设置loop属性和autoplay属性为false')
                    return
                }

                if (this.loop && this.originEmptyList.length > 1) {
                    this.addChildNode() // 添加用作循环的节点
                    this.childDomList.length += 4
                }

            },

            addChildNode() {
                let childList = this.wrap.childNodes,
                    listLen = childList.length,
                    first1, first2, last1, last2

                if (listLen === 2) {
                    first1 = last1 = childList[0].cloneNode(true)
                    first2 = last2 = childList[2].cloneNode(true)
                } else {
                    first1 = childList[listLen - 3].cloneNode(true)
                    first2 = childList[listLen - 1].cloneNode(true)
                    last1 = childList[0].cloneNode(true)
                    last2 = childList[2].cloneNode(true)
                }
                first1.style.width = first2.style.width =
                    last1.style.width = last2.style.width = this.itemWidth + 'px'

                let fragmentFirst = document.createDocumentFragment() // 虚拟节点操作不会消耗UI线程
                let fragmentLast = document.createDocumentFragment()

                fragmentFirst.appendChild(first1)
                fragmentFirst.appendChild(first2)
                fragmentLast.appendChild(last1)
                fragmentLast.appendChild(last2)

                this.wrap.insertBefore(fragmentFirst, childList[0])
                this.wrap.appendChild(fragmentLast)
            },

            autoplayAction() {
                clearInterval(this.carouselTimer)
                this.carouselTimer = setInterval(() => {
                    let index = this.currentIndex + 1
                    this.setIndex(index)
                    this.move()
                }, this.autoplayInterval)
            },

            verifyPan () {
                if(this.isTranslating) {
                    return
                }
                if (!this.canPan || this.childDomList.length <= 1) {
                    return
                }
                return true
            },

            panstart(e) {
                let angleAbs = Math.abs(e.angle)
                if (angleAbs < 50 || angleAbs > 130) {
                    e.preventDefault()
                }
                if(angleAbs >= 50 && angleAbs <= 130) {
                    return
                }
                if(!this.verifyPan() || this.isTouching) {
                    return
                }
                this.isTouching = true
                Tool.removeClass(this.wrap, 'mov-carousel-transition')

                this.currentTranslateX = this.translateX // 记录手势开始前的偏移量
                clearInterval(this.carouselTimer)
            },

            panmove(e) {
                if (!this.verifyPan() || e.deltaX === 0 || !this.isTouching) {
                    return
                }
                let angleAbs = Math.abs(e.angle)
                if (angleAbs < 50 || angleAbs > 130) {
                    e.preventDefault()
                }
                if (this.currentIndex === 0 && e.deltaX > 0) {
                    // 滚动到第一屏且loop是false的场景
                    this.translateX = this.currentTranslateX + e.deltaX / 2.5 // 阻尼效果
                } else if (this.currentIndex === (this.childDomList.length - 1) && e.deltaX < 0) {
                    // 滚动到最后一屏且loop是false的场景
                    this.translateX = this.currentTranslateX + e.deltaX / 2.5 // 阻尼效果
                } else {
                    this.translateX = this.currentTranslateX + e.deltaX
                }
                Tool.css(this.wrap, {
                    'will-change': 'transform',
                    transform: 'translateX(' + this.translateX + 'px)'
                })
            },

            panend(e) {
                if(!this.verifyPan() || !this.isTouching) {
                    return
                }
                let angleAbs = Math.abs(e.angle)
                if (angleAbs < 50 || angleAbs > 130) {
                    e.preventDefault()
                }
                this.isTouching = false
                Tool.addClass(this.wrap, 'mov-carousel-transition')
                this.calcEndIndex(e)
                this.move()

                this.autoplay && this.autoplayAction()
            },

            // 计算手势结束时候的终点下标
            calcEndIndex(e) {
                let distance = ((this.translateX - this.currentTranslateX) / this.itemWidth).toFixed(1)
                let distanceABS = Math.abs(distance)
                let symbol = distance < 0 ? -1 : 1
                let vSymbol = e.velocityX < 0 ? -1 : 1
                let distanceInt = Math.floor(distanceABS)
                let distanceFloat = distanceABS - Math.floor(distanceABS)
                let indexChanged = distanceInt + distanceFloat > 0.2 ? 1 : 0

                let index
                if (indexChanged === 0) {
                    // 未切换index
                    if (Math.abs(e.velocityX) > 0.1 && vSymbol === symbol) { // 速度超过0.1，且速度方向和位移方向一致
                        index = this.currentIndex - vSymbol
                    } else {
                        index = this.currentIndex
                    }
                } else {
                    // 已经切换index
                    if (Math.abs(e.velocityX) > 0.1 && vSymbol === -1 * symbol) { // 速度超过0.1，且速度方向和位移方向相反
                        index = this.currentIndex - vSymbol
                    } else {
                        index = this.currentIndex - indexChanged * symbol
                    }
                }
                if (index === -1) {
                    this.currentIndex = 0
                } else if (index === this.childDomList.length) {
                    this.currentIndex = this.childDomList.length - 1
                } else {
                    this.currentIndex = index
                }
            },

            setIndex(index) {
                if (index === this.currentIndex) {
                    return
                }
                if (index === this.childDomList.length) {
                    this.currentIndex = 0
                } else {
                    this.currentIndex = index
                }
            },

            // 钩子函数
            changeIndex(index) {
                this.setIndex(index)
                this.move()
            },

            move(isFirst) {
                if (!this.wrap) {
                    return
                }
                this.isTranslating = true
                !isFirst && Tool.addClass(this.wrap, 'mov-carousel-transition') // 防止首次加载定位的时候有动画
                this.moveOption(() => {
                    this.beforeChange && this.beforeChange(this.trueIndex)
                })
                if (this.loop) {
                    if (this.currentIndex === 1) {
                        this.currentIndex += this.originEmptyList.length
                    } else if (this.currentIndex === this.childDomList.length - 2) {
                        this.currentIndex = 2
                    }
                    clearTimeout(this.translateTimer)
                    this.translateTimer = setTimeout(() => {
                        Tool.removeClass(this.wrap, 'mov-carousel-transition')
                        this.moveOption()

                        clearTimeout(this.classTimer)
                        this.classTimer = setTimeout(() => {
                            Tool.addClass(this.wrap, 'mov-carousel-transition')
                            this.isTranslating = false
                        }, 50)
                    }, 300)
                    this.trueIndex = this.currentIndex - 2
                } else {
                    this.isTranslating = false
                    this.trueIndex = this.currentIndex
                }
                !isFirst && this.afterChange && this.afterChange(this.trueIndex)
            },

            moveOption(fn) {
                this.translateX = -1 * this.itemWidth * this.currentIndex + this.gapWidth // 偏移量
                fn && fn()
                Tool.css(this.wrap, {
                    'will-change': 'transform',
                    transform: 'translateX(' + this.translateX + 'px)'
                })
            }
        }
    }
</script>
