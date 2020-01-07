<template>
	<view class="">
		<!-- <navbar :isshowa="true" style="">{{lang.memberCcenter}}</navbar> -->
		<navbar :isshowa="true" style="">{{user_name}}</navbar>
		<!-- 消息展示区 -->
		<view class="ex-im-msg-list margin-top60" :style="{ height: exIMHeight + 'px' }">
			<scroll-view scroll-y="true" :style="{ height: exIMHeight + 'px' }" :scroll-with-animation="true" :scroll-top="exIMScTop">
				<!-- 加载历史消息 -->
				<!-- <view style="margin-top:10px; text-align:center;">
					<text class="ex-im-system-msg" @tap="getHistoryMsg">{{ historyLodginText }}</text>
				</view> -->
				<!-- 消息展示区 -->
				<exIMMsg :msgs="exIMMsgsList" :userid="exIMUIndex" :group="group"></exIMMsg>
			</scroll-view>
		</view>
		<!-- 消息提交区 -->
		<exIMInput :user="user" :token="exIMToken" :config="exIMConfig"></exIMInput>
	</view>
</template>
<script>
import navbar from '@/pages/index/navbar.vue';
// 引入 IM 组件
import exIMInput from '@/exui/components/exIMInput.vue';
import exIMMsg from '@/exui/components/exIMMsg.vue';
import { mapState,mapGetters, mapMutations } from 'vuex';

// 历史消息分页
var page = 1;
var getHistoryMsgText = '点击加载历史消息';

export default {
	data: function() {
		return {
			userid: 0,
			user: {},
			group: 'service',
			historyLodginText: getHistoryMsgText,
			msglist:[],
			exIMMsgsList:[],
			user_name:""
		};
	},
	onLoad: function(option) {
		var _self = this;
		this.user_name = option.username
		this.userid = option.id;
		// 模拟一个用户信息 实际项目开发用户信息来自您的项目
		// 示例来自本地数据 在 列表页面注册了用户信息
		try {
			var user = _self.$store.getters.getUserData;

			_self.user = user;
			_self.user['toUserId'] = this.userid;
			_self.$store.dispatch('setOpenChat', user);
		} catch (e) {
			//TODO handle the exception
		}
		//this.msglist = this.$store.getters.getMsgsListData
	},
	onBackPress: function() {
		page = 1;
	},
	computed: {
		...mapState({
			exIMMsgs: state => state.websocket.exIMMsgs,			
			exIMScTop: state => state.websocket.exIMScTop,
			exIMHeight: state => state.websocket.exIMHeight,
			exIMUIndex: state => state.websocket.exIMUIndex,
			exIMToken: state => state.websocket.exIMToken,
			exIMConfig: state => state.websocket.exIMConfig,
			exIMNewMsg: state => state.websocket.exIMNewMsg,
			lang:state => state.lang.lang,
		}),
	},
	watch:{
		'$store.state.websocket.change_rate':{
			handler(newValue){
				if(this.$store.state.websocket.exIMMsgsList[this.userid] !=undefined && this.$store.state.websocket.exIMMsgsList[this.userid]!= null && typeof this.$store.state.websocket.exIMMsgsList[this.userid] == "object"){
					this.exIMMsgsList = this.$store.state.websocket.exIMMsgsList[this.userid]
					//storeData.push()
				}
			}
		}
	},
	mounted(){
		this.exIMMsgsList = this.$store.state.websocket.exIMMsgsList[this.userid]
	},
	methods: {
		// 加载历史消息
		getHistoryMsg: function() {
			var _self = this;
			if (this.historyLodginText != getHistoryMsgText) {
				return;
			}
			this.historyLodginText = '加载中 ...';
			this.$userRequest
				.get('getHistoryMsg', {
					fromid: _self.userid,
					page: page
				})
				.then(res => {					
					if (res.data.meta == 'ok') {
						_self.historyLodginText = getHistoryMsgText;
						page++;
						var msg = res.data.data;
						var data = [];
						for (var i = 0; i < msg.length; i++) {
							
							data.push(msg[i]);							
						}
						_self.pushChatlog(data);
						console.log(_self.exIMMsgsList[_self.userid]);
					} else if (res.data.meta == 'empty') {
						_self.historyLodginText = '已经加载全部';
					} else {
						_self.historyLodginText = getHistoryMsgText;
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		pushChatlog: function(message) {
				var _self = this;
		        var chatlog = _self.exIMMsgsList || {};		       
		        var thisChatlog = chatlog[_self.userid];
		        if (thisChatlog) {
		            //避免浏览器多窗口时聊天记录重复保存
					console.log('避免浏览器多窗口时聊天记录重复保存');
		            var nosame;
					thisChatlog.forEach(function(item,index){
						if ((item.timestamp === message.timestamp &&						        
						        item.id === message.id &&
						        item.content === message.content)) {
						    nosame = true;
						}						
					});
					console.log('避免浏览器多窗口时聊天记录重复保存',!(nosame || message.id == _self.userid));
					if (!(nosame || message.id == _self.userid)) {
						for (var i = 0; i < message.length; i++) {							
							_self.exIMMsgsList[_self.userid].unshift(message[i]);							
						}					    
						
					}					
		            if (thisChatlog.length > 20) {
		                thisChatlog.shift();
		            }
		        } else {
		            chatlog[_self.userid] = message;
		        }
				
		    },
			json_array:function (data){  
			     var len=eval(data).length;  
			     var arr=[];  
			     for(var i=0;i<len;i++){  
			      arr[i] =[]; //js中二维数组必须进行重复的声明，否则会undefind  
			      arr[i]['url']=data[i].url;  
			      arr[i]['oldname']=data[i].oldname;  
			     }  
			     return arr;    
			}  
	},
	components: {
		exIMInput,
		exIMMsg,
		navbar
	}
};
</script>
<style>
page {
	background: #f4f5f6;
	height: 100%;
}
.ex-im-msg-list {
	display: flex;
	width: 100%;
	flex: 1;
	margin-bottom: 50px;
}
.ex-im-system-msg {
	background: #c1c1c1;
	color: #fff;
	font-size: 12px;
	line-height: 1.5em;
	padding: 5px 10px;
	display: inline-block;
	border-radius: 3px;
}
.margin-top60 {
	/* margin-top: 62px; */
}
</style>
