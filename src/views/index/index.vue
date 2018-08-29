<template>
	<div class="home-demo">
		<Drop>
			<DropTitle>title</DropTitle>
			<DropContent>content</DropContent>
		</Drop>
		<a class="demo-item d-b" :href="item.url" v-for="(item, index) in list">
			<div class="name">{{item.name}}</div>
			<div class="desc">{{item.desc}}</div>
		</a>
	</div>
</template>
<script type="text/javascript">
	import ListConfig from './list.config'
	import { Drop } from 'mona'
	import './index.less'

	const DropTitle = Drop.Title
	const DropContent = Drop.Content

	export default {
		data () {
			return {
				list: []
			}
		},

		components: {
			Drop,
			DropTitle,
			DropContent
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
