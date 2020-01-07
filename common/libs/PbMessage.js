var ProtoBuf = require('protobufjs');
var PbJson = require("../../static/protocol.json");
export class PbMessage {
	_root;
	_messageClass;
	_requestClass;
	_msgType;
	constructor() {
		this._root = ProtoBuf.Root.fromJSON(PbJson);
		this._messageClass = this._root.lookupType('Tweb.Message');
		this._requestClass = this._root.lookupType('Tweb.Request');
		this._msgType = this._root.lookupEnum('Tweb.Cmd');
	}
	//{ userId: '123',sex:1,nickName:'alipro',headImageUrl:'2' ,st:9999.99,numUserId:'268986'}
	/**
	 * Login Data Packing
	 * @param {Object} userinfo
	 */
	loginInfoRequest(userinfo) {
		var login = this._root.lookupType('Tweb.PlayerPersistentData');
		var loginMessage = login.create(userinfo);
		var loginRequest = this._root.lookupType('Tweb.LoginRequest');
		var loginRequestInfo = {
			playerPersistentData: loginMessage
		}
		var loginRequestMessage = loginRequest.create(loginRequestInfo);
		var requestfile = {
			login: loginRequestMessage
		}
		var requestMessage = this._requestClass.create(requestfile);
		var messageC = {
			msgType: [this._msgType.values['Login_Request']],
			sequence: 1,
			request: requestMessage
		};
		var messages = this._messageClass.create(messageC);
		//console.log(messages);
		var buffer = this._messageClass.encode(messages).finish();
		//console.log(buffer);
		return this.Bytes2HexString(buffer);
	}
	/**
	 * send message
	 * @param {Object} message
	 */
	sendFriendMsg(message){
		var msgData = this._root.lookupType('Tweb.MessageData');
		var Message = msgData.create(message);
		var SendMessageRequest = this._root.lookupType('Tweb.SendMessageRequest');
		var SendMessageRequestInfo = {
			msgDataList:Message
		}
		var RequestMessage = SendMessageRequest.create(SendMessageRequestInfo);
		var requestfile = {
			sendMessage: RequestMessage
		}
		var requestMessage = this._requestClass.create(requestfile);
		var messageC = {
			msgType: [this._msgType.values['SendMessage_Request']],
			sequence: 3,
			request: requestMessage
		};
		var messages = this._messageClass.create(messageC);
		var buffer = this._messageClass.encode(messages).finish();
		return this.Bytes2HexString(buffer);
	}
	betRequest(message){
		var BetRequest = this._root.lookupType('Tweb.BetRequest');
		var BetData = BetRequest.create(message);		
		var RequestInfo = {
			bet:BetData
		}
		var requestMessage = this._requestClass.create(RequestInfo);
		var messageC = {
			msgType: [this._msgType.values['Contract_Request']],
			sequence: 4,
			request: requestMessage
		};
		var messages = this._messageClass.create(messageC);
		var buffer = this._messageClass.encode(messages).finish();		
		return this.Bytes2HexString(buffer);
	}
	/**
	 * Parsing data package
	 * @param {Object} buffer
	 */
	onReceiveMessageHandler(buffer){
		var data = this.HexString2Bytes(buffer);		
		return this._messageClass.decode(data);		
	}
	HexString2Bytes(str) {
		var pos = 0;
		var len = str.length;
		if (len % 2 != 0) {
			return null;
		}
		len /= 2;
		var arrBytes = new Array();
		for (var i = 0; i < len; i++) {
			var s = str.substr(pos, 2);
			var v = parseInt(s, 16);
			arrBytes.push(v);
			pos += 2;
		}
		return arrBytes;
	}
	Bytes2HexString(arrBytes) {
		var str = "";
		for (var i = 0; i < arrBytes.length; i++) {
			var tmp;
			var num = arrBytes[i];
			if (num < 0) {
				tmp = (255 + num + 1).toString(16);
			} else {
				tmp = num.toString(16);
			}
			if (tmp.length == 1) {
				tmp = "0" + tmp;
			}
			str += tmp;
		}
		return str;
	}


}
