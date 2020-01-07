
<template>
	<view class="index" v-bind:style="[{'min-height': secondHeight + 'px' }]">
		<navbar :isshowa="true">{{lang.memberMNews}}</navbar>
		<view class="waiter">
			<view class="slide_list" >
				<view class="now-message-info" hover-class="uni-list-cell-hover" :style="{width:Screen_width+'px'}" @click="getDetail(1,lang.memberCustomerservice)">
					<view>
						<view class="icon-headimg"></view>
						<view class="list-right">
							<view class="list-title">{{lang.memberMcustomer}}</view>
						</view>
					</view>
					<view class="list-right-1">
						<!-- <view class="news-point"></view> -->
					</view>
				</view>
			</view>
		</view>
		<!-- 数据列表 this.avatar = '../../../static/image/member/avatar/' + this.userinfo.user_avatar + '.png';-->
		<view class="list-box">
			<view class="container_of_slide" v-for="(item,index) in list" :key="index">
				<view  class="slide_list" @touchstart="touchStart($event,index)" @touchend="touchEnd($event,index)" @touchmove="touchMove($event,index)" @tap="recover(index)" :style="{transform:'translate3d('+item.slide_x+'px, 0, 0)'}">
					<view class="now-message-info" hover-class="uni-list-cell-hover" :style="{width:Screen_width+'px'}" @click="getDetail(item.id,item.nickname)">
						<view>
							<view class="icon-headimg" :style="'background-image:url(../../../static/image/member/avatar/'+item.avatar+'.png)'"></view>
							<view class="list-right">
								<view class="list-title" v-if="item.nickname">{{item.nickname}}</view>
								<view class="list-detail">{{item.msg}}</view>
							</view>
						</view>
						<view class="list-right-1">
							<view class="right-time">
								{{item.msgtime}}
							</view>
							<!-- <view class="news-point">
								{{item.count}}11
							</view> -->
						</view>
					</view>
					<view class="group-btn">
						<view class="removeM btn-div" @tap="removeM(index, item.id)">
							{{lang.memberDelete}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import navbar from '@/pages/index/navbar.vue';
	import msgTips from '@/exui/tool/msgTipsBar.js'
	import { mapState, mapMutations } from 'vuex';
	export default {
		name: 'slide-list',
		computed: {
			Screen_width() {
				return uni.getSystemInfoSync().windowWidth;
			},
			...mapState({
				lang:state => state.lang.lang
			})
		},
		components: {
			navbar
		},
		data() {
			return {
				visible: false,
				start_slide_x: 0,
				btnWidth: 0,
				startX: 0,
				LastX: 0,
				startTime: 0,
				list : [					
				],
				btuBottom: '0',
				secondHeight: '',
				
			};
		},
		onShow() {
			const res = uni.getSystemInfoSync();
			// 计算主体部分高度,单位为px
			this.secondHeight = res.windowHeight
		},
		onLoad() {
			
			this.getFriendList()
		},
		methods: {
			getFriendList: function() {//打开弹出
				this.$userRequest
				.get('getUserFriendList')
				.then(res => {
					console.log(res);
					if (res.data.code == 0) {
						this.list = res.data.data.friend
						//this.fee = res.data.data.now_fee;
						
					}
				})
				.catch(err => {
					console.log(err);
				});
			},
			cancelEvent(){
				this.visible = false
			},
			getDetail(item,_username){
				uni.navigateTo({
				    url: 'kefu?id='+item+"&username="+_username
				});
			},
			// 滑动开始
			touchStart(e, index) {
				//记录手指放上去的时间
				this.startTime = e.timeStamp;
				//记录滑块的初始位置
				this.start_slide_x = this.list[index].slide_x;
				// 按钮宽度
				uni.createSelectorQuery()
					.selectAll('.group-btn')
					.boundingClientRect()
					.exec(res => {
						if (res[0] != null) {
							this.btnWidth = res[0][index].width * -1;
						}
					});
				// 记录上一次开始时手指所处位置
				this.startX = e.touches[0].pageX;
				// 记录上一次手指位置
				this.lastX = this.startX;
				//初始化非当前滑动消息列的位置
				this.list.forEach((item, eq) => {
					if (eq !== index) {
						item.slide_x = 0;
					}
				});
			},
			// 滑动中
			touchMove(e, index) {
				const endX = e.touches[0].pageX;
				const distance = endX - this.lastX;
				// 预测滑块所处位置
				const duang = this.list[index].slide_x + distance;
				// 如果在可行区域内
				if (duang <= 0 && duang >= this.btnWidth) {
					this.list[index].slide_x = duang;
				}
				// 此处手指所处位置将成为下次手指移动时的上一次位置
				this.lastX = endX;
			},
			// 滑动结束
			touchEnd(e, index) {
				let distance = 10;
				const endTime = e.timeStamp;
				const x_end_distance = this.startX - this.lastX;
				if (Math.abs(endTime - this.startTime) > 200) {
					distance = this.btnWidth / -2;
				}
				// 判断手指最终位置与手指开始位置的位置差距
				if (x_end_distance > distance) {
					this.list[index].slide_x = this.btnWidth;
				} else if (x_end_distance < distance * -1) {
					this.list[index].slide_x = 0;
				} else {
					this.list[index].slide_x = this.start_slide_x;
				}
			},
			// 点击回复原状
			recover(index) {
				this.list[index].slide_x = 0;
			},
			// 删除
			removeM(index, id) {
				let self = this
				uni.showModal({
					title: '',
					content: self.$store.state.lang.lang.memberDdeleteinformation,
					confirmText: self.$store.state.lang.lang.memberDelete,
					confirmColor: '#ff3b32',
					success: function (res) {
						if (res.confirm) {
							//这里撰写与后台的交互请求
							
							uni.showToast({
								icon: "success",
								title: self.$store.state.lang.lang.loginSoperation,
								duration: 2000
							});
						} else if (res.cancel) {
						}
					}
				});
			}
		}
	};
</script>

<style scoped>
	.index{background: #F8F8F8;overflow:hidden;width:100%;}
	.list-box{padding: 20upx 0;}
	.container_of_slide {width: 100%;overflow: hidden;}

	.slide_list {transition: all 100ms;width:200%;height: 160upx;}

	.now-message-info {box-sizing:border-box;display: flex;align-items: center;/* justify-content: space-between; */font-size: 16upx;clear:both;height: 160upx;padding: 0 30upx;margin-bottom: 2upx;background: #FFFFFF;display:flex;justify-content:space-between;}
	.now-message-info,.group-btn {float: left;}

	.group-btn {display: flex;flex-direction: row;height: 160upx;min-width: 100upx;align-items: center;}

	.group-btn .btn-div {height: 160upx;color: #fff;text-align: center;padding: 0 50upx;font-size: 34upx;line-height: 160upx;}

	.group-btn .top {background-color: #c4c7cd;}

	.group-btn .removeM {background-color: #FF4171;}
	
	
	.icon-headimg{background: #3396fb;border-radius: 100%;width:100upx;height: 100upx;line-height:100upx;text-align:center;color: #FFFFFF;font-weight: bold;font-size: 20px;float: left;background-size:cover;background-position:center center;}
	.list-right{float: left;margin-left: 25upx;margin-right: 30upx;}
	.list-right-1{float: right;color: #A9A9A9;height:100upx;}
	.right-time{font-size:20upx;color:#999;line-height:1.5;margin-bottom:10upx;}
	.news-point{width:28upx;height:28upx;background-color:#FF4171;border-radius:26upx;display:flex;justify-content:center;align-items:center;font-size:0.625rem;color:#fff;float:right;margin-top:10upx;}
	.list-title{width: 350upx;line-height:1.5;overflow:hidden;margin-bottom: 10upx;color:#333;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1;overflow:hidden;}
	.list-detail{width: 350upx;font-size:28upx;color: #999;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1;overflow:hidden;}
	.button-box{box-sizing: border-box;position: fixed;left: 0;bottom: 0;width: 100%;z-index: 998;background: #F8F8F8;}
	.btn-sub{display: -webkit-box;display: -webkit-flex;display: flex;-webkit-box-pack: center;-webkit-justify-content: center;justify-content: center;-webkit-box-align: center;-webkit-align-items: center;align-items: center;-webkit-box-orient: vertical;-webkit-box-direction: normal;float: left;width: 100%;height: 100upx;background: #F8F8F8;color: #7fb2ff;}
	.empty{color: #999999;}
	
	.uni-list-cell-hover {background-color: #eeeeee;}
	
	.waiter .list-right-1{display:flex;align-items:center;}
	.waiter .list-right-1 .news-point{width:16upx;height:16upx;margin-top:0;}
	.waiter .list-right{height:100upx;display:flex;align-items:center;}
	.waiter .list-title{margin-bottom:0;}
	.waiter .icon-headimg{background-color:#8cddad;background-image:url("~@/static/image/member/waiter.png");background-size:50%;background-repeat:no-repeat;}
</style>
