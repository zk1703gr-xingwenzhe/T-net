<template>
	<view>
		<view :class="{'ex-deal-password':true,'disbled':!visble}" >
			<view @tap="closeBtn" class="mbbox"></view>
			<!-- 密码框 -->
			<view class="key" v-if="currentType=='transaction_password'">
				<view class="keyPop">
					<view class="title">{{lang.memberPassword}}</view>
					<form @submit="doneBtn()">
						<p>{{lang.transactionPverification}}</p>
						<input @focus="onfocus" type="password"  :placeholder="lang.propertyIpassword" v-model="key.password">
						<view class="errorTip">
							{{errorTip}}
						</view>
						<view class="option">
							<view class="leftBtn"></view>
							<!-- <view class="rightBtn" @tap="forgetPassword">忘记密码</view> -->
						</view>
						<view class="operation">
							<view class="closeBtn" @tap="closeBtn">{{lang.walletCancel}}</view>
							<view class="bar"></view>
							<view class="doneBtn" @tap="doneBtn">{{lang.walletConfirm}}</view>
						</view>
					</form>
				</view>
			</view>
			<view class="gesture" v-if="currentType=='gesture'">
				<view class="title_top">
					<view class="status_bar"><!-- 这里是状态栏 --></view>
					<view class="nav">
						<view class="icon iconfont icon-left" @tap="closeBtn"></view>
						<view class="">{{lang.memberGcode}}</view>
					</view>
				</view>
				<view class="box">
					<mpvueGestureLock :containerWidth="590" :cycleRadius="70" @end="gesture_end" :nfc_fun='nfc_fun' :password="gesture.password"></mpvueGestureLock>
				</view>
				<view class="uni-text">{{text}}</view>
			</view>
		</view>
	</view>
</template>
<script>
	import mpvueGestureLock from '@/components/mpvueGestureLock';
	import { mapState, mapMutations } from 'vuex';
	export default {
		name: "exPasswordPop",
		props: {
			
		},
		components:{
			mpvueGestureLock
		},
		data() {
			return {
				text:"请输入手势密码",
				errorTip:"",
				visble:false,
				currentType:"",	//1:NFC,fingerprint指纹,gesture手势,transaction_password密码,
				payType:"transaction",	//1:交易密码,2:钱包密码
				key:{
					password:""
				},
				gesture:{
					password:[]
				},
				fingerprint:{
					transaction_token:""
				},
				NFC:{
					mima:''
				}
			}
		},
		computed: {
			...mapState({				
				lang:state => state.lang.lang,
			})
		},
		created(){
			let canFiger;
			// if(plus.fingerprint){
			// 	canFiger = plus.fingerprint.isSupport();
			// }else{
			// 	canFiger = false;
			// }
			canFiger=true;
			this.$userRequest.get('getUserPriorityHighestPasswordMode',{
				is_supporting_fingerprinting:canFiger==true?1:0,
				pwd_type:this.payType,
			}).then(res => {
				
				if(res.data.code==0){
					this.currentType=res.data.data.passwordMode;
				}
			}).catch(err => {
				
			})
		},
		mounted(){
			// console.log(this.currentType)
			// if(this.currentType=="fingerprint"){
			// 	this.fingerprint_fun()
			// }
		},
		methods:{
			closeBtn(){
				//this.$store.commit('dealPassword/set_visble',false);
				this.visble = false;
			},
			doneBtn(){
				if(this.key.password.length<6){
					this.errorTip = "请输入正确的交易密码"
				}else{
					this.$store.commit('dealPassword/save_password',this.key.password)
					this.$emit("key_done");
					this.visble = false;
					this.password=""
				}
			},
			onfocus(){
				this.errorTip=""
			},
			set_visble(){
				this.visble = true;
				if(this.currentType=="fingerprint"){
					this.fingerprint_fun()
				}
				if(this.currentType=="nfc"){
					this.nfc_fun('haha')
				}
			},
			close_visble(){
				this.visble = false;
			},
			fingerprint_fun(){
				this.$userRequest.get('getTransactionToken',{
					device_id:plus.device.uuid,
				}).then(res => {
					if(res.data.code==0){
						this.fingerprint.transaction_token=res.data.data
						// #ifdef APP-PLUS
						let _this=this;
						plus.fingerprint.authenticate(function(e) {
							plus.nativeUI.closeWaiting(); //兼容Android平台关闭等待框
							uni.showToast({ title: _this.$store.state.lang.lang.transactionFresuccessful, icon: 'none' });
							_this.$emit("fingerprint_end",_this.fingerprint.transaction_token)
							_this.closeBtn()
						}, function(e) {
							switch (e.code) {
								case e.AUTHENTICATE_MISMATCH:
									uni.showToast({ title: _this.$store.state.lang.lang.propertyFrenter, icon: 'none' });
									break;
								case e.AUTHENTICATE_OVERLIMIT:
									plus.nativeUI.closeWaiting(); //兼容Android平台关闭等待框
									uni.showToast({ title: _this.$store.state.lang.lang.transactionNumberpassword, icon: 'none' });
									_this.more_mistakes()
									break;
								case e.CANCEL:
									uni.showToast({ title: _this.$store.state.lang.lang.propertyCrecognition, icon: 'none' });
									break;
								default:
									plus.nativeUI.closeWaiting(); //兼容Android平台关闭等待框
									uni.showToast({ title: _this.$store.state.lang.lang.propertyFitrygain, icon: 'none' });
									break;
							}
						});
						// Android平台手动弹出等待提示框 
						if ('Android' == plus.os.name) {
							plus.nativeUI.showWaiting('请识别指纹').onclose = function(){
								plus.fingerprint.cancel();
							}
						}
						// #endif
					}
				}).catch(err => {
					uni.hideLoading();

				});
			},
			//手势输入结束
			gesture_end(_data){
				this.$emit("gesture_end",JSON.stringify(_data));
			},
			errtext(){
				this.text="手势密码错误，请重新录入"
			},
			key_fun(){
				
			},
			nfc_fun(_data){
				
				this.$emit("nfc_fun",JSON.stringify(_data));
			},
			//输入三次错误以上调用密码弹窗
			more_mistakes(){
				this.currentType="transaction_password"
				
			},
		},
	}
