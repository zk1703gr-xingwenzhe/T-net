import stateCode from './code.js' //状态码管理
const tipsBar = (data)=>{
	
	//用户已在其他地方登录确认框
	// if(data == 20029){
	// 	uni.showModal({
	// 	    title: '提示',
	// 	    content: '您的账号已在其他地方登录',
	// 		confirmText:"重新登录",
	// 	    success: function (res) {
	// 	        if (res.confirm) {
	// 	            uni.navigateTo({
	// 	            	url:"./login/login"
	// 	            })
	// 	        } else if (res.cancel) {
	// 	        }
	// 	    }
	// 	});
	// }
	if (stateCode[data]) {
	　　uni.showToast({ title:stateCode[data], icon: 'none' });
	}else{
		uni.showToast({ title:stateCode[10101010], icon: 'none' });
	}
	
	return {data: {code: -1}};
}
//暴露出去
export default tipsBar