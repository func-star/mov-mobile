<template lang="html">
    <component :is="currentPage"></component>
</template>
<script>
    import Url from 'core/url';
    export default {
        data() {
            return {
                currentPage: null,
                routeConf: {},
            };
        },
        created() {
            this.routeConf = this.$parent.routeConf;
            this.init();
        },
        methods: {
            init () {
                window.addEventListener('hashchange', this.format.bind(this), false);
                this.format();
            },

            format () {
                const url = new Url('/' + window.location.hash.substring(1));
                let routePath = url.pathname.length > 1 ? url.pathname.substring(1) : this.routeConf.index;
                let pageInfo = this.getPage(routePath);
                this.currentPage = pageInfo;
            },

            getPage (routePath) {
                let pageInfo =this.routeConf.routes[routePath];
                if(!pageInfo) {
                    Url.go(this.routeConf.index);
                    return false;
                }
                return pageInfo;
            },
        },

    };

</script>
