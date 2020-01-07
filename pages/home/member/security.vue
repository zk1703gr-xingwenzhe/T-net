<template>
	<view class="SafetyCenter">
		<navbar :isshowa="true">{{lang.memberPmodification}}</navbar>
		<view class="boxa">
			<view :class="{boxaclassa:actives==0,boxaclassb:actives==1}" @tap="changes(0)">
				{{lang.memberLpassword}}
			</view>
			<view :class="{boxaclassa:actives==1,boxaclassb:actives==0}" @tap="changes(1)">
				{{lang.memberTpassword}}
			</view>
		</view>
		<view class="boxb" v-if="actives==0">
			<view class="box_set">
				<view class="set_titie">
					{{lang.memberAnumber}}
				</view>
				<view class="set_titiea">
					:
				</view>
				<input class="inputs" type="text" v-model="username1" :placeholder="lang.memberEnumber" disabled="disabled"/>
			</view>
			<view class="box_set">
				<view class="set_titie">
					{{lang.memberCode}}
				</view>
				<view class="set_titiea">
					:
				</view>
				<input class="inputs" type="text" v-model="yzm1" :placeholder="lang.memberIcode" />
				<!-- 获取验证码 -->
				<view :class="{newclass:!canClick1,yanzheng:canClick1}" @tap="countDown1()">
					{{verify1}}
				</view>
			</view>
			<view class="box_set">
				<view class="set_titie">
					{{lang.memberPW}}
				</view>
				<view class="set_titiea">
					:
				</view>
				<input class="inputs" type="text" v-model="pwd1" :placeholder="lang.memberIpw" />
			</view>
			<view class="box_set">
				<view class="set_titie" >
					{{lang.memberCpassword}}
				</view>
				<view class="set_titiea">
					:
				</view>
				<input class="inputs" type="text" v-model="setpwd1"  :placeholder="lang.memberEpwagain"/>
			</view>
			<view class="btn_update" @tap="update1()">
				{{lang.memberCchange}}
			</view>
		</view>
		<view class="boxb" v-if="actives==1">
			<view class="box_set">
				<view class="set_titie">
					{{lang.memberAnumber}}
				</view>
				<view class="set_titiea">
					:
				</view>
				<input class="inputs" type="text" v-model="username2" :placeholder="lang.memberEnumber" disabled="disabled"/>
			</view>
			<view class="box_set">
				<view class="set_titie">
					{{lang.memberCode}}
				</view>
				<view class="set_titiea">
					:
				</view>
				<input class="inputs" type="text" v-model="yzm2" :placeholder="lang.memberIcode" />
				<view :class="{newclass:!canClick2,yanzheng:canClick2}" @tap="countDown2()">
					{{verify2}}
				</view>
			</view>
			<view class="box_set">
				<view class="set_titie">
					{{lang.memberPW}}
				</view>
				<view class="set_titiea">
					:
				</view>
				<input class="inputs" type="password" maxlength="6" v-model="pwd2" :placeholder="lang.memberIpw" />
			</view>
			<view class="box_set">
				<view class="set_titie">
					{{lang.memberCpassword}}
				</view>
				<view class="set_titiea">
					:
				</view>
				<input class="inputs" type="password" maxlength="6" v-model="setpwd2" :placeholder="lang.memberEpwagain" />
			</view>
			<view class="btn_update" @tap="update2()">
				{{lang.memberCchange}}
			</view>
		</view>
		
	</view>
</template>

