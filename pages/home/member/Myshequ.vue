<template>
	<view class="main">
		<view class="status_bar"><!-- 这里是状态栏 --></view>
		<view class="top">
			<view class="nav">
				<view class="icon iconfont icon-left" @tap="back"></view>
				<view class="nav_conter">
					{{lang.memberMycommunity}}
				</view>
				<view class="">
					
				</view>
			</view>
			<view class="t_dj">
				<view class="t_left">
					<view class="">
						{{lang.memberEinference}}
					</view>
					<view class="">
						{{data.effectiveDirectNumber}}
					</view>
				</view>
				<view class="t_right">
					<img :src="data.http_url+data.lv_corner_marker" alt="">
				</view>
			</view>
		</view>
		<view class="conter">
			<view class="grade">
				<view class="xian" v-if="data.lv==1">
					<view style="width: 0;"></view>
				</view>
				<view class="xian" v-if="data.lv==2">
					<view style="width: 33%;"></view>
				</view>
				<view class="xian" v-if="data.lv==3">
					<view style="width: 66%;"></view>
				</view>
				<view class="xian" v-if="data.lv==4">
					<view style="width: 100%;"></view>
				</view>
				<view class="dian">
					<view></view>
					<view></view>
					<view></view>
					<view></view>
				</view>
				<view class="zi">
					<view>V1</view>
					<view>V2</view>
					<view>V3</view>
					<view>{{lang.memberSuper}}</view>
				</view>
			</view>
			<view class="details">
				<view class="details_xq">
					{{lang.memberTdetails}}
				</view>
				<view class="details_fater">
					<view class="details_son">
						<view>{{lang.memberTsize}}</view>
						<view>{{data.totalTeamNumber}}</view>
					</view>
					<view class="details_son">
						<view>{{lang.memberEsize}}</view>
						<view>{{data.totalEffectiveTeamNumber}}</view>
					</view>
					<view class="details_son">
						<view>{{lang.memberTachievement}}</view>
						<view>{{numFilter(data.teamPerformance,3)*1}} ST</view>
					</view>
				</view>
			</view>
			<view class="record">
				<view class="details_xq" style="padding-top:20upx;">
					{{lang.memberDrecord}}
				</view>
				
				<view class="picture" v-if="data.recommendList==0">
					<img src="@/static/image/transaction/zanwujilu@2x.png">
				</view>
				<view class="record_father" v-else>
					<!-- <scroll-view scroll-y="true" class="scroll-Y" >
						<table>
							
						</table>
					</scroll-view> -->
					<view class="table">
					  <view class="tr">
						<view class="th" style="width:25%;">{{lang.memberUsername}}</view>
						<view class="th" style="width:30%;">{{lang.memberPperformance}}(ST)</view>
						<view class="th" style="width:30%;">{{lang.memberTperformance}}(ST)</view>
						<view class="th" style="width:15%;">{{lang.memberStatus}}</view>
					  </view>
					  <view class="tr" v-for="(todo,index) in data.recommendList" :key="index">
					  	<view class="td" style="width:25%;">{{showzhanghao(todo.user_name)}}</view>
					  	<view class="td" style="width:30%;">{{numFilter(todo.oneself_performance_all,3)*1}}</view>
					  	<view class="td" style="width:30%;">{{numFilter(todo.team_performance_all,3)*1}}</view>
					  	<view class="td" style="width:15%;" v-if="todo.is_effective==0">{{lang.memberInvalid}}</view>
					  	<view class="td" v-else  style="color: #3DCC89;width:15%;">{{lang.memberEffective}}</view>
					  </view>
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>
<script>
	import { mapState, mapMutations } from 'vuex';
	
export default {
	computed: {
		...mapState({				
			lang:state => state.lang.lang
		})
	},

	data() {
		return {
			data: {} //页面的数据
		};
	},
	onLoad() {
		this.myCommunity();
	},
	methods: {
		back: function() {
			uni.navigateBack();
		},
		results:function(_data){
			return this.data_range(_data)
		},
		myCommunity: function() {
			uni.showLoading({title: this.$store.state.lang.lang.propertyLoading});
			this.$userRequest
				.get('myCommunity')
				.then(res => {
					uni.hideLoading();
					if (res.data.code == 0) {
						this.data = res.data.data;
					} 
				})
				.catch(err => {
					console.log(err);
				});
		},
		// 截取当前数据到小数点后二位
		numFilter(value,num) {
			let tempVal = parseFloat(value).toFixed(num)
			let realVal = tempVal.substring(0, tempVal.length - 1)
			return realVal
		},
		showzhanghao: function(uname) { //显示账号 如果有昵称 显示昵称，否则显示隐藏后的手机号
			return uname.substr(0, 3) + '****' + uname.substr(7, 4);
		},
	}
};

