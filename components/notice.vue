<template>
	<view v-if="isShow" class="notice">
		<view class="mmbox"></view>
		<view class="noticePop">
			<view class="title">
				<view class="left">
					<view class="inner">
						<view class="name">{{lang.memberBulletin}}</view>
						<view class="englishName">System notice</view>
					</view>
				</view>
				<view class="right">
					<view class="img">
						<image src="/static/notice_title_ig.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="content" v-html="returnData.content">
			</view>
			<view class="btns">
				<button @tap="close_pop" hover-class="active" type="default" size="mini">{{lang.financialSure}}</button>
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
		beforeMount(){
			this.check_updata()
		},
		data() {
			return {
				returnData:{
					name:"",
					content:""
				},
				isShow:false,
				id:""

			};
		},
		props: {
			
		},
		methods: {
			//检测lock
			check_updata(){
				let self = this;
				this.$http.get('getNewsPop',{}).then(res => {
					if(res.data.code==0){
						if(uni.getStorageSync("currentNewsId") == res.data.data.newData.id){
							
						}else{
							self.isShow = res.data.data.status==1?true:false;
						}
						
						self.returnData = res.data.data.newData
					}
				}).catch(err => {
					console.error(err)
				});
			},
			close_pop(){
				let self = this
				uni.setStorage({
					key:"currentNewsId",
					data:self.returnData.id
				})
				this.isShow=false
			}
		}
	}
</script>

<style lang="scss">
	.notice{
		/* 遮罩 */
		.mmbox{position:fixed;top:0;bottom:0;left:0;right:0;background-color:rgba(0,0,0,0.6);z-index:100;}
		
		.noticePop{width:80%;position:fixed;z-index:101;left:50%;top:45%;transform:translate(-50%,-50%);background-color:#fff;border-radius:14upx;padding-bottom:30upx;
			.title{width:100%;display:flex;
				&>view{flex:1;}
				.left{display:flex;justify-content:center;align-items:center;
					.inner{display:table;}
					.inner .name{font-size:36upx;color:#000;font-weight:bold;}
					.inner .englishName{font-size:24upx;color:#999;font-weight:100;}
				}
				.img{margin:-20upx -10upx 0 0;}
				.img image{width:100%;}
			}
			.content{height:500upx;padding:30upx;box-sizing:border-box;font-size:24upx;color:#666;line-height:30px;box-shadow:inset 0px -2px 2px 0px rgba(0, 0, 0, 0.2);padding:0 10upx;box-sizing:border-box;overflow-y:auto;padding:0 30upx;margin-bottom:30upx}
			.btns{width:100%;display:flex;align-items:center;
				button{flex:1;margin:0 40upx;background-color:#99A7D8;color:#fff;}
				.active{opacity:0.5;}
			}
		}
	}
</style>
