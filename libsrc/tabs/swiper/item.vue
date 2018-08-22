<template lang="html">
    <div class="mona-swiper-item pull-left h-full pos-r" :style="itemSty">
        <slot v-if="isShow"></slot>
    </div>
</template>
<script>
import Tabs from '../tabs.vue';
import TabsCtrl from '../ctrl';

export default {
    data() {
        return {
            itemWidth: 0,
            isShow: false,
            key: `tabsItem${this._uid}`,
        };
    },
    computed: {
        itemSty(){
            return {
                width: this.itemWidth + 'px',
            };
        },
    },
    created() {
        console.log(`设置tabsItem的唯一key${this.key}`);
        TabsCtrl.setTabItemKey(this.key);
    },
    beforeDestroy() {
        TabsCtrl.off('tabsIndexChange');
    },
    mounted() {
        this.$nextTick(() => {
            this.itemWidth = this.$parent.$parent.itemWidth;
        });
        TabsCtrl.on('tabsIndexChange', (keysList)=>{
            if(this.isShow) {
                return;
            }
            this.isShow = keysList.has(this.key);
        });
    },
};

</script>
