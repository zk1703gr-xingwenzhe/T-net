<template>
	<view class="main">
		<view class="top"><!-- 合约页面 -->
			<view class="status_bar"><!-- 这里是状态栏 --></view>
			<view class="nav">
				<view class="twebicon icon-jilu" @tap="opening_record"></view>
				<view class="">{{lang.indexContract}}</view>
				<view class="twebicon icon-kxian" @tap="openit()"></view>
			</view>
			<view v-if="time==true">
				<view class="top_left" v-if="exSContract <=5 ">
					<view>{{lang.contractSetcontract}}</view>
					<view>{{exSContract}}s</view>
				</view>
				<view class="top_left" v-else-if="exSContract <=10">
					<view>{{lang.contractSpartake}}</view>
					<view>{{exSContract}}s</view>
				</view>
				<view class="top_left" v-else>
					<view>{{lang.contractPcountdown}}</view>
					<view>{{exSContract}}s</view>
					
				</view>
			</view>
			<view v-else>
				<view class="top_left" v-if="exMContract <=5">
					<view>{{lang.contractSetcontract}}</view>
					<view>{{exMContract}}s</view>
				</view>
				<view class="top_left" v-else-if="exMContract <=10">
					<view>{{lang.contractSpartake}}</view>
					<view>{{exSContract}}s</view>
				</view>
				<view class="top_left" v-else>
					<view>{{lang.contractPcountdown}}</view>
					<view>{{exMContract}}s</view>
					
				</view>
			</view>
			
			
			<view class="top_right">
				<!-- <img src="@/static/image/contract/right.png" alt=""> -->
			</view>
		</view>
		<view class="second">
			<view class="second_left"  @tap="istime(true)"  v-if="time==true"><img src="@/static/image/contract/30click@2x.png" alt=""></view>
			<view class="second_left"  @tap="istime(true)" v-else><img src="@/static/image/contract/30@2x.png" alt=""></view>
			<view class="second_right" @tap="istime(false)" v-if="time==true"><img src="@/static/image/contract/60@2x.png" alt=""></view>
			<view class="second_right"  @tap="istime(false)" v-else><img src="@/static/image/contract/60click@2x.png" alt=""></view>
		</view>
		<view class="conter">
			<view class="conter_top" v-if="time==true">
				<img src="@/static/image/contract/xian30.png" alt="">
			</view>
			<view class="conter_top" v-else>
				<img src="@/static/image/contract/xian60.png" alt="">
			</view>
			<view class="conter_bottom">
				<view class="conter_left" @tap="ismore(0)">
					<view style="color: #FFFFFF;padding-right:60upx;box-sizing:border-box;" v-if="open_more==0">{{lang.contractOmany}}</view>
					<view style="padding-right:60upx;box-sizing:border-box;" v-else>{{lang.contractOmany}}</view>
					<img src="@/static/image/contract/kaiduoclick.png" alt="" v-if="open_more==0">
					<img src="@/static/image/contract/kaiduo@2x.png" alt="" v-else>
				</view>
				<view class="conter_right" @tap="ismore(1)">
					<view v-if="open_more==0">{{lang.contractOspace}}</view>
					<view style="color: #FFFFFF;" v-else>{{lang.contractOspace}}</view>
					<img src="@/static/image/contract/kaikong.png" alt="" v-if="open_more==0">
					<img src="@/static/image/contract/kaikongclick@2x.png" alt="" v-else>
				</view>	
			</view>
		</view>
		<view class="huakuai">
			<view class="neirou">
				<view class="conter_input">
					<!-- <input type="hidden" value="" placeholder="数量(只会计算参与的整数数量)"  v-model="money"/>
					<view>ST</view> -->					
					<picker @change="bindPickerChange" :value="index" :range="array">
						<view class="uni-input" style="color: #000000;">{{array[index]}}</view>
					</picker>
					<view style="color: #000000;">ST</view>
				</view>
				<view class="keyong">
					{{lang.propertyAvailable}}{{this.data_range(data.enable_balance*1)}}ST
				</view>
				<!-- <view class="qujian">
					{{lang.contractBinterval}}{{data.second_contract_min}}ST-{{data.second_contract_max}}ST
				</view> -->
				<view class="miaoheyue" @tap="dredge(1)" v-if="open_more==0">					
					{{lang.contractPcontract}}
				</view>
				<view class="miaoheyue" @tap="dredge(2)"  style="background-color: #5223AC;" v-else>
					{{lang.contractPcontract}}
				</view>
			</view>
		</view>
		
		<exDialog title="提示" :show="show1" :isBtns="false" v-on:closeDialog="closeDialog1">
			<view slot="content">				
				<view class="content1" v-if="exContractSelfState == true">{{lang.contractPsuccessluck}}</view>
				<view class="content1" v-else>{{lang.contractIntimeopening}}</view>
			</view>
		</exDialog>
	</view>
</template>

<script>
	import exDialog from '@/exui/components/exDialog.vue';
	import { mapState,mapGetters, mapMutations } from 'vuex';
	import { PbMessage } from '@/common/libs/PbMessage';
	var pb = new PbMessage();
	export default {
		
		components: {
			exDialog
		},
		data() {
			return {
				show1 : false,
				price:'',
				money:1000,
				time:true,//切换30 ture  60false
				open_more:0,//0是开多，1开少
				times:30,//倒计时
				data:'',//余额等
				state:0,//状态等
				bet_type:1,
				type:'',
				userinfo:[],
				array: [1000, 10000, 30000, 50000,100000],
				index: 0,
			}
		},
		created() {
			this.times = this.$store.getters.getScountdown;
			this.state = this.$store.getters.getState;			
			console.log(this.times);
			this.getbetsSecondsContractBase();
			this.userinfo = uni.getStorageSync('userinfo');
		},
		computed: {
			...mapState({
				exState: state => state.websocket.exState,
				exSContract: state => state.websocket.exSContract,
				exMContract: state => state.websocket.exMContract,
				exContractSelfState:state => state.websocket.exContractSelfState,
				lang:state => state.lang.lang
			}),
			...mapGetters(['getContractSelfState']),
		},
		watch: {
					getContractSelfState(newValue, oldValue) {
						this.getbetsSecondsContractBase();
					}
				},
		methods: {
			openit(){
				uni.navigateTo({
					url:"./kline/index?buy=BTC&sell=USDT"
				})
			},
			 bindPickerChange: function(e) {
				 this.money = this.array[e.target.value];
			            console.log('picker发送选择改变，携带值为', this.array[e.target.value])
			            this.index = e.target.value
						console.log('pickerindex', this.index)
			        },
			closeDialog1 : function(){
					this.show1 =false;						
					},
			getbetsSecondsContractBase:function(){
				this.$userRequest
				    .get('betsSecondsContractBase')
					.then(res =>{
						if(res.data.code == 0){
							this.data = res.data.data;
						}
					})
			},
			opening_record:function(){
				uni.navigateTo({
					url: './contract/opening_record'
				});
			},
			istime:function(el){//30s 60s切换
				this.time=el
				if(this.time){					
					this.times = this.$store.getters.getScountdown
				}else{					
					this.times = this.$store.getters.getMcountdown
				}
			},
			ismore:function(el){//开多开少切换
				this.open_more=el
				
			},
			
			dredge:function(type){//开通秒合约				
				var ttype;
				if(this.time){
					 ttype = 1
				}else{
					 ttype = 2
				}
				if(this.open_more==0){
					this.bet_type=1
				}else{
					this.bet_type=2
				}
				switch (type){
					case 1:
						if(this.exSContract <=10){
							uni.showToast({ title: this.$store.state.lang.lang.contractCtimeparticipate, icon: 'none' });
							return;
						}						
						
						break;
					case 2:
						if(this.exMContract <=10){
							uni.showToast({ title: this.$store.state.lang.lang.contractCtimeparticipate, icon: 'none' });
							return;
						}
						break;
				}
				
				if(this.money >0){
					if(this.data.enable_balance < this.money){
						uni.showToast({
							title: this.$store.state.lang.lang.contractTcbcannotparticipate, icon: 'none'
						})
					}else{
						var message = {uid:this.userinfo.id,type:ttype,subtype:this.bet_type,value:this.money*1};
						var buffer = pb.betRequest(message);
						uni.sendSocketMessage({
							data: buffer
						});
						this.show1 = true;
					}
					
				}
				
			}
		}
	}
</script>

