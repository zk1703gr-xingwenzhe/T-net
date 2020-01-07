<template>
	<view class="Alipay">
		<navbar :isshowa="true">{{lang.memberBcard}}</navbar>
		<view class="Alipay_box">
			<view class="kongbg">
			</view>
			<!-- 姓名 -->
			<view class="Ali_name">
				<view class="Ali_name1">
					{{lang.memberFname}}
				</view>
				<input class="Ali_name2" type="text" :placeholder="lang.memberEname" disabled="disabled" v-model="Ali_name2"/>
			</view>
			<!-- 账号 -->
			<view class="AccountNumber">
				<view class="AccountNumber1">
					{{lang.memberAnumber}}
				</view>
				<input class="AccountNumber2" type="number" :placeholder="lang.memberPbnumber" v-model="cardnumber"/>
			</view>
			
			<view class="AccountNumber">
				<view class="AccountNumber1">
					{{lang.transactionCinformation}}
				</view>
				<input class="AccountNumber2" type="text" :placeholder="lang.loginPhonenumber" maxlength="11" v-model="phoneNumber"/>
			</view>
			
			<!-- 开户账号 -->
			<view class="AccountNumber">
				<view class="AccountNumber1">
					{{lang.memberBank}}
				</view>
				<input class="AccountNumber2" type="text" :placeholder="lang.memberPenumber" v-model="bank"/>
			</view>
			<view class="Preservation" @tap="addUserPayment">
				{{lang.memberPreservation}}
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
				Ali_name2:"",
				cardnumber:"",
				bank:"",
				phoneNumber:""
			}
		},
		onLoad() {
			this.getidentity()
		},
		methods: {
			Establish(){//返回
				uni.navigateBack({});
			},
			getidentity:function(){//获取身份信息
				uni.showLoading({title: this.$store.state.lang.lang.propertyLoading});
				this.$userRequest
					.get('getIdentityAuthentication','')
					.then(res => {
						uni.hideLoading();
						if(res.data.code==0){
							this.Ali_name2=res.data.data.user_data.truename
						}
					})
					.catch(err => {
						uni.hideLoading();
						console.log(err);
					});
			},
			addUserPayment:function(){
				this.$userRequest.post('addUserPayment',{
					pay_id:3,
					name:this.Ali_name2,
					account:this.cardnumber,
					opening_bank:this.bank,
					tel:this.phoneNumber
				})
					.then(res => {
						if (res.data.code == 0) {
							uni.showToast({ title: this.$store.state.lang.lang.memberAsuccess, icon: 'none' });
							setTimeout(function() {
								uni.navigateBack({});	
							}, 2000);
							
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
						console.error(err);
					});
			}
		}
	}
</script>

<style>
	page{
		background: #FFFFFF;
	}
	
	.Alipay_box{
		width: 100%;
		background: #FFFFFF;
	}
	.Alipay_box .Ali_name{
		height: 187upx;
		width: 710upx;
		margin: 0 auto;
		border-bottom: #F0F0F0 solid 2upx;
	}
	.Alipay_box .Ali_name .Ali_name1{
		height: 67upx;
		width: 100%;
		font-size:28upx;
		color:rgba(51,51,51,1);
		line-height:100upx;
		text-align: left;
	}
	.Alipay_box .Ali_name .Ali_name2{
		height: 120upx;
		width: 100%;
		font-size:32upx;
		font-weight:600;
		color:rgba(51,51,51,1);
		line-height:120px;
	}
	/* 账号 */
	.AccountNumber{
		height: 207upx;
		width: 710upx;
		margin: 0 auto;
		border-bottom: #F0F0F0 solid 2upx;
	}
	.AccountNumber .AccountNumber1{
		height: 87upx;
		width: 100%;
		font-size:28upx;
		color:rgba(51,51,51,1);
		line-height:120upx;
		text-align: left;
	}
	.AccountNumber .AccountNumber2{
		height: 120upx;
		width: 100%;
		font-size:32upx;
		font-weight:600;
		color:rgba(51,51,51,1);
		line-height:120upx;
	}
	 .kongbg{
		 background: #F3F4F5;
		 height: 10upx;
		 width: 100%;
	 }
	 /* 保存 */
	 .Preservation{
		 width:662upx;
		 height:84upx;
		 margin: 200upx 44upx 0 44upx;
		 background:rgba(51,51,51,1);
		 border-radius:5upx;
		 font-size:36upx;
		 font-weight:bold;
		 color:rgba(255,255,255,1);
		 line-height:84upx;
		 text-align: center;
	 }
</style>
