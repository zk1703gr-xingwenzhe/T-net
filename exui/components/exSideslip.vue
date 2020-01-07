<template>
	<view>
		<view class="ex-sideslip-shade" v-if="show" @tap="closeSideslip">
			<view 
			:class="['nav', direction == 'left' ? 'esSlideLeft' : 'esSlideRight']" 
			@tap.stop="stopFun">
				<view class="navMain"><slot name="links"></slot></view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	name: "exSideslip",
	props: {
		show : {
			type : Boolean,
			default : false
		},
		direction : {
			type : String,
			default : 'left'
		}
	},
	methods:{
		closeSideslip : function(){
			this.$emit('closeSideslip');
		},
		stopFun : function(){
			
		}
	}
}
</script>
<style>
@keyframes esSlideLeft{ from {left:-300px; } 100% { left:0px; }}
.esSlideLeft {animation:esSlideLeft 200ms linear; left:0;}
@keyframes esSlideRight{ from {right:-300px; } 100% { right:0px; }}
.esSlideRight {animation:esSlideRight 200ms linear; right:0;}
@keyframes colseEsSlideLeft{ from {left:0px; } 100% { left:-300px; }}
.colseEsSlideLeft {animation:colseEsSlideLeft 200ms linear; left:-300px}
@keyframes colseEsSlideRight{ from {right:0px; } 100% { right:-300px; }}
.colseEsSlideRight {animation:colseEsSlideRight 200ms linear; right:-300px;}

.ex-sideslip-shade{position:fixed; width:100%; height:100%; top:0; left:0; z-index:9991; background:rgba(0, 0, 0, 0.5);}
.ex-sideslip-shade .nav{width:60%; height:100%; background:#FFFFFF; position:absolute; top:0; z-index:9992;}
.ex-sideslip-shade .navMain{padding:30upx;}
</style>