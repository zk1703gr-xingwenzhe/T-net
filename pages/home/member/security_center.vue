<template>
	<view class="main">
		<view class="title_top">
			<view class="status_bar"><!-- 这里是状态栏 --></view>
			<view class="nav">
				<view class="icon iconfont icon-left" @tap="back"></view>
				<view class="">{{lang.memberSafety}}</view>
			</view>
		</view>
		<view class="content" @tap="opensecurity">
			<view class="content_zt">
				{{lang.memberPmodification}}
			</view>
			<view class="icon iconfont icon-right" ></view>
		</view>
		<view class="content_switch">
			<view class="content_switch_zt">
				{{lang.memberGcode}}
			</view>
			<view>
				<switch  @change="switch1Change" :checked="gesture"/>
			</view>
		</view>
		<view class="content" @tap="openreset_gestures" v-if="gesture">
			<view class="content_zt">
				{{lang.memberRgesturePassword}}
			</view>
			<view class="icon iconfont icon-right" ></view>
		</view>
		<view class="content" v-else>
			<view class="content_zt" style="color: #999999;">
				{{lang.memberRgesturePassword}}
			</view>
			<view class="icon iconfont icon-right" style="color: #999999;"></view>
		</view>
		<view class="content_switch" v-if="support">
			<view class="content_switch_zt">
				{{lang.memberFcode}}
			</view>
			<view>
				<switch  @change="switch2Change" :checked="fingerprint_lock"/>
			</view>
		</view>
		<view class="content_switch" v-else>
			<view class="content_switch_zt">
				{{lang.memberFcode}}
			</view>
			<view>
				<switch  @tap="nosupport" :checked="fingerprint_lock" disabled/>
			</view>
		</view>
		<view class="content" @tap="openNFC">
			<view class="content_zt">
				{{lang.memberNFC}}
			</view>
			<view class="icon iconfont icon-right" ></view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	var NfcAdapter;
	var NdefRecord;  
	var NdefMessage;
	export default {
		computed: {
			...mapState({				
				lang:state => state.lang.lang
			})
		},
		data() {
			return {
				support:true,
				gesture:false,//手势
				is_gesture_pwd:false,//是否有手势密码
				fingerprint_lock:false,//指纹
				is_nfc:false,//nfc
				iszhichi:true,//是否支持nfc
			}
		},
		onLoad() {
			this.listenNFCStatus();
		},
		onShow() {
			this.getsecurity()
		},
		methods: {
			listenNFCStatus:function(){
				try{
				    var main = plus.android.runtimeMainActivity();  
				    var Intent = plus.android.importClass('android.content.Intent');  
				    var Activity = plus.android.importClass('android.app.Activity');  
				    var PendingIntent = plus.android.importClass('android.app.PendingIntent');  
				    var IntentFilter = plus.android.importClass('android.content.IntentFilter');  
				    NfcAdapter = plus.android.importClass('android.nfc.NfcAdapter');  
				    var nfcAdapter = NfcAdapter.getDefaultAdapter(main);  
				    var intent = new Intent(main, main.getClass());  
				    intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);  
				    var pendingIntent = PendingIntent.getActivity(main, 0, intent, 0);  
				    var ndef = new IntentFilter("android.nfc.action.TECH_DISCOVERED");  
				    ndef.addDataType("*/*");  
				    var intentFiltersArray = [ndef];  
				    var techListsArray = [  
				        ["android.nfc.tech.IsoDep"],  
				        ["android.nfc.tech.NfcA"],  
				        ["android.nfc.tech.NfcB"],  
				        ["android.nfc.tech.NfcF"],  
				        ["android.nfc.tech.Nfcf"],  
				        ["android.nfc.tech.NfcV"],  
				        ["android.nfc.tech.NdefFormatable"],  
				        ["android.nfc.tech.MifareClassi"],  
				        ["android.nfc.tech.MifareUltralight"]  
				    ];  
				    nfcAdapter.enableForegroundDispatch(main, pendingIntent, intentFiltersArray, techListsArray);  
				}catch(e){  
				    // console.error(e);  
					this.iszhichi=false
				}  
			},
			back:function(){
				uni.navigateBack();
			},
			fingerprint_judge:function(){//页面加载 指纹判断 按钮不让点击
				if (!plus.fingerprint.isSupport()) {
					this.support = false;
					this.fingerprint_lock=false
				}
				else if (!plus.fingerprint.isKeyguardSecure()) {
					this.support = false;
					this.fingerprint_lock=false
				}
				else if (!plus.fingerprint.isEnrolledFingerprints()) {
					this.support = false;
					this.fingerprint_lock=false
				}
			},
			nosupport:function(){//点击的时候提示
				if (!plus.fingerprint.isSupport()) {
					uni.showToast({ title: this.$store.state.lang.lang.memberTfingerprintpay, icon: 'none' });
				}else if (!plus.fingerprint.isKeyguardSecure()) {
					uni.showToast({ title: this.$store.state.lang.lang.memberTdeviceFingerPrint, icon: 'none' });
				}else if (!plus.fingerprint.isEnrolledFingerprints()) {
					uni.showToast({ title: this.$store.state.lang.lang.memberTsettings, icon: 'none' });
				}
			},
			switch1Change: function (e) {//手势
				this.gesture=e.target.value
				if(!this.is_gesture_pwd&&this.gesture){
					uni.showToast({ title: this.$store.state.lang.lang.memberYsignpassword, icon: 'none' });
					if(this.fingerprint_lock){
						let _this=this
						setTimeout(function(){
							_this.closefingerprint();
						},500)
					}
					setTimeout(function() {
						uni.navigateTo({
							url: './set_gestures',
						});
					}, 1000);
					return;
				}
				if(e.target.value){
					if(this.gesture&&this.fingerprint_lock){//关闭指纹
						uni.showToast({ title: this.$store.state.lang.lang.memberSfingermarkpassword, icon: 'none' });
						let _this=this
						setTimeout(function(){
							_this.closefingerprint();
						},500)
						setTimeout(function(){
							_this.opengesture()
						},1000)
					}else{
						this.opengesture()
					}
				}else{
					this.closegesture();
				}
			},
			switch2Change: function (e) {//指纹
				this.fingerprint_lock=e.target.value
				if(this.fingerprint_lock){
					if(this.gesture&&this.fingerprint_lock){//关闭手势
						uni.showToast({ title: this.$store.state.lang.lang.memberSfingermarkpassword, icon: 'none' });
						let _this=this
						setTimeout(function(){
							_this.closegesture();
						},500)
						setTimeout(function(){
							_this.openfingerprint()
						},1000)
					}else{
						this.openfingerprint()
					}
				}else{
					this.closefingerprint()
				}
			},
			opensecurity:function(){//打开修改密码
				uni.navigateTo({
					url: './security',
				});
			},
			openNFC:function(){
				console.log(this.is_nfc);
				console.log(this.iszhichi);
				if(this.iszhichi==false){
					uni.showToast({ title: this.$store.state.lang.lang.memberTpNFC, icon: 'none' });
				}else{
					uni.navigateTo({
						url: './NFC?is_nfc='+this.is_nfc,
					});
				}
			},
			getsecurity:function(){//页面渲染
				uni.showLoading({title: this.$store.state.lang.lang.propertyLoading});
				this.$userRequest
					.get('getSecurityCenterInitializationPage','')
					.then(res => {
						uni.hideLoading();
						console.log(res);
						if(res.data.code==0){
							this.is_nfc=res.data.data.is_nfc;
							res.data.data.data.forEach(item => {
								if (item.type=="gesture") {//手势密码
								  this.is_gesture_pwd=item.is_gesture_pwd
								  this.gesture=item.is_open
								}
								if (item.type=="fingerprint") {
									this.fingerprint_lock=item.is_open
									this.fingerprint_judge()//指纹判断
								}
							})
						}
					})
					.catch(err => {
						uni.hideLoading();
						console.log(err);
					});
			},
			openreset_gestures:function(){//手势密码页面
				uni.navigateTo({
					url: './reset_gestures',
				});
			},
			closefingerprint:function(){//关闭指纹
				this.$userRequest.post('editGestureFingerprintState',{type:'fingerprint',is_open:0})
				.then(res => {
					if(res.data.code==0){
						uni.showToast({ title: this.$store.state.lang.lang.memberCfingerprint, icon: 'none' });
						this.fingerprint_lock=false
					}
				})
				.catch(err => {
					console.log(err);
				});
			},
			openfingerprint:function(){//打开指纹
				this.$userRequest.post('editGestureFingerprintState',{type:'fingerprint',is_open:1})
				.then(res => {
					if(res.data.code==0){
						uni.showToast({ title: this.$store.state.lang.lang.memberSsuccessfully, icon: 'none' });
						this.fingerprint_lock=true
					}
				})
				.catch(err => {
					console.log(err);
				});
			},
			closegesture:function(){//关闭手势
				this.$userRequest.post('editGestureFingerprintState',{type:'gesture',is_open:0})
				.then(res => {
					if(res.data.code==0){
						uni.showToast({ title: this.$store.state.lang.lang.memberClgesture, icon: 'none' });
						this.gesture=false
					}
				})
				.catch(err => {
					console.log(err);
				});
			},
			opengesture:function(){//打开手势
				this.$userRequest.post('editGestureFingerprintState',{type:'gesture',is_open:1})
				.then(res => {
					if(res.data.code==0){
						uni.showToast({ title: this.$store.state.lang.lang.memberSgesture, icon: 'none' });
						this.gesture=true
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
	page{
		width: 100%;
		background:#F3F4F5;
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
		margin-left: 298upx;
	}
	.content,.content_switch{
		width:710upx;
		height:106upx;
		background:#FFFFFF;
		margin-bottom: 5upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding:0 20upx;
	}
	.content .content_zt,.content_switch .content_switch_zt{
		font-size:28upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:#333333;
	}
	.icon-right{
		font-size:35upx;
		color: #000000;
	}
</style>
