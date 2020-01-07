<template>
	<view class="main">
		<!-- 矿池页面 -->
		<view class="status_bar"><!-- 这里是状态栏 --></view>
		<view class="nav">
			<view class="icon iconfont icon-left" @tap="back"></view>
			<view class="">{{lang.financialOpool}}</view>
			<view class="" @tap="navigateTo" data-url="assets_record">{{lang.financialRecord}}</view>
		</view>
		<view class="property">
			<view class="property_son">
				<view class="property_zzc">{{lang.propertyTassets}}：{{results(data.total_assets)}}ST</view>
				<view class="property_ed" @tap="navigateTo" data-url="credit_record">
					<view class="property_ed_zt">{{lang.financialDQuota}}：{{results(data.deduction_quota)}}</view>
					<view class="property_ed_img">
						<img src="@/static/image/orepool/index/tishikedianji@2x.png" alt="">
					</view>
				</view>
			</view>
		</view>
		<view class="conter">
			<view class="wenhao" @tap="open_help_popup">
				<img src="@/static/image/orepool/index/wenhao@2x.png" alt="">
			</view>
			<view class="anniu">
				<view class="anniu_son" @tap="navigateTo" data-url="money_management">{{lang.financial}}</view>
				<view class="anniu_son" @tap="opengetpopup">{{lang.financialReceive}}</view>
			</view>
			<view class="unreleased_assets">
				{{lang.financialAssetsreleased}}：{{this.data_range(data.released_assets)}}ST
			</view>
			<view class="assets_drawn">
				{{lang.financialPassets}}：{{this.data_range(data.pending_assets)}}ST
			</view>
		</view>
		<view class="footer">
			<view class="footer_left"  @tap="navigateTo" data-url="release_the_record"></view>
			<view class="footer_right" @tap="navigateTo" data-url="get_the_record"></view>
			<!-- <view class="footer_left fenxiang"  @tap="navigateTo" data-url="share_reword?type=recommendation_award"></view>
			<view class="footer_right fenhong" @tap="navigateTo" data-url="share_reword?type=bonus"></view> -->
		</view>
		<!-- 领取弹窗 -->
		<view class="getpopup" v-if="isgetpopup">
			<view class="zhezhao" @tap="closegetpopup"></view>
			<view class="neirou">
				<view class="popup_input">
					<input type="number" value="" :placeholder="lang.financialDraw" v-model="number"/>
				</view>
				<view class="confirm" @tap="openfailed">
					{{lang.financialSure}}
				</view>
			</view>
		</view>
		<!-- 领取成功和失败的弹窗-->
		<view class="failed" v-if="issucceedpopup">
			<view class="failed_zz" @tap="closefailed"></view>
			<view class="failed_nr">
				<view class="failed_top">
					{{lang.financialSuccess}}
				</view>
				<view class="failed_img">
					<img src="@/static/image/orepool/index/chenggong.png" alt="">
				</view>
				<view class="certain" @tap="closefailed">
					{{lang.walletConfirm}}
				</view>
			</view>
		</view>
		<view class="help_popup" v-if="isshow">
			<view class="help_zhezhao" @tap="close_help_popup"></view>
			<view class="help_nr">
				<view class="help_list">
					<view>{{lang.financialMplay}}</view>
					<view>1.{{lang.contractUseUSDTdiscount}}</view>
					<view>2.{{lang.contractTST}}</view>
					<view>3.{{lang.contractMdraw}}</view>
				</view>
			</view>
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
				isgetpopup:false,//领取弹窗
				issucceedpopup:false,
				data:"",
				number:'',//领取数量
				isshow:false//帮助弹窗
			}
		},
		onShow() {
			this.OrePoolRendering()
		},
		methods: {
			back:function(){
				uni.navigateBack();
			},
			results:function (value) {//切割2位小数
			   let tempVal = parseFloat(value).toFixed(3)
			   let realVal = tempVal.substring(0, tempVal.length - 1)
			   return realVal
			},
			OrePoolRendering:function(){//页面渲染
				uni.showLoading({title: this.$store.state.lang.lang.propertyLoading});
				this.$userRequest
				.get('OrePoolRendering','')
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
			navigateTo: function(e) {//跳转页面
				var url = e.currentTarget.dataset.url;
				if(url=='money_management'){
					this.$userRequest
					.get('UserManageMoneyExchangeBase','')
					.then(res => {
						if(res.data.code==0){
							uni.navigateTo({
								url: url
							});
						}
					})
					.catch(err => {
						console.log(err);
					});
				}else{
					uni.navigateTo({
						url: url
					});
				}
			},
			opengetpopup:function(){//打开领取弹窗
				this.isgetpopup=true
			},
			closegetpopup:function(){//关闭领取弹窗
				this.isgetpopup=false
			},
			openfailed:function(){//领取的确认按钮
				this.isgetpopup=false;
				if(this.number==""){
					uni.showToast({title: this.$store.state.lang.lang.financialDraw,icon:"none"});
					return
				}
				uni.showLoading({title: this.$store.state.lang.lang.propertyLoading});
				this.$userRequest
				.post('receivePendingAssets',{number:this.number})
				.then(res => {
					uni.hideLoading();
					if(res.data.code==0){
						// this.data=res.data.data;
						// uni.showToast({title: '领取成功',icon:"none"});
						this.issucceedpopup=true
					}
				})
				.catch(err => {
					uni.hideLoading();
					console.log(err);
				});
				
			},
			closefailed:function(){//
				this.issucceedpopup=false
			},
			open_help_popup:function(){//打开帮助弹窗
				this.isshow=true
			},
			close_help_popup:function(){//关闭帮助弹窗
				this.isshow=false
			}
		}
	}
