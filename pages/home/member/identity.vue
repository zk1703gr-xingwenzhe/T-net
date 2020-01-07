<template>
	<view class="main">
		<view class="title_top">
			<view class="status_bar"><!-- 这里是状态栏 --></view>
			<view class="nav">
				<view class="icon iconfont icon-left" @tap="back"></view>
				<view class="">{{lang.memberAuthentication}}</view>
				<view class=""></view>
			</view>
		</view>
		<view class="top_tab">
			<view class="identity" @tap="switch_top(0)" :class="{ xz_active: istop == 0 }">{{lang.memberGauthentication}}</view>
			<view class="senior" @tap="switch_top(1)" :class="{ xz_active: istop == 1 || istop == 2|| istop == 3|| istop == 4|| istop == 5 }">{{lang.memberAcertification}}</view>
		</view>
		<view class="identity_nr" v-if="istop == 0">
			<view class="i_nr">
				<view class="i_gj">
					<view class="">{{lang.memberNationality}}</view>
					:
					<input type="text" value="" :placeholder="lang.memberPenternationality" v-model="nationality" :disabled="type != 0" />
				</view>
				<view class="i_gj" style="margin-top: 40upx;">
					<view class="">{{lang.memberFname}}</view>
					:
					<input type="text" value="" :placeholder="lang.memberEname" v-model="truename" :disabled="type != 0" />
				</view>
				<view class="i_gj" style="margin-top: 40upx;">
					<view class="">{{lang.memberInumber}}</view>
					:
					<input type="text" value="" :placeholder="lang.memberEIDnumber" v-model="id_card_no" :disabled="type != 0" />
				</view>
			</view>
			<view class="i_rz" @tap="identityAuthenticationBase" v-if="type == 0">{{lang.memberAttestation}}</view>
		</view>
		<view class="advanced" v-if="istop == 1||upload==1">
			<view class="advanced_post">
				<view class="advanced_top" @tap="getfullfacephoto">
					<view class="advanced_foter">
						<image :src="fullfacephoto" mode="" class="phone"></image>
						<view class="">{{lang.memberPIDcard}}</view>
					</view>
				</view>
				<view class="advanced_top">
					<view class="advanced_foter" @tap="getreversephoto">
						<image :src="reversephoto" mode="" class="phone"></image>
						<view class="">{{lang.memberPcard}}</view>
					</view>
				</view>
			</view>
			<view class="advanced_xyb" @tap="switch_top(2)">{{lang.loginNstep}}</view>
		</view>
		
		<view class="hand" v-if="istop == 2">
			<view class="hand_conter">
				<view class="" @tap="gethand">
					<image :src="hand" mode="" class="phone"></image>
					<view class="">{{lang.memberPwcard}}</view>
				</view>
			</view>
			<view class="hand_botton">
				<view class="" @tap="switch_top(1)">{{lang.memberPrev}}</view>
				<view class="" @tap="attestation">{{lang.memberAttestation}}</view>
			</view>
		</view>
		<!-- 审核中 -->
		<view class="hand" v-if="istop == 3">
			<view class="hand_conter">
				<view class="">
					<image src="../../../static/image/transaction/personal/picshenhe@2x.png" mode="" class="photo"></image>
					<view class="">{{lang.walletReview}}</view>
				</view>
			</view>
		</view>
		<!--  已驳回-->
		<view class="hand" v-if="istop == 4">
			<view class="hand_conter">
				<view class="">
					<image src="../../../static/image/transaction/personal/picbohui@2x.png" mode="" class="photo"></image>
					<view class="">{{rejectcause}}</view>
					<span style="color:#007AFF;border-bottom: 1px solid #007AFF;" @tap="uploadagain">{{lang.memberCupload}}</span>
				</view>
			</view>
		</view>
		<!-- 已通过 -->
		<view class="hand" v-if="istop == 5">
			<view class="hand_conter">
				<view class="">
					<image src="../../../static/image/transaction/personal/picrenzheng@2x.png" mode="" class="photo"></image>
					<view class="">{{lang.memberSuccessful}}</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import { mapState, mapMutations } from 'vuex';
	import msgTips from '@/exui/tool/msgTipsBar.js';
