<template>
	<view class="ex-body">
		<navbar :isshowa="true" :isshowb="true"></navbar>
		<view class="marginTop186 "><image src="../../../static/image/login/register.png" mode="widthFix" style="width:252upx;height:55upx;"></image></view>
		<view class="ex-tab marginTop128">
			<form @submit="register" class="ex-form">
				<view :class="['ex-animate', first ? 'bounceInRight ' : 'bounceOutLeft hidden']">
					<view class="ex-items">
						<view class="ex-label">
							<picker @change="changePre" :range="arrs" name="pn_pre" style="text-align:center;">
								<text>+{{ pnpres[index].split("+")[1] }}</text>
							</picker>
						</view>
						<input type="number" name="mobile" class="input" v-model="phoneno" style="text-align:left;" :placeholder="lang.loginPhonenumber" />
					</view>
					<view class="ex-items ex-noborder">
						<view class="ex-label ex-center">{{lang.memberVcode}}</view>
						<input
							type="number"
							class="input"
							name="vcode"
							v-model="vicode"
							@input="ismobiledisabled = false"
							@blur="check"
							style="text-align:left;"
							:placeholder="lang.loginVerificationcode"
						/>
						<view style="width:180rpx; margin-left:30rpx; flex-shrink:0;">
							<button type="primary" class="login-sendmsg-btn" @tap="getVCode">{{ vcodeBtnName }}</button>
						</view>
					</view>
				</view>
				<view :class="['ex-animate', second ? 'bounceInRight ' : 'bounceOutLeft hidden']">
					<view class="ex-items">
						<view class="ex-label">{{lang.loginSpassword}}</view>
						<input :type="inputType" name="password" class="input" style="text-align:left;" :placeholder="lang.loginRthepassword" />
					</view>
					<view class="ex-items ex-noborder">
						<view class="ex-label">{{lang.memberCpassword}}</view>
						<input :type="inputType" name="confirmpassword" class="input" style="text-align:left;" :placeholder="lang.loginCpassword" />
						<view style="width:180rpx; margin-left:30rpx; flex-shrink:0;">
							<image :src="flag ? '../../../static/image/login/eye1.png' : '../../../static/image/login/eye2.png'" @click="flagEye"></image>
						</view>
					</view>
					<view class="ex-items ex-noborder">
						<view class="ex-label" style="width: 100px;">
							{{lang.loginRecommender}}
							<checkbox @tap="showInput" style="margin-left: 10px;"/>
						</view>
						<input type="text" name="referralcode" class="input" style="text-align:left;" :placeholder="lang.loginIreferencecode" v-if="isShowInput" />
					</view>
				</view>

				<button
					:form-type="formtype"
					type="default"
					:class="['ex-button marginTop30', ismobiledisabled ? '' : 'ex-gtbg-light-yellow']"
					:disabled="ismobiledisabled"
					style="width: 289px;height: 51px;"
					@tap="step"
				>
					{{ btnName }}
					<text class="icon iconfont icon-right"></text>
				</button>
			</form>
		</view>
		<view></view>
	</view>
</template>

