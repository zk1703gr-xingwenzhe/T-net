<template>
	<view class="main">
		<!-- 导航 -->
		<view class="title_top">
			<view class="status_bar"><!-- 这里是状态栏 --></view>
			<view class="nav">
				<view class="icon iconfont icon-left" @tap="back"></view>
				<view class="">{{lang.memberIfriends}}</view>
				<view class=""></view>
			</view>
		</view>
		<view class="conter">
			<span :style="'background-image:url('+data.http_url+data.img+')'" class="img"></span>
			<view @tap="showtc">{{lang.memberOshare}}</view>
		</view>
		<view v-if="show" class="sild">
			<view class="sild_zhezhao" @tap="closetc"></view>
			<view class="fenxiang">
				<img :src="data.http_url+data.img" alt="">
			</view>
			<view class="sild_neirou bottompop_up">
				<view class="bc" @tap="savephoto">
					<view class="twebicon icon-baocundaoxiangce" style="font-size: 65upx; color: #F15C18;"></view>
					<view class="zt">{{lang.memberSalbum}}</view>
				</view>
				<view class="bc" @tap="shareweixin">
					<view class="twebicon icon-weixinhaoyou" style="font-size: 65upx;color:#47AB54;"></view>
					<view class="zt">{{lang.memberWfriends}}</view>
				</view>
				<view class="bc" @tap="shareFriends">
					<view class="twebicon icon-pengyouquan" style="font-size: 65upx;color:#47AB54;"></view>
					<view class="zt">{{lang.memberSfriends}}</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import exBottomDialog from '@/exui/components/exBottomDialog.vue';
	import { mapState, mapMutations } from 'vuex';
    export default {
		computed: {
			...mapState({				
				lang:state => state.lang.lang
			})
		},
        data() {
            return {
               show : false,
			   data:""//推广二维码
            }
        },
		onLoad() {
			this.getpromotionPoster();
		},
		components : {
			exBottomDialog : exBottomDialog
		},
        methods: {
            back:function(){
           	uni.navigateBack();
           },
		  showtc : function(){
		  	this.show = true;
		  },
		  closetc : function(){
		  	this.show = false;
		  },
		  getpromotionPoster:function(){//获取二维码
			  uni.showLoading({title: this.$store.state.lang.lang.propertyLoading});
			  this.$userRequest
			  	.post('promotionPoster',{type:2,getimgtg:0})
			  	.then(res => {
			  		uni.hideLoading();
			  		if(res.data.code==0){
			  			this.data=res.data.data
			  		}
			  	})
			  	.catch(err => {
			  		console.log(err);
			  	});
		  },
		  savephoto:function(){//保存相册
			  uni.saveImageToPhotosAlbum({
				 filePath: this.data.http_url+this.data.img,
				 success: function () {
					 uni.showToast({ title: this.$store.state.lang.lang.walletSsuccessfully, icon: 'none' });
				 }
				});
		  },
		  shareweixin:function (){
			  uni.share({
			      provider: "weixin",
			      scene: "WXSceneSession",
			      type: 2,
			      imageUrl: this.data.http_url+this.data.img,
			      success: function (res) {
			          console.log("success:" + JSON.stringify(res));
			      },
			      fail: function (err) {
			          console.log("fail:" + JSON.stringify(err));
			      }
			  });
		  },
		  shareFriends:function(){
			  uni.share({
			      provider: "weixin",
			      scene: "WXSenceTimeline",
			      type: 2,
			      imageUrl: this.data.http_url+this.data.img,
			      success: function (res) {
			          console.log("success:" + JSON.stringify(res));
					   // uni.showToast({ title: "分享成功", icon: 'none' });
			      },
			      fail: function (err) {
			          console.log("fail:" + JSON.stringify(err));
			      }
			  });
		  }
        }
    }
</script>
<style>
	page{
		width: 750upx;
		background-color: #020001;
	}
	.title_top{position:relative;z-index:2;}
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background-color: #FFFFFF;
	}
	.nav{
		width: 750upx;
		height: 88upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #FFFFFF;
	}
	.nav view:nth-child(1),.nav view:nth-child(3){
		width: 44upx;
		height: 44upx;
		line-height: 44upx;
		font-size: 50upx;
	}
	.nav view:nth-child(2){
		height: 30upx;
		font-size:32upx;
		font-weight:800;
		color:#333333;
		line-height: 30upx;
		text-align: center;
	}	
	.conter{
		width: 100%;
		background-color: #020001;
		height:100%;
	}
	.conter img{width:100%;}
	.conter .img{display:block;width:100%;position:absolute;top:48px;left:0;right:0;bottom:0;background-size:cover;background-position:center center;z-index:0;}
	.conter view{
		position: absolute;
		width:341upx;
		height:79upx;
		background:#C69960;
		border-radius:5upx;
		bottom: 43upx;
		left: 204upx;
		text-align: center;
		line-height: 79upx;
		font-size:32upx;
		color:#FFFFFF;
		font-weight:bold;
		font-family:PingFang SC;
	}
	.sild{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
	}
	.sild .sild_zhezhao{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(255,255,255,0.3);
		z-index: 100;
	}
	.sild .sild_neirou{
		width: 100%;
		height: 166upx;
		background: #FFFFFF;
		position: absolute;
		bottom: 0;
		left: 0;
		border-top-left-radius:15upx;
		border-top-right-radius:15upx;
		z-index: 101;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.sild_neirou .bc{
		height: 110upx;
		flex: 1;
		text-align: center;
		display: flex;
		flex-flow: column;
		justify-content: space-between;
		align-items: center;
	}
	.zt{
		height:20upx;
		font-size:20upx;
		font-weight:400;
		color:#333333;
		line-height:20upx;
	}
	@keyframes bottompop_up {
		from {
			bottom: -166upx;
		}
		100% {
			bottom: 0upx;
		}
	}
	.bottompop_up {
		animation: bottompop_up 300ms linear;
	}
	.fenxiang {
		width: 460upx;
		height: 800.4upx;
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		margin: auto;
		z-index: 101;
	}
	.fenxiang img{
		width: 460upx;
		height: 800.4upx;
	}
</style>
