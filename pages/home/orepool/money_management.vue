<template>
	<view class="main">
		<view class="title_top">
			<view class="status_bar"><!-- 这里是状态栏 --></view>
			<view class="nav">
				<view class="icon iconfont icon-left" @tap="back"></view>
				<view class="">{{lang.financial}}</view>
			</view>
			<view class="exchange_input">
				<input type="number" value="" :placeholder="lang.propertyPenchange" v-model="nums" @input="count" adjust-position="false"/>
			</view>
			<view class="exchange_zt">
				{{lang.financialTip}}
				<!-- {{parseFloat(data.discount)}},{{data.investment_min}},{{data.investment_release_permillage}} -->
			</view>
			<view class="usdt">
				<view></view>
				<view>USDT{{lang.financialBalance}}{{toFixedSix(enable_balance)}}</view>
			</view>
			<view class="st">
				<view></view>
				<view>{{lang.contractEconvertibilityST}}{{toFixedSix(convertibleSt)}}</view>
			</view>
			<view class="submit" @tap="openpwd">
				{{lang.financialCexchange}}
			</view>
		</view>
		<deal-password ref='childrenpwd' @fingerprint_end="fingerprint_end" @gesture_end="testfun" @nfc_fun='nfc_fun' @key_done="child_cnydeal_OrderPopOperation()"></deal-password>
	</view>
</template>

<script>
	import dealPassword from '@/exui/components/exdealPasswordAll.vue';
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
		components: {
			dealPassword
		},
		data() {
			return {
				pwdpup:false,
				wallet_pwd:'',//密码
				nums:"",//数量
				enable_balance:'',//可用余额
				convertibleSt:'',//可兑换
				data:'',
				dudata:'默认值',//读出来的数据NFC
				waiting:'',
				readyWriteData:false,
				readyRead:false,
				NfcAdapter:'',
			}
		},
		onLoad() {
			this.getUserManageMoneyExchangeBase()
			this.listenNFCStatus();
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
			toFixedSix(_num){
				let result = parseFloat(_num).toFixed(7);
				return result.substring(0,result.length-1)
			},
			openpwd:function(){//打开密码
				if(this.nums==''){
					uni.showToast({ title: this.$store.state.lang.lang.propertyIatransfer, icon: 'none' });
					return
				}
				this.$refs.childrenpwd.set_visble()
			},
			fingerprint_end:function(_data){
				this.$userRequest
				.post('UserManageMoneyExchange',{
						number:this.nums,
						transaction_token:_data,
						passwordMode:'fingerprint'
				})
				.then(res => {
					console.log(res);
					if(res.data.code==0){
						console.log(1);
						// console.log(this.$store.state.lang.lang.propertyEsuccess);
						// uni.showToast({ title: this.$store.state.lang.lang.propertyEsuccess, icon: 'none' });
							this.getUserManageMoneyExchangeBase()
							this.$refs.childrenpwd.close_visble()
					}
				})
				.catch(err => {
					console.log(err);
				});
			},
			nfc_fun:function(_data){
				this.readyRead = true;
				this.waiting = plus.nativeUI.showWaiting("请将NFC标签靠近！");  
			},
			testfun:function(_data){//手势
				if(this.$store.state.dealPassword.mistakeRate>=2){
					this.$refs.childrenpwd.more_mistakes()
				}
				
				this.$userRequest
				.post('UserManageMoneyExchange',{
						number:this.nums,
						transaction_password:_data,
						passwordMode:'gesture'
				})
				.then(res => {
					console.log(res);
					if(res.data.code==0&&res.data.data.error_code==undefined){
						this.$store.state.dealPassword.mistakeRate=0;
						uni.showToast({ title: this.$store.state.lang.lang.propertyEsuccess, icon: 'none' });
						setTimeout(function(){
							this.$refs.childrenpwd.close_visble()
							this.getUserManageMoneyExchangeBase()
						},200)
					}else{
						this.$store.state.dealPassword.mistakeRate+=1;
						this.$refs.childrenpwd.errtext()
					}
				})
				.catch(err => {
					console.log(err);
				});
				
			},
			child_cnydeal_OrderPopOperation:function(){//输入框
				let transaction_password=this.$store.state.dealPassword.password
				this.$userRequest
				.post('UserManageMoneyExchange',{
						number:this.nums,
						transaction_password:transaction_password,
						passwordMode:'transaction_password'
				})
				.then(res => {
					if(res.data.code==0){
						this.$store.state.dealPassword.mistakeRate=0;
						uni.showToast({ title: this.$store.state.lang.lang.propertyEsuccess, icon: 'none' });
						setTimeout(function(){
							uni.navigateBack();
						},2000)
					}else{
						this.$store.state.dealPassword.mistakeRate=0;
					}
				})
				.catch(err => {
					console.log(err);
				});
				
			},
			results:function (value) {//切割2位小数
			   let tempVal = parseFloat(value).toFixed(3)
			   let realVal = tempVal.substring(0, tempVal.length - 1)
			   return realVal
			},
			back:function(){
				uni.navigateBack();
			},
			getUserManageMoneyExchangeBase:function(){//页面渲染
				uni.showLoading({title: this.$store.state.lang.lang.propertyLoading});
				this.$userRequest
				.get('UserManageMoneyExchangeBase','')
				.then(res => {
					uni.hideLoading();
					  console.log(res);
					if(res.data.code==0){
						this.convertibleSt=res.data.data.convertibleSt
						this.enable_balance=res.data.data.enable_balance
						console.log(this.data_range(this.convertibleSt),this.data_range(this.enable_balance))
						this.data=res.data.data
					}
				})
				.catch(err => {
					console.log(err);
				});
			},
			count:function(e){
				if(e.detail.value==''){
					e.detail.value=0
				}
				// if(e.detail.value>parseFloat(this.enable_balance)){
				// 	e.detail.value=this.enable_balance;
				// 	this.nums=this.results(this.enable_balance)
				// 	// console.log(this.nums);
				// 	// console.log(e.detail.value);
				// }
				this.$userRequest
				.post('UserManageMoneyExchangeContent',{number:e.detail.value})
				.then(res => {
					if(res.data.code==0){
						this.convertibleSt=res.data.data.convertibleSt
					}
				})
				.catch(err => {
					console.log(err);
				});
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
				this.dudata=JSON.parse( this.dudata)
				this.dudata.forEach(item => {
					if (item.second_type=="nfc_transaction") {//交易密码
					 this.dudata=item.memo
					}
				})
				console.log(this.dudata);
				console.log(this.nums);
				this.$userRequest
				.post('UserManageMoneyExchange',{
						number:this.nums,
						transaction_password:this.dudata,
						passwordMode:'nfc'
				})
				.then(res => {
					  console.log(res);
					if(res.data.code==0){
						this.$store.state.dealPassword.mistakeRate=0;
						uni.showToast({ title: this.$store.state.lang.lang.propertyEsuccess, icon: 'none' });
						this.getUserManageMoneyExchangeBase()
					}else{
						this.$store.state.dealPassword.mistakeRate=0;
					}
				})
				.catch(err => {
					console.log(err);
				});
				  
			},
		}
	}
