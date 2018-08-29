<template>
	<div class="home-demo">
		<h1 class="home-demo-logo flex-center">
			<img src="http://static.monajs.cn/common/logo100.png" />
			<span>Mov</span>
		</h1>
		<div class="home-demo-desc text-center">让你感到幸福的 Vue 组件库</div>
		<div class="home-demo-wrap">
			<a class="demo-item d-b" :href="item.url" v-for="(item, index) in list">
				<div class="name">{{item.name}}</div>
				<div class="desc">{{item.desc}}</div>
			</a>
		</div>
	</div>
</template>
<script type="text/javascript">
	import ListConfig from './list.config'
	import './index.less'

	export default {
		data () {
			return {
				list: []
			}
		},

		mounted () {
			this.init()
		},

		methods: {
			init () {
				this.list = ListConfig.list
			}
		}
	}

</script>
