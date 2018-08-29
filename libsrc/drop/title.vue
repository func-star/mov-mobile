<template>
	<div class="mona-drop-title">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: 'monaDropTitle1',
		data () {
			return {
				a: 1
			}
		},
		created () {
			this.a = 2
		}
	}
</script>
