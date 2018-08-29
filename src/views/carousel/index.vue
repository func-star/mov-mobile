<template>
	<demo-page title="Carousel - 提示" intro="提示">
		<demo-section title="自动循环播放" intro="demo1">
			<carousel class="" :afterChange="afterChange" :defaultIndex="0" :loop="true" :childWidth="300">
				<carousel-item style="padding: 3px 10px;">
					<img class="full" src="https://s10.mogucdn.com/mlcdn/c45406/170804_1j6a0f30hcc36k464ikhakj0cbaeg_1350x578.jpg" />
				</carousel-item>
				<carousel-item style="padding: 3px 10px;">
					<img class="full" src="https://s10.mogucdn.com/mlcdn/c45406/170804_41l88h92fl116bk0kdl4lklk6d0ia_1350x578.jpg" />
				</carousel-item>
				<carousel-item style="padding: 3px 10px;">
					<img class="full" src="https://s10.mogucdn.com/mlcdn/c45406/170804_46glh9ch5l7afde25485e5a8k76jf_1350x578.jpg" />
				</carousel-item>
			</carousel>
		</demo-section>
		<demo-section title="自动循间隔5s环播放" intro="demo1">
			<carousel class="" :afterChange="afterChange" :defaultIndex="0" :loop="true" :childWidth="300" :autoplayInterval="5000">
				<carousel-item style="padding: 3px 10px;">
					<img class="full" src="https://s10.mogucdn.com/mlcdn/c45406/170804_1j6a0f30hcc36k464ikhakj0cbaeg_1350x578.jpg" />
				</carousel-item>
				<carousel-item style="padding: 3px 10px;">
					<img class="full" src="https://s10.mogucdn.com/mlcdn/c45406/170804_41l88h92fl116bk0kdl4lklk6d0ia_1350x578.jpg" />
				</carousel-item>
				<carousel-item style="padding: 3px 10px;">
					<img class="full" src="https://s10.mogucdn.com/mlcdn/c45406/170804_46glh9ch5l7afde25485e5a8k76jf_1350x578.jpg" />
				</carousel-item>
			</carousel>
		</demo-section>
		<demo-section title="不自动循环播放" intro="demo1">
			<carousel class="" :afterChange="afterChange" :defaultIndex="0" :autoplay="false" :childWidth="300">
				<carousel-item style="padding: 3px 10px;">
					<img class="full" src="https://s10.mogucdn.com/mlcdn/c45406/170804_1j6a0f30hcc36k464ikhakj0cbaeg_1350x578.jpg" />
				</carousel-item>
				<carousel-item style="padding: 3px 10px;">
					<img class="full" src="https://s10.mogucdn.com/mlcdn/c45406/170804_41l88h92fl116bk0kdl4lklk6d0ia_1350x578.jpg" />
				</carousel-item>
				<carousel-item style="padding: 3px 10px;">
					<img class="full" src="https://s10.mogucdn.com/mlcdn/c45406/170804_46glh9ch5l7afde25485e5a8k76jf_1350x578.jpg" />
				</carousel-item>
			</carousel>
		</demo-section>
		<demo-section title="初始化在第二屏" intro="demo1">
			<carousel class="" :afterChange="afterChange" :defaultIndex="1" :autoplay="false" :childWidth="300">
				<carousel-item style="padding: 3px 10px;">
					<img class="full" src="https://s10.mogucdn.com/mlcdn/c45406/170804_1j6a0f30hcc36k464ikhakj0cbaeg_1350x578.jpg" />
				</carousel-item>
				<carousel-item style="padding: 3px 10px;">
					<img class="full" src="https://s10.mogucdn.com/mlcdn/c45406/170804_41l88h92fl116bk0kdl4lklk6d0ia_1350x578.jpg" />
				</carousel-item>
				<carousel-item style="padding: 3px 10px;">
					<img class="full" src="https://s10.mogucdn.com/mlcdn/c45406/170804_46glh9ch5l7afde25485e5a8k76jf_1350x578.jpg" />
				</carousel-item>
			</carousel>
		</demo-section>
	</demo-page>
</template>


<script type="text/ecmascript-6">
	import DemoPage from 'components/demo-page';
	import DemoSection from 'components/demo-section';
	import DemoButton from 'components/demo-button';
	import {Carousel} from 'mov';

	const CarouselItem = Carousel.Item;

	export default {
		name: 'CarouselDemo',

		components: {
			DemoPage,
			DemoSection,
			DemoButton,
			Carousel,
			CarouselItem
		},

		props: {},

		data() {
			return {};
		},

		computed: {},

		watch: {},

		methods: {
			afterChange(index) {
				console.log(index);
			}
		},

		filters: {},

		created() {
		},

		mounted() {
		},
	};
</script>


<style lang="less" scoped>

</style>