</script>

<style>
	page{
		width: 100%;
		height: 100%;
		background-image: url('~@/static/image/orepool/money_management/beijin.png');
		background-repeat: no-repeat;
		background-position: center;
		background-size: 100% 100%;
	}
	.main{
		/* width: 100%;
		height: 1334upx;
		background-image: url('~@/static/image/orepool/money_management/bg@2x.png');
		background:red;
		background-repeat: no-repeat;
		background-position: center;
		background-size: 100% 100%; */
	}
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		/* background-color: #007aff; */
	}
	.nav{
		width: 750upx;
		height: 88upx;
		display: flex;
		align-items: center;
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
	.exchange_input{
		margin-top: 326upx;
		margin-left: 122upx;
		width: 511upx;
		height: 73upx;
		border:2upx solid #666666;
		border-radius:5upx;
	}
	.exchange_input input{
		width: 511upx;
		height: 73upx;
		box-sizing: border-box;
		padding-left: 161upx;
		line-height: 73upx;
	}
	.exchange_zt{
		margin-top: 102upx;
		margin-left: 127upx;
		text-indent:2em;
		width: 500upx;
		height: 101upx;
		font-size:27upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#666666;
	}
	.usdt{
		height: 30upx;
		margin-left:126upx;
		margin-top: 52upx;
		display: flex;
		align-items: center;
	}
	.st{
		height: 30upx;
		margin-left:126upx;
		margin-top: 22upx;
		display: flex;
		align-items: center;
	}
	.usdt view:nth-child(1),.st view:nth-child(1){
		width: 15upx;
		height: 15upx;
		border-radius: 50%;
		background-color: #999999;
	}
	.usdt view:nth-child(2),.st view:nth-child(2){
		height:30upx;
		font-size:32upx;
		font-weight:500;
		color:#666666;
		line-height: 30upx;
		margin-left: 10upx;
	}
	.submit{
		width:419upx;
		height:82upx;
		background:linear-gradient(0deg,rgba(254,170,90,1) 0%,rgba(255,222,154,1) 100%);
		border-radius:50upx;
		line-height: 82upx;
		text-align: center;
		font-family:PingFang SC;
		font-weight:bold;
		color: #ffffff;
		font-size: 37upx;
		margin-top: 53upx;
		margin-left: 168upx;
	}
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
