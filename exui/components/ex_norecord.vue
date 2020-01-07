<template>
	<view class="zwjl">
		<img src="@/static/image/transaction/bb_deal/zanwujilu.png" alt="">
	</view>
</template>

<script>
export default {
	name: "ex_norecord",
	props: {
		show : {
			type : Boolean,
			default : false
		}
	},
	data() {
		return {
			
		}
	},
	methods:{
		closeDialog : function(){
			this.$emit('closeDialog');
		},
		stopFun : function(){}
	}
}
</script>

<style>
	.zwjl{
		width: 400upx;
		height: 400upx;
		margin: 350upx auto;
	}
	.zwjl img{
		width: 400upx;
		height: 400upx;
	}
</style>