</script>

<style>
	page{
		background-color: #FFFAF3;
	}
	/* 状态栏 */
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
	.nav{
		width: 730upx;
		height: 88upx;
		background-color: #FFFAF3;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 0 auto;
	}
	.nav view:nth-child(1){
		width: 44upx;
		height: 44upx;
		line-height: 44upx;
		font-size: 50upx;
	}
	.nav view:nth-child(2){
		height:30upx;
		font-size:32upx;
		font-weight:800;
		color:#333333;
		line-height: 30upx;
		text-align: center;
	}
	.nav view:nth-child(3){
		height:26upx;
		font-size:28upx;
		font-weight:500;
		color:#333333;
		line-height: 26upx;
	}
	/* 顶部内容 */
	.property{
		width: 100%;
		height: 87upx;
		background-image: url('~@/static/image/orepool/index/head@2x.png');
		background-repeat: no-repeat;
		background-position: center;
		background-size: 100% 100%;
		position: relative;
	}
	.property_son{
		position: absolute;
		top: 24upx;
		left: 58upx;
		width: 640upx;
		height: 27upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.property_son .property_zzc,.property_son .property_ed_zt{
		font-size:28upx;
		font-weight:500;
		color:#C7841C;
		line-height: 27upx;
	}
	.property_son .property_ed{
		display: flex;
		align-items: center;
	}
	.property_ed_img{
		margin-left: 10upx;
		position: relative; 
		width: 32upx;
		height: 17upx;
	}
	.property_ed_img img{
		position: absolute;
		width: 32upx;
		height: 17upx;
	}
	/* 中间内容 */
	.conter{
		width: 661upx;
		height: 567upx;
		background-image: url('~@/static/image/orepool/index/kuang@2x.png');
		background-repeat: no-repeat;
		background-position: center;
		background-size: 100% 100%;
		margin: 58upx auto;
		position: relative;
	}
	.wenhao{
		width: 70upx;
		height: 70upx;
		position: absolute;
		top: 30upx;
		right: 12upx;
	}
	.wenhao img{
		width: 70upx;
		height: 70upx;
	}
	.anniu{
		position:absolute;
		width:577upx ;
		height:264upx;
		top: 107upx;
		left: 42upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.anniu_son{
		width: 242upx;
		height: 264upx;
		background-image: url('~@/static/image/orepool/index/anniu@2x.png');
		background-repeat: no-repeat;
		background-position: center;
		background-size: 100% 100%;
		font-size:47upx;
		font-weight:normal;
		color:#FFFAF3;
		line-height:264upx;
		text-align: center;
	}
	.unreleased_assets{
		position: absolute;
		width:661upx;
		height:28upx;
		font-size:29upx;
		font-weight:500;
		color:#FFFFFF;
		text-align: center;
		line-height: 28upx;
		top: 450upx;
	}
	.assets_drawn{
		position: absolute;
		width:661upx;
		height:28upx;
		font-size:29upx;
		font-weight:500;
		color:#FFFFFF;
		text-align: center;
		line-height: 28upx;
		top: 529upx;
	}
	/* 底部按钮 */
	.footer{
		width: 100%;
		margin-top: 50upx;
	}
	.footer_left{
		width: 50%;
		float:left;
		height: 321upx;
		background-image: url('~@/static/image/orepool/index/shifangjilu@2x.png');
		background-repeat: no-repeat;
		background-position: center;
		background-size: 100% 100%;
	}
	.footer_right{
		width: 50%;
		float:left;
		height: 321upx;
		background-image: url('~@/static/image/orepool/index/lingqujilu@2x.png');
		background-repeat: no-repeat;
		background-position: center;
		background-size: 100% 100%;
	}
	/* 弹窗 */
	.getpopup,.failed{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
	}
	.getpopup .zhezhao,.failed .failed_zz{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0,0,0,0.2);
		z-index: 100;
	}
	.getpopup .neirou{
		width: 517upx;
		height: 484upx;
		background-color: #FFFAF3;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		z-index: 101;
		border-radius:10upx
	}
	.getpopup .popup_input{
		width: 390upx;
		height: 91upx;
		margin-top: 131upx;
		margin-left: 63upx;
	}
	.getpopup .popup_input input{
		width: 390upx;
		height: 91upx;
		padding-left: 84upx;
		border:2upx solid #999999;
		border-radius:5upx;
		box-sizing: border-box;
	}
	.getpopup .confirm{
		width:383upx;
		height:78upx;
		background:#FFB800;
		border-radius:39upx;
		line-height: 78upx;
		text-align: center;
		font-size:36upx;
		font-family:SourceHanSansCN;
		font-weight:500;
		color:#FFFFFF;
		margin-top: 131upx;
		margin-left: 67upx;
	}
	/* 成功失败的弹窗 */
	.failed .failed_nr{
		width:517upx;
		height:564upx;
		background-color: #FFFAF3;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		z-index: 101;
		border-radius:10upx
	}
	.failed .failed_top{
		width: 100%;
		height:44upx;
		font-size:47upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#C7841C;
		line-height:44upx;
		margin-top: 43upx;
		text-align: center;
	}
	.failed .failed_cause{
		width: 100%;
		height:23upx;
		font-size:24upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#C7841C;
		line-height:23upx;
		margin-top: 10upx;
		text-align: center;
	}
	.failed .failed_img{
		width: 334upx;
		height: 201upx;
		margin-top: 32upx;
		margin-left: 99upx;
	}
	.failed .failed_img img{
		width: 334upx;
		height: 201upx;
	}
	.certain{
		width:383upx;
		height:78upx;
		background:#FFB800;
		border-radius:39upx;
		line-height: 78upx;
		text-align: center;
		font-size:36upx;
		font-family:SourceHanSansCN;
		font-weight:500;
		color:#FFFFFF;
		margin-top: 81upx;
		margin-left: 67upx;
	}
	/* 帮助弹窗 */
	.help_popup{
		position: absolute;
		top:0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 10;
	}
	.help_zhezhao{
		position: absolute;
		top:0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 11;
		background-color: rgba(0,0,0,.2);
	}
	.help_nr{
		position: absolute;
		top:0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 15;
		width: 517upx;
		height: 564upx;
		margin: auto;
		background-color: #FFFFFF;
	}
	.help_list{
		position: absolute;
		top:0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 16;
		width: 465upx;
		height: 500upx;
		margin: auto;
		background-color: #FFFFFF;
	}
	.help_list view:nth-child(1){
		height:34upx;
		font-size:36upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:#D18646;
		line-height: 34upx;
		text-align: center;
	}
	.help_list view:nth-child(2),.help_list view:nth-child(3),.help_list view:nth-child(4){
		width: 465upx;
		font-size:24upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#D18646;
		line-height: 30upx;
		margin: 27upx auto;
	}
	.fenxiang{background-image:url("~@/static/image/orepool/fenxiang.png")}
	.fenhong{background-image:url("~@/static/image/orepool/fenhong.png")}
</style>
