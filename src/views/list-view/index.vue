<template>
	<div>
		<list-view :on-refresh="onRefresh" :on-infinite="onInfinite" :on-move="onMove" :isEnd="isEnd">
			<div class="list-view-group">
				<div class="list-view-item flex-center-y" v-for="(item, index) in this.list">
					<div class="avatar r-circle"></div>
					<div class="info flex-1">放克</div>
				</div>
			</div>
		</list-view>
	</div>
</template>
<script type="text/javascript">
	import { ListView } from 'mov';
	import './index.less';

	export default {
		components: {
			'list-view': ListView,
		},

		data () {
			return {
				list: [],
				isEnd: false,
			};
		},

		created () {

		},

		mounted () {
			this.init();
		},

		methods: {
			init () {
				this.getList();
			},
			getList () {
				this.list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 4, 5];
			},
			onRefresh (done) {
				setTimeout(() => {
					this.getList();
					this.isEnd = this.list.length > 20;
					done(); // call done
				}, 2000);
			},
			onInfinite (done) {
				setTimeout(() => {
					this.list = this.list.concat([11, 12, 13, 14, 15, 16, 17, 18]);
					this.isEnd = this.list.length > 40;
					done();
				}, 1500);
			},
			onMove (scrollTop) {
				console.log(scrollTop);
			},
		},
	};

</script>
