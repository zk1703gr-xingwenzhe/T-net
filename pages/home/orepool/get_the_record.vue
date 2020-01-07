<template>
	<view class="main">
		<view class="title_top">
			<view class="status_bar"><!-- 这里是状态栏 --></view>
			<view class="nav">
				<view class="icon iconfont icon-left" @tap="back"></view>
				<view class="">{{lang.financialRrecords}}</view>
				<view class="">
					
				</view>
			</view>
			<view class="conter" v-if="data!=''">
				<view class="conter_list" v-for="(todo,index) in data" :key="index">
					<view>{{todo.money_char}}ST</view>
					<view>{{todo.created_at}}</view>
				</view>
			</view>
			<!-- 暂无记录 -->
			<view  v-else>
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
				offset:10
			}
		},
		onLoad() {
			this.getreceiveLog()
		},
		onReachBottom(){
			this.loading()
		},
		methods: {
			back:function(){
				uni.navigateBack();
			},
			getreceiveLog:function() {
				uni.showLoading({title: this.$store.state.lang.lang.propertyLoading});
				this.$userRequest
				.get('receiveLog',{page:this.page,offset:this.offset})
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
				.get('receiveLog',{page:this.page,offset:this.offset})
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
		height: 67upx;
		display: flex;
		margin: 0 auto;
		justify-content: space-between;
		align-items: center;
	}
	.conter_list view:nth-child(1),.conter_list view:nth-child(2){
		font-size:36upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#C7841C;
	}
</style>
