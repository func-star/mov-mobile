<template lang="html">
    <div :class="'mov-col-' + span" :style="colSty">
        <slot></slot>
    </div>
</template>
<script>

export default {
    props: {
        span: Number,
    },
    computed: {
        gutter () {
          return this.$parent.gutter;
        },
        colSty () {
            if(!this.gutter) {
                return {};
            }else {
                return {
                    paddingLeft: `calc(${this.gutter}/2)`,
                    paddingRight: `calc(${this.gutter}/2)`,
                };
            }
        },
    },
};

</script>
