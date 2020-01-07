<template>
	<view class="ex-body">
		<navbar :isshowb="true"></navbar>
		<view class="marginTop186 "><image src="../../../static/image/login/welcome.png" mode="widthFix" style="width:360upx;height:56upx;"></image></view>

		<view class="ex-tab marginTop128">
			<exNav :items="tabs" :size="140" :isCenter="true" :currentIndex="swiperCurrentIndex" @change="navChange"></exNav>
			<swiper class="ex-tab-swiper" style="height:498rpx; overflow:hidden;" :current="swiperCurrentIndex" @change="swiperChange">
				<swiper-item>
					<form @submit="userlogin" class="ex-form">
						<view class="ex-items">
							<!-- <view class="ex-label ex-center">{{lang.memberAnumber}}</view>
							<input @input="input_change" type="number" name="username" class="input" v-model="phoneno" style="text-align:left;" :placeholder="lang.loginPhonenumber" /> -->
							<view class="ex-label">
								<picker @change="changePre" :range="arrs" name="pn_pre" style="text-align:center;">
									<text>+{{ pnpres[index].split("+")[1] }}</text>
								</picker>
							</view>
							<input @input="input_change" type="number" name="username" class="input" v-model="phoneno" style="text-align:left;" :placeholder="lang.loginPhonenumber" />
						</view>
						<view class="ex-items ex-noborder">
							<view class="ex-label ex-center">{{lang.memberPassword}}</view>
							<input @input="input_change" :type="inputType" class="input" v-model="password" name="password" style="text-align:left;" :placeholder="lang.loginRthepassword" />
							<view style="width:180rpx; margin-left:30rpx; flex-shrink:0;">
								<image :src="flag ? '../../../static/image/login/eye1.png' : '../../../static/image/login/eye2.png'" @click="flagEye"></image>
							</view>
						</view>
						<button form-type="submit" type="default" :class="['ex-button marginTop90 loginBtn', login_state!=1?'ex-gtbg-light-yellow':'']" :disabled="login_state==1">
							<text v-if="login_state!=3">{{lang.loginSin}}</text>
							<text v-if="login_state==3">{{lang.LoginLanding}}</text>
							<text class="icon iconfont icon-right"></text>
						</button>
					</form>
				</swiper-item>
				<swiper-item>
					<form @submit="mobilelogin" class="ex-form">
						<view class="ex-items">
							<view class="ex-label">
								<picker @change="changePre" :range="arrs" name="pn_pre" style="text-align:center;">
									<text>+{{ pnpres[index].split("+")[1] }}</text>
								</picker>
							</view>
							<input type="number" name="mobile" class="input" v-model="phoneno" style="text-align:left;" :placeholder="lang.loginPhonenumber" />
						</view>
						<view class="ex-items ex-noborder">
							<view class="ex-label ex-center">{{lang.memberCode}}</view>
							<input type="number" class="input" name="vcode" @input="ismobiledisabled = false" style="text-align:left;" :placeholder="lang.loginVerificationcode" />
							<view style="width:180rpx; margin-left:30rpx; flex-shrink:0;">
								<button type="primary" class="login-sendmsg-btn" @tap="getVCode">{{ vcodeBtnName }}</button>
							</view>
						</view>
						<button form-type="submit" type="default" :class="['ex-button marginTop90 loginBtn', ismobiledisabled ? '' : 'ex-gtbg-light-yellow']" :disabled="ismobiledisabled">
							{{lang.loginSin}}
							<text class="icon iconfont icon-right"></text>
						</button>
					</form>
				</swiper-item>
			</swiper>
		</view>

		<view class="ex-space-between">
			<view class="ex-text ex-black9 ex-margin-top " style="text-align:left;margin-left: 30px;" @tap="forgetPassword">{{lang.loginFpassword}}？</view>
			<view class="ex-text ex-black9 ex-margin-top" style="text-align:right; margin-right: 30px;" @tap="register">{{lang.loginRegister}}</view>
		</view>
	</view>
</template>

