<template lang="html">
    <div class="mov-tabs full" ref="movTabs">
        <div class="mov-tabs-header d-f pos-r" v-if="tabs && tabs.length>0">
            <div class="item flex-1 flex-center"
                :class="{'active': currentIndex === index}"
                v-for="(item, index) in tabs"
                @click="changeIndex(index)">{{item.title}}</div>
            <div class="pos-a index-mark" :style="indexMarkSty"></div>
        </div>
        <swiper class="mov-tabs-content full"
            :style="swiperSty"
            ref="tabsSwiper"
            :canPan="canPan"
            :defaultIndex="defaultIndex"
            :afterChange="updateIndex"
            :beforeChange="beforeChange">
           <slot></slot>
        </swiper>
    </div>
</template>
<script>
    import Swiper from './swiper';
    import TabsCtrl from './ctrl';

    export default {
        components: {
            Swiper,
        },
        props: {
            tabs: Array,
            canPan: {
                type: Boolean,
                default: true,
            },
            defaultIndex: {
                type: Number,
                default: 0,
            },
            afterChange: Function,
            beforeChange: Function,
        },
        computed: {
            indexMarkSty() {
                return {
                    width: 1 / this.childDomList.length * 100 + '%',
                    transform: 'translateX(' + 100 * this.currentIndex + '%)',
                };
            },
            swiperSty() {
                return {
                    height: `calc(100% - ${this.tabs && this.tabs.length>0 ? '45px' : 0})`
                }
            }
        },
        data() {
            return {
                currentIndex: 0,
                childDomList: [],
                keysList: new Set(), // 存储tabsItem已经可以展示的项
            };
        },
        created() {
            this.currentIndex =  this.defaultIndex;
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                this.childDomList = this.$slots.default.filter(v => {
                    return v.tag;
                });  // item个数
                this.keysList.add(TabsCtrl.getTabsItemKey()[this.currentIndex]);
            },
            changeIndex(index) {
                if(index === this.currentIndex) {
                    return;
                }
                this.currentIndex = index;
                this.$refs.tabsSwiper.changeIndex(index);
            },
            updateIndex(index) {
                this.currentIndex = index;
                this.keysList.add(TabsCtrl.getTabsItemKey()[this.currentIndex]);
                TabsCtrl.emit('tabsIndexChange', this.keysList);
                this.afterChange && this.afterChange(index);
            },
        },
    };

</script>
