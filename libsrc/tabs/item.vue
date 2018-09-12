<template lang="html">
    <swiper-item :style="itemSty" :tabsKey="tabsKey">
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
			tabsKey: 0
        };
    },

	methods: {
      getTabsKey() {
          this.tabsKey = this.$parent.$parent.$parent._uid;
	  }
	},

    created() {
		this.getTabsKey();
    },

	mounted() {
		this.itemSty = 'width:' + this.$parent.$el.offsetWidth + 'px';
	}
};

</script>
