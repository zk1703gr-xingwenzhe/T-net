<template>
	<view class="main">
		<view class="title_top">
			<view class="status_bar"><!-- 这里是状态栏 --></view>
			<view class="nav">
				<view class="icon iconfont icon-left" @tap="back"></view>
				<view class="">{{lang.memberNFC}}</view>
			</view>
		</view>
		<!-- <view class="conter"  v-if="false">
			<img src="@/static/image/member/pic.png">
		</view> -->
		<!-- <view class="conter_yd"  v-if="is_nfc==false">
			<view class="zhezhao">
			</view>
			<img src="@/static/image/member/pic.png">
		</view> -->
		<view class="conter">
			<!-- <view class="content_switch">
				<view class="content_switch_zt">
					NFC一键登录
				</view>
				<view>
					<switch  @change="switch1Change" style="transform:scale(0.8)" :checked="yilogin"/>
				</view>
			</view>
			<view class="content_switch">
				<view class="content_switch_zt">
					NFC登录密码
				</view>
				<view>
					<switch  @change="switch2Change" style="transform:scale(0.8)" :checked="login_pwd"/>
				</view>
			</view> -->
			<view class="content_switch">
				<view class="content_switch_zt">
					{{lang.memberNFCTpassword}}
				</view>
				<view>
					<switch  @change="switch3Change" style="transform:scale(0.8)" :checked="transaction_pwd"/>
				</view>
			</view>
			<!-- <view class="content_switch">
				<view class="content_switch_zt">
					NFC钱包密码
				</view>
				<view>
					<switch @change="switch4Change" style="transform:scale(0.8)" :checked="wallet_pwd"/>
				</view>
			</view> -->
			<!-- <view class="unbound">
				解除绑定
			</view> -->
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
				is_nfc:"",//是否第一次打开NFc
				xiedata:'',//要写入的数据
				dudata:'默认值',//读出来的数据
				waiting:'',
				readyWriteData:false,
				readyRead:false,
				NfcAdapter:'',
				transaction_pwd:true,
				login_pwd:'',
				wallet_pwd:'',
				nfc_cold_wallet:''
			}
		},
		onLoad(option) {
			this.is_nfc=JSON.parse(option.is_nfc);
			console.log(this.is_nfc);
			this.getzhuangtai();
			this.listenNFCStatus();
			if(this.is_nfc==false){
				this.getNFCxi();//获取要存储的信息
			}
		},
		onShow() {
				setTimeout(this.handle_nfc_data1, 1000);
				if (nfcAdapter) {
				    nfcAdapter.disableForegroundDispatch(main);  
				}  
				if (nfcAdapter) {
				    nfcAdapter.enableForegroundDispatch(main, pendingIntent, intentFiltersArray, techListsArray);  
				}  
		},
		methods: {
			back:function(){
				uni.navigateBack();
			},
			switch1Change: function (e) {
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
				this.login_pwd=e.target.value;
			},
			switch2Change: function (e) {
				console.log('switch2 发生 change 事件，携带值为', e.target.value)
				this.nfc_cold_wallet=e.target.value
			},
			switch3Change: function (e) {
				console.log('switch3 发生 change 事件，携带值为', e.target.value)
				this.transaction_pwd=e.target.value
				if(this.is_nfc==false&&this.transaction_pwd==true){
					this.getNFCxi();//获取要存储的信息
					this.transaction_pwd=false
					return
				}
				if(this.transaction_pwd==true){
					let data={
						second_type:"nfc_transaction"
					}
					this.getNFCxi()
					this.transaction_pwd=false
				}else{
					this.$userRequest
						.post('editNfcState',{second_type:'nfc_transaction',is_open:0})
						.then(res => {
							if(res.data.code==0){
								uni.showToast({ title: '关闭成功', icon: 'none' });
							}
						})
						.catch(err => {
							console.log(err);
						});
				}
			},
			switch4Change: function (e) {
				this.wallet_pwd=e.target.value
				console.log('switch4 发生 change 事件，携带值为', e.target.value)
			},
			getzhuangtai(){
				this.$userRequest
					.get('getNfcListMsg','')
					.then(res => {
						if(res.data.code==0){
							res.data.data.forEach(item => {
								if (item.second_type=="nfc_login") {//一键登录
								 this.yilogin=item.is_open
								}
								if (item.second_type=="nfc_transaction") {//交易密码
								 this.transaction_pwd=item.is_open
								 console.log(this.transaction_pwd);
								}
								if (item.second_type=="nfc_wallet") {//钱包密码
								 this.wallet_pwd=item.is_open
								}
								if (item.second_type=="nfc_cold_wallet") {//冷密码
								 this.nfc_cold_wallet=item.is_open
								}
							})
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			getNFCxi:function(){
				this.$userRequest
					.get('getNfcMsg','')
					.then(res => {
						if(res.data.code==0){
							this.xiedata=JSON.stringify(res.data.data)
							this.readyWriteData = true; 
							this.waiting = plus.nativeUI.showWaiting("请将NFC标签靠近！"); 
							setTimeout(function(){
								plus.nativeUI.closeWaiting();
							}, 5000);
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			//写数据按钮
			xie:function(){
				var textEle = this.xiedata;
				if(!textEle){  
				    uni.showModal({
				    	content: '请输入要写入的内容',
				    	showCancel: false
				    });  
				    return;  
				}  
				this.readyWriteData = true;  
				this.waiting = plus.nativeUI.showWaiting("请将NFC标签靠近！"); 
			},
			//读数据按钮
			du:function(){
				this.readyRead = true;
				this.waiting = plus.nativeUI.showWaiting("请将NFC标签靠近！");  
			},
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
				    console.error(e);  
				}  
			},
			handle_nfc_data1:function(){
				NdefRecord = plus.android.importClass("android.nfc.NdefRecord");
				NdefMessage = plus.android.importClass("android.nfc.NdefMessage");  
				var main = plus.android.runtimeMainActivity();  
				var intent = main.getIntent();  
				if("android.nfc.action.TECH_DISCOVERED" == intent.getAction()){  
				    if(this.readyWriteData){  
				        this.__write(intent);  
				        this.readyWriteData = false; 
						 console.log("执行了-----------------------------------handle_nfc_data1-------》__write");
				    }else if(this.readyRead){  
				        this.__read(intent);  
						console.log("执行了-----------------------------------handle_nfc_data1-------》__read");
				        this.readyRead = false;  
				    }else{
						console.log("初始化....");
					} 
				}  
			},
			__read:function(intent){
				this.waiting.setTitle('请勿移开标签\n正在读取数据...');
				var Parcelable = plus.android.importClass("android.os.Parcelable");  
				var rawmsgs = intent.getParcelableArrayExtra("android.nfc.extra.NDEF_MESSAGES");  
				var records = rawmsgs[0].getRecords();  
				var result = records[0].getPayload();  
				var s = plus.android.newObject("java.lang.String",result);  
				this.dudata = s;  
				this.waiting.close();  
			},
			__write:function(intent){
				try{
				    this.waiting.setTitle('请勿移开标签\n正在写入...');  
				    var text = this.xiedata;  
				    console.log("text=" + text);  
				    var textBytes = plus.android.invoke(text,"getBytes");  
				    // image/jpeg text/plain  
				    var textRecord = new NdefRecord(NdefRecord.TNF_MIME_MEDIA,  
				            plus.android.invoke("text/plain","getBytes"), plus.android.invoke("","getBytes"), textBytes);  
				    var message = new NdefMessage([textRecord]);  
				    var Ndef = plus.android.importClass('android.nfc.tech.Ndef');  
				    var NdefFormatable = plus.android.importClass('android.nfc.tech.NdefFormatable');  
				    var tag = intent.getParcelableExtra(NfcAdapter.EXTRA_TAG);  
				    var ndef = Ndef.get(tag);  
				    if (ndef != null) {  
				        var size = message.toByteArray().length;  
				        ndef.connect();  
				        if (!ndef.isWritable()) {  
				            this.showToast("tag不允许写入");  
				            this.waiting.close();  
				            return ;  
				        }  
				        if (ndef.getMaxSize() < size) {  
				            this.showToast("文件大小超出容量");  
				            this.waiting.close();  
				            return ;  
				        }  
				
				        ndef.writeNdefMessage(message);  
				        this.waiting.close();  
				        // uni.showModal({
				        // 	content: '写入数据成功',
				        // 	showCancel: false
				        // });
						uni.showToast({ title: '触碰成功', icon: 'none' });
						if(this.transaction_pwd==false&&this.is_nfc==true){
							this.$userRequest
								.post('editNfcState',{second_type:'nfc_transaction',is_open:!this.transaction_pwd})
								.then(res => {
									if(res.data.code==0){
										uni.showToast({ title: '打开成功', icon: 'none' });
										this.transaction_pwd=true
									}
								})
								.catch(err => {
									console.log(err);
								});	
						}
						if(this.is_nfc==false){
							console.log(this.transaction_pwd);
							this.$userRequest
								.post('UpdateNfcState',{is_success_nfc_login:1,is_success_nfc_transaction:1,is_success_nfc_wallet:1})
								.then(res => {
									console.log(res);
									if(res.data.code==0){
										this.transaction_pwd=true
										console.log(this.transaction_pwd);
									}
								})
								.catch(err => {
									console.log(err);
								});
						}
						
				        return ;  
				    } else {  
				        var format = NdefFormatable.get(tag);  
				        if (format != null) {  
				            try {  
				                format.connect();  
				                format.format(message);  
				                this.showToast("格式化tag并且写入message");  
				                this.waiting.close();  
				                return ;  
				            } catch (e) {  
				                this.showToast("格式化tag失败.");  
				                this.waiting.close();  
				                return ;  
				            }  
				        } else {  
				            this.showToast("Tag不支持NDEF");  
				            this.waiting.close();  
				            return ;  
				        }  
				    }  
				}catch(e){  
				    console.log("error=" + e);  
				    this.waiting.close();   
				} 
			}
		}
	}
</script>

<style>
	page{
		width: 100%;
		background-color: #F3F4F5;
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
	.conter img{
		width: 337upx;
		height: 239upx;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		margin: auto;
	}
	.conter_yd{
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 10;
	}
	.conter_yd view:nth-child(1){
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 11;
		background-color: rgba(0,0,0,.2);
	}
	.conter_yd img{
		width: 337upx;
		height: 239upx;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		z-index: 12;
	}
	.content_switch{
		width:710upx;
		height:106upx;
		background:#FFFFFF;
		margin-bottom: 5upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding:0 20upx;
	}
	.content_switch .content_switch_zt{
		font-size:28upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:#333333;
	}
	.unbound{
		height:27upx;
		font-size:28upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:#E73F3F;
		line-height: 27upx;
		margin-top: 14upx;
		margin-left: 20upx;
	}
</style>
