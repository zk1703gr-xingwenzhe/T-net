import Vue from 'vue'
import App from './App'
import { http } from '@/exui/axios'
import { userRequest } from '@/exui/axios'
import { code } from '@/exui/tool/code.js'
import data_range from '@/exui/tool/data_range.js'

//挂载工具库
import tools from '@/exui/tool/toolList.js'
Vue.prototype.$tools = tools;

Vue.prototype.$http = http
Vue.prototype.$userRequest = userRequest
Vue.prototype.$code = code
import store from './store';
Vue.prototype.$store = store;
Vue.prototype.data_range = data_range;
Vue.config.productionTip = false

//修订版本号
Vue.prototype.$twebVersion = "1.3.1"

App.mpType = 'app'

const app = new Vue({
    ...App
	
})
app.$mount()