</script>
<style lang="scss">
	.table{width:100%;padding:0 10upx;padding-bottom:60upx;display:table;box-sizing:border-box;}
	.table .tr{width:100%;font-size:20upx;}
	.table .td{font-size:20upx;color:#666;float:left;padding:0 10upx;box-sizing:border-box;}
	.table .th{float:left}
	// table tr th:nth-of-type(1){width:20%;}
	// table tr th:nth-of-type(2){width:30%;}
	// table tr th:nth-of-type(3){width:30%;}
	// table tr th:nth-of-type(4){width:20%;}
	
	// table tr td:nth-of-type(1){width:20%;}
	// table tr td:nth-of-type(2){width:30%;}
	// table tr td:nth-of-type(3){width:30%;}
	// table tr td:nth-of-type(4){width:20%;}
	
	// table th{float:left;width:25%;}
	// table td{float:left;width:25%;}
page {
	background-color: #f3f4f5;
}
.status_bar {
	height: var(--status-bar-height);
	width: 100%;
	background-color: #000000;
}
//顶部的
.top{
	width: 100%;
	height: 343upx;
	background-color: #000000;
	border-bottom-left-radius: 15%;
	border-bottom-right-radius: 15%;
}
.nav{
	width: 100%;
	height: 85upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.nav view:nth-child(1),.nav view:nth-child(3){
	width: 44upx;
	height: 44upx;
	font-size: 50upx;
	color: #FFFFFF;
}
.nav_conter {
	height: 30upx;
	font-size: 32upx;
	font-weight: 500;
	color: #FFFFFF;
}
.t_dj{
	width: 670upx;
	height: 128upx;
	display: flex;
	justify-content: space-between;
	margin:49upx auto;
}
.t_left{
	height: 128upx;
	display: flex;
	flex-direction:column;
	justify-content: space-between;
}
.t_left view:nth-child(1){
	height:27upx;
	font-size:28upx;
	font-family:PingFang SC;
	font-weight:500;
	color:#FFFFFF;
	line-height:27upx;
}
.t_left view:nth-child(2){
	height:39px;
	font-size:52upx;
	font-family:PingFang SC;
	font-weight:bold;
	color:#FFFFFF;
	line-height:39px;
}
.t_right img{
	width: 128upx;
	height: 128upx;
}
// 内容
.conter{
	margin:-47upx 30upx;
	height: 834upx;
	display: flex;
	align-items: center;
	flex-direction:column;
	justify-content: space-between;
}
.grade{
	position: relative;
	width: 100%;
	height: 185upx;
	background-color: #FFFFFF;
	border-radius:5upx
}
.xian{
	width:501upx;
	height:5upx;
	background:#E6E6E6;
	margin-top: 69upx;
	margin-left: 55upx;
}
.xian view{
	height: 5upx;
	background-color: #3681FC;
}
.dian{
	position: absolute;
	width:501upx;
	height: 15upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	top: 64upx;
	left: 55upx;
}
.dian view{
	width: 15upx;
	height: 15upx;
	border-radius: 50%;
	background-color: #3681FC;
}
.zi{
	position: absolute;
	width:530upx;
	height: 23upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	top: 101upx;
	left: 47upx;
}
.zi view{
	height:27upx;
	font-size:24upx;
	font-weight:bold;
	color:#333333;
	line-height:27upx;
}
//详情
.details{
	width: 100%;
	height: 274upx;
	background-color: #FFFFFF;
	border-radius:5upx;
	border-top:1upx solid #007AFF
}
.details_xq{
	font-size:32upx;
	font-family:PingFang SC;
	font-weight:800;
	color:#333333;
	line-height: 30upx;
	padding:20upx 30upx;
	padding-top:60upx;
	box-sizing:border-box;
}
.details_fater{
	margin-bottom: 38upx;
	display: flex;
	align-items: center;
	flex-direction:column;
	justify-content: space-between;
	padding:0 30upx;
	box-sizing:border-box;
}
.details_fater .details_son{padding:10upx 0;}
.details_son{
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.details_son view:nth-child(1){
	height:27upx;
	font-size:28upx;
	font-weight:500;
	color:#333333;
	line-height:27upx
}
.details_son view:nth-child(2){
	height:22upx;
	font-size:28upx;
	font-weight:500;
	color:#333333;
	line-height:22upx;
}

// 记录
.record{
	width: 100%;
	background-color: #FFFFFF;
	border-radius:5upx;
	border-top:1upx solid #007AFF
}
.picture{
	width: 231upx;
	height: 203upx;
	margin-left: 192upx;
	margin-top: 31upx;
}
.picture img{
	width: 231upx;
	height: 203upx;
}
.scroll-Y{
	width: 574upx;
	height: 200upx;
	margin-left: 20upx;
}
.record_son{
	font-size:28upx;
	font-weight:500;
	color:#000000;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding:10upx 30upx;
	box-sizing:border-box;
}
</style>
