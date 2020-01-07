# exuiValidator

## 介绍
表单验证
## 使用说明
``` javascript
var exuiValidator = require("@/exui/tool/exuiValidator.js");

定义验证规则
{name:"数据键名称", checkType: "验证类型", checkRule: "验证规则", errorMsg: "错误提示信息" }
var rule = [
    { name: "nickname", checkType: "string", checkRule: "1,3", errorMsg: "姓名应为1-3个字符" },
    { name: "gender", checkType: "in", checkRule: "男,女", errorMsg: "请选择性别" },   
];
进行表单检查
			var formData = e.detail.value;
			var checkRes = exuiValidator.check(formData, rule);
			if(checkRes){
				uni.showToast({title:"验证通过!", icon:"none"});
			}else{
				uni.showToast({ title: exuiValidator.error, icon: "none" });
			}
```
---------------------------------------------------
```
1. string
功能 : 字符串及长度检查
规则 : 最小长度,最大长度 如 1,3 或 2, 2,代表只检查最短
2. int
功能 : 整数及长度检查
规则 : 最小长度,最大长度 如 1,3
3. among
功能 : 数值区间检查
规则 : 最小值,最大值 如 1,3 或 2.5,1000
4. amongInt
功能 : 数值区间检查【整数】
规则 : 最小值,最大值 如 1,3 或 2,1000
5. equivalent
功能 : 等值检查
规则 : 对应的值
6. nonequivalence
功能 : 不等值检查
规则 : 对应的值
7. email
功能 : 邮箱检查
规则 : 无需设置
8. phoneno
功能 : 11位手机号检查
规则 : 无需设置
9. zipcode
功能 : 6位邮编检查
规则 : 无需设置
10. reg
功能 : 正则表达式检查
规则 : 正则表达式内容 如 "^[0-9]{1,2}$"
11. in
功能 : 包含某个字符串的检查
规则 : 字符串集，如："北京,上海"
12. notnull
功能 : 不为空检查【null 或者 空数组】
规则 : 无需设置
```
