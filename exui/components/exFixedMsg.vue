<template>
	<view class="ex-fixed-msg" :style="{width:width+'rpx', bottom:bottom+'rpx'}" v-if="show" @tap="viewmsg">
		<text class="ex-fixed-msg-icon icon-msg" :style="{color:color}"></text>
		<text class="ex-fixed-msg-text" :style="{color:color}">{{msg}}</text>
		<text class="ex-fixed-msg-icon icon-allow" :style="{color:color}"></text>
	</view>
</template>
<script>
export default {
	props:{
		msg : {
			type : String,
			default : ""
		},
		color : {
			type : String,
			default : "#008CFF"
		},
		width : {
			type : Number,
			default : 300
		},
		bottom : {
			type : Number,
			default : 80
		},
		show : {
			type : Boolean,
			default : false
		}
	},	
	watch: {
		show : function(n , o){			
			setTimeout(function(){				
				uni.$emit('firendMsg',{msg:false})
				}.bind(this), 5000);
		}
	},
	methods: {
		viewmsg:function(){
			console.log('viewmsg');
			uni.navigateTo({
			    url: 'member/news'
			});
		}
	}
}
</script>
<style>
@font-face {font-family:"gFont"; src:url('https://at.alicdn.com/t/font_1356640_s173ej4tvgm.ttf') format('truetype');}
.ex-fixed-msg{width:300rpx; display:flex; flex-direction:row; flex-wrap:nowrap; padding:18rpx 20rpx; border-radius:50rpx; background:#FFFFFF; box-shadow:0px 0px 16rpx #D5D6D8; position:fixed; bottom:60rpx; left: 50%; transform: translateX(-50%); z-index:9999;}
.ex-fixed-msg-icon{width:36rpx; height:36rpx; line-height:36rpx; font-size:30rpx; color:#3688FF; flex-shrink:0; opacity:0.6; font-family:"gFont"; text-align:center;}
.ex-fixed-msg .icon-msg:after{content:"\e624"; font-size:32rpx;}
.ex-fixed-msg .icon-allow:after{content:"\e60f";}
.ex-fixed-msg-text{width:500rpx; line-height:36rpx; font-size:28rpx; color:#008CFF; height:36rpx; text-align:center; overflow:hidden;}
</style>