<script>
import exNav from '@/exui/components/exNavBar.vue';
import navbar from '@/pages/index/navbar.vue';
import { logined } from '@/exui/axios';
import { mapState, mapMutations } from 'vuex';
import inter_phone from '@/exui/tool/inter_phone.js' //手机区号
var exuiValidator = require('@/exui/tool/exuiValidator.js');
export default {
		computed: {
			...mapState({				
				exQuotationDataList:state => state.websocket.exQuotationDataList,
				lang:state => state.lang.lang,
				lists:state => state.coin.headList
			})
	},
	components: {
		navbar,
		exNav
	},
	data() {
		return {
			pnpres: inter_phone,//inter_phone.forEach(function(currentValue, index, arr){console.log(arr[index].split("+")[0])})
			index:0,
			pnpre:'86',//区号,
			arrs:[],
			vcodeBtnName: this.$store.state.lang.lang.memberGetCode,
			countNum: 120,
			countDownTimer: null,
			phoneno: '',
			flag: true,
			ismobiledisabled: true,
			inputType: 'password',
			swiperCurrentIndex: 0,
			tabs: [this.$store.state.lang.lang.loginAlogin, this.$store.state.lang.lang.loginPlogin],
			Routes: '../index',
			password:"",
			login_state:1,//1=登录不可点击,2=信息补充完毕等待登录,3=登陆中
		};
	},

	onLoad: function(e) {
		const res = uni.getSystemInfoSync();
		this.phone_model = res.platform;
		this.isLogin();
		if(e!={}){
			console.log(e);
			this.phoneno=e.user_name
		}
		let _this=this
		inter_phone.forEach(function(currentValue, index, arr){
			// console.log(arr[index].split("+")[0])
			_this.arrs.push(arr[index].split("+")[0])//循环国家
			// console.log(_this.arrs);
		})
	},
	methods: {
		input_change(){
			let self = this
			setTimeout(function(){
				if(self.phoneno.length>0 && self.password.length>0){
					self.login_state = 2;
				}else{
					self.login_state = 1;
				}
			},10)
		},
		isLogin: function() {
			console.log('isLogin');
			//判断缓存中是否登录过，直接登录
			try {
				const Token = this.$store.getters.getToken;
				if (Token) {
					//有登录信息
					console.log('已登录用户：', Token);
					this.$store.dispatch('setToken', Token);
					this.updataUserInfo();
				}
			} catch (e) {
				console.log(e);
			}
		},
		updataUserInfo: function() {
			this.$userRequest.get('memberinfo').then(res => {
				if (res.data.code == 0) {
					uni.reLaunch({
						url: '../index'
					});
					this.$tools.user_payWay({
						type:1,
						data:res.data.data.pay_way
					})
					this.$store.dispatch('setUserData', res.data.data.userinfo);
					//console.log(this.$store.getters.getUserData.user_name)
					var istixin=uni.getStorageSync(this.$store.getters.getUserData.user_name);//不再提醒
					//console.log(this.$store.getters.getUserData.user_name)
					// console.log(istixin);
					if(istixin==undefined||istixin==null||istixin==''){
						uni.setStorageSync(this.$store.getters.getUserData.user_name, 10);//true
						// console.log('没有存'+uni.getStorageSync(this.$store.getters.getUserData.user_name));
					}
				}
			}).catch(err => {
				console.log(err);
			});
		},
		navChange: function(e) {
			this.swiperCurrentIndex = e;
		},
		swiperChange: function(e) {
			if (e.detail.current == undefined) return;
			var index = e.detail.current;
			this.swiperCurrentIndex = index;
		},
		changePre: function(e) {
			this.pnpre =this.pnpres[e.target.value].split("+")[1];
			this.index = e.target.value;
			console.log(this.pnpre);
		},
		flagEye: function() {
			this.flag = !this.flag;
			if (this.flag) {
				this.inputType = 'password';
			} else {
				this.inputType = 'text';
			}
		},
		userlogin: function(e) {
			this.login_state = 3
			var rule = [
				{ name: 'username', checkType: 'phoneno', errorMsg: '请填写正确的手机号' },
				{ name: 'password', checkType: 'string', checkRule: '6,', errorMsg: '密码至少有6位' }
			];
			var formData = e.detail.value;
			formData['password'] = this.password
			var checkRes = exuiValidator.check(formData, rule);
			if (checkRes) {
				console.log(this.pnpre);
				logined.post('login',{
					user_name:formData.username,
					user_pass:formData.password,
					area_code:this.pnpre
				},{
					header: {
						//#ifdef APP-PLUS
						deviceId:plus.device.uuid,
						//#endif
						//#ifdef H5 || MP-WEIXIN
						deviceId:"123456",
						//#endif
						device: this.phone_model
					}
				}).then(res => {
					this.input_change()
					if (res.data.code == 0) {
						uni.showToast({ title: this.$store.state.lang.lang.loginSuccessful, icon: 'none' });
						this.updataUserInfo();
						this.Optional();
					}
				}).catch(err => {
					this.input_change()
					console.log(err);
				});
			}else{
				this.input_change()
				uni.showToast({ title: exuiValidator.error, icon: 'none' });
			}
		},
		mobilelogin: function(e) {
			var rule = [
				{ name: 'mobile', checkType: 'phoneno', errorMsg: '请填写正确的手机号' },
				{ name: 'vcode', checkType: 'string', checkRule: '5,5', errorMsg: '请输入5位验证码' }
			];
			var formData = e.detail.value;
			console.log(formData);
			var checkRes = exuiValidator.check(formData, rule);
			if (checkRes) {
				console.log(formData.mobile);
				console.log(formData.vcode);
				console.log(this.pnpre);
				logined
					.post(
						'login',
						{ user_name: formData.mobile, verification_code: formData.vcode,type:2 ,area_code:this.pnpre},
						{
							header: {
								device: this.phone_model,
								//#ifdef APP-PLUS
								deviceId:plus.device.uuid,
								//#endif
								//#ifdef H5 || MP-WEIXIN
								deviceId:"123456",
								//#endif
							}
						}
					)
					.then(res => {
						console.log(res);
						if (res.data.code == 0) {
							uni.showToast({ title: this.$store.state.lang.lang.loginSuccessful, icon: 'none' });
							this.updataUserInfo();
							this.Optional();
						}
						this.input_change()
					})
					.catch(err => {
						this.input_change()
						console.log(err);
					});
			} else {
				this.input_change()
				uni.showToast({ title: exuiValidator.error, icon: 'none' });
			}
		},
		forgetPassword: function() {
			uni.navigateTo({
				url: 'lookup'
			});
		},
		register: function() {
			uni.navigateTo({
				url: 'register'
			});
		},
		getVCode: function() {
			// var myreg = /^[1][1,2,3,4,5,6,7,8,9][0-9]{9}$/;
			// if (!myreg.test(this.phoneno)) {
			// 	uni.showToast({ title: '请正确填写手机号码', icon: 'none' });
			// 	return false;
			// }
			// 手机号码为 :  this.phoneno
			// vcodeBtnName 可以阻止按钮被多次点击 多次发送 return 会终止函数继续运行
			if (this.vcodeBtnName != '获取验证码' && this.vcodeBtnName != '重新发送') {
				return;
			}
			console.log(this.pnpre);
			this.vcodeBtnName = '发送中...';
			// 与后端 api 交互，发送验证码 【自己写的具体业务代码】
			this.$http
				.post('VerificationCodeCreate', { user_name: this.phoneno, type: 2,area_code:this.pnpre})
				.then(res => {
					if (res.data.code == 0) {
						uni.showToast({
							title: '发送成功',
							icon: 'none'
						});
						console.log(res.data.data.verification_code);
						// this.vicode = res.data.data.verification_code;
						this.ismobiledisabled = false;
					} 
				})
				.catch(err => {
					console.log(err);
				});
			// 假设发送成功，给用户提示
			// 倒计时
			this.countNum = 120;
			this.countDownTimer = setInterval(
				function() {
					this.countDown();
				}.bind(this),
				1000
			);
		},
		countDown: function() {
			if (this.countNum < 1) {
				clearInterval(this.countDownTimer);
				this.vcodeBtnName = '重新发送';
				return;
			}
			this.countNum--;
			this.vcodeBtnName = this.countNum + '秒重发';
		},
		// 查看当前用户是否有自选
		Optional:function(){
			this.$userRequest
			.get('order/optionalList',{})
			.then(res => {
				if(res.data.code==0){
					if(res.data.data ==""){							
						let self = this;
						setTimeout(function(){
							self.$store.commit("update_label",self.lists[1].source)
						},50)
					}
				}
				
			})
			.catch(err => {
				console.log(err);
			});
			
			
		}
	}
};
</script>

<style>
page {
	background: #ffffff;
}
.loginBtn{width:70%;}
.login-sendmsg-btn {
	border: 1px solid #3688ff !important;
	background: none !important;
	color: #3688ff !important;
	width: 100%;
	height: 32px;
	line-height: 32px;
	font-size: 12px !important;
}
.ex-login-three {
	display: flex;
	justify-content: center;
	flex-wrap: nowrap;
}
.ex-login-three view {
	width: 50px;
	height: 50px;
	line-height: 50px;
	font-size: 38px;
	color: #3688ff;
	text-align: center;
	margin: 10rpx;
}
.marginTop186 {
	margin-top: 93px;
	margin-left: 44px;
}
.marginTop128 {
	margin-top: 128px;
}

.marginTop30 {
	margin-top: 30px;
}
.marginTop90 {
	margin-top: 60px;
}

.ex-line-title {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	align-items: center;
}
.ex-line-title > .line {
	width: 50rpx;
	flex: auto;
	height: 1px;
	background: #f9f9f9;
}
.ex-line-title > .title {
	padding: 0 80rpx;
	line-height: 80rpx;
}
.ex-noborder image {
	width: 45upx;
	height: 45upx;
	position: relative;
	left: 68%;
	z-index: 2;
}
</style>
