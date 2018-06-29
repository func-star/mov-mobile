<template>
	<div class="home-demo">
		<a class="demo-item d-b" :href="item.url" v-for="(item, index) in list">
			<div class="name">{{item.name}}</div>
			<div class="desc">{{item.desc}}</div>
		</a>
	</div>
</template>
<script type="text/javascript">
	import ListConfig from './list.config';
	import './index.less';

	export default {
		data () {
			return {
				list: [],
			};
		},

		mounted () {
			this.init();
		},

		methods: {
			init () {
				this.list = ListConfig.list;
			},
		},
	};

</script>
