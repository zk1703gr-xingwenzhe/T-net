<template>
	<view class="content1">
	<view class="Arrow"><image src="../../../static/image/image/fanhui@2x.png" @tap="back()"></image></view>
	<view class="header">
		{{lang.memberMAccount}}
	</view>
	<view class="content">
		<view class="RMB">{{lang.memberRMB}}</view>
		<view class="true">✔</view>
		<view class="dollar">{{lang.memberDollar}}</view>
		<view class="Rouble">{{lang.memberRouble}}</view>
		<view class="Yen">{{lang.memberYen}}</view>
		<view class="won">{{lang.memberWon}}</view>
		<view class="content2"></view>
	</view>
	</view>
</template>
<script>
	import { mapState, mapMutations } from 'vuex';
    export default {
		computed: {
			...mapState({				
				lang:state => state.lang.lang
			})
		},
        data() {
            return {
               
            }
        },
        methods: {
			back:function(){
				uni.navigateBack();
			},
			openuser: function() {
				uni.navigateTo({
					url: './../member/user?id=1&name=uniapp'
				});
			},
        }
    }
</script>
<style>
   .header{
   	width:156upx;
   	height:30upx;
   	font-size:32upx;
   	font-weight:800;
   	color:#333333FF;
   	margin-top: -60upx;
   	display: flex;
   	margin-left: 310upx;
   }
   .Arrow image{
   	width:26upx;
   	height:44upx;
   	margin-top: 40upx;
   	margin-left: 19upx;
   }
   .content{
   	margin-top: 100upx;
   }
   .RMB{
   	margin-left: 60upx;
   }
   .true{
   	margin-left: 668upx;
   	margin-top: -45upx;
   }
   .RMB image{
   	width: 30upx;
   	height: 30upx;
   	margin-left: 60upx;
   }
   .content image{
   	width: 30upx;
   	height: 30upx;
   	margin-left: 600upx;
   	margin-top: -300upx;
   }
   .dollar{
   	margin-left: 60upx;
   	margin-top: 30upx;
   }
   .Rouble{
   	margin-left: 60upx;
   	margin-top: 30upx;
   }
   .Yen{
   	margin-left: 60upx;
   	margin-top: 30upx;
   }
   .won{
   	margin-left: 60upx;
   	margin-top: 30upx;
   }
   .content2{
   	background-color: #F1F1F1;
   	height: 1220upx;
   	margin-top: -350upx;
   }
</style>
