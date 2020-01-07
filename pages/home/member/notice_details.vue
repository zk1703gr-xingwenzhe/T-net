<template>
	<view class="main">
		<!-- 导航 -->
		<!-- <view class="title_top">
			<view class="status_bar"></view>
			<view class="nav">
				<view class="icon iconfont icon-left" @tap="back"></view>
				<view class="">{{lang.memberParticulars}}</view>
				<view class=""></view>
			</view>
		</view> -->
		<view class="conter">
			<view class="title_name">
				{{name}}
			</view>
			<view class="titel_time">
				{{edittime}}
			</view>
			<view class="neirou" v-html="content">
				<!-- {{content}} -->
				<!-- <rich-text :nodes="content"></rich-text> -->
			</view>
		</view>
	</view>
</template>
<script>
	import { mapState, mapMutations } from 'vuex';
    export default {
        data() {
            return {
				parameter:'',
				name:'',
				edittime:'',
				content:''
            }
        },
		computed: {
			...mapState({				
				lang:state => state.lang.lang
			})
		},
		onLoad(option) {
			this.parameter=option.id;
			this.getnotice_details()
		},
        methods: {
			back:function(){
				uni.navigateBack();
			},
			getnotice_details:function(){
				this.$http.post('getNewsDetails',{
					id:this.parameter,
				}).then(res => {
					if(res.data.code==0){
						this.name=res.data.data.newsData.name
						this.edittime=res.data.data.newsData.edittime
						// this.content=res.data.data.newsData.content
						// this.content = '<p>' + this.content.replace(/\n*$/g, '').replace(/\n/g, '</p> <p>') + '</p>'
						this.content=res.data.data.newsData.content.replace(/<\/?o:p[^>]*>/gi,'<span>')//去除<o:p>标签
						this.content=this.content.replace(/<\/?font[^>]*>/gi,""); //去除font标签
						const regex = new RegExp('<img', 'gi');
						this.content =this.content.replace(regex, '<img style="max-width: 90%;"');//设置图片的宽度
						this.content =this.content.replace(/&nbsp;/gi,'<span style="display:inline-block; width:0.25em;"></span>')//&nbsp;替换成span给宽度
						// console.log(this.content);
					}
				}).catch(err => {
					console.log(err);
				});
			}
        }
    }
</script>
<style>
	page{
		width: 750upx;
		background-color: #FFFFFF
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
		width: 710upx;
		margin: 0 auto;
	}
	.title_name{
		height:34upx;
		font-size:36upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:#333333;
		line-height: 34upx;
		margin-top: 44upx;
	}
	.titel_time{
		height:19upx;
		font-size:24upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#999999;
		line-height: 19upx;
		margin-top: 38upx;
	}
	.neirou{
		font-size:30upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#515151;
		line-height: 35upx;
		margin-top: 49upx;
	}
</style>
