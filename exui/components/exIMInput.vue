<template name="exIMMsg">
	<view>
		<view class="ex-im-footer">
			<view class="ex-im-menus exIMFonts icon-voice" v-if="voiceBtnShow" @tap="showRec"></view>
			<view class="ex-im-menus exIMFonts icon-photograph" @tap="chooseImg"></view>
			<view class="ex-im-input"><input type="text" v-model="inputMsg" @confirm="sendTextMsg" /></view>
			<view class="ex-items" style="padding:0 8px; margin-right:6px;" @tap="sendTextMsg">{{lang.memberSend}}</view>
		</view>
		
	</view>
</template>
<script>
var bgAudioMannager = {};
import { PbMessage } from '@/common/libs/PbMessage';
var pb = new PbMessage();
import { mapState,mapGetters, mapMutations } from 'vuex';
export default {
	name: 'exIMMsg',
	props: {
		user: {
			type: Object,
			default: function() {
				return {};
			}
		},
		token: {
			type: String,
			default: ''
		},
		config: {
			type: Object,
			default: function() {
				return {};
			}
		}
	},
	data() {
		return {
			uploading: false,
			recShow: false,			
			inputMsg: '',
			recorderManager: null,
			recing: false,
			recLength: 1,
			recTimer: null,
			tmpVoice: '',
			voiceLen: 0,
			voiceBtnShow: false,
			// 播放相关
			player: null,
			playTxt: '试听语音'
		};
	},
	computed: {
		...mapState({
			exIMMsgsList:state => state.websocket.exIMMsgsList,
			lang:state => state.lang.lang
		}),
	},
	created: function() {
		var _self = this;
	},
	methods: {
		
		// 发送文本消息
		sendTextMsg: function() {
			if (this.inputMsg < 1) {
				return false;
			}
			
			if(this.exIMMsgsList[this.user.toUserId] == undefined){
				this.exIMMsgsList[this.user.toUserId]=[{
					avatar:uni.getStorageSync('userinfo').user_avatar,
					content:this.inputMsg,
					fromid:this.user.id,
					id:this.user.toUserId,
					nickname:"",
					timestamp:Date.parse(new Date())
				}]
			}else{
				this.exIMMsgsList[this.user.toUserId].push({
					avatar:uni.getStorageSync('userinfo').user_avatar,
					content:this.inputMsg,
					fromid:this.user.id,
					id:this.user.toUserId,
					nickname:"",
					timestamp:Date.parse(new Date())
				})
			}
			this.$store.dispatch("set_change_rate")
			var buffer = pb.sendFriendMsg({ type: 'friend',content:this.inputMsg,timestamp:(Date.parse(new Date())).toString(),userId:this.user.id.toString() ,toUserId:this.user.toUserId});
			uni.sendSocketMessage({
				data: buffer
			});

			
			this.inputMsg = '';
		},
		// 选择图片
		chooseImg: function() {
			if (this.uploading) {
				return false;
			}
			var _self = this;
			uni.showLoading({ title: this.$store.state.lang.lang.memberSelectImage});
			this.uploading = true;
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
				success: res => {
					uni.showLoading({ title: this.$store.state.lang.lang.memberImagebsent});
					const tempFilePaths = res.tempFilePaths;
					const uploadTask = uni.uploadFile({
						url: _self.config.serverUrl,
						filePath: tempFilePaths[0],
						name: 'file',
						success: uploadFileRes => {
							let res = eval('('+uploadFileRes.data+')')
							if (res.code == 0) {
								if(_self.exIMMsgsList[_self.user.toUserId] == undefined){
									_self.exIMMsgsList[_self.user.toUserId]=[{
										avatar:uni.getStorageSync('userinfo').user_avatar,
										content:"img["+res.data.img_file+"]",
										fromid:_self.user.id,
										id:_self.user.toUserId,
										nickname:"",
										timestamp:Date.parse(new Date())
									}]
								}else{
									_self.exIMMsgsList[_self.user.toUserId].push({
										avatar:uni.getStorageSync('userinfo').user_avatar,
										content:"img["+res.data.img_file+"]",
										fromid:_self.user.id,
										id:_self.user.toUserId,
										nickname:"",
										timestamp:Date.parse(new Date())
									})
								}
								_self.$store.dispatch("set_change_rate")
								var buffer = pb.sendFriendMsg({ type: 'friend',content:"img["+res.data.img_file+"]",timestamp:(Date.parse(new Date())).toString(),userId:_self.user.id.toString() ,toUserId:_self.user.toUserId});
								uni.sendSocketMessage({
									data: buffer,
									complete: function() {
										setTimeout(function() {
											_self.uploading = false;
											uni.hideLoading();
										}, 500);
									},
									fail: function(e) {
										_self.uploading = false;
										//console.log('消息发送失败');
									}
								});
								
							} else {
								setTimeout(function() {
									uni.hideLoading();
								}, 500);
							}
						},
						fail: function(e) {
							_self.uploading = false;
							
						}
					});
				},
				fail: function() {
					uni.hideLoading();
				}
			});
		}
	}
};
</script>
<style>
@font-face {
	font-family: 'exIMFonts';
	src: url('data:font/truetype;charset=utf-8;base64,d09GMgABAAAAAASoAAsAAAAACpAAAARbAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDMgqILIZ4ATYCJAMUCwwABCAFhG0HSxsHCcgOJQUABgUAAMBk8EB6fW8yk/3Z7Cd4BLPXQW6vA9B99wc4f67lvzL5jC8R2YVkAS+XAsN4QPB1pPqF+wfHUj8K/8Hyvu1BXjGyLDq25lGBDagb1ySRuNkEfcvRGr5iXEVcDQGYRBOJS2OXykbwRoFqQYpmTZc48HZYUBEkgaF3BBypENvQMbT12hNgq/b24g35wgANXYLX6jelSITc52EvKqRlDzJKWljFuYDbcSCBTAAFYkGgZxZuhipT05hBv+dOLYCJgYb2POx50vPyFxW2DZaiQzqT/8MDDYlCgHCAGk+KrY0reB4m8aDB8yQeJDwv50HBiwrZtGh0ur0JhAGiEhCdYIisoERHonui2lcmOM2zJHp7m6a+suXpoNZng9tfDG17vkyohugi+3dbns4wdwWyFuTaGyL2DH1o+v/RweMTg2Y6LqngIEk2qXNSr6zPX9naOrilZVBb25D29qFN+/Nh99riT7Z3vdsad6xlyKkr1tWNZ09eGz6kkbRWS7iliav7hBVp1hm64Q4O3rMhcFCzzBa4ywoa3MgWtHtjyNAmVUhYR3kdd6O7DasHDfpeN2jwb7vbQFjoV6Fa7o6VK9v0qChdVrZdRURhRbwW3rqlUHWLS5mMreMeM3nRSDO2TbYUy16uGosg002pTpZwphre5b7iZKa3S1VPqnNboCS+PE4Hmd9c9SJ2Lk+1zG3JjnAsPmH0XBpvDWJl+WX186e6zIWKSG6z0np0qthYRZSdTEQULL34fb9uJZ66RKiru0eP4K4lSXcWecR/xPf20/WbFi0Bz/8qJrcUz0VLHq9jd7SqyEjVyoWKSFZYZV4TL99QQihCuiGEghgP3sLyqYFyCAlv/7hDnEsCyWXFCOnjZkAVINnlhrLtTEJFJEusvRjRsGVZpxpGRH+psDBFlC1MRCRsj0k9bjZvPtcjYrOpiXamCVUROssu7hLWO2VNhdl5+yxFRU/Z8/pcBwNGkpu2yNAKAPaY/CNXAvak/CmXAfaM/CYXH8o/w6M7d+aODar8ZrgUAB2fJ5zRauxBhbTgeNSSWHrgShOOqa8crbp6d0qSt09n10Gh0T6LTOBwDfjzrxh7EEUmBAZBFmh4EAUSg0SkwmaCjotCcGBQAyYZlBzvIgCKG0I5gXTGAAS+nIKGN9dB4ssnUmH/QCeY/+DAV0gwGSICzugiWUw3GxZgjmER8V1IESyTCDvz1YvrsdSmc9Qu18jNmDqVIIrLznUnS7CJaRH7ONuleMYIItQyUDFcD+u6hWxqqVhg0TJjdnpMzpSgJ4oWLAN8aYCC4WBgRBA8XSAUBCxMiLIww9fz+vVgJNrQ4aARXT/8zWAoTpTVI+KIJjYBskRjJuralEon7UjEw2iEgCC3QgsDRDF1YXQes0DYwZupYAQY0cgZIjbpxNDJSFJNdPU6Yx5LT5ueeAZdaEIKJXThwGPGdM60RcRz0WJbUY1TF8sb8IrH8sVdigkAAA==')
		format('truetype');
}
.exIMFonts {
	font-family: 'exIMFonts' !important;
	font-size: 15px;
	font-style: normal;
	color: #5e5e5e;
}
.icon-voice:before {
	content: '\e63a';
}
.icon-photograph:before {
	content: '\e619';
}
.icon-close:before {
	content: '\e625';
}
.icon-kbd {
	content: '\e73b';
}

