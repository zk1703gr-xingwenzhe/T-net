<template>
	<view class="Alipay">
		<navbar :isshowa="true">{{lang.transactionAlipay}}</navbar>
		<view class="Alipay_box">
			<view class="kongbg">
			</view>
			<!-- 姓名 -->
			<view class="Ali_name">
				<view class="Ali_name1">
					{{lang.memberFname}}
				</view>
				<input class="Ali_name2" type="text"  v-model="Ali_name2" disabled="disabled"/>
			</view>
			<!-- 账号 -->
			<view class="AccountNumber">
				<view class="AccountNumber1">
					{{lang.memberAnumber}}	
				</view>
				<input class="AccountNumber2" type="text" :placeholder="lang.memberPanumber"  v-model="AccountNumber2"/>
			</view>
			<view class="AccountNumber">
				<view class="AccountNumber1">
					{{lang.transactionCinformation}}
				</view>
				<input class="AccountNumber2" type="number" :placeholder="lang.loginPhonenumber" maxlength="11" v-model="phoneNumber"/>
			</view>
			<!-- 二维码 -->
			<view class="erwei">
				{{lang.memberAddcode}}
			</view>
			<view class="add_erwei"  @tap="postqrcode">
				<image class="add_erweimg" :src="qrcode"></image>
			</view>
			<view class="Preservation" @tap="add">
				{{lang.memberPreservation}}
			</view>
		</view>
	</view>
</template>

<script>
	import navbar from '@/pages/index/navbar.vue';
	import msgTips from '@/exui/tool/msgTipsBar.js'
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
				AccountNumber2:"",
				qrcode:"",
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
				this.$userRequest.get('getIdentityAuthentication','').then(res => {
					uni.hideLoading();
					if(res.data.code==0){
						this.Ali_name2=res.data.data.user_data.truename
					}
				}).catch(err => {
					uni.hideLoading();
					console.log(err);
				});
			},
			postqrcode:function(){//选择图片
				uni.chooseImage({
					count:1,
					success: chooseImageRes => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						this.qrcode = tempFilePaths[0];
					}
				});
			},
			add:function(){//添加
				if(this.qrcode==""){//不传二维码
					this.$userRequest.post('addUserPayment',{
						pay_id:2,
						name:this.Ali_name2,
						account:this.AccountNumber2,
						tel:this.phoneNumber
					} ).then(res => {
						if (res.data.code == 0) {
							
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
							
							uni.showToast({ title: this.$store.state.lang.lang.memberAsuccess, icon: 'none' });
							setTimeout(function() {
								uni.navigateBack({});	
							}, 2000);
						} 
					}).catch(err => {
						console.log(err);
					});
					return
				}else{
				var token=this.$store.getters.getToken;
				uni.uploadFile({
					url: 'https://api.sstex.co/api/addUserPayment',//传二维码
					filePath: this.qrcode,
					header: { Authorization: token},
					name: 'qrcode',
					formData: {
						pay_id:2,
						name:this.Ali_name2,
						account:this.AccountNumber2,
						tel:this.phoneNumber
					},
					success: uploadFileRes => {
						var  code=eval('('+uploadFileRes.data+')').code;
						if(code==0){
							uni.showToast({ title: this.$store.state.lang.lang.memberAsuccess, icon: 'none' });
							setTimeout(function() {
								uni.navigateBack({});	
							}, 2000);
						}else{
							if(code!=0 && code !='undefined'){
									return msgTips(code.toString()); 
							}
						}	
					}
				});
				}
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
	/* 添加二维码 */
	.erwei{
		height: 127upx;
		width: 710upx;
		margin: 0 auto;
		font-size:28upx;
		color:rgba(51,51,51,1);
		text-align: left;
		line-height:145upx;
	}
	 .add_erwei{
		 margin-left: 20upx;
		 width: 150upx;
		 height: 150upx;
		 background-image: url('~@/static/image/transaction/personal/photo@2x.png') ;
		 background-repeat:no-repeat;
		 background-position:center;
		 background-size: 100% 100%;
	 }
	 .add_erweimg{
		 width: 150upx;
		 height: 150upx;
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
