<template>
	<view v-if="is_updata" class="updataApp">
		<view class="mmbox" @tap="close"></view>
		<view class="updataPop">
			<view class="bgContainer">
				<img class="bg" src="@/static/updata_pop_bg.png" alt="">
				<view class="hj_ig">
					<img src="@/static/updata_hj_ig.png" alt="">
				</view>
			</view>
			<view class="title">
				新版本更新
			</view>
			<view class="version">{{returnData.version}}</view>
			<view class="versionContent">
				<view class="content" v-for="(v,key) in returnData.content" :key="key">{{v}}</view>
			</view>
			<view class="handle">
				<view class="updataNow">
					<view @tap="updata" v-if="updata_state==1" class="default btn">立即更新 ({{returnData.file_size}}M)</view>
					<view v-if="updata_state==2" class="default updating">更新中 ({{rate}}%)</view>
					<view v-if="updata_state==3" class="default updateDone">更新完成</view>
					<view v-if="updata_state==4" class="default updateDone">安装中</view>
					<view v-if="updata_state==5" class="default updateDone">安装完成</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onReady() {
			this.check_updata()
		},
		mounted(){
		},
		data() {
			return {
				returnData:{
					version:"",
					file_size:"",
					state:1,
					file:"",
					content:[]
				},
				updata_state:1,//1未更新，2下载中，3下载完成，4安装中，5安装完成
				rate:0,//更新进度
				is_updata:false,//是否需要更新
			};
		},
		props: {
			
		},
		methods: {
			//取消更新
			close(){
				// if(this.returnData.state != 1){
				// 	this.is_updata=false
				// }
			},
			//立即更新
			updata(){
				this.download_wgt(this.returnData.file)
			},
			
			//下载wgt文件
			download_wgt(_url){
				let dtask = plus.downloader.createDownload(_url,{
					filename:"_downloads/updatas/tweb_wgt"+Date.parse(new Date())+".wgt"
				});
				dtask.addEventListener("statechanged",this.onStatechanged,false)
				dtask.start()
				this.updata_state=2
			},
			//下载任务状态改变时
			onStatechanged(download,status){
				if(download.state==3){
					let rateFloat = parseFloat(download.downloadedSize) / parseFloat(download.totalSize)
					this.rate = (parseFloat(rateFloat)*100).toFixed(2)
				}
				if(download.state==4 && status==200){
					this.updata_state=3
					this.install_wgt(download.filename);
				}
			},
			//安装wgt包
			install_wgt(path){
				let self = this
				this.updata_state=4
				plus.runtime.install(path,{force:true}, function() {
					this.updata_state=4
					plus.nativeUI.alert("更新成功！", function() {
						plus.runtime.restart();
					});
				}, function(e) {
					//errorback
					plus.nativeUI.alert(e.code,e.message);
				});
			},
			//检测更新
			check_updata(){
				let self = this;
				uni.request({
					url:"https://api.sstex.co/api/svn/get_index",
					method:"GET",
					dataType:"json",
					success(e){
						self.returnData = e.data.data.svnData
						let current_version = parseInt(e.data.data.svnData.version.replace(/\./g,""))
						let local_version = parseInt(self.$twebVersion.replace(/\./g,""))
					
						if(current_version>local_version){
							self.is_updata = true;
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
