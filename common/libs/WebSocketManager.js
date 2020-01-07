
export class WebSocketManager
    {
		private static _isConnecting = false;
		private static _host = "ws://echo.websocket.org";;
		private static _port = 80;
		private static _closeFlg = true;
		static RECONNECTION_INTERVAL = 5000;
		constructor(){			
			if(this._closeFlg)
            {
				this.init();
            }           
		}
		/**
		 * 初始化websocket
		 */
		init(){      
			var that = this;
		    uni.connectSocket({
			  url: that._host+":"+that._port
			});
			uni.onSocketOpen(function (res) {that.__onConnectSuccessHandler(res);});
			uni.onSocketError(function (res) {that.__onErrorHandler(res);});
			uni.onSocketMessage(function (res) {that.__onReceiveMessageHandler(res.data);});
			uni.onSocketClose(function (res) {that.__onCloseHandler(res);});
		}
		/**
		 * 发送消息
		 * @param {Object} message
		 */
        sendMessage(message){
			if(this._isConnecting){
				//console.log("发送消息"+message);
				uni.sendSocketMessage({
					data: message
				});
			}
            
                
        }
		/**
		 * 接收消息处理
		 * @param {Object} msg
		 */
		__onReceiveMessageHandler(msg){
			//console.log('收到服务器内容：' + msg);
			 var messageData=JSON.parse(msg);
			 switch (messageData.type){//type为消息类型
			 	case 'kline':
					uni.$emit('kline',{msg:messageData.data[0]})//把接收到的消息传给指定的监听消息页面
			 		break;
			 	default:
			 		break;
			 }
			 
			//uni.$emit('kline',{msg:msg})
		}
		/**
		 * 连接成功处理函数
		 * @param {Object} res
		 */
        __onConnectSuccessHandler(res){
			//console.log('WebSocket连接已打开！');
			this._closeFlg = false;
			this._isConnecting = true;
        }
		/**
		 * 连接关闭处理函数
		 * @param {Object} res
		 */
        __onCloseHandler(res){
            uni.showToast({
            	icon:'none',
            	title: '网络连接失败，请联系客服解决'
            });
        }
		/**
		 * 网络错误处理函数
		 */
        __onErrorHandler(res){
            //console.log('网络错误处理函数');
        }
		/**
		            * 重新连接
		            */
		            private reconnect(): void
		            {
		                if(!this._isConnecting)
		                {
		                    this._reconnectTimeoutId=setTimeout(
		                        function(): void 
		                        { 
		                            this.connect(); 
		                        }.bind(this)
		                        ,WebSocketManager.RECONNECTION_INTERVAL,this);
		                }
		            }
		
	}