<style scoped>
	page{
		background-color: #F3F4F5;
	}
	.top{
		width: 100%;
		height: 430upx;
		background-image: url("~@/static/image/contract/bg5.png");
		background-repeat: no-repeat;
		background-position: center;
		background-size: 100% 100%;
		position: relative;
	}
	/* 状态栏 */
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
	.nav{
		width: 710upx;
		height: 88upx;
		padding-left: 20upx;
		padding-right: 20upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.nav view:nth-child(1){
		width: 44upx;
		height: 44upx;
		line-height: 44upx;
		font-size: 50upx;
		color: #FFFFFF;
	}
	.nav view:nth-child(2){
		height:30upx;
		font-size:32upx;
		font-weight:800;
		line-height: 30upx;
		text-align: center;
		color: #FFFFFF;
	}
	.nav view:nth-child(3){
		height:26upx;
		font-size:50upx;
		font-weight:500;
		color: #FFFFFF;
		line-height: 26upx;
	}
	.top_left view:nth-child(1){
		height:22upx;
		font-size:23upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#FFFFFF;
		line-height: 22upx;
		position: absolute;
		top: 195upx;
		left: 62upx;
	}
	.top_left view:nth-child(2){
		height:58upx;
		font-size:77upx;
		font-family:PingFang SC;
		font-weight:800;
		color:#FFFFFF;
		position: absolute;
		line-height: 58upx;
		top: 249upx;
		left: 62upx;
	}
	.top_right{
		width: 195upx;
		height: 195upx;
		position: absolute;
		top:153upx;
		right: 69upx;
	}
	.top_right img{
		width: 100%;
		height: 100%;
	}
	.second{
		width: 352upx;
		height: 90upx;
		position: absolute;
		top: 384upx;
		left: 200upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.second view{
		width: 104upx;
		height:90upx;
		/* font-size:32upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:#14DCDD;
		line-height:90upx;
		text-align: center;
		border-radius: 50%;
		background-color: #FFFFFF; */
	}
	.second view img{
		width: 104upx;
		height:90upx;
	}
	.conter{
		width: 618upx;
		height: 128upx;
		margin-top: 72upx;
		margin-left: 69upx;
		display: flex;
		justify-content: space-between;
		flex-direction:column;
		align-items: center;
	}
	.conter .conter_top img{
		width: 618upx;
		height: 19upx;
	}
	.conter .conter_bottom{
		width: 618upx;
		height: 79upx;
		position: relative;
		display: flex;
	}
	.conter .conter_left{
		position: absolute;
		width: 303upx;
		height: 79upx;
		z-index: 9;
	}
	.conter .conter_right{
		position: absolute;
		width: 342upx;
		height: 79upx;
		right: 0;
		z-index: 8;
	}
	.conter_left img,.conter_right img{
		position: absolute;
		width: 100%;
		height: 79upx;
	}
	.conter_left view,.conter_right view{
		position: absolute;
		z-index: 11;
		width: 342upx;
		height: 79upx;
		text-align: center;
		line-height: 79upx;
		color: #666666;
		font-size:32upx;
		font-weight:bold;
	}
	.isactive{
		background-color: #00D9D6 !important;
		color: #FFFFFF !important;
	}
	.huakuai{
		width: 618upx;
		height: 413upx;
		margin-left: 69upx;
		margin-top: 40upx;
	}
	.neirou{
		width: 618upx;
		height: 413upx;
		/* margin-left: 69upx;
		margin-top: 40upx; */
	}
	.neirou .top_input {
		width: 618upx;
		height: 79upx;
		border: 1upx solid #D5D5D5;
		border-radius: 5upx;
		display: flex;
		align-items: center;
	}
	
	.neirou .top_input input {
		width:519upx;
		height: 79upx;
		line-height: 79upx;
		padding-left: 21upx;
		box-sizing: border-box;
	}
	.neirou .top_input view{
		width: 100upx;
		height: 79upx;
		text-align: center;
		line-height: 79upx;
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#D5D5D5;
	}
	
	
	.neirou .jiajian .jia_img {
		border-right: 1px solid #D5D5D5
	}
	
	.neirou .jiajian img {
		width: 32upx;
		height: 32upx;
		margin-left: 25upx;
	}
	.approximate{
		height:19upx;
		font-size:24upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#D5D5D5;
		line-height:19upx;
		margin-top: 20upx;
	}
	.conter_input{
		width:619upx;
		height:79upx;
		border:1upx solid #D5D5D5;
		border-radius:5px;
		display: flex;
		align-items: center;
		margin-top: 30upx;
	}
	.conter_input picker{
		width:519upx;
		height: 79upx;
		line-height: 79upx;
		padding-left: 21upx;
		box-sizing: border-box;
	}
	.conter_input view{
		width: 100upx;
		height: 79upx;
		text-align: center;
		line-height: 79upx;
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#D5D5D5;
	}
	.keyong{
		height:22upx;
		font-size:24upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#D5D5D5;
		line-height:22upx;
		margin-top: 20upx;
	}
	.qujian{
		height:23upx;
		font-size:24upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#D5D5D5;
		line-height:23upx;
		margin-top: 8upx;
	}
	.miaoheyue{
		width:618upx;
		height:79upx;
		background:#222896;
		border-radius:5upx;
		margin-top: 34upx;
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:#FFFFFF;
		line-height:79upx;
		text-align: center;
	}
	.content1{padding:20rpx; font-size:26rpx; text-align:center; line-height:60rpx; background:#F8F8F8; border-bottom-left-radius:10rpx; border-bottom-right-radius:10rpx;}
</style>
