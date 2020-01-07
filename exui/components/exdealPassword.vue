<template>
	<view>
		<view :class="{'ex-deal-password':true,'disbled':!visble}" >
			<view @tap="closeBtn" class="mbbox"></view>
			<view class="keyPop">
				<view class="title">{{lang.memberPassword}}</view>
				<form @submit="doneBtn()">
					<p>{{lang.transactionPverification}}</p>
					<input @focus="onfocus" type="password" maxlength="6" :placeholder="lang.propertyIpassword" v-model="password">
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
	</view>
</template>
<script>
	import { mapState, mapMutations } from 'vuex';
export default {
	name: "exPasswordPop",
	props: {
		
	},
	data() {
		return {
			password:"",
			errorTip:"",
			visble:false
		}
	},
	computed: {
		...mapState({				
			lang:state => state.lang.lang,
		})
	},
	methods:{
		closeBtn(){
			//this.$store.commit('dealPassword/set_visble',false);
			this.visble = false;
		},
		doneBtn(){
			if(this.password.length!=6){
				this.errorTip = "请输入正确的交易密码"
			}else{
				this.visble = false;
				this.$store.commit('dealPassword/save_password',this.password)
				this.$emit("key_done")
				this.password=""
			}
			
		},
		onfocus(){
			this.errorTip=""
		},
		set_visble(){
			this.visble = true;
		}
	},
	mounted(){
		
	}
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
</style>