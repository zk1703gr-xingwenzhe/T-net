<template>
	<view class="main">
		<view class="nav_father">
			<view class="status_bar"><!-- 这里是状态栏 --></view>
			<view class="nav">
				<view class="icon iconfont icon-left" @tap="back"></view>
				<view class="">{{lang.contractOrecords}}</view>
				<view></view>
			</view>
		</view>
		 <view class="lists" v-if="data!=''">
		 	<view class="list" v-for="(todo,index) in data " :key="index">
		 		<view class="list_son">
					<view class="list_top">
						<view class="list_top_left">
							<view v-if="todo.type==1">30s{{lang.indexContract}}</view>
							<view v-else>{{lang.contractContract}}</view>
							<view v-if="todo.bet_type==1">{{lang.contractOmany}}</view>
							<view v-else>{{lang.contractOspace}}</view>
						</view>
						<view class="list_top_right">{{todo.created_at}}</view>
					</view>
					<view class="list_conter">
						<view>￥{{todo.now_price}}</view>
						<view>{{todo.money}}</view>
						<view>{{todo.wheels_result==null?'结算中':todo.wheels_result}}</view>
					</view>
					<view class="list_bottom">
						<view>{{lang.contractBuyIn}}</view>
						<view>{{lang.contractMargin}}</view>
						<view>{{lang.contractProfit}}</view>
						<!-- <view>{{lang.contractBprice}}</view>
						<view>{{lang.contractBamount}}</view>
						<view>{{lang.contractBresults}}</view> -->
					</view>
				</view>
		 	</view>
		 </view>
		 <view class="" v-else>
		 	<exnorecord></exnorecord>
		 </view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	import exnorecord from '@/exui/components/ex_norecord.vue';
	export default {
		components: {
			exnorecord
		},
		computed: {
			...mapState({				
				lang:state => state.lang.lang
			})
		},
		data() {
			return {
				data:'',
				page:1,
				offset:10
			}
		},
		onReachBottom(){
			this.loading()
		},
		onLoad() {
			this.getjillu()
		},
		methods: {
			back:function(){
				uni.navigateBack();
			},
			getjillu:function (){
				this.$userRequest
				.get('getUserBettingRecord',{page:this.page,offset:this.offset})
				.then(res => {
					if (res.data.code == 0) {
						this.data=res.data.data;
					} 
				})
				.catch(err => {
					console.log(err);
				});
			},
			loading:function(){
				this.page++
				uni.showLoading({title: this.$store.state.lang.lang.propertyLoading});
				this.$userRequest
				.get('getUserBettingRecord',{page:this.page,offset:this.offset})
				.then(res => {
					uni.hideLoading();
					if(res.data.code==0){
						if(res.data.data==""){
							uni.showToast({ title: this.$store.state.lang.lang.walletPnodata, icon: 'none' });
							return;
						}else{
							this.data=this.data.concat(res.data.data)
							
						}
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
	.nav_father{
		background-color: #FFFFFF;
	}
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
	.nav{
		width: 750upx;
		height: 88upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
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
	.lists{
		width: 100%;
	}
	.list{
		width: 750upx;
		height: 153upx;
		background-color: #FFFFFF;
		margin-bottom: 5upx;
	}
	.list_son{
		width: 710upx;
		height: 153upx;
		margin: 0 auto;
		padding-top: 10upx;
	}
	.list_top{
		width: 100%;
		height: 31upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.list_top .list_top_left{
		display: flex;
		align-items: center;
	}
	.list_top .list_top_left view:nth-child(1){
		height:31upx;
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#333333;
		line-height:31upx;
	}
	.list_top .list_top_left view:nth-child(2){
		height:19upx;
		font-size:20upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#3DCC89;
		line-height:19upx;
		margin-left: 18upx;
	}
	.list_top .list_top_right{
		height:16upx;
		font-size:20upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#999999;
		line-height:16upx;
	}
	.list_conter{
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 29upx;
	}
	.list_conter view{
		height:22upx;
		font-size:28upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:#333333;
		line-height:22upx;
	}
	.list_bottom{
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 20upx;
	}
	.list_bottom view{
		height:23upx;
		font-size:24upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#666666;
		line-height:23upx;
	}
</style>
