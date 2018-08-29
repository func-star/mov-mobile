<template>
	<div class="mona-drop-content" :class="{'open': isOpen}">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: 'monaDropContent',
		data () {
			return {
				isOpen: false
			}
		},
		created () {
			console.log(this)
		}
	}
</script>