</script>
<style>
	.disbled{display:none}
	.ex-deal-password{position:fixed;top:0;left:0;right:0;bottom:0;z-index:10;}
	.mbbox{position:fixed;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,0.6);}
	.keyPop{position:fixed;bottom:0;left:0;right:0;background-color:#fff;border-radius:10px 10px 0 0;box-sizing:border-box;padding:30upx 20upx;}
	.keyPop .title{font-size:36upx;font-weight:bold;}
	.keyPop p{margin:20upx 0;font-size:28upx;color:#333;font-weight:bold;}
	.keyPop input{font-size:28upx;border-bottom:solid 2upx #f6f6f6;}
	.keyPop .errorTip{color:#ea3636;font-size:24upx;}
	.keyPop .option{margin:20upx 0;}
	.keyPop .option view{color:#4F78FF;font-size:24upx;}
	.keyPop .operation{width:100%;display:flex;align-items:center;}
	.keyPop .operation .bar{width:30upx;}
	.keyPop .operation view{height:80upx;font-size:32upx;font-weight:bold;display:flex;align-items:center;justify-content:center;}
	.keyPop .operation .closeBtn{flex:1;border:solid 2upx #666;border-radius:2upx;box-sizing:border-box;}
	.keyPop .operation .doneBtn{flex:1;background-color:#4daa90;color:#fff;}
	
	.gesture{background-color:#fff;position:fixed;top:0;bottom:0;left:0;right:0;}
	.gesture .title_top{position:relative;z-index:5;}
	.gesture .box{position:fixed;top:0upx;bottom:0;left:0;right:0;display:flex;align-items:center;justify-content:center;}

	.status_bar {height: var(--status-bar-height);width: 100%;background-color: #FFFFFF;}
	.nav{width: 750upx;height: 88upx;display: flex;align-items: center;background-color: #FFFFFF;}
	.nav view:nth-child(1){width: 44upx;height: 44upx;line-height: 44upx;font-size: 50upx;}
	.nav view:nth-child(2){height: 30upx;font-size:32upx;font-weight:800;color:#333333;line-height: 30upx;text-align: center;margin-left: 270upx;}
	.uni-text{font-size: 30upx;text-align: center;margin-top: 30upx;}
	
</style>