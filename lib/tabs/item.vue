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


    },

	mounted() {
		this.itemSty = 'width:' + this.$parent.$el.offsetWidth + 'px';
	}
};

</script>
