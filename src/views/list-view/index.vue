<template>
	<demo-page title="ListView - 列表" intro="支持瀑布流和手动下拉刷新" style="padding-bottom: 0">
		<demo-section title="基础用法" intro="demo1">
			<div style="height: 200px;width: 100%;background-color: black"></div>
			<list-view class="list-view" :on-refresh="onRefresh" ref="listView" :on-scroll="onScroll"
					   :on-infinite="onInfinite"
					   :isEnd="isEnd">
				<div class="list-view-group">
					<div class="list-view-item flex-center-y" @click="toTop" v-for="(item, index) in list">
						<div class="avatar r-circle"></div>
						<div class="info flex-1" @click="toTop">{{`_mirror_ ${index}`}}</div>
					</div>
				</div>
			</list-view>
		</demo-section>
	</demo-page>
</template>

<script type="text/ecmascript-6">
	import DemoPage from 'components/demo-page'
	import DemoSection from 'components/demo-section'
	import { ListView } from 'mona'
	// TODO 缺少toTop

	export default {

		components: {
			DemoPage,
			DemoSection,
			ListView
		},

		props: {},

		data () {
			return {
				list: [],
				isEnd: false
			}
		},

		computed: {},

		watch: {},

		methods: {
			init () {
				this.getList()
			},
			onRefresh (done) {
				setTimeout(() => {
					this.getList()
					this.isEnd = this.list.length >= 20
					done()
				}, 2000)
			},

			onInfinite (done) {
				setTimeout(() => {
					this.list = this.list.concat([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
					this.isEnd = this.list.length > 40
					done()
				}, 1500)
			},
			onScroll (e) {
				console.log(`scrollTop: ${e.scrollTop}`)
			},
			getList () {
				this.list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
			},
			toTop () {
				ListView.toTop()
			}
		},

		filters: {},

		created () {
			this.init()
		},

		mounted () {

		}
	}
</script>

<style lang="less">
	.list-view {
		height: calc(~'100vh - 200px');
		overflow: auto;
		.list-view-group {
			margin-top: 10px;
			padding-left: 15px;
			padding-right: 15px;
			background: #fff;
		}

		.list-view-item {
			height: 70px;
			border-bottom: solid #d5d5d5 1px;
		}

		.avatar {
			height: 45px;
			width: 45px;
			border-radius: 50%;
			background: url("https://s10.mogucdn.com/mlcdn/c45406/180822_27ilfik839be5g4fcjecd67ch85dk_690x460.jpg") center no-repeat;
			background-size: cover;
		}

		.info {
			margin-left: 20px;
		}
	}
</style>

