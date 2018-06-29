<template lang="html">
    <swiper-item :style="itemSty">
        <slot></slot>
    </swiper-item>
</template>
<script>
import Swiper from './swiper';
const SwiperItem = Swiper.Item;

export default {
    components: {
        SwiperItem,
    },
    data() {
        return {
            itemSty: '',
        };
    },

    created() {
        this.itemSty = 'width:' + document.documentElement.offsetWidth + 'px';
    },
};

</script>