export default {
	computed: {
		...mapState({				
			lang:state => state.lang.lang
		})
	},
	data() {
		return {
			upload:0,//重新上传的状态处理
			istop: 0,//0普通认证 1高级认证 2下一步的页面 3高级认证审核4高级认证失败 5高级认证成功
			isqxappeal: false,
			nationality: '', //国籍,
			truename: '', //姓名
			id_card_no: '', //身份信息
			type: 0, //身份状态0未认证  1认证 2高级认证
			fullfacephoto: '../../../static/image/transaction/personal/weishenfenzheng@2x.png',
			reversephoto: '../../../static/image/transaction/personal/weishenfenzhengfan@2x.png',
			hand: '../../../static/image/transaction/personal/weishouchi@2x.png',
			rejectcause:""
			
		};
	},
	onLoad() {
		this.type= this.$store.getters.getUserData.authentication_level;
		// console.log(this.type);
		if(this.type!=0){
			this.getidentity()
		}
	},
	methods: {
		uploadagain:function(){
			this.upload=1;
			this.istop=1;
		},
		back: function() {
			//返回
			uni.navigateBack();
		},
		switch_top: function(e) {
			//切换
			this.istop = e;
			console.log(this.istop);
			this.upload=0
			if(this.istop==1){
				this.getHighIdentityAuthentication()
			}
			if(this.istop==0){
				this.$userRequest.get('memberinfo').then(res => {
					if (res.data.code == 0) {
						this.$store.dispatch('setUserData', res.data.data.userinfo);
						this.type= this.$store.getters.getUserData.authentication_level;
					}
				}).catch(err => {
					console.error(err);
				});
			}
		},
		getHighIdentityAuthentication:function(){
			uni.showLoading({title: this.$store.state.lang.lang.propertyLoading});
			this.$userRequest
				.get('getHighIdentityAuthentication','')
				.then(res => {
					uni.hideLoading();
					// console.log(res);
					if(res.data.code==0){
						if(res.data.data!=null){	//高级认证状态
							if(res.data.data.state==1){
								this.istop=3
								// console.log(this.istop);
							}
							if(res.data.data.state==2){
								this.istop=4
								this.rejectcause=res.data.data.memo;
								// console.log(this.istop);
							}
							if(res.data.data.state==3){
								this.istop=5
							}
						}
					}
				})
				.catch(err => {
					uni.hideLoading();
					console.log(err);
				});
		},
		getidentity:function(){//获取身份信息
			uni.showLoading({title: this.$store.state.lang.lang.propertyLoading});
			this.$userRequest
				.get('getIdentityAuthentication','')
				.then(res => {
					uni.hideLoading();
					if(res.data.code==0){
						this.nationality=res.data.data.user_data.nationality;
						this.truename=res.data.data.user_data.truename;
						this.id_card_no=res.data.data.user_data.id_card_no;
						
					}
				})
				.catch(err => {
					uni.hideLoading();
					console.log(err);
				});
		},
		identityAuthenticationBase: function() {//普通认证
			if(this.nationality==""){
				uni.showToast({ title: '请输入你的国籍..', icon: 'none' });
				return
			}
			if(this.truename==""){
				uni.showToast({ title: '请输入你的姓名..', icon: 'none' });
				return
			}
			if(this.id_card_no==""){
				uni.showToast({ title: '请输入你的身份账号..', icon: 'none' });
				return
			}
			this.$userRequest
				.post(
					'identityAuthenticationBase',
					{ nationality: this.nationality, truename: this.truename, id_card_no: this.id_card_no }
				)
				.then(res => {
					if (res.data.code == 0) {
						uni.showToast({ title: this.$store.state.lang.lang.memberCesuccess, icon: 'none' });
						this.type = res.data.data.Authentication.type;
						this.nationality = res.data.data.Authentication.nationality;
						this.truename = res.data.data.Authentication.truename;
						this.id_card_no = res.data.data.Authentication.id_card_no;
						this.$store.dispatch("setUserData",res.data.data.userinfo.userinfo);	
					} 
				})
				.catch(err => {
					console.log(err);
				});
		},
		getfullfacephoto: function() {//获取正面照
			uni.chooseImage({
				count:1,
				success: chooseImageRes => {
					var token=this.$store.getters.getToken;
					const tempFilePaths = chooseImageRes.tempFilePaths;
					this.fullfacephoto = tempFilePaths[0];
					uni.uploadFile({
						url: 'https://api.sstex.co/api/identityAuthenticationHighStep',
						filePath: tempFilePaths[0],
						header: { Authorization: token },
						name: 'front_photo_of_id_card',
						formData: {
							type: 1
						},
						success: uploadFileRes => {
							console.log(uploadFileRes);
							var  code=eval('('+uploadFileRes.data+')').code;
							console.log(code);
							if(code==0){
								uni.showToast({ title: this.$store.state.lang.lang.memberUsuccess, icon: 'none' });
							}else{
								console.log(code.toString());
								msgTips(code.toString())
							}	
						}
					});
				}
			});
		},
		getreversephoto: function() {//获取反面照
			uni.chooseImage({
				count:1,
				success: chooseImageRes => {
					var token=this.$store.getters.getToken;
					const tempFilePaths = chooseImageRes.tempFilePaths;
					this.reversephoto = tempFilePaths[0];
					uni.uploadFile({
						url: 'https://api.sstex.co/api/identityAuthenticationHighStep',
						filePath: tempFilePaths[0],
						header: { Authorization: token},
						name: 'reverse_photo_of_id_card',
						formData: {
							type: 2
						},
						success: uploadFileRes => {
							console.log(uploadFileRes);
							var  code=eval('('+uploadFileRes.data+')').code;
							console.log(code);
							if(code==0){
								uni.showToast({ title: this.$store.state.lang.lang.memberUsuccess, icon: 'none' });
							}else{
								console.log(code.toString());
								msgTips(code.toString())
							}	
						}
					});
				}
			});
		},
		gethand: function() {//获取手持
			uni.chooseImage({
				count:1,
				success: chooseImageRes => {
					var token=this.$store.getters.getToken;
					const tempFilePaths = chooseImageRes.tempFilePaths;
					this.hand = tempFilePaths[0];
					uni.uploadFile({
						url: 'https://api.sstex.co/api/identityAuthenticationHighStep',
						filePath: tempFilePaths[0],
						header: { Authorization: token },
						name: 'holding_id_card_photos',
						formData: {
							type:3
						},
						success: uploadFileRes => {
							console.log(uploadFileRes);
							var  code=eval('('+uploadFileRes.data+')').code;
							console.log(code);
							if(code==0){
								uni.showToast({ title: this.$store.state.lang.lang.memberUsuccess, icon: 'none' });
							}else{
								console.log(code.toString());
								msgTips(code.toString())
							}	
						}
					});
				}
			});
		},
		attestation: function() {
			this.$userRequest
				.post('identityAuthenticationHigh','' )
				.then(res => {
					if (res.data.code == 0) {
						uni.showToast({ title: this.$store.state.lang.lang.memberIasubmitto, icon: 'none' });
						this.istop=3;
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
		width: 100%;
		background: #f3f4f5;
	}
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
	.nav view:nth-child(1){
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
	.nav view:nth-child(3){
		width: 44upx;
		height: 44upx;
		line-height: 44upx;
		font-size: 50upx;
	}	
.top_tab {
	width: 100%;
	height: 82upx;
	display: flex;
	background-color: #ffffff;
}
.top_tab view:nth-child(1) {
	height: 82upx;
	font-size: 34upx;
	font-weight: 500;
	color: #999999;
	line-height: 82upx;
	margin-left: 20upx;
}
.top_tab view:nth-child(2) {
	height: 82upx;
	font-size: 34upx;
	font-weight: 500;
	color: #999999;
	line-height: 82upx;
	margin-left: 30upx;
}
.xz_active {
	color: #333333 !important;
	font-size: 42upx !important;
	font-weight: bold !important;
}
/* 身份认证 */
.identity_nr {
	width: 750upx;
	height: 368upx;
	margin-top: 20upx;
}
.i_nr {
	width: 100%;
	height: 237upx;
	background-color: #ffffff;
	padding-top: 20upx;
}
.i_gj {
	width: 710upx;
	display: flex;
	margin-left: 20upx;
}
.i_gj view:nth-child(1) {
	width: 140upx;
	height: 27upx;
	font-size: 28upx;
	font-weight: bold;
	color: #333333;
	text-align-last: justify;
}
.i_gj input:nth-child(2) {
	height: 27upx;
	padding-left: 20upx;
}
.i_rz,
.advanced_xyb {
	width: 100%;
	height: 101upx;
	background-color: #ffffff;
	margin-top: 30upx;
	font-size: 36upx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #333333;
	text-align: center;
	line-height: 101upx;
}
/* 高级认证 */
.advanced {
	width: 750upx;
	height: 1040upx;
	margin-top: 20upx;
}
.advanced_post {
	width: 100%;
	height: 908upx;
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
}
.advanced_post .advanced_top {
	flex: 1;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.advanced_foter {
	/* width: 422upx;
		height: 320upx; */
}
.advanced_foter .phone {
	width: 422upx;
	height: 290upx;
}
.advanced_foter view {
	width: 422upx;
	font-size: 24upx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #999999;
	text-align: center;
}
/* 手持照 */
.hand {
	width: 750upx;
	height: 760upx;
	margin-top: 20upx;
}
.hand_conter {
	width: 100%;
	height: 630upx;
	background-color: #ffffff;
	display: flex;
	justify-content: center;
	align-items: center;
}
.hand_conter .photo{
	width: 258upx;
	height: 299upx;
}
.hand_conter .phone {
	width: 422upx;
	height: 290upx;
}
.hand_conter view {
	width: 422upx;
	font-size: 24upx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #999999;
	text-align: center;
}
.hand_botton {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 30upx;
}
.hand_botton view {
	width: 366upx;
	height: 101upx;
	background-color: #ffffff;
	font-size: 36upx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #333333;
	text-align: center;
	line-height: 101upx;
}
</style>
