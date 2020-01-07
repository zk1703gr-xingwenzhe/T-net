<template>
	<view class="page">
		<view class="title_top">
			<view class="status_bar"><!-- 这里是状态栏 --></view>
			<view class="nav">
				<view class="icon iconfont icon-left" @tap="back"></view>
				<view class="">{{lang.langTitle}}</view>
				<view class="">
					
				</view>
			</view>
		</view>
		<!-- <view class="content1">
			<view class="chinese" @tap="changeLang" data-lang='1'>{{lang.langCN}}</view>
			<view class="true">✔</view>
			<view class="english" @tap="changeLang" data-lang='2'>{{lang.langEN}}</view>
			<view class="Korean">{{lang.langKO}}</view>
			<view class="Yen">{{lang.langJP}}</view>
			<view class="content2"></view>
		</view> -->
		<view class="neirou">
			<view class="list" @tap="changeLang" data-lang='1'>
				<view class="">
					中文
				</view>
				<view class="" v-if="language==1">
					✔
				</view>
			</view>
			<view class="list" @tap="changeLang" data-lang='2'>
				<view class="">
					English
				</view>
				<view class="" v-if="language==2">
					✔
				</view>
			</view>
			<view class="list" @tap="changeLang" data-lang='3'>
				<view class="">
					繁體
				</view>
				<view class="" v-if="language==3">
					✔
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import { mapState, mapMutations } from 'vuex';
    export default {
		mounted(){
			switch(this.lang.langType){
				case "Fan":
					this.language = 3
					break;
				case "zh-CN":
					this.language = 1
					break;
				case "en":
					this.language = 2
					break;
			}
		},
		computed: {
			...mapState({				
				lang:state => state.lang.lang
			})
		},
		data(){
			return{
				language:1
			}
		},
        methods: {
			changeLang:function(e){	
				this.language=e.currentTarget.dataset.lang
				this.$store.dispatch("setLang",e.currentTarget.dataset.lang);
				// this.language=e.target.dataset.lang
				// this.$store.dispatch("setLang",e.target.dataset.lang);
			},
			back:function(){
				uni.navigateBack();
			}
        }
    }
</script>
<style>
  page{
  	width: 100%;
  	background-color: #F3F4F5;
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
	.neirou{
		background-color: #FFFFFF;
	}
	.neirou .list{
		width: 650upx;
		height: 90upx;
		background-color: #FFFFFF;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.neirou .list view:nth-child(1),.neirou .list view:nth-child(2){
		height:27upx;
		font-size:28upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:#333333;
		line-height: 27upx;
	}
</style>
