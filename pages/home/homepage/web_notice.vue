<template>
	<view class="webNotice">
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:""
			}
		},
		methods: {
			
		},
		onLoad(e){
			this.url = e.url
		}
	}
</script>

<style>

</style>
