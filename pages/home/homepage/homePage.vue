<template>
	<!-- 首页页面 -->
	<view class="homePageBox">
		<view class="NavbarBox">
			<view class="Navbar" @tap="openuser()">
				<!-- <text class="twebicon icon-renzheng ex-black9"></text> -->
				<img class="user" :src="avatarSrc[avatarSrc_active].src" mode="">
				<view class="header_img">
					<img src="@/static/image/index/tweb.png" alt="">
				</view>
				<view class="user">
				</view>
			</view>
		</view>
		<view class="shouyener">
			<!-- 轮播图 -->
			<view class="Slide_img">
				<swiper class="imgx" :autoplay="true" :interval="6000" :duration="1000" :circular=true v-if="lists_img!==''">
					<swiper-item @tap="notice_details(todo)" v-for="(todo, index) in lists_img" :key="index">
						<view class="swiper-item">
							<img class="imgx" :src="http_url+todo.jpeg" mode="">
						</view>
					</swiper-item>
				</swiper>
				<view class="greet">
					<view class="greet_text">
						<uni-notice-bar :scrollable="true" :single="true" :text="paoma" background-color="#fff" color="#000" show-icon="true" speed="70"/>
					</view>
				</view>
			</view>
			<!-- 钱包 -->
			<view class="WalletFinancing">
				<view class="wallet">
					<view class="walleta" @tap="openwalletset">
						<view class="wallet_text">
							<p class="p1">{{lang.indexWallet}}</p>
							<p class="p2">WALLET</p>
						</view>
							<img class="wallet_img" src="../../../static/image/homepage/2.png" mode="">
					</view>
					<view class="walleta" @tap="openorepool">
						<view class="wallet_text">
							<p class="p1">{{lang.financialOpool}}</p>
							<p class="p2">MANAGE</p>
						</view>
							<img class="wallet_img" src="../../../static/image/homepage/1.png" mode="">
					</view>
				</view>
			</view>
			<!-- 行情 -->
			<view class="Situation">
				<view class="Situation_Text">
					<view class="Situation_Texta">
						{{lang.indexQuotation}}
					</view>
					
				</view>
				<view class="SituationList">
				<!-- <view class="SituationList" :style="{height:rqheight+'px',overflow: 'hidden'}"> -->
					<view class="ListeLement" v-for="(item,index) in exQuotationDataList" :key="index" @tap="openkline(item.source,item.target)">
						<view class="lement1">
							<view class="lement1a">
								<text class="lement1atext1">{{ item.source}}</text><text class="lement1atext2">/{{item.target}}</text>
							</view>
							<view class="lement1b">
								<view v-if="lang.langType == 'zh-CN' || lang.langType == 'Fan'" class="box"><text class="lement1btext">{{lang.index24Hquantity}}</text>{{ tranNumber(item.vol) }}</view>
								<view v-if="lang.langType == 'en'" class="box"><text class="lement1btext">{{lang.index24Hquantity}}</text>{{ tranNumberEN(item.vol) }}</view>
							</view>
						</view>
						<view class="lement2">
							<view class="lement2a" :style="{color:item.gain.substring(0,1)=='-'?bgcolor2:bgcolor1}">
								 {{parseFloat(item.close)}}
							</view>
							<view class="lement2b">
								≈￥{{numFilter(item.CNY)}}
							</view>
						</view>
						<view class="lement3" :style="{background:item.gain.substring(0,1)=='-'?bgcolor2:bgcolor1}">
							<span v-if="item.gain.substring(0,1)!='-'">+</span>&nbsp;{{item.gain}}
						</view>
					</view>
					<view class="ListeLement">
						
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	import { mapState, mapMutations } from 'vuex';
	import { PbMessage } from '@/common/libs/PbMessage';
	var pb = new PbMessage();
	
	var utiltool = require('@/exui/tool/utiltool.js');
	export default {
		components: {
			uniNoticeBar
		},
		props: {
			tabBarHeight: Number,
			navTo: {
			type: Function,
			default: null
		  }
		},
		data() {
			return {
				bgcolor1:"#c15465",
				bgcolor2:"#4daa90",
				lists_img:[],
				http_url:"",
				rqheight:0,
				tranNumber:utiltool.tranNumber,
				tranNumberEN:utiltool.tranNumberEN,
				typeTitle:utiltool.typeTitle,
				paoma:"",
				avatarSrc: [
					{ src: require('../../../static/image/member/avatar/0.png'), value: '0', checked: false },
					{ src: require('../../../static/image/member/avatar/1.png'), value: '1', checked: false },
					{ src: require('../../../static/image/member/avatar/2.png'), value: '2', checked: false },
					{ src: require('../../../static/image/member/avatar/3.png'), value: '3', checked: false },
					{ src: require('../../../static/image/member/avatar/4.png'), value: '4', checked: false },
					{ src: require('../../../static/image/member/avatar/5.png'), value: '5', checked: false },
					{ src: require('../../../static/image/member/avatar/6.png'), value: '6', checked: false },
					{ src: require('../../../static/image/member/avatar/7.png'), value: '7', checked: false },
					{ src: require('../../../static/image/member/avatar/8.png'), value: '8', checked: false },
					{ src: require('../../../static/image/member/avatar/9.png'), value: '9', checked: false },
					{ src: require('../../../static/image/member/avatar/10.png'), value: '10', checked: false },
					{ src: require('../../../static/image/member/avatar/11.png'), value: '11', checked: false },
					{ src: require('../../../static/image/member/avatar/12.png'), value: '12', checked: false }
				],
				avatarSrc_active:0
			}
		},
		computed: {
			...mapState({				
				lang:state => state.lang.lang,
				exQuotationDataList:state => state.websocket.exQuotationDataList,
				lists:state => state.coin.headList
			})
		},
		created(){
			if(typeof parseInt(this.$store.getters.getUserData.user_avatar) == "number" && JSON.stringify(parseInt(this.$store.getters.getUserData.user_avatar)) != "null" ){
				this.avatarSrc_active = this.$store.getters.getUserData.user_avatar
			}
		},
		mounted() {
			const token = this.$store.getters.getToken;
			let _this=this;
			console.log(_this.exQuotationDataList);
			setTimeout(function(){
				_this.getCarouselList();
			},100)
			
		},
		methods: {
			notice_details(_data){
				console.log(_data)
				if(_data.link!=""){
					if(_data.is_to_bulletin==1){
						uni.navigateTo({
							url:"./member/notice_details?id="+_data.link
						})
					}else{
						uni.navigateTo({
							url:"./homepage/web_notice?url="+_data.link
						})
					}
				}	
			},
			openwalletset:function(){//打开钱包
				const token = this.$store.getters.getToken;
				if(token==""){
					uni.navigateTo({
						url: './login/login'
					});	
				}else{
					if(this.$store.getters.getUserData.is_set_wallet_pwd==0){
						uni.navigateTo({
							url: './wallet/setdealpwd'
						});
					}else{
						uni.navigateTo({
							url: './wallet/index'
						});
					}
				}	
			},
			openorepool:function(){
				const token = this.$store.getters.getToken;
				if(token==""){
					uni.navigateTo({
						url: './login/login'
					});	
				}else{
					uni.navigateTo({
						url: './orepool/index'
					});	
				}
			},
			openkline:function(e,a){				
				uni.navigateTo({
					url: './kline/index?buy='+e+'&sell='+a
				});
			},
			openuser: function() {					
				const token = this.$store.getters.getToken;
				if(token==""){
					uni.navigateTo({
						url: './login/login'
					});	
				}else{				
					uni.navigateTo({
						url: './member/index'
					});
				}				
			},
			getCarouselList:function (){//获取轮播图		
				this.$http
					.get('getCarouselList', {})
					.then(res => {
						if(res.data.code==0){
							this.paoma=res.data.data.paoma;
							this.lists_img=res.data.data.carouselData;
							this.http_url=res.data.data.http_url;
							this.$store.dispatch('setHttp_url', res.data.data.http_url);
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			// 截取当前数据到小数点后二位
			numFilter(value) {
				let tempVal = parseFloat(value).toFixed(3)
				let realVal = tempVal.substring(0, tempVal.length - 1)
				return realVal
			}
		
			
		}
	}
</script>

<style>
	/* navbar */
	.NavbarBox {
		width: 100%;
		background-color: #FFFFFF;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 99;
	}
	.Navbar {width:100%;height:88upx;padding:0 30upx;margin-top:36upx;box-sizing:border-box;display: flex;justify-content: space-between;align-items: center;}
	.Navbar .user {
		width: 48upx;
		height: 48upx;
		font-size: 46upx;
		text-align: center;
	}
	.header_img{
		width: 133upx;
		height: 26upx;
	}
	.header_img img{
		width: 133upx;
		height: 26upx;
	}
	.shouyener{position: relative;top:124upx;left: 0;}
	/* 轮播图 */
	.Slide_img {width: 100%;padding-top:30upx;background-color: #FFFFFF;}

	.Slide_img .greet {
		margin: 0 auto;
		height: 70upx;
		width: 710upx;
		display: flex;
		align-items: center;

	}

	.Slide_img .greet .greet_img {
		height: 32upx;
		width: 28upx;
	}

	.Slide_img .greet .greet_text {
		height: 70upx;
		width: 700upx;
		text-align: left;
		line-height: 70upx;
		font-size: 24upx;
		margin-left: 15upx;
		font-weight: 600;

	}

	.imgx {
		width: 710upx;
		height: 303upx;
		margin: 0 auto;
		border-radius: 10upx;
	}

	/* 钱包 */
	.WalletFinancing {
		width: 100%;
		height: 200upx;
		background: #F3F4F5;
	}

	.wallet {
		width: 710upx;
		height: 200upx;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;

	}

	.walleta {
		width: 345upx;
		height: 160upx;
		background: #FFFFFF;
		box-shadow: 0upx 0upx 18upx 3upx rgba(0, 0, 0, 0.08);
		border-radius: 5upx;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.wallet_text{
		width: 110upx;
		text-align: left;
		padding-left: 10upx;
	}
	.wallet_img{
		width: 100upx;
		height: 100upx;
	}
	.p1{
		color: #333333;
		font-size: 36upx;
		font-weight: bold;
		
	}
	.p2{
		color: #999999;
		font-weight: 600;
		font-size: 20upx;
		
	}

	/* 行情 */
	.Situation {
		width: 100%;
		background: #FFFFFF;
	}

	.Situation_Text {
		width: 710upx;
		height: 70upx;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}

	.Situation_Text .Situation_Texta {
		font-size: 42upx;
		font-weight: 800;
		color: rgba(51, 51, 51, 1);
	}

	.Situation_Text .Situation_Textb {
		font-size: 28upx;
		color: rgba(153, 153, 153, 1);
	}

	/* 列表 */
	.SituationList {
		width: 100%;
	}

	.ListeLement {
		width: 690upx;
		height: 118upx;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: #F0F0F0 solid 1upx;
	}

	.ListeLement .lement1 {
		height: 110upx;
		width: 280upx;
	}

	.ListeLement .lement2 {
		height: 110upx;
		width: 250upx;
	}

	.ListeLement .lement3 {
		
		width: 156upx;
		height: 63upx;
		font-weight: 700;
		border-radius: 5upx;
		color: #FFFFFF;
		text-align: center;
		line-height: 63upx;
	}

	.lement1a {
		height: 60upx;
		line-height: 67upx;
		text-align: left;
	}

	.lement1b {
		height: 40upx;
		line-height: 40upx;
		text-align: left;
		color: #666666;
		font-size: 24upx;
	}
     .lement1btext{
		 margin-right: 10upx;
	 }
	.lement1atext1 {
		font-size: 32upx;
		color: #333333;
		font-weight: bold;
	}

	.lement1atext2 {
		font-size: 24upx;
		color: #999999;
	}

	.lement2a {
		height: 60upx;
		line-height: 67upx;
		text-align: left;
		color: #c15465;
		font-size: 32upx;
		font-weight: 700;
	}

	.lement2b {
		height: 40upx;
		line-height: 40upx;
		text-align: left;
		color: #666666;
		font-size: 24upx;
	}
</style>
