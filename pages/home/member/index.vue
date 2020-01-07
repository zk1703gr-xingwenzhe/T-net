<template>
	<view class="main">
		<view class="title_top">
			<view class="status_bar"><!-- 这里是状态栏 --></view>
			<view class="nav">
				<view class="icon iconfont icon-left" @tap="back"></view>
				<view class="">{{lang.memberPCenter}}</view>
				<view class="">
					
				</view>
			</view>
		</view>
		<view class="top_neirou">
			<view class="t_nr">
				<view class="t_left" @tap="updataAvatar">
					<img :src="avatar" mode="widthFix" alt="">
				</view>
				<view class="t_conter">
					<view>
						<span>{{ userinfo.user_nickname }}</span><span class="editname twebicon icon-xiugai" @tap="changeName"></span>
					</view>
					<view>{{lang.memberAnumber}}：{{ userinfo.user_name }}（{{ userinfo.is_effective==1?lang.memberEffective:lang.memberInvalid}}）</view>
				</view>
				<view class="t_right">
					<img :src="http_url+userinfo.lv_corner_marker" alt="">
				</view>
			</view>
		</view>
		<view class="conter">
			<view class="c_nr" data-url="identity" @tap="navigateTo">
				<view class="twebicon icon-renzheng ex-black9"></view>
				<view>{{lang.memberAuthentication}}</view>
			</view>
			<view class="xian"></view>
			<view class="c_nr" data-url="security_center" @tap="navigateTo">
				<view class="twebicon icon-anquanzhongxinoff ex-black9"></view>
				<view>{{lang.memberSafety}}</view>
			</view>
		</view>
		<view class="conter_list">
			<view class="c_lists" data-url="news" @tap="navigateTo">
				<view class="list_left">
					<view class="icons twebicon icon-zaixiankefu ex-black9"></view>
					<view>{{lang.memberMNews}}</view>
				</view>
				<view class="icon iconfont icon-right" ></view>
			</view>
			<view class="c_lists" data-url="notice" @tap="navigateTo">
				<view class="list_left">
					<view class="icons twebicon icon-calendar ex-black9"></view>
					<view>{{lang.memberBulletin}}</view>
				</view>
				<view class="icon iconfont icon-right" ></view>
			</view>
			<view class="c_lists" data-url="invite_friend" @tap="navigateTo">
				<view class="list_left">
					<view class="icons twebicon icon-yifang ex-black9"></view>
					<view>{{lang.memberIfriends}}</view>
				</view>
				<view class="icon iconfont icon-right" ></view>
			</view>
			<view class="c_lists" data-url="paymethod" @tap="navigateTo">
				<view class="list_left">
					<view class="icons twebicon icon-fukuanfangshi ex-black9"></view>
					<view>{{lang.memberPmethod}}</view>
				</view>
				<view class="icon iconfont icon-right" ></view>
			</view>
			<view class="c_lists" data-url="Language" @tap="navigateTo">
				<view class="list_left">
					<view class="icons twebicon icon-duoyuyanshezhi ex-black9"></view>
					<view>{{lang.langTitle}}</view>
				</view>
				<view class="icon iconfont icon-right" ></view>
			</view>
			<view class="c_lists">
				<view class="list_left">
					<view class="icons twebicon icon-jijiabizhong ex-black9"></view>
					<view>{{lang.memberMAccount}}</view>
				</view>
				<view class="icon iconfont icon-right" ></view>
			</view>
			<view class="c_lists" data-url="Myshequ" @tap="navigateTo">
				<view class="list_left">
					<!-- <view class="icons twebicon icon-shequluntan ex-black9"></view> -->
					<view class="icons twebicon icon-warehouse-delivery ex-black9"></view>
					<view>{{lang.memberMycommunity}}</view>
				</view>
				<view class="icon iconfont icon-right" ></view>
			</view>
			<view class="c_lists">
				<view class="list_left">
					<view class="icon iconfont icon-guanyuwomenx ex-black9"></view>
					<view>{{lang.memberVinformation}}</view>
				</view>
				<view class="list_right">{{version}}</view>
			</view>
		</view>
		<view class="footer" @tap="logout">
			{{lang.memberWithdrawal}}
		</view>
		<!-- //头像 -->
		<exDialog :isTitle="false" :show="showDialog" :isCloseBtn="false">
			<view slot="content">
				<view class="ex-grids  ex-margin-top">
					<view class="items" v-for="(item, index) in avatarSrc" :key="index">
						<view class="icon" :id="item.value" @tap="SelectChange">
							<image :src="item.src" mode="widthFix"></image>
							<text class="twebicon" :class="[item.checked ? 'icon-chenggong' : '']"></text>
						</view>
					</view>
				</view>
			</view>
			<view slot="btns">
				<view class="ex-dialog-btns">
					<view><button type="primary" @tap="closeDialog">{{lang.walletCancel}}</button></view>
					<view><button type="primary" style="color:#3688FF;" @tap="confirmAvatar">{{lang.walletConfirm}}</button></view>
				</view>
			</view>
		</exDialog>
		<!-- 修改昵称 -->
		<exDialog :isTitle="false" :show="showEditDialog" :isBtns="false" :isCloseBtn="false">
			<form @submit="changeNameFrom" class="ex-form" slot="content">
				<view class="ex-items ex-margin-top" style="display: flex;justify-content: center;"><input type="text" class="editnameinput" :class="erro" @focus="erro=''" name="nickname" :placeholder="lang.memberPnicknamedigits"/></view>
				<view class="ex-items" v-if="erro !=''" >
					<text class="tips" style="color: #C62B26;">
						{{errtips}}
					</text>
				</view>
				<view class="ex-items">
					<text class="tips" style="padding: 15upx;">
						{{lang.memberModify}}
						<text class="ex-red ex-margin">{{fee}}</text>
						【ST】
					</text>
				</view>
				<view class="ex-dialog-btns">
					<view><button type="primary" @tap="closeNameDialog">{{lang.walletCancel}}</button></view>
					<view><button formType="submit" type="primary" style="color:#3688FF;">{{lang.walletConfirm}}</button></view>
				</view>
			</form>
		</exDialog>
	</view>
</template>
<script>
	import exDialog from '@/exui/components/exDialog.vue';
	var exuiValidator = require('@/exui/tool/exuiValidator.js');
	import { mapState, mapMutations } from 'vuex';
	export default {
		computed: {
			...mapState({				
				lang:state => state.lang.lang
			})
		},
		components: {
			exDialog
		},
		data() {
			return {
				userinfo:'',//个人信息
				http_url:this.$store.getters.getHttp_url,//域名
				showDialog: false,
				avataValue: '',
				avatar: '0',
				showEditDialog: false,
				avatarSrc: [
					{ src: '../../../static/image/member/avatar/1.png', value: '1', checked: false },
					{ src: '../../../static/image/member/avatar/2.png', value: '2', checked: false },
					{ src: '../../../static/image/member/avatar/3.png', value: '3', checked: false },
					{ src: '../../../static/image/member/avatar/4.png', value: '4', checked: false },
					{ src: '../../../static/image/member/avatar/5.png', value: '5', checked: false },
					{ src: '../../../static/image/member/avatar/6.png', value: '6', checked: false },
					{ src: '../../../static/image/member/avatar/7.png', value: '7', checked: false },
					{ src: '../../../static/image/member/avatar/8.png', value: '8', checked: false },
					{ src: '../../../static/image/member/avatar/9.png', value: '9', checked: false },
					{ src: '../../../static/image/member/avatar/10.png', value: '10', checked: false },
					{ src: '../../../static/image/member/avatar/11.png', value: '11', checked: false },
					{ src: '../../../static/image/member/avatar/12.png', value: '12', checked: false }
				],
				nameValue: '',
				erro:'',
				errtips:'',
				fee:0,
				version:''
			};
		},
		onLoad() {
			this.userinfo = this.$store.getters.getUserData;
			//console.log(this.userinfo);
			this.avatar = '../../../static/image/member/avatar/' + this.userinfo.user_avatar + '.png';
			this.getversion()
		},
		methods: {
			back:function(){
				uni.navigateBack();
			},
			navigateTo: function(e) {//页面跳转
				var url = e.currentTarget.dataset.url;
				uni.navigateTo({
					url: url
				});
			},
			updataAvatar: function() {//打开头像
				this.showDialog = true;
			},
			closeDialog: function() {//关闭头像
				this.showDialog = false;
			},
			SelectChange: function(e) {//选中头像
				var checkVal = e.currentTarget.id;
				this.avataValue = checkVal;
				for (var i = 0; i < this.avatarSrc.length; i++) {
					if (checkVal == this.avatarSrc[i].value) {
						this.avatarSrc[i].checked = true;
					} else {
						this.avatarSrc[i].checked = false;
					}
				}
				this.avatarSrc = this.avatarSrc;
			},
			confirmAvatar: function() {//修改头像
				var _self = this;
				this.$userRequest
					.post('updateUserInfo', { user_avatar: this.avataValue })
					.then(res => {
						if (res.data.code == 0) {
							_self.$store.dispatch('setUserData', res.data.data.userinfo);
							_self.userinfo = _self.$store.getters.getUserData;
							_self.avatar = '../../../static/image/member/avatar/' + _self.userinfo.user_avatar + '.png';
							_self.showDialog = false;
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			changeName: function() {//打开弹出
				this.$userRequest
				.get('getEditNicknameNumber')
				.then(res => {
					if (res.data.code == 0) {
						this.fee = res.data.data.now_fee;
						this.showEditDialog = true;
					}
				})
				.catch(err => {
					console.log(err);
				});
			},
			closeNameDialog: function() {
				this.showEditDialog = false;
			},
			changeNameFrom: function(e) {//确认修改
				var _self = this;
				var rule = [{ name: 'nickname', checkType: 'nickname', checkRule: '2,5', errorMsg: '昵称至少有2位且不能大于5位,且不能有空格' }];
				var formData = e.detail.value;			
				var checkRes = exuiValidator.check(formData, rule);
				console.log(checkRes)			
				if (checkRes) {
					this.$userRequest
						.post('updateUserInfo', { user_nickname: formData.nickname })
						.then(res => {
							 if(res.data.code == 0) {
								_self.$store.dispatch('setUserData', res.data.data.userinfo);
								_self.userinfo = _self.$store.getters.getUserData;	
								_self.showEditDialog = false;
								uni.showToast({ title: this.$store.state.lang.lang.memberMsuccess, icon: 'none' });
							}else{
								_self.showEditDialog = false;
							}
							
						})
						.catch(err => {
							console.log(err);
						});
				} else {
					this.erro = 'error';
					this.errtips = exuiValidator.error;			// 	
					
				}
			},
			logout: function() {//退出登录
				let self = this
				uni.showActionSheet({
					itemList:[this.$store.state.lang.lang.walletCancel,this.$store.state.lang.lang.LoginConfirmtlout],
					success(e){
						if(parseInt(e.tapIndex)){
							self.$userRequest.get('logout').then(res => {
								if (res.data.code == 0) {
									self.$store.dispatch('setToken', '');
									self.$store.dispatch('setUserData', ''); //清空登录状态
									self.$store.dispatch('setHttp_url', ''); //清空登录状态
									try {
										uni.removeStorageSync('setToken');
										uni.removeStorageSync('userinfo'); //清空登录缓存
										uni.removeStorageSync('http_url'); //清空登录缓存
									} catch (e) {
										// error
									}
									uni.showToast({ title: self.lang.memberEsuccessfully, icon: 'none' });
									uni.reLaunch({
										url: '../index'
									});
								} 
							})
							
						}
					}
				})
			
				
			},
			getversion:function(){//获取版本号、
				this.version = this.$twebVersion
			}
		}
	};
</script>

<style>
	.editnameinput {
		height: 40upx;
		line-height: 40upx;
		text-align: center;
		padding: 10upx 0;
		color: #333333;
		font-size: 24upx;
		border: 1upx solid #333333;
		border-radius: 10upx;
	}
	.ex-grids .items .icon {
		position: relative;
	}
	.ex-grids .items .icon text {
		position: absolute;
		color: #19be6b;
		font-size: 20upx;
		left: 40%;
		top: 10upx;
	}
	page {
		width: 100%;
		background-color: #f3f4f5;
	}
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background-color: #ffffff;
	}
	.nav {
		width: 750upx;
		height: 88upx;
		display: flex;
		align-items: center;
		background-color: #ffffff;
		justify-content: space-between;
	}
	.nav view:nth-child(1),.nav view:nth-child(3) {
		width: 44upx;
		height: 44upx;
		line-height: 44upx;
		font-size: 50upx;
	}
	.nav view:nth-child(2) {
		height: 30upx;
		font-size: 32upx;
		font-weight: 800;
		color: #333333;
		line-height: 30upx;
		text-align: center;
	}
	.top_neirou{
		width: 100%;
		height: 173upx;
		background-color: #FFFFFF;
	}
	.t_nr{
		width: 710upx;
		height: 173upx;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.t_conter{
		width: 460upx;
	}
	.t_conter view:nth-child(1) span:nth-child(1){
		font-size:42upx;
		font-family:PingFang SC;
		font-weight:800;
		color: #333333;
		height:32px;line-height: 32upx;
	} 
	.t_conter view:nth-child(1) span:nth-child(2){
		font-size: 36upx;
		color: #f5c105;
		font-family:PingFang SC;
		font-weight:800;
		margin-left: 20upx;
	} 
	.t_conter view:nth-child(2){
		font-size:28upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#999999;
		height:22upx;
		line-height: 22upx;
		margin-top: 20upx;
	} 
	.t_left{
		width: 100upx;
		height: 100upx;
		background:rgba(255,255,255,1);
		box-shadow:0px 2px 8px 0px rgba(0, 0, 0, 0.1);
		border-radius:50%;
		position: relative; 
	}
	.t_left img{
		width: 92upx;
		height: 92upx;
		position: absolute;
		top:50%; 
		left:50%;
		transform: translate(-50%,-50%);
	}
	.t_right img{
		width: 92upx;
		height: 92upx;
	}
	/* 安全中心 */
	.conter{
		width: 100%;
		height: 173upx;
		background-color: #FFFFFF;
		margin-top: 10upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.conter .xian{
		width:2upx;
		height:76upx;
		background:#EFEFEF;
	}
	.conter .c_nr{
		width: 374upx;
		text-align: center;
	}
	.c_nr view:nth-child(1){
		font-size: 60upx;
	}
	.c_nr view:nth-child(2){
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#333333;
		margin-top: 5upx;
	}
	/* 中间的list */
	.conter_list{
		width: 100%;
		height: 720upx;
		background-color: #FFFFFF;
		margin-top: 10upx;
	}
	.c_lists{
		width: 710upx;
		height: 90upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 auto;
	}
	.c_lists .list_left{
		/* width: 200upx; */
		display: flex;
		/* justify-content: space-between; */
		align-items: center;
	}
	.list_left view:nth-child(1){
		font-size: 40upx;
	}
	.list_left view:nth-child(2){
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#333333;
		margin-left: 28upx;
	}
	.icon-right{
		color:#D9D9D9
	}
	.list_right{
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#999999;
	}
	.footer{
		width: 100%;
		height: 101upx;
		background-color: #FFFFFF;
		margin-top: 30upx;
		font-size:36upx;
		font-family:PingFang SC;
		font-weight:500;
		line-height: 101upx;
		text-align: center;
		color: #333333;
	}
</style>
