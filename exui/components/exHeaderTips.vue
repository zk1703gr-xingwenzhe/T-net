<template>
<view :class="[show ? 'ganimate-show ex-tips' : 'ex-tips']" :style="{background:background,color:fontcolor}" v-if="showIn">
		<slot></slot>
	</view>
</template>

<script>
	export default {
			name: "exHeaderTips",
			props: {
				show    : {
					type : Boolean,
					default : false
				},
				background : {
					type : String,
					default : '#F1F2F3'
				},
				fontcolor:{
					type : String,
					default : '#000000'
				}
			},
			data() {
				return {
					showIn : false
				}
			},
			watch: {
				show : function(n , o){
					this.showIn = true;
					setTimeout(function(){
						this.showIn = false;
						uni.$emit('firendMsg',{msg:false})
						}.bind(this), 3000);
				}
			}
		}
</script>

<style>
@keyframes g-show{from {opacity:0; transform:scale3d(0.1, 0.1, 0.1);} to {opacity:1;}}
.ganimate-show{animation:g-show 200ms linear;}
.ex-tips{display:flex; width:580rpx; padding:25rpx; border-radius:10rpx; flex-wrap:nowrap; justify-content:center; align-items:center; background:#FFF; position:fixed; z-index:99999; left:60rpx; top:20rpx;}
.ex-tips::before{content:""; display:block; background:inherit; filter:blur(6rpx); position:absolute; width:100%; height:100%; top:8rpx; left:8rpx; z-index:-1; opacity:0.38; transform-origin:0 0; border-radius:inherit; transform:scale(1, 1);}
</style>
