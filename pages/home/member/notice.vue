<template>
	<view class="main">
		<!-- 导航 -->
		<view class="title_top">
			<view class="status_bar"><!-- 这里是状态栏 --></view>
			<view class="nav">
				<view class="icon iconfont icon-left" @tap="back"></view>
				<view class="">{{lang.memberNotice}}</view>
				<view class=""></view>
			</view>
		</view>
		<view class="conter">
			<view class="conter_father" v-if="data!=''">
				<view class="lists" v-for="(todo,index) in data" :key="index" @tap="navigateTo(todo.id)">
					<view class="list_top">
						<view>{{todo.name}}</view>
						<view>{{todo.edittime}}</view>
					</view>
					<view class="list_conter">
						{{todo.synopsis}}
					</view>
					<view class="list_xian"></view>
					<view class="list_father">
						<view>{{lang.memberDetail}}</view>
						<view class="icon iconfont icon-right" ></view>
					</view>
				</view>
			</view>
			<view class="zwjl" v-else>
				<img src="@/static/image/member/notice.png">
			</view>
		</view>
	</view>
</template>
<script>
	import { mapState, mapMutations } from 'vuex';
    export default {
        data() {
            return {
				data:''
            }
        },
		computed: {
			...mapState({				
				lang:state => state.lang.lang
			})
		},
		onLoad() {
			this.getlists()
		},
        methods: {
			back:function(){
				uni.navigateBack();
			},
			getlists:function(){
				this.$userRequest.get('getNewsList',{}).then(res => {
					if(res.data.code==0){
						this.data=res.data.data.newsData
					}
				}).catch(err => {
					console.log(err);
				});
			},
			navigateTo:function(id){
				uni.navigateTo({
					url: './notice_details?id='+id
				});
			}
        }
    }
</script>
<style>
	page{
		width: 750upx;
		background-color: #F3F4F5
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
		justify-content: space-between;
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
	.conter{
		position: relative;
	}
	.conter_father{
		width: 710upx;
		position: absolute;
		top: 10upx;
		left: 20upx;
		background-color: #F3F4F5;
	}
	.lists{
		width: 100%;
		height: 230upx;
		margin-bottom: 20upx;
		border-radius:5upx;
		background-color: #FFFFFF;
		position: relative;
	}
	.list_top{
		width: 670upx;
		height: 32upx;
		position: absolute;
		top: 28upx;
		left: 20upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.list_top :nth-child(1){
		height:32upx;
		font-size:34upx;
		font-family:PingFang SC;
		font-weight:bold;
		line-height: 32upx;
		color:#333333;
	}
	.list_top :nth-child(2){
		height:18upx;
		font-size:24upx;
		font-family:PingFang SC;
		font-weight:500;
		line-height: 18upx;
		color:#999999;
	}
	.list_conter{
		width: 670upx;
		height: 60upx;
		position: absolute;
		top: 89upx;
		left: 20upx;
		font-size:28upx;
		font-family:PingFang SC;
		font-weight:500;
		line-height: 30upx;
		color: #999999;
	}
	.list_xian{
		width: 100%;
		height: 2upx;
		position: absolute;
		top: 167upx;
		background-color: #F4F4F4;
	}
	.list_father{
		width: 670upx;
		height: 30upx;
		position: absolute;
		top: 185upx;
		left: 20upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.list_father :nth-child(1),.list_father :nth-child(2){
		height:30upx;
		font-size:24upx;
		font-family:PingFang SC;
		font-weight:500;
		color: #999999;
		line-height: 30upx;
	}
	.zwjl{
		width: 400upx;
		height: 400upx;
		margin: 350upx auto;
	}
	.zwjl img{
		width: 400upx;
		height: 400upx;
	}
</style>
