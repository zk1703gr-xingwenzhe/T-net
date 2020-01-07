<template>
	<view class="content">
		<view class="Arrow"><image src="../../../static/image/image/fanhui@2x.png" @tap="back()"></image></view>
		<view class="header">
			{{lang.memberOservice}}
		</view>
		<div class="media">
			  <div class="media-left">
				<a href="#">
				  <!-- <img class="media-object" src="../../../static/image/image/kefu.png"> -->
				</a>
			  </div>
			  <div class="media-body">
				<h4 class="media-heading">{{lang.memberSafety}}</h4>
				 <view class="touxiang">
				<!-- <image src="../../../static/image/image/touxiang.png"></image> -->
				</view> 
				<view class="num"><h4>11111111</h4></view>
					<view class="tupian">
						<!-- <image src="../../../static/image/image/tupian@2x.png"></image> -->
							<view class="shuru"><input type="text"></view>
					  </view>
					<view class="jianpan"><image src="../../../static/image/image/jianpan@2x.png"></image></view>
			  </div>
		</div>
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
           }
        }
    }
</script>
<style>
	.header{
	width:166upx;
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
	margin-top: 50upx;
	margin-left: 19upx;
	}
   .media{
   	background-color: rgba(243, 244, 245, 1);
   	height: 1050upx;
	margin-top: 50upx;
   }
   .media-object{
   	width: 100upx;
   	height: 100upx;
   	margin-top: 40upx;
   	margin-left: 30upx;
   }
   .media-object img{
   	width: 100upx;
   	height: 100upx;
   }
   .jianpan image{
   	width: 80upx;
   	height: 80upx;
   	float: left;
   	margin-top: -80upx;
   	margin-left: 20upx;
   }
   .tupian image{
   	width: 88upx;
   	height: 88upx;
   	float: right;
   	margin-right: 20upx;
   	margin-top: -10upx;
   }
   .shuru input{
   	width: 500upx;
   	height: 70upx;
   	border: 1px solid;
   	margin-top: 510upx;
   	margin-left: 120upx;
   	color: rgba(213, 213, 213, 1);
   }
   .media-heading{
   	margin-left: 150upx;
   	margin-top: -100upx;
   	background-color: white;
   	width: 400upx;
   	height: 400upx;
   }
   .touxiang image{
   	width: 100upx;
   	height: 100upx;
   	margin-left: 620upx;
   	margin-top: 20upx;
   }
   .num h4{
   	background-color: #000000;
   	width: 500upx;
   	height: 100upx;
   	color: white;
   	margin-left: 100upx;
   	margin-top: -100upx;
   }
</style>
