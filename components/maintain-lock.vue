<template>
	<view v-if="is_lock" class="maintainLock">
		<view class="mmbox"></view>
		<view class="updataPop">
			<view class="bgContainer">
				<img class="bg" src="@/static/updata_pop_bg.png" alt="">
				<view class="hj_ig">
					<img src="@/static/updata_hj_ig.png" alt="">
				</view>
			</view>
			<view class="title">
				系统维护中
			</view>
			<view class="version"></view>
			<view class="versionContent">
				<view class="content"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		mounted(){
			this.check_updata()
		},
		data() {
			return {
				returnData:{
					
				},
				is_lock:false,//封锁App状态
			};
		},
		props: {
			
		},
		methods: {
			//检测lock
			check_updata(){
				let self = this;
				uni.request({
					url:"https://api.sstex.co/api/svn/get_index",
					method:"GET",
					dataType:"json",
					success(e){
						self.returnData = e.data.data.svnData
						let file_size = e.data.data.svnData.file_size
						if(file_size=="lock"){
							self.is_lock = true;
						}
					},
					fail(e){
						
					}
				})
			}
		}
	}
</script>

<style>
	/* 遮罩 */
	.mmbox{position:fixed;top:0;bottom:0;left:0;right:0;background-color:rgba(0,0,0,0.6);z-index:100;}
	
	/* 弹窗顶部图片 */
	.updataPop{width:80%;position:fixed;z-index:101;left:50%;top:45%;transform:translate(-50%,-50%);background-color:#fff;border-radius:14upx;}
	.updataPop .bgContainer{position:relative}
	.updataPop .bgContainer .bg{width:100%;}
	.updataPop .bgContainer .hj_ig{width:60%;position:absolute;bottom:-80upx;left:50%;}
	.updataPop .bgContainer .hj_ig img{width:100%;}
	
	/* 文字展示 */
	.updataPop .title{width:100%;text-align:center;font-size:34upx;font-weight:bold;padding:40upx 0;padding-bottom:10upx;}
	.updataPop .title span{font-weight:100;font-size:28upx;}
	.updataPop .version{width:100%;text-align:center;font-size:28upx;color:#999;}
	.updataPop .versionContent{padding:30upx 40upx;box-sizing:border-box;}
	.updataPop .versionContent .content{font-size:24upx;padding-bottom:10upx;color:#666;}
	
	/* 按钮组 */
	.updataPop .handle{padding:0 40upx;padding-bottom:40upx;display:flex;align-items:center;}
	.updataNow{flex:1;}
	.updataPop .handle .default{margin:0 30upx;font-size:28upx;text-align:center;background-color:#132558;color:#fff;line-height:65upx;border-radius:65upx;}
	.updataPop .handle .updating{background-color:#0B1431;}
</style>