.ex-im-footer {
	display: flex;
	background: #ffffff;
	width: 100%;
	position: fixed;
	left: 0;
	bottom: 0;
	height: 50px;
	flex-wrap: nowrap;
	overflow: hidden;
	box-shadow: 1px 1px 6px #888;
}
.ex-im-footer .ex-items {
	width: auto;
	line-height: 50px;
	flex-shrink: 0;
}
.ex-im-menus {
	width: 44px;
	height: 50px;
	flex-shrink: 0;
	line-height: 50px;
	text-align: center;
	font-size: 32px;
}
.ex-im-input {
	width: 100%;
	margin: 5px;
	padding: 0 8px;
	background: #f4f5f6;
	border-radius: 5px;
	height: 40px;
	flex-wrap: nowrap;
	margin-left: 10px;
}
.ex-im-input input {
	width: 100%;
	background: #f4f5f6;
	height: 20px;
	margin: 8px 0;
	line-height: 20px;
	border-radius: 5px;
}

.ex-im-record {
	width: 100%;
	position: fixed;
	left: 0;
	bottom: 0;
	background: #fff;
	padding: 30px 0;
	padding-bottom: 50px;
	z-index: 11;
	box-shadow: 1px 1px 6px #888;
}
.ex-im-record-close {
	width: 50px;
	height: 50px;
	position: absolute;
	top: 0px;
	right: 0px;
	z-index: 100;
	text-align: center;
	line-height: 50px;
	color: #ccc;
	font-size: 20px;
}
.ex-im-record-txt {
	text-align: center;
	line-height: 30px;
	padding-bottom: 10px;
	color: #ccc;
}
.ex-im-record-btn {
	width: 60px;
	height: 60px;
	margin: 0 auto;
	border: 5px solid #f1f2f3;
	border-radius: 100%;
	background: #00b26a;
}
.ex-im-recording {
	background: #ff0000;
	animation: fade linear 2s infinite;
}
@keyframes fade {
	from {
		opacity: 0.1;
	}
	50% {
		opacity: 1;
	}
	to {
		opacity: 0.1;
	}
}
.ex-im-record-txt text {
	color: #00b26a;
	padding: 0 12px;
}

.ex-im-send-voice {
	margin-top: 12px;
	color: #00ba62;
	text-align: center;
}
.ex-im-send-voice text {
	margin: 0 15px;
	color: #00ba62;
}
</style>
