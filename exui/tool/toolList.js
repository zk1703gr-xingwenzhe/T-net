import store from '@/store'
import { userRequest } from '@/exui/axios'
let list=[
	{"id":1,"type":"USDT","other_name":"usdt",},
	{"id":2,"type":"BTC","other_name":"btc",},
	{"id":3,"type":"ETH","other_name":"eth",},
	{"id":4,"type":"EOS","other_name":"eos",},
	{"id":5,"type":"LTC","other_name":"ltc",},
	{"id":6,"type":"XRP","other_name":"xrp",},
	{"id":8,"type":"BCH","other_name":"bch",},
	{"id":9,"type":"TRX","other_name":"trx",},
	{"id":12,"type":"ST","other_name":"st",},
	{"id":13,"type":"OMG","other_name":"omg",},
	{"id":14,"type":"ZRX","other_name":"zrx",},
	{"id":15,"type":"ZIL","other_name":"zil",},
	{"id":16,"type":"BTM","other_name":"btm",},
	{"id":17,"type":"BAT","other_name":"bat",},
	{"id":18,"type":"GNT","other_name":"gnt",},
	{"id":19,"type":"WTC","other_name":"wtc",},
	{"id":20,"type":"SNT","other_name":"snt",},
	{"id":21,"type":"IOST","other_name":"iost",},
	{"id":22,"type":"ELF","other_name":"elf",},
]
const toolList = {
	get_coin_list(_str,_data){
		if(_str ==undefined || _data==undefined) return false;
		let resultList = [];
		if(_str == ""){
			resultList = _data
		}else{			
			if(_data != undefined){
				_data.map(function(v){
					if(v.source.toUpperCase().indexOf(_str.toUpperCase()) !== -1){
						resultList.push(v)
					}
				})
			}else{
				return resultList
			}
		}
		if(resultList == undefined) return false;
		let handleResultList = []
		resultList.map(function(v){
			for(let i=0;i<list.length;i++){
				v['price']=v.CNY/v.close;
				if(v.target == list[i].type){
					v['target_id'] = list[i].id;
				}
				if(v.source == list[i].type){
					v['source_id'] = list[i].id;
				}
			}
			handleResultList.push(v)
		})
		return handleResultList;
	},
	//获取头部
	get_coin_head(_list){
		let resultList = [{target:"follow"}];
		for(let i=0;i<_list.length;i++){
			let ads = true
			for(let e=0;e<resultList.length;e++){
				if(_list[i].target == resultList[e].target){
					ads = false;
				}
			}
			if(ads){
				resultList.push(_list[i]);
				ads = true;
			}
			
		}
		store.state.coin.exCurrendLabel = resultList[1].target
		
		//保留币种，如需要显示全部，请注释(下方还有分类，如若删除请一并删除)---------------------------------
		
		let retainReady = ['USDT','BTC','follow'];
		let resultRetainList = []
		resultList.map(function(v,e){
			for(let i=0;i<retainReady.length;i++){
				if(v.target == retainReady[i]){
					resultRetainList.push(v)
				}
			}
		})
		//---------------------------------------------
		
		return resultRetainList;
	},
	//分类
	coin_map(_list){
		let jsonResult = {follow:[]}
		_list.map(function(v){
			if(typeof jsonResult[v.target] != "object"){
				jsonResult[v.target] = [v]
			}else{
				jsonResult[v.target].push(v)
			}
		})
		// console.log(jsonResult)
		let handleFollowList = [];
		if(store.state.coin.theFollowList != undefined){
			let FollowList = store.state.coin.theFollowList
			FollowList.map(function(v){
				let labelArr = v.trans_type.split("/")
				if(jsonResult[labelArr[1]]!=undefined){
					jsonResult[labelArr[1]].map(function(e){
						if(e.source == labelArr[0]){
							handleFollowList.push(e)
						}
					})
				}
				
			})
		}
		jsonResult['follow'] = handleFollowList
		// console.log(jsonResult)
		
		//保留币种，如需要显示全部，请注释(上方还有头部，如若删除请一并删除)---------------------------------
		
			let retainReady = ['BTC','USDT','follow'];
			let retainJsonResult = {}
			for(var st in jsonResult) {
				for(let i=0;i<retainReady.length;i++){
					if(st == retainReady[i]){
						retainJsonResult[st] = jsonResult[st]
					}
				}
			}
		//---------------------------------------------
		return retainJsonResult;
	},
	//获取自选列表
	get_theFollow_list(){
		userRequest.get('order/optionalList', {}).then(res => {
			if (res.data.code == 0) {
				store.commit("update_followList",res.data.data)
				store.commit("update_data","null")
			}
		}).catch(err => {
			// console.log(err);
		});
		
	},
	save_storeDataList(_data){
		// console.log(_data);
		store.commit("update_data",_data)
	},
	//存储取出用户支付方式_data.type=1:存储,_data.type=2取出,_data.data=用户支付方式
	user_payWay(_data){
		if(_data.type == 1){
			uni.setStorage({
				key: 'user_payWay',
				data:_data.data,
				success: function () {
					//success
				}
			});
		}else if(_data.type == 2){
			return uni.getStorageSync("user_payWay")
		}else{
			console.error("the _data.type isn't right parameter;at toolList.js of 'user_payWay'' function");
		}
	}
}

export default toolList;