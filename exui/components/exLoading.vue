<template name="exLoading">
	<view class="ex-loading ex-ellipsis" v-if="show">
		<view class="ex-loading-icon" v-if="loadingType === 1"></view>
		<text>{{loadingText[loadingType]}}</text>
	</view>
</template>
<script>
export default {
	name: "exLoading",
	props: {
		loadingType: {
			type : Number,
			default: 0
		},
		loadingText : {
			type  : Array,
			default : function () {
				return ["上拉加载更多", "加载中...", "已经加载全部数据"];
			}
		},
		show : {
		  type : Boolean,
		  default : true
		}
	}
}
</script>
<style>
@keyframes ex-rotate360{0%{transform:rotate(0deg);} 50%{transform:rotate(180deg);} 100%{transform:rotate(360deg);}}
.ex-loading{display:flex; width:100%; justify-content:center; padding:16upx 0; padding-bottom:36upx; line-height:40upx; color:#888;}
.ex-loading text{margin-left:12upx;}
.ex-loading-icon{width:40upx; height:40upx; justify-content:center; line-height:40upx; font-size:30upx; text-align:center; font-family:"ex-iconfont" !important; animation:ex-rotate360 1200ms infinite linear;}
.ex-loading-icon:before {content:"\e9db"; color:#888;}
</style>