<template lang="html">
    <div class="mona-row" :class="rowClass" :style="rowSty">
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
            this.justify&&(classList+='mona-row-'+this.justify + ' ');
            this.align&&(classList+='mona-row-align-'+this.align + ' ');
            this.direction&&(classList+='mona-row-direction-'+this.direction + ' ');
            return classList;
        },
    },
};

</script>