<script>
	import navbar from '@/pages/index/navbar.vue';
	import { mapState, mapMutations } from 'vuex';
	export default {
		computed: {
			...mapState({				
				lang:state => state.lang.lang
			})
		},
		components: {
			navbar
		},
		data() {
			return {
				actives: 0,
				style1: false,
				style2: true,
				username1:'',
				username2:'',
				yzm1:'',
				yzm2:'',
				pwd1:'',
				pwd2:'',
				setpwd1:'',
				setpwd2:'',
				verify1: this.$store.state.lang.lang.memberGetCode,
				totalTime1: 60,
				canClick1: true,
				verify2: this.$store.state.lang.lang.memberGetCode,
				totalTime2: 60,
				canClick2: true,
				area_code:''
			}
		},
		onLoad() {
			this.username1=this.$store.getters.getUserData.user_name;
			this.username2=this.$store.getters.getUserData.user_name;
			this.area_code= this.$store.getters.getUserData.area_code;
		},
		methods: {
			changes: function(s) {
				this.actives = s;
			},
			// 获取验证码 登录
			countDown1: function() {
				var reg = /^[1][3|4|5|6|7|8|9][0-9]{9}$/; //正则表达式，验证手机号
				if (this.username1 == '') {
					uni.showToast({ title: this.$store.state.lang.lang.loginPhonenumber, icon: 'none' });
					return;
				} else if (!reg.test(this.username1)) {
					uni.showToast({ title: this.$store.state.lang.lang.memberNwrong, icon: 'none' });
					return;
				} else {
					// 获取验证码倒计时
					if (!this.canClick1) return
					this.canClick1 = false
					this.verify1 = this.totalTime1 + 's后重新发送'
					let clock = setInterval(() => {
						this.totalTime1--
						this.verify1 = this.totalTime1 + 's后重新发送'
						if (this.totalTime1 < 0) {
							clearInterval(clock)
							this.verify1 = '重新发送'
							this.totalTime1 = 60
							this.canClick1 = true //这里重新开启
						}
					}, 1000)
					// 发起请求获取验证码
					this.$http
						.post('VerificationCodeCreate', {
							user_name: this.username1,
							type: 4,
							area_code:this.area_code
						})
						.then(res => {
							if (res.data.code == 0) {
								uni.showToast({
									title: '发送成功',
									icon: 'none'
								});
							} 
							// this.yzm1 = res.data.data.verification_code;
						})
						.catch(err => {
							console.log(err);
						});
				}
			},
			// 获取验证码 交易
			countDown2: function() {
				var reg = /^[1][3|4|5|6|7|8|9][0-9]{9}$/; //正则表达式，验证手机号
				if (this.username2 == '') {
					uni.showToast({ title: this.$store.state.lang.lang.loginPhonenumber, icon: 'none' });					
					return;
				} else if (!reg.test(this.username2)) {
					uni.showToast({ title: this.$store.state.lang.lang.memberNwrong, icon: 'none' });
					
					return;
				} else {
					// 获取验证码倒计时
					if (!this.canClick2) return
					this.canClick2 = false
					this.verify2 = this.totalTime2 + 's后重新发送'
					let clock = setInterval(() => {
						this.totalTime2--
						this.verify2 = this.totalTime2 + 's后重新发送'
						if (this.totalTime2 < 0) {
							clearInterval(clock)
							this.verify2 = '重新发送'
							this.totalTime2 = 60
							this.canClick2 = true //这里重新开启
						}
					}, 1000)
					// 发起请求获取验证码
					this.$http
						.post('VerificationCodeCreate', {
							user_name: this.username2,
							type: 5,
							area_code:this.area_code
						})
						.then(res => {
							if (res.data.code == 0) {
								uni.showToast({
									title: '发送成功',
									icon: 'none'
								});
							} 
							// this.yzm2 = res.data.data.verification_code;
						})
						.catch(err => {
							console.log(err);
						});
				}
			},
			update1:function(){
				//修改登录密码
				var reg = /^[1][3|4|5|6|7|8|9][0-9]{9}$/; //正则表达式，验证手机号
				if (this.username1 == '') {
					uni.showToast({ title: this.$store.state.lang.lang.loginPhonenumber, icon: 'none' });
					
					return;
				} else if (!reg.test(this.username1)) {
					uni.showToast({ title: this.$store.state.lang.lang.memberNwrong, icon: 'none' });
					
					return;
				} else if (this.yzm1 == '') {
					uni.showToast({ title: this.$store.state.lang.lang.loginVerificationcode, icon: 'none' });
					
					return;
				} else if (this.pwd1 == '') {
					uni.showToast({ title: '请输入新密码', icon: 'none' });
					
					return;
				} else if (this.setpwd1 == '') {
					uni.showToast({ title: '请再次输入新密码', icon: 'none' });
					return;
				}else if(this.pwd1 !==this.setpwd1){
					uni.showToast({ title: this.$store.state.lang.lang.walletTpinconsistencies, icon: 'none' });
					return;
				}else if(this.pwd1.length<6){
					uni.showToast({ title: this.$store.state.lang.lang.memberPcannot6digits, icon: 'none' });
					return;
				}
				this.$userRequest
					.post(
						'updatePwdLogin',
						{
							user_name: this.username1,
							type: 2,
							verification_code: this.yzm1,
							pwd: this.pwd1,
							repwd: this.setpwd1,
							area_code:this.area_code
						},
						{
							header: { Authorization: uni.getStorageSync('token') }
						}
					)
					.then(res => {
						if(res.data.code==0){
							uni.showToast({ title: "修改成功,请重新登录", icon: 'none' });	
							this.$userRequest.get('logout').then(res => {
								if (res.data.code == 0) {
									this.$store.dispatch('setToken', '');
									this.$store.dispatch('setUserData', ''); //清空登录状态
									this.$store.dispatch('setHttp_url', ''); //清空登录状态
									try {
										uni.removeStorageSync('setToken');
										uni.removeStorageSync('userinfo'); //清空登录缓存
										uni.removeStorageSync('http_url'); //清空登录缓存
									} catch (e) {
										// error
									}
									uni.reLaunch({
										url: './../login/login'
									});
								} 
							})
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			update2:function(){
				//修改交易密码
				var reg = /^[1][3|4|5|6|7|8|9][0-9]{9}$/; //正则表达式，验证手机号
				if (this.username2 == '') {
					uni.showToast({ title: this.$store.state.lang.lang.loginPhonenumber, icon: 'none' });	
					
					return;
				} else if (!reg.test(this.username2)) {
					uni.showToast({ title: this.$store.state.lang.lang.memberNwrong, icon: 'none' });	
					
					return;
				} else if (this.yzm2 == '') {
					uni.showToast({ title: this.$store.state.lang.lang.loginVerificationcode, icon: 'none' });	
					
					return;
				} else if (this.pwd2 == '') {
					uni.showToast({ title: this.$store.state.lang.lang.memberPtransactionpassword, icon: 'none' });	
					
					return;
				} else if (this.setpwd2 == '') {
					uni.showToast({ title: this.$store.state.lang.lang.memberPpasswordagain, icon: 'none' });	
					
					return;
				}else if(this.pwd2 !==this.setpwd2){
					uni.showToast({ title: this.$store.state.lang.lang.walletTpinconsistencies, icon: 'none' });
					return;
				}else if(this.pwd2.length<6){
					uni.showToast({ title: this.$store.state.lang.lang.memberPcannot6digits, icon: 'none' });
					return;
				}
				this.$userRequest
					.post(
						'updateTransactionPwd',
						{
							user_name: this.username2,
							verification_code: this.yzm2,
							pwd: this.pwd2,
							repwd: this.setpwd2,
							area_code:this.area_code
						},
						{
							header: { Authorization: uni.getStorageSync('token') }
						}
					)
					.then(res => {
						if(res.data.code==0){
							uni.showToast({ title: this.$store.state.lang.lang.memberMsuccess ,icon: 'none'});	
							setTimeout(function(){
								uni.reLaunch({
									url: './index'
								});
							},200)
						}
					})
					.catch(err => {
						console.log(err);
					});
			}

		}
	}
</script>

<style>
	/* 安全中心 */
	page {
		background: #F3F4F5;
	}

	/* 密码登录模块 */
	.boxa {
		height: 82upx;
		padding-left: 20upx;
		background-color: white;
		display: flex;
	}

	.boxaclassa {
		height: 82upx;
		line-height: 82upx;
		text-align: center;
		color: #333333;
		font-weight: 600;
		font-size: 42upx;
	}

	.boxaclassb {
		height: 82upx;
		line-height: 82upx;
		text-align: center;
		color: #999999;
		width: 25%;
		font-size: 34upx;
	}

	/* 信息修改页面 */
	.boxb {
		margin-top: 10upx;
		background-color: white;
	}

	.box_set {
		width: 710upx;
		height: 83upx;
		margin: 0 auto;
		display: flex;
		align-items: center;
	}

	.set_titie {
		width: 115upx;
		height: 83upx;
		line-height: 83upx;
		font-weight: 600;
		text-align-last: justify;
	}

	.set_titiea {
		width: 20upx;
		height: 83upx;
		line-height: 83upx;
		text-align: center;
		font-weight: 600;
	}

	.inputs {
		width: 395upx;
		/* height: 80upx; */
		/* padding:0upx; */
		background: #FFFFFF;
		font-size: 28upx;
		color: #333333;
	}

	.yanzheng {
		height: 35upx;
		width: 178upx;
		line-height: 35upx;
		font-size: 32upx;
		color: #EDBF52;
		border-left: #EDBF52 solid 2upx;
		text-align: center;
	}

	.newclass {
		height: 35upx;
		width: 178upx;
		line-height: 35upx;
		font-size: 24upx;
		color: #c4c4c4;
		border-left: #c4c4c4 solid 2upx;
		text-align: center;
	}

	/* 点击修改 */
	.btn_update {
		height: 101upx;
		margin-top: 30upx;
		color: black;
		font-size: 36upx;
		text-align: center;
		line-height: 100upx;
		background-color: white;
	}
</style>
