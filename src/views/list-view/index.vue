<template>
	<demo-page title="ListView - 列表" intro="支持瀑布流和手动下拉刷新" style="padding-bottom: 0">
		<demo-section title="基础用法" intro="demo1">
			<div class="list-view-wrap pos-r">
				<list-view :on-refresh="onRefresh" :on-infinite="onInfinite" :on-move="onMove" :isEnd="isEnd">
					<div class="list-view-group">
						<div class="list-view-item flex-center-y" v-for="(item, index) of list">
							<div class="avatar r-circle"></div>
							<div class="info flex-1">{{`_mirror_ ${index}`}}</div>
						</div>
					</div>
				</list-view>
			</div>
		</demo-section>
	</demo-page>
</template>


<script type="text/ecmascript-6">
	import DemoPage from 'components/demo-page';
	import DemoSection from 'components/demo-section';
	import {ListView} from 'mov';
	// TODO 缺少toTop

	export default {

		components: {
			DemoPage,
			DemoSection,
			ListView,
		},

		props: {},

		data() {
			return {
				list: [],
				isEnd: false,
			};
		},

		computed: {},

		watch: {},

		methods: {
			init() {
				this.getList();
			},
			onRefresh(done) {
				setTimeout(() => {
					this.getList();
					this.isEnd = this.list.length >= 20;
					done();
				}, 2000);
			},

			onInfinite(done) {
				setTimeout(() => {
					this.list = this.list.concat([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
					this.isEnd = this.list.length > 40;
					done();
				}, 1500);
			},
			onMove(scrollTop) {
				console.log(`scrollTop: ${scrollTop}`);
			},
			getList() {
				this.list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
			},
		},

		filters: {},

		created() {
			this.init();
		},

		mounted() {

		},
	};
</script>


<style lang="less">
	.list-view-wrap {
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

