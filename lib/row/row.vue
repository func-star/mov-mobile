<template lang="html">
    <div class="mov-row" :class="rowClass" :style="rowSty">
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
        align: String,
        gutter: String,
        justify: String,
        direction: String,
    },
    computed: {
        rowSty() {
            if(!this.gutter) {
                return {};
            }else {
                return {
                    paddingLeft: `calc(${this.gutter}/2)`,
                    paddingRight: `calc(${this.gutter}/2)`,
                };
            }
        },
        rowClass() {
            let classList = '';
            this.justify&&(classList+='mov-row-'+this.justify + ' ');
            this.align&&(classList+='mov-row-align-'+this.align + ' ');
            this.direction&&(classList+='mov-row-direction-'+this.direction + ' ');
            return classList;
        },
    },
};

</script>
