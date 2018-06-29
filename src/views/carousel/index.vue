<template>
	<div>
		<div style="margin: 20px 0;">循环播放</div>
		<div class="flex-center-x w-full">
			<div class="carousel-pannel w-full">
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
			</div>
		</div>
		<div style="margin: 20px 0;">不循环播放</div>
		<div class="flex-center-x w-full">
			<div class="carousel-pannel w-full">
				<carousel :afterChange="afterChange" :defaultIndex="0">
					<carousel-item>
						<img class="full" src="https://s10.mogucdn.com/mlcdn/c45406/170804_1j6a0f30hcc36k464ikhakj0cbaeg_1350x578.jpg" />
					</carousel-item>
					<carousel-item>
						<img class="full" src="https://s10.mogucdn.com/mlcdn/c45406/170804_41l88h92fl116bk0kdl4lklk6d0ia_1350x578.jpg" />
					</carousel-item>
					<carousel-item>
						<img class="full" src="https://s10.mogucdn.com/mlcdn/c45406/170804_46glh9ch5l7afde25485e5a8k76jf_1350x578.jpg" />
					</carousel-item>
				</carousel>
			</div>
		</div>
		<div style="margin: 20px 0;">循环pannel</div>
		<div class="flex-center-x w-full">
			<div class="carousel-pannel-1 w-full">
				<carousel :afterChange="afterChange" :defaultIndex="0" :dots="false" :autoplay="false">
					<carousel-item>
						<div class="pannel full">
							<div>第一屏，左右滑动试试吧</div>
							<div>{{name}}</div>
							<button class="option" @click="test">操作</button>
						</div>
					</carousel-item>
					<carousel-item>
						<div class="pannel full">第二屏，左右滑动试试吧</div>
					</carousel-item>
					<carousel-item>
						<div class="pannel full">第三屏，左右滑动试试吧</div>
					</carousel-item>
					<carousel-item>
						<div class="pannel full">第四屏，左右滑动试试吧</div>
					</carousel-item>
				</carousel>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import { Carousel, Tool } from 'mov';
	import './index.less';

	const CarouselItem = Carousel.Item;

	export default {
		components: {
			Carousel,
			CarouselItem,
		},

		data () {
			return {
				name: 'fff',
			};
		},
		methods: {
			afterChange (index) {
				console.log(index);
			},
			open () {
				Tool.info('操作');
			},
			test () {
				this.name += 'dddd';
			},
		},
	};

</script>
