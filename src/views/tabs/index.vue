<template>
	<div class="full">
		<tabs :tabs="tabs" ref="tabs" :defaultIndex="0" :afterChange="afterChange" class="tabs-pannel full">
			<tabs-item>
				<div class="h-full item">
					<button style="height: 50px" @click="exchange(1)">切换wrap</button>
				</div>
			</tabs-item>
			<tabs-item>
				<list-view></list-view>
			</tabs-item>
			<tabs-item>
				<div class="h-full item">
					<button style="height: 50px" @click="exchange(1)">切换wrap</button>
				</div>
			</tabs-item>
			<tabs-item>
				<div class="h-full item">
					<button style="height: 50px" @click="exchange(1)">切换wrap</button>
				</div>
			</tabs-item>
		</tabs>
	</div>
</template>
<script type="text/ecmascript-6">
	import { Tabs } from 'mov';
	import ListView from '../list-view/index.vue';
	import './index.less';

	const TabsItem = Tabs.Item;

	export default {
		components: {
			Tabs,
			TabsItem,
			ListView,
		},

		data () {
			return {
				tabs: [
					{title: '1 Tab'},
					{title: '2 Tab'},
					{title: '3 Tab'},
					{title: '4 Tab'},
				],
			};
		},
		methods: {
			afterChange (index) {
				console.log(index);
			},
			exchange (index) {
				this.$refs.tabs.changeIndex(index);
			},
		},
	};

</script>
