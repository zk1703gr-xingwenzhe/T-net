<template name="exIMMsg">
	<view id="scrollview" class='ex-im' :style="{height: style.contentViewHeight + 'px'}">
		<scroll-view id="scrollview" class="chat-window" scroll-y="true" :style="{height: style.contentViewHeight + 'px'}" :scroll-with-animation="true" :scroll-top="scrollTop">
		<view class="m-item" v-for="(item, index) in msgs" :key="index">
			<block>
				<!-- 文本消息 -->
				<view class="ex-im-msg" :class="[userid == item.fromid ? 'ex-im-msg-right' : 'ex-im-msg-left']">
					<view class="face"><image :src="showAvatar(item.avatar)" mode="widthFix"></image></view>
					<view class="ex-im-content-in">
						<view class="ex-im-name">{{item.nickname}}</view>
						<view>
							<view class="content">
								<image style="border-radius:5px;width:120px;" mode="widthFix" :src="changeContent(item.content).content" :data-img="changeContent(item.content).content" v-if="changeContent(item.content).type=='image'" @click="showImgs"></image>
								<text v-if="changeContent(item.content).type == 'text'">{{changeContent(item.content).content}}</text>
							</view>
						</view>
						<view class="timer"><text>{{ showDate(item.timestamp) }}</text></view>
					</view>
				</view>
				
				
				<!-- 系统消息 -->
				<view class="ex-im-msg" v-if="item.ctype == 'system'">
					<view class="ex-im-system-msg">{{item.msg}}</view>
				</view>
				<view></view>
			</block>
		</view>
		<view style="height:20upx;"></view>
		</scroll-view>
	</view>
</template>
<script>
	var date = require('@/exui/tool/date.js');
export default {
	watch:{
		'msgs':{
			handler(newValue){
				console.log("handle")
				this.scrollToBottom()
			}
		}
	},
	name: "exIMMsg",
	props: {
		msgs : {
			type : Array,
			default : function(){
				return []
			},
		},
		userid: {
			type: Number,
			default:0,
		},
		group :{
			type : String,
			default : ""
		}
	},
	data() {
		return {
			player : null,
			playIndex : -1,
			headimg:'',
			scrollTop:9999,
			style: {
				pageHeight: 0,
				contentViewHeight: 0,
				footViewHeight: 90,
				mitemHeight: 0
			},
		}
	},
	created: function(){
		const res = uni.getSystemInfoSync();   //获取手机可使用窗口高度     api为获取系统信息同步接口
		this.style.pageHeight = res.windowHeight;
		this.style.contentViewHeight = res.windowHeight - uni.getSystemInfoSync().screenWidth / 750 * (100) - 70; //像素   因为给出的是像素高度 然后我们用的是upx  所以换算一下 
		this.scrollToBottom();   //创建后调用回到底部方法
		var _self = this;
		// #ifndef H5
		this.player = uni.getBackgroundAudioManager();
		this.player.onPlay(() => {});
		this.player.onEnded(function(){
			var cIndex     = _self.playIndex;
			if(cIndex < 0){return false;}
			_self.playIndex = -1;
			for (var i = cIndex + 1; i < _self.msgs.length; i++) {
				if (_self.msgs[i].contentType == 'voice') {
					_self.playNow(_self.msgs[i].content, i);
					break;
					return;
				}
			}
		});
		// #endif
	},
	mounted(){
		console.log("asd")
		this.scrollToBottom()
	},
	methods: {
		scrollToBottom: function () {
			let that = this;
			let query = uni.createSelectorQuery().in(this);
			query.selectAll('.m-item').boundingClientRect();
			query.select('#scrollview').boundingClientRect();
			query.exec((res) => {
				that.style.mitemHeight = 0;
				console.log(res)
				res[0].forEach((rect) => that.style.mitemHeight = that.style.mitemHeight + rect.height + 40)   //获取所有内部子元素的高度
　　　　　　　　　　 // 因为vue的虚拟DOM 每次生成的新消息都是之前的，所以采用异步setTimeout    主要就是添加了这定时器
　　　　　　　	setTimeout(() => {
					console.log(that.style.mitemHeight,that.style.contentViewHeight - 100)
		  　	　	if (that.style.mitemHeight > (that.style.contentViewHeight - 100)) {   //判断子元素高度是否大于显示高度
						that.scrollTop = that.style.mitemHeight - that.style.contentViewHeight    //用子元素的高度减去显示的高度就获益获得序言滚动的高度
						console.log(that.scrollTop)
		  　　		}
　　　　　　　　　}, 100)
　　　　　　	})
	  },
	  showDate:function(timestamp){
		  return date.formatDateTime(timestamp,'str')
	  },
	  showAvatar:function(avatar){
	  	return '../../../static/image/member/avatar/' + avatar + '.png';
	  },
		// 播放语音
		playVoice: function (e) {
			// #ifdef H5
			uni.showToast({title:"请使用 APP 或 小程序聆听语音", icon:"none"});
			return ;
			// #endif
			var voicelUrl = e.currentTarget.dataset.voice;
			var index = e.currentTarget.dataset.index;
			if (this.playIndex == -1){return this.playNow(voicelUrl, index);}
			var _self = this;
			if (this.playIndex == index) {
				wx.getBackgroundAudioPlayerState({
					success(res) {
						const status = res.status
						switch (status) {
							case 0:
							_self.player.play();
							break;
							case 1:
							_self.player.pause();
							break;
							default:
							_self.player.play();
						}
					}
				});
			} else {
				this.player.stop();
				this.playNow(voicelUrl, index);
			}
		},
		// 语音播放基础函数
		playNow: function (voicelUrl, index){
			this.playIndex = index;
			this.player.src = voicelUrl;
			this.player.title = "exUI";
			return true;
		},
		// 图片预览
		showImgs : function(e){
			var imgs        = [];
			var imgsCurrent = e.currentTarget.dataset.img;
			for (var i = 0; i < this.msgs.length; i++) {
				if (this.msgs[i].contentType == 'img') {
					imgs.push(this.msgs[i].content);
				}
			}
			wx.previewImage({urls : imgs, current : imgsCurrent});
		},
		//转换内容
		changeContent:function(content){
			let contents = {type:"text"};
			//支持的html标签
			var html = function(end) {
				return new RegExp('\\n*\\[' + (end || '') + '(pre|div|p|table|thead|th|tbody|tr|td|ul|li|ol|li|dl|dt|dd|h2|h3|h4|h5)([\\s\\S]*?)\\]\\n*', 'g');
			};
			content = (content || '')
			.replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/'/g, '&#39;')
			.replace(/"/g, '&quot;') //XSS
			.replace(/@(\S+)(\s+?|$)/g, '@<text>$1</text>$2') //转义@
			.replace(/\s{2}/g, '&nbsp') //转义空格
			.replace(/img\[([^\s]+?)\]/g, function(img) {
				let objectResult = {
					type:"image",
					content:img.replace(/(^img\[)|(\]$)/g, '')
				}
				contents = objectResult
				return objectResult;
			})
			.replace(/face\[([^\s\[\]]+?)\]/g, function(face) { //转义表情
				//console.log(face);
				var alt = face.replace(/^face/g, '');
				return '<image alt="' + alt + '" title="' + alt + '" src="' + faces[alt] + '"></image>';
			})
			.replace(html(), '\<$1 $2\>').replace(html('/'), '\</$1\>') //转移HTML代码
			.replace(/\n/g, '<br>') //转义换行
			if(contents.type == "text"){
				contents['content'] = content
			}
			return contents;
		}
	},
	
}
</script>
<style>
.ex-im{padding:0 10px;}
.ex-im-system-msg{background:#C1C1C1; width:auto; color:#FFF; font-size:12px; line-height:1.5em; padding:5px 10px; margin:0 auto; display:inline-block; border-radius:3px;}
.ex-im-msg{margin:15px 0; flex-wrap:nowrap; display:flex;}
.ex-im-msg .face{width:44px; height:44px; overflow:hidden; flex-shrink:0;}
.ex-im-msg .face image{width:44px; height:44px; border-radius:4px;}
.ex-im-name{line-height:15px; height:15px; font-size:11px; color:#3688FF; text-indent:10px;}
.ex-im-content-in{margin:0 5px; width:100%; overflow:hidden;}
.ex-im-content-in > view{width:100%; overflow:hidden;}
.ex-im-content-in .content{padding:8px 15px; margin-top:6px; background:#FFF; line-height:1.5em; border-radius:3px; word-break:break-all; display:inline-block; position:relative;}
.ex-im-content-in .content::after{content:""; position:absolute; height:10px; width:10px; background:#FFFFFF; top:12px; transform: translate(0,-50%) rotate(45deg); z-index:2;}
.ex-im-content-in .timer{margin-top:5px; line-height:15px;}
.ex-im-content-in .timer text{font-size:10px; margin-left:10px; color:#8788A3;}
.ex-im-msg-left .content{margin-left:10px;}
.ex-im-msg-left .content::after{left:-4px;}

.ex-im-msg-right .content{margin-right:10px;}
.ex-im-msg-right .content::after{right:-4px; background:#00B26A;}
.ex-im-msg-right{flex-direction:row-reverse;}
.ex-im-msg-right .ex-im-name{display:none;}
.ex-im-msg-right .content{float:right; background:#00B26A; color:#FFFFFF; margin-top:0;}
.ex-im-msg-right .timer{text-align:right;}
.ex-im-msg-right .timer text{text-align:right; margin-right:10px;}

.ex-im-content-in .img{padding:0 !important; font-size:0; background:#FFF;}
.ex-im-content-in .img::after{width:0 !important; height:0 !important;}
.ex-im-content-in .img image{width:400upx; border-radius:5px;}

.ex-im-voice-msg{font-size:10px; line-height:22px !important;}
.ex-im-voice-msg text{font-size:20px;}
.ex-im-playing{background:#007AFF !important; color:#FFF;}
.ex-im-playing text{color:#FFF;}
.ex-im-playing::after{background:#007AFF !important;}
.chatimage{
	width: 70upx;
	height: 70upx;
}

@font-face {
	font-family: "exIMFont"; 
	src:url('data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAARIAAsAAAAABpAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADMAAABCsP6z7U9TLzIAAAE8AAAARAAAAFY+dknyY21hcAAAAYAAAABKAAABcOkou6pnbHlmAAABzAAAAJgAAACcsQjN8WhlYWQAAAJkAAAALwAAADYTkbRlaGhlYQAAApQAAAAcAAAAJAfeA4NobXR4AAACsAAAAAgAAAAICAAAAGxvY2EAAAK4AAAABgAAAAYATgAAbWF4cAAAAsAAAAAgAAAAIAEQADxuYW1lAAAC4AAAAUUAAAJtPlT+fXBvc3QAAAQoAAAAHgAAAC/RhmVweJxjYGRgYOBikGPQYWB0cfMJYeBgYGGAAJAMY05meiJQDMoDyrGAaQ4gZoOIAgCKIwNPAHicY2BkYWCcwMDKwMHUyXSGgYGhH0IzvmYwYuRgYGBiYGVmwAoC0lxTGBxeMLxgYG7438AQw9zA0AAUZgTJAQDdeQvneJztkLENgDAQA8/KQ4EYgSo1s1Cxf80WycfAFrF0lnz66oEFKMmZBOhGjFxpZV/Y7IPqmxj+obW/c4cbrczs7uNb/tUL6i3WCXEAAHicY2BhYPj/mVmKmZeBj0GaQZ1Bn4GBkY+RXdyO0URNH0jLMTIbKBmLmwmAOGIC7CKm4mYmYLaIOoShxHSL0dNNJyA4OIBZl8XN8xsTk25VFbMuc+ppXX9/Fh1muzpFReaQcFbGhuQtnroBpx+fBCpkdt/8b7FOA6N3HbMOS86/l2ysrLrBt8KAHOfljMqxyszBwQAGoSFheJxjYGRgYADih0telMfz23xl4GZhAIEblhYmCPr/ZxYGZl4gl4OBCSQKAC7VCZ8AeJxjYGRgYG7438AQw8IAAkCSkQEVMAEARwgCawQAAAAEAAAAAAAAAABOAAAAAQAAAAIAMAAEAAAAAAACAAAACgAKAAAA/wAAAAAAAHicZY9NTsMwEIVf+gekEqqoYIfkBWIBKP0Rq25YVGr3XXTfpk6bKokjx63UA3AejsAJOALcgDvwSCebNpbH37x5Y08A3OAHHo7fLfeRPVwyO3INF7gXrlN/EG6QX4SbaONVuEX9TdjHM6bCbXRheYPXuGL2hHdhDx18CNdwjU/hOvUv4Qb5W7iJO/wKt9Dx6sI+5l5XuI1HL/bHVi+cXqnlQcWhySKTOb+CmV7vkoWt0uqca1vEJlODoF9JU51pW91T7NdD5yIVWZOqCas6SYzKrdnq0AUb5/JRrxeJHoQm5Vhj/rbGAo5xBYUlDowxQhhkiMro6DtVZvSvsUPCXntWPc3ndFsU1P9zhQEC9M9cU7qy0nk6T4E9XxtSdXQrbsuelDSRXs1JErJCXta2VELqATZlV44RelzRiT8oZ0j/AAlabsgAAAB4nGNgYoAALgbsgImRiZGZgTWxNCUzn4EBAAzjAi0AAA=='); /* iOS 4.1- */
}
.exIMFont {font-family:"exIMFont" !important; font-size:16px;}
.icon-audio:before {content:"\e800";}
</style>