<template>
	<view class="main">
		<view class="title_top">
			<view class="status_bar"><!-- 这里是状态栏 --></view>
			<view class="nav">
				<view class="icon iconfont icon-left" @tap="back"></view>
				<view class="">{{lang.financialQrecord}}</view>
				<view class="">
					
				</view>
			</view>
			<view class="conter" v-if="data!=''">
				<view class="conter_list" v-for="(todo,index) in data" :key="index">
					<view class="conter_left" v-if="todo.money>0">+{{results(todo.money_char)}}</view>
					<view class="conter_left" v-else>{{results(todo.money_char)}}</view>
					<view class="conter_right">
						<view>
							{{todo.note}}
						</view>
						<view>{{todo.created_at}}</view>
					</view>
				</view>
			</view>
			<view class="" v-else>
				<exnorecord></exnorecord>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	import exnorecord from '@/exui/components/ex_norecord.vue';
	export default {
		computed: {
			...mapState({				
				lang:state => state.lang.lang
			})
		},
		components: {
			exnorecord
		},
		data() {
			return {
				data:'',//记录
				page:1,
				offset:15
			}
		},
		onLoad() {
			this.getDeductionQuotaLog();
		},
		onReachBottom(){
			this.loading()
		},
		methods: {
			results(_data){
				return this.data_range(_data)
			},
			back:function(){
				uni.navigateBack();
			},
			getDeductionQuotaLog:function(){
				uni.showLoading({title: this.$store.state.lang.lang.propertyLoading});
				this.$userRequest
				.get('getDeductionQuotaLog',{page:this.page,offset:this.offset})
				.then(res => {
					uni.hideLoading();
					if(res.data.code==0){
						this.data=res.data.data
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
				.get('getDeductionQuotaLog',{page:this.page,offset:this.offset})
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
		background:#FFFAF3;
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
	.conter{
		width: 100%;
	}
	.conter_list{
		width: 710upx;
		height: 88upx;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.conter_left{
		height: 27upx;
		font-size:36upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#C7841C;
		line-height: 27upx;
	}
	.conter_right view:nth-child(1){
		height:30upx;
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#C7841C;
		line-height: 30upx;
		text-align: right;
	}
	.conter_right view:nth-child(2){
		height:15upx;
		font-size:20upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#C7841C;
		line-height: 15upx;
		margin-top: 10upx;
		text-align: right;
	}
</style>
