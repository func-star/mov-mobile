<template lang="html">
    <div class="mona-carousel-item pull-left h-full" :style="itemSty">
        <slot></slot>
    </div>
</template>
<script>
export default {
    data() {
        return {
            itemWidth: 0,
        };
    },
    computed: {
        itemSty(){
            return {
                width: this.itemWidth + 'px',
            };
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.itemWidth = this.$parent.$parent.itemWidth;
        });
    },
};

</script>
