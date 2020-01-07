<template name="exHeader">
	<view>
		<navigator class="ex-header" :url="url" :open-type='openType' v-if="url != ''">
			<view class="logo"><image :src="imgurl" mode="widthFix"></image></view>
			<view class="content">
				<view class="title ex-blod">{{title}}</view>
				<view class="desc">{{desc}}</view>
			</view>
			<view class="icon-right"></view>
		</navigator>
		<view class="ex-header" :url="url" :open-type='openType' v-if="url == ''">
			<view class="logo"><image :src="imgurl" mode="widthFix"></image></view>
			<view class="content">
				<view class="title ex-blod">{{title}}</view>
				<view class="desc">{{desc}}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: "exHeader",
	props: {
		title : {
			type : String,
			default : "ExUI"
		},
		url: {
			type: String,
			default: ""
		},
		openType: {
			type: String,
			default: ""
		},
		desc: {
			type: String,
			default: ""
		},
		imgurl : {
			type : String,
			default: "../../static/logo.png"
		}
	},
	data() {
		return {
			
		};
	}
}
</script>
<style>
.ex-header{width:92%; padding:20px 4%; background:#FFF; display:flex; flex-wrap:nowrap; position:relative;  border-bottom:1px solid #E9E9E9;}
.ex-header .logo{width:60px; height:60px; margin:5px; flex-shrink:0;}
.ex-header .logo image{width:60px; height:60px; border-radius:5px;}
.ex-header .content{width:100%; margin:10px; margin-right:20px; height:60px;}
.ex-header .content .title{font-size:18px; line-height:22px;}
.ex-header .content .desc{line-height:2em; color:#7F7F7F; margin-top:3px; font-size:13px;}
.ex-header .icon-right{width:30px; height:100%; line-height:100%; font-family:"iconfont" !important; font-style:normal; position:absolute; z-index:1; top:0; right:0; display: flex; align-items:center; justify-content:center; font-size:22px;} 
.ex-header .icon-right:before{content:"\e60c"; color:#B2B2B2;}
</style>