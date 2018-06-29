<template>
	<mount-root :visible="show">
		<div class="mov-toast flex-center pos-f pos-f-full mov-anim-common">
			<div class="mov-toast-content pos-f" :class="type">
				<div class="mov-toast-icon" v-if="type === 'success'">
					<div class="success-img"></div>
				</div>
				<div class="mov-toast-icon" v-if="type === 'error'">
					<div class="error-img"></div>
				</div>
				{{message}}
			</div>
		</div>
	</mount-root>
</template>
<script>
	import MountRoot from '../mount-root';

	export default {
		data () {
			return {
				show: false,
				type: '',
				message: '',
			};
		},

		components: {
			MountRoot,
		},
	};

</script>
