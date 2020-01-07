module.exports = {
	
	/**
	 * 数字转整数 如 100000 转为10万
	 * @param {需要转化的数} num 	 
	 */
	tranNumber: function(num) {
		var moneyUnits = ["", "万", "亿", "万亿"]
		var dividend = 10000;
		var curentNum = num;
		//转换数字 
		var curentUnit = moneyUnits[0];
		//转换单位 
		for (var i = 0; i < 4; i++) {
			curentUnit = moneyUnits[i]
			var stringNum = curentNum.toString()
			var index = stringNum.indexOf(".")
			var newNum = stringNum;
			if (index != -1) {
				newNum = stringNum.substring(0, index)
			}			
			if (newNum.length < 5) {
				break;
			}
			curentNum = curentNum / dividend
		}
		var m = {
			num: 0,
			unit: ""
		}
		m.num = curentNum.toFixed(2)
		m.unit = curentUnit;
		return m.num+m.unit;
	},
	
	//截取
	tranNumberToFixedFive: function(num,_rate,_isunit) {
		if(_rate == undefined){
			_rate =5
		}
		if(_isunit == undefined){
			_isunit = true
		}
		var moneyUnits = ["", "k", "千万", "千亿"]
		var dividend = 10000;
		var curentNum = num;
		//转换数字 
		var curentUnit = moneyUnits[0];
		//转换单位 
		for (var i = 0; i < 4; i++) {
			curentUnit = moneyUnits[i]
			var stringNum = curentNum.toString()
			var index = stringNum.indexOf(".")
			var newNum = stringNum;
			if (index != -1) {
				newNum = stringNum.substring(0, index)
			}			
			if (newNum.length < 5) {
				break;
			}
			curentNum = curentNum / dividend
		}
		var m = {
			num: 0,
			unit: ""
		}
		
		let resultdata = curentNum.toFixed(_rate+1)
		m.num = resultdata.substring(0,resultdata.length-1)
	
		return m.num+m.unit;
	},
	

	tranNumberEN: function(num){

		//using a regex "look-head" approach, 
		//replace every digit with three digits 
		//after and decimal point it with itself+comma
		var temp = (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

		//remove any trailing ".00"
		return temp.replace(/(.00)$/g, '');
	}
	
}
