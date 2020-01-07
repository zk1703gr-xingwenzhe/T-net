
import Request from './request'
import Vue from 'vue'
import store from '../../store/index.js' //状态管理
import msgTips from '../tool/msgTipsBar.js'
 //状态管理
//const msgTips =require('../tool/msgTipsBar.js')


const logined = new Request();
logined.setConfig((config) => { /* 设置全局配置 */
	config.baseUrl = 'https://api.sstex.co/api/';
	// config.header = {
	// 	a: 1,
	// 	b: 2
	// }
	return config
})
logined.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
	config.header = {
		...config.header
	}
	/*
	if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
		cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
	}
	*/
	return config;
})
logined.interceptor.response((response) => {
	// 判断一下响应中是否有 token，如果有就直接使用此 token 替换掉本地的 token。你可以根据你的业务需求自己编写更新 token 的逻辑  
	if(response.data.code!=0){		
			return msgTips(response.data.code); 
	}
	var token = response.data.data._token
	if (token) {
		// 如果 header 中存在 token，那么触发 refreshToken 方法，替换本地的 token		
		store.dispatch("setToken",token);
		uni.setStorageSync('setToken', token);
		// #ifdef APP-PLUS
		plus.storage.setItem('setToken', token);
		// #endif
		//uni.setStorageSync('token', token);
		//plus.storage.setItem('token', token); 这是原生APP的方法
		//uni.$emit('refreshToken',token)      
	}
	return response
})

const userRequest = new Request();
userRequest.setConfig((config) => { /* 设置全局配置 */
	config.baseUrl = 'https://api.sstex.co/api/'; /* 根域名不同 */
	// config.header = {
	// 	Authorization: uni.getStorageSync('token'),		
	// }
	return config
})
userRequest.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
	config.header = {
		Authorization:store.getters.getToken
	}
	
	if (!config.header.Authorization) {
		cancel('Authorization：token 不能为空')
		uni.reLaunch({
			url: './index'
		});
	}
	
	return config;
})
userRequest.interceptor.response((response) => { /* 请求之后拦截器 */
		if(response.data.code=="20004"){
			msgTips("20004"); 
			store.dispatch("setToken",'');
			store.dispatch('setUserData', ''); //清空登录状态
			uni.removeStorageSync('setToken');
			uni.removeStorageSync('userinfo');	
			uni.reLaunch({
				url: '../index'
			});
			return;	
		}
	 switch (response.statusCode) {
	 	
	 	// 如果响应中的 http code 为 401，那么则此用户可能 token 失效了之类的，我会触发 logout 方法，清除本地的数据并将用户重定向至登录页面
	 	case 401:	
	 		msgTips("20029"); 
			store.dispatch("setToken",'');
			store.dispatch('setUserData', ''); //清空登录状态
			uni.removeStorageSync('setToken');
			uni.removeStorageSync('userinfo');	
			return;	
	 		break
	 		// 如果响应中的 http code 为 400，那么就弹出一条错误提示给用户
	 	case 400:		
	 		return uni.showToast({
	 		    title: response.data,
	 			icon:'none',				
	 		    duration: 2000
	 		});
	 	case 500:
	 		return uni.showToast({
	 		    title: 'err 500',
	 			icon:'none',				
	 		    duration: 2000
	 		});
	 		break
	 }
	if(response.data.code!=0 && response.data.code !='undefined'){
			
			return msgTips(response.data.code); 
			
	}
	return response;
}, (error) => {
	return Promise.reject(error)
})

const http = new Request();
http.setConfig((config) => { /* 设置全局配置 */
	config.baseUrl = 'https://api.sstex.co/api/'; /* 根域名不同 */

	return config
})
http.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
	config.header = {
		...config.header
	}
	/*
	if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
		cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
	}
	*/
	return config;
})
http.interceptor.response((response) => { /* 请求之后拦截器 */	

	if(response.data.code!=0){
			return msgTips(response.data.code); 
	}
	return response;
})
export {
	userRequest,
	logined,
	http
};
