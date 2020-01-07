<template>
	<view class="main">
		<view class="title_top">
			<view class="status_bar"><!-- 这里是状态栏 --></view>
			<view class="nav">
				<view class="icon iconfont icon-left" @tap="back"></view>
				<view class="">{{lang.memberRgesturePassword}}</view>
				<view class="">
					
				</view>
			</view>
		</view>
		<view class="gesture_father">
			<view class="gesture">
			    <mpvue-gesture-lock :containerWidth="590" :cycleRadius="70" @end="onEnd" :password="password"></mpvue-gesture-lock>
			</view>
			<view class="uni-text">{{text}}</view>
		</view>
		<view class="tishi" v-if="pwdpup">
			<view class="zhezhao" @tap="colsepwdpup"></view>
			<view class="nerirou">
				<input type="text" value="" :placeholder="lang.memberPloginpassword" v-model="logon_pwd"/>
				<view class="anniu">
					<view class="queren" @tap="colsepwdpup">
						{{lang.walletCancel}}
					</view>
					<view class="queren" @tap="confirmation">
						{{lang.walletConfirm}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
    import mpvueGestureLock from '@/components/mpvueGestureLock';
	import { mapState, mapMutations } from 'vuex';
    export default {
		computed: {
			...mapState({				
				lang:state => state.lang.lang
			})
		},
        components: {
            mpvueGestureLock
        },
        data() {
            return {
				pwdpup:false,
                password: [],
                text: this.$store.state.lang.lang.memberPgestures,
				gesture_password:'',//手势密码
				logon_pwd:''//登录密码
            }
        },
        methods: {
			back:function(){
				uni.navigateBack();
			},
			openpwdpup:function(){//打开密码
				this.pwdpup=true;
			},
			colsepwdpup:function(){//关闭密码
				this.pwdpup=false;
			},
            onEnd(data) {
                if (this.password.length) {
                    if (this.password.join('') === data.join('')) {
						this.gesture_password=JSON.stringify(data)
                        this.text = '手势设定完成'
                        this.password = []
						this.openpwdpup();
                    } else {
                        this.text = '两次手势设定不一致'
                        this.password = []
                    }
                } else {
                    this.text = '请确认手势设定'
                    this.password = data
                }
            },
			confirmation:function(){
				uni.showLoading({title: this.$store.state.lang.lang.propertyLoading});
				this.$userRequest.post('resetGesturePassword',{gesture_password:this.gesture_password,login_password:this.logon_pwd})
				.then(res => {
					uni.hideLoading();
					console.log(res);
					if(res.data.code==0){
						this.back()
					}
				})
				.catch(err => {
					uni.hideLoading();
					console.log(err);
				});
			}
        }
    }
</script>

<style>
	page{
		width: 100%;
		background:#FFFFFF;
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
		background-color: #FFFFFF;
	}
	.nav view:nth-child(1),.nav view:nth-child(3){
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
    .uni-text{
        font-size: 30upx;
        text-align: center;
        margin-top: 30upx;
    }
	.gesture_father{
		margin-top: 150upx;
	}
	/* 密码提示 */
	.tishi{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
	}
	.zhezhao{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0,0,0,0.2);
		z-index: 100;
	}
	.nerirou{
		position: fixed;
		top:0;
		left: 0;
		bottom: 0;
		right: 0;
		margin: auto;
		width:517upx;
		height:300upx;
		background:#FFFFFF;
		border-radius:10upx;
		z-index: 101;
	}
	.nerirou input{
		padding-left: 20upx;
		width:477upx;
		height:91upx;
		border:2upx solid #999999;
		border-radius:5upx;
		margin-top: 50upx;
		margin-left: 20upx;
		box-sizing: border-box;
	}
	.anniu {
		width: 477upx;
		height: 79upx;
		margin-left: 20upx;
		margin-top: 40upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.anniu view:nth-child(1){
		width: 215upx;
		height: 79upx;
		text-align: center;
		line-height: 79upx;
		border-radius: 5upx;
		border:2upx solid #666666;
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:#333333;
		line-height:79upx;
	}
	.anniu view:nth-child(2){
		width: 215upx;
		height: 79upx;
		text-align: center;
		line-height: 79upx;
		border-radius: 5upx;
		background-color: #4daa90;
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:#FFFFFF;
		line-height:79upx;
	}
</style>