<script>
var exuiValidator = require('@/exui/tool/exuiValidator.js');
import navbar from '@/pages/index/navbar.vue';
import { logined } from '@/exui/axios';
import { mapState, mapMutations } from 'vuex';
import inter_phone from '@/exui/tool/inter_phone.js' //手机区号
export default {
	components: {
		navbar
	},
	data() {
		return {
			tabCurrentIndex: 0,
			swiperCurrentIndex: 0,
			pnpres: inter_phone,
			index:0,
			pnpre:'86',//区号,
			arrs:[],
			vcodeBtnName: this.$store.state.lang.lang.memberGetCode,
			countNum: 120,
			countDownTimer: null,
			phoneno: '',
			flag: true,
			isShowInput: false,
			isuserdisabled: true,
			ismobiledisabled: true,
			inputType: 'password',
			first: true,
			second: false,
			three: false,
			stepPage: 0,
			btnName: this.$store.state.lang.lang.loginNstep,
			formtype: '',
			vicode: ''
		};
	},
	computed: {
		...mapState({				
			lang:state => state.lang.lang
		})
	},
	onLoad() {
		let _this=this
		inter_phone.forEach(function(currentValue, index, arr){
			// console.log(arr[index].split("+")[0])
			_this.arrs.push(arr[index].split("+")[0])//循环国家
			// console.log(_this.arrs);
		})
	},
	methods: {
		step: function(e) {
			this.stepPage++;
			if (this.stepPage == 1) {
				this.first = false;
				this.second = true;
				this.three = false;
				this.btnName = '确定';
				this.formtype = 'submit';
			}
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
		check: function(e) {
			if (e.detail.value == '') this.ismobiledisabled = true;
		},
		getVCode: function() {
			// var myreg = /^[1][1,2,3,4,5,7,8,9][0-9]{9}$/;
			// if (!myreg.test(this.phoneno)) {
			// 	uni.showToast({ title: '请正确填写手机号码', icon: 'none' });
			// 	return false;
			// }
			// 手机号码为 :  this.phoneno
			// vcodeBtnName 可以阻止按钮被多次点击 多次发送 return 会终止函数继续运行
			if (this.vcodeBtnName != '获取验证码' && this.vcodeBtnName != '重新发送') {
				return;
			}
			this.vcodeBtnName = '发送中...';
			// 与后端 api 交互，发送验证码 【自己写的具体业务代码】
			this.$http
				.post('VerificationCodeCreate', { user_name: this.phoneno, type: 1,area_code:this.pnpre })
				.then(res => {
					console.log(res);
					if (res.data.code == 0) {
						uni.showToast({
							title: '发送成功',
							icon: 'none'
						});
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
		showInput: function() {
			this.isShowInput = !this.isShowInput;
		},
		register: function(e) {
			var formData = e.detail.value;
			var rule = [
				// { name: 'mobile', checkType: 'phoneno', errorMsg: '请填写正确的手机号' },
				{ name: 'vcode', checkType: 'string', checkRule: '5,5', errorMsg: '验证码至少有5' },
				{ name: 'password', checkType: 'string', checkRule: '6,18', errorMsg: '密码至少有6位' },
				{ name: 'confirmpassword', checkType: 'nequivalent', checkRule: formData.password, errorMsg: '两次输入的密码不一致' }
			];
			var data;
			if (this.isShowInput) {
				data = {
					user_name: formData.mobile,
					verification_code: formData.vcode,
					user_pass: formData.password,
					repwd: formData.confirmpassword,
					type: 2,
					user_invitation_key: formData.referralcode,
					area_code:this.pnpre
				};
			} else {
				data = {
					user_name: formData.mobile,
					verification_code: formData.vcode,
					user_pass: formData.password,
					repwd: formData.confirmpassword,
					type: 2,
					area_code:this.pnpre
				};
			}
			var checkRes = exuiValidator.check(formData, rule);
			if (checkRes) {
				this.$http
					.post('register', data)
					.then(res => {
						if (res.data.code == 0) {
							uni.showToast({
								title: '注册成功',
								icon: 'none'
							});
							setTimeout(function(){
								uni.navigateTo({
									url: 'login?user_name='+formData.mobile
								});
							},500)
						}
					})
					.catch(err => {
						console.log(err);
					});
			} else {
				uni.showToast({ title: exuiValidator.error, icon: 'none' });
			}
		}
	}
};
</script>

<style>
page {
	background: #ffffff;
}
.hidden {
	display: none;
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
	margin-top: 90px;
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
.login-sendmsg-btn {
	border: 1px solid #3688ff !important;
	background: none !important;
	color: #3688ff !important;
	width: 100%;
	height: 32px;
	line-height: 32px;
	font-size: 12px !important;
}
</style>
