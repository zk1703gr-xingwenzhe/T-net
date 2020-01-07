<template>
	<view class="mold">
		<view class="nav_top">
			<view class="status_bar"><!-- 这里是状态栏 --></view>
			<view class="nav">
				<view class="icon iconfont icon-left" @tap="back"></view>
				<view class="">{{lang.memberPmethod}}</view>
				<view class="" @tap="addPay()">
					<img src="@/static/image/transaction/personal/qinziAPPtubiao@2x.png">
				</view>
			</view>
		</view>
		<view class="Max_box" v-if="PaymentList.length==0">
			<view class="none_pay">
				<image class="img_none" src="../../../static/image/transaction/personal/zanwufukuanfangs@2x.png"></image>
			</view>
			<view class="add" @tap="addPay()">
				+ {{lang.memberAddto}}
			</view>
		</view>
		<view class="Max_Id" v-else>
			<view class="ex-body">
				<view class="ex-scroll-do ex-margin-top">
					<scroll-view  show-scrollbar="true"
					class="ex-scroll-x" scroll-x v-for="(todo, index) in PaymentList" 
					:scroll-left="scrollIndex == index ? 300 : 0"  @touchstart='touchStart'
					@touchend='touchEnd' :data-id="todo.id" scroll-with-animation="true" :key="index" 
					:class="[{ weixin: todo.pay_id==1 }, {ali:todo.pay_id==2},{yhk:todo.pay_id==3}]" 
					style="height:151upx;border-radius:15upx;margin-bottom: 30upx;">
						<view class="items" style="height: 88upx;margin-top: 30upx;margin-left: 10upx;">
							<view class="image" v-if="todo.pay_id==1">
								<image src="../../../static/image/transaction/personal/weixin.png" mode="widthFix"></image>
							</view>
							<view class="image" v-else-if="todo.pay_id==2">
								<image src="../../../static/image/transaction/personal/zfb.png" mode="widthFix"></image>
							</view>
							<view class="image" v-else>
								<image src="../../../static/image/transaction/personal/yhk.png" mode="widthFix"></image>
							</view>
							<view class="contents">
								<view class="title">
									<view class="kahao">
										<view>{{todo.pay_name}}</view>
										<view>{{todo.account}}</view>
									</view>
									<!-- <em><exSwitch  text="ON|OFF" :sid="todo.id" @change="changedemo" :value="todo.is_use"></exSwitch></em> -->
									<view>
										<switch  @click="disableds" style="transform:scale(0.8)" :data-id="todo.id" :checked="todo.is_use?true:false" color="rgba(255,255,255,0.5)" :disabled="todo.is_it_forbidden" v-if="todo.is_it_forbidden==true"/>
										<switch  @change="changedemo" style="transform:scale(0.8)" :data-id="todo.id" :checked="todo.is_use?true:false" color="rgba(255,255,255,0.5)" v-else/>
									</view>
								</view>
								
							</view>
						</view>
						<view class="items btn" style="height:151upx;" :data-id="todo.id" @tap="removeMsg" :style="{width : index == deleteIndex ? deleteBtnWidth + 'px' : btn2Width+'px'}">{{lang.memberDelete}}</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<!-- 弹框 -->
		<view class="Eject" v-if="isopen">
			<view class="Mask" @tap="closepopup()">
			</view>
			<view class="popup bottompop_up">
				<view class="popup_text" @tap="openAlipaynum">
					+  {{lang.transactionAlipay}}
				</view>
				<view class="popup_text" @tap="openWechat">
					+  {{lang.memberWeChat}}
				</view>
				<view class="popup_text" @tap="openbank">
					+  {{lang.memberBcard}}
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import navbar from '@/pages/index/navbar.vue';
	var _self, x, y;
	import exSwitch from '@/exui/components/exSwitch.vue';
	import { mapState, mapMutations } from 'vuex';
	export default {
		computed: {
			...mapState({				
				lang:state => state.lang.lang
			})
		},
		components: {
			navbar,
			exSwitch
		},
		data() {
			return {
				isopen:false,
				isEstablish:true,
				PaymentList:"",
				//2个按钮的宽度
				btn1Width : 70,
				btn2Width : 70,
				//2个按钮的总宽 = btn1Width + btn2Width 单位 px
				deleteBtnWidth : 140,
				//正在滑动的索引
				scrollIndex : -1,
				//正在删除的索引
				deleteIndex : -1,
			}
		},
		onLoad() {
			_self = this;
		},
		onShow(e) {
			this.getuserAllPaymentList();
		},
		methods: {
			disableds:function(){
				uni.showToast({ title:"目前该支付方式有交易中的订单，请先完成", icon: 'none' });
				return
			},
			back:function(){
				uni.navigateBack();
			},
			// 打开弹框
			addPay: function() {
				if(this.$store.getters.getUserData.authentication_level==0){
					uni.showModal({
					    title: this.$store.state.lang.lang.contractPrompt,
					    content: this.$store.state.lang.lang.memberPnidentification,
						confirmText:this.$store.state.lang.lang.memberGoto,
						cancelText:this.$store.state.lang.lang.walletCancel,
					    success: function (res) {
					        if (res.confirm) {
					            uni.navigateTo({
					            	url: './identity'
					            });
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
					return
				}
				this.isopen = true;
			},
			closepopup:function(){ 
				this.isopen = false;
			},
			openAlipaynum: function() { //添加支付宝
				uni.navigateTo({
					url: './../member/Alipaynum'
				});
				this.isopen = false;
			},
			openWechat: function() { //添加微信
				uni.navigateTo({
					url: './../member/Wechat'
				});
				this.isopen = false;
			},
			openbank: function() { //添加银行卡
				uni.navigateTo({
					url: './../member/bank'
				});
				this.isopen = false;
			},
			getuserAllPaymentList:function(){ //获取付款方式
				this.$userRequest
					.get('userAllPaymentList','')
					.then(res => {
						if(res.data.code==0){
							this.PaymentList=res.data.data;
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			// switch1Change: function (e) {
			// 	console.log('switch1 发生 change 事件，携带值为', e.target.value)
			// },
			changedemo:function(e){//修改状态
				console.log(e.target.value);
				if(e.target.value){
					// uni.showLoading({title: this.$store.state.lang.lang.propertyLoading});
					this.$userRequest
						.post('updateUsePaymentState',{user_payment_id:e.currentTarget.dataset.id,state:1})
						.then(res => {
							if(res.data.code==0){
								uni.showToast({ title:this.$store.state.lang.lang.transactionActivated, icon: 'none' });
								this.getuserAllPaymentList();
								this.$userRequest.get('memberinfo').then(res => {
									if (res.data.code == 0) {
										this.$tools.user_payWay({
											type:1,
											data:res.data.data.pay_way
										})
									}
								}).catch(err => {
									console.error(err);
								});
							}
						})
						.catch(err => {
							console.log(err);
						});
				}else{
					this.$userRequest
						.post('updateUsePaymentState',{user_payment_id:e.currentTarget.dataset.id,state:0})
						.then(res => {
							if(res.data.code==0){
								uni.showToast({ title: this.$store.state.lang.lang.memberClosed, icon: 'none' });
								this.getuserAllPaymentList();
							}
						})
						.catch(err => {
							console.log(err);
						});
				}
				
			},
			removeMsg : function(e){//删除
				console.log(e.target.dataset.id);
				uni.showLoading({title: this.$store.state.lang.lang.propertyLoading});
				this.$userRequest
					.post('delUsePaymentState',{user_payment_id:e.target.dataset.id})
					.then(res => {
						uni.hideLoading();
						console.log(res);
						if(res.data.code==0){
							// this.getuserAllPaymentList();
							uni.showToast({ title: this.$store.state.lang.lang.memberDesuccessful, icon: 'none' });
							this.getuserAllPaymentList();
						}
					})
					.catch(err => {
						uni.hideLoading();
						console.log(err);
					});
			},
			touchStart: function (e) {
			    x = e.mp.changedTouches[0].clientX;
			    y = e.mp.changedTouches[0].clientY;
				console.log(e);
			},
			touchEnd : function(e){
			    x = x - e.mp.changedTouches[0].clientX;
				y = y - e.mp.changedTouches[0].clientY;
			    if (x > 10 && x < 50){ _self.resetScroll(); return;}
				if (Math.abs(x) < Math.abs(y)) {_self.resetScroll(); return; }
			    var index = e.currentTarget.dataset.id;
			    if (index == this.scrollIndex){return ;}
			    _self.scrollIndex = index;
			},
			resetScroll:function () {
				setTimeout(function(){_self.scrollIndex = -1;}, 100);
			}
		}
	}
</script>

<style>
	page {
		background: #F3F4F5;
	}
	.nav_top{
		width: 750upx;
		background-color: #FFFFFF;
	}
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background-color: #FFFFFF;
	}
	.nav{
		width: 730upx;
		height: 88upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.nav view:nth-child(1){
		width: 44upx;
		height: 44upx;
		line-height: 44upx;
		font-size: 50upx;
		color: #000000;
	}
	.nav view:nth-child(2){
		height:30upx;
		font-size:32upx;
		font-weight:800;
		line-height: 30upx;
		text-align: center;
		color: #000000;
	}
	.nav view:nth-child(3){
		width:36upx;
		height:36upx;
	}
	.nav view:nth-child(3) img{
		width:36upx;
		height:36upx;
	}
	.Max_box {
		padding-top: 383upx;
	}

	.none_pay {
		width: 615upx;
		height: 473upx;
		margin: 0 auto;
	}

	.img_none {
		width: 615upx;
		height: 473upx;
	}

	.add {
		width: 660upx;
		height: 91upx;
		background: rgba(0, 0, 0, 1);
		border-radius: 5upx;
		text-align: center;
		color: #FFFFFF;
		font-size: 32upx;
		line-height: 91upx;
		margin: 200upx auto 0 auto;

	}

	/* 弹框 */
	.Eject {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 97;
	}

	.Mask {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 98;
		background: rgba(0, 0, 0, 0.3);
	}

	.popup {
		width: 100%;
		height: 394upx;
		background: #FFFFFF;
		padding-top: 15upx;
		padding-bottom: 15upx;
		position: fixed;
		bottom: 0;
		left: 0;
		border-top-left-radius: 40upx;
		border-top-right-radius: 40upx;
		z-index: 99;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		
	}
	.popup_text{
		width:660upx;
		height:91upx;
		border:2upx solid rgba(0,0,0,1);
		border-radius:5upx;
		font-size:32upx;
		color:rgba(51,51,51,1);
		line-height:91upx;
		text-align: center;
	}
	@keyframes bottompop_up {
		from {
			bottom: -424upx;
		}
		100% {
			bottom: 0upx;
		}
	}
	.bottompop_up {
		animation: bottompop_up 200ms linear;
	}
	/* 添加之后 */
/* 	.Max_Id{
		padding-top: 120upx;
	} */
	/* Id 外层盒子 */
	.Id_box{
		width:672upx;
		margin:0 auto;
	}
	.cd{
		width:672upx;
		height:151upx;
		margin-top: 30upx;
		border-radius:15upx;
	}
	.weixin{
		background:linear-gradient(-90deg,rgba(32,181,67,1) 0%,rgba(25,225,150,1) 100%);
	}
	.ali{
		background:linear-gradient(-90deg,rgba(23,135,230,1) 0%,rgba(54,156,248,1) 100%);
	}
	.yhk{
		background:linear-gradient(-90deg,rgba(255,60,69,1) 0%,rgba(254,125,82,1) 100%);
	}
	.father_cd{
		width: 602upx;
		height:151upx;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		
	}
	.son_left{
		width: 400upx;
		height: 68upx;
		display: flex;
	}
	.son_left .uname{
		width: 68upx;
		height: 68upx;
	}
	.son_left .uname image{
		width: 68upx;
		height: 68upx;
	}
	.son_left .kahao{
		margin-left: 15upx;
		display: flex;
		justify-content: space-between;
		flex-flow: column;
	}
	.son_left .kahao view:nth-child(1),.son_left .kahao view:nth-child(2){
		height:27upx;
		font-size:28upx;
		font-weight:500;
		color:#FEFFFE;
		line-height: 27upx;
	}
	.son_right{
		width: 117upx;
		height: 52upx;
		border-radius: 25upx;
		border:1px solid red;
		background: rgba(255,255,255,0.5);
	}
</style>
