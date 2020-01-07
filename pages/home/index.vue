<template>
	<view style="height:100%;">		
		<view class="" v-if="navsActiveIndex == 0"><homePage :tabBarHeight="tabBarHeight" :navTo="navTo"></homePage></view>
		<view class="" v-if="navsActiveIndex == 1"><Quotation :tabBarHeight="tabBarHeight"></Quotation></view>
		<view style="height:100%;" class="" v-if="navsActiveIndex == 2"><transaction :tabBarHeight="tabBarHeight" :parameter="parameter"></transaction></view>
		<view class="" v-if="navsActiveIndex == 3"><contract></contract></view>
		<view class="" v-if="navsActiveIndex == 4"><property ref="child"></property></view>

		<view class="ex-footer footer">
			<view class="icon-btn" v-for="(nav, index) in navs" :key="index" :data-index="index" @tap="navTo">
				<view class="icon twebicon" :class="[nav.icon, navsActiveIndex == index ? 'active-org' : '']" :style="{ opacity: index == 2 ? 0 : 1 }"></view>
				<view class="text" :class="[navsActiveIndex == index ? 'active-org' : '']">{{ nav.text }}</view>
			</view>
		</view>
		<view class="ex-footer-center-btn-ico " @tap="navTo" :data-index="2">
			<image :src="navsActiveIndex == 2 ? '../../static/image/index/footbar/jiaoyiclick.png' : '../../static/image/index/footbar/jiaoyi.png'"></image>
		</view>
		<text style="display: none;">{{socketLogin}}</text>
		
		<exFixedMsg :show="exIMNewMsg" msg="您有一条新的消息" :width="280"  :bottom="120"></exFixedMsg>
		
		<updata-app></updata-app>
		<maintain-lock></maintain-lock>
		<notice></notice>
	</view>
</template>

<script>
import exHeaderAlert from '@/exui/components/exHeaderTips.vue';
import property from './property/property.vue'; //资产
import contract from './contract/contract.vue'; //合约
import transaction from './transaction/index.vue'; //交易
import homePage from './homepage/homePage.vue'; //首页
import Quotation from './quotation/index.vue'; //行情
import { mapState, mapMutations } from 'vuex';
import { PbMessage } from '@/common/libs/PbMessage';
import updataApp from '@/components/updata-app.vue';
import maintainLock from '@/components/maintain-lock.vue'
import exFixedMsg from '@/exui/components/exFixedMsg.vue';
import notice from '@/components/notice.vue'
var pb = new PbMessage();
export default {
	data() {
		return {
			navs: [
				{ icon: 'icon-shouye', text: this.$store.state.lang.lang.indexHpage},
				{ icon: 'icon-hangqing', text:this.$store.state.lang.lang.walletQuotation},
				{ icon: 'icon-zaixiankefu', text: '' },
				{ icon: 'icon-heyue', text:this.$store.state.lang.lang.indexContract},
				{ icon: 'icon-zichan', text:this.$store.state.lang.lang.indexProperty}
			],
			navsActiveIndex: 0,
			tabBarHeight: 0,
			parameter:{},
			exIMNewMsg:false,
			exIMNewMsgContent:""
		};	
	},
	computed: {
		...mapState({
			exIMStatus: state => state.websocket.exIMStatus,			
			lang:state => state.lang.lang,
			socketLogin: function() {
				if (this.$store.state.websocket.exIMStatus == 'success') {
					this.userSocketLogin();
				}
			}
		})
	},
	mounted() {
		const query = uni.createSelectorQuery().in(this);
		query.select('.ex-footer').boundingClientRect(data => {
			this.tabBarHeight = data.height;
		}).exec();
		
	},
	components: {
		property,
		contract,
		transaction,
		homePage,
		Quotation,
		exHeaderAlert,
		updataApp,
		maintainLock,
		exFixedMsg,
		notice
	},
	onLoad(option) {
		if(JSON.stringify(option)!='{}'){
			this.parameter=JSON.parse(option.data);
			const token = this.$store.getters.getToken;
			if(this.parameter.navsActiveIndex==2&&token==''){
				uni.navigateTo({
					url: './login/login'
				})
				return
			}
			this.navsActiveIndex=this.parameter.navsActiveIndex,
			this.tabBarHeight=this.parameter.tabBarHeight;
		}
		this.getUserInfo();
		var _self = this;
		try {
			_self.$store.dispatch('setConnect');			
		} catch (e) {
			//TODO handle the exception
		}
		uni.$on('firendMsg',function(data){
			_self.exIMNewMsg = data.msg;			
		        console.log('监听到事件来自 firendMsg ，携带参数 msg 为：' + data.msg);
		    })
		
			
	},
	methods: {
		
		userSocketLogin: function() {
			if (this.$store.getters.getUserData != '' && this.$store.state.websocket.exIMStatus == 'success') {
				var userInfo = this.$store.getters.getUserData;				
				var buffer = pb.loginInfoRequest({ userId: userInfo.id.toString(),sex:userInfo.user_sex,nickName:userInfo.user_nickname,headImageUrl:userInfo.user_avatar ,st:userInfo.balance,numUserId:userInfo.account_id});				
				uni.sendSocketMessage({
					data: buffer
				});
				
			}
		},
		navTo: function(e) {
			var index = e.currentTarget.dataset.index;
			const token = this.$store.getters.getToken;
			if(index==2&&token==''){
				uni.navigateTo({
					url: './login/login'
				});
			}else if(index==3&&token==''){
				uni.navigateTo({
					url: './login/login'
				});
			}else if(index==4&&token==''){
				uni.navigateTo({
					url: './login/login'
				});
			}else{
				if(this.navsActiveIndex==2){
					this.parameter={}
					this.navsActiveIndex = index;
				}
				this.navsActiveIndex = index;
			}
		},
		getUserInfo: function() {
			var token = uni.getStorageSync('setToken');
			var userinfo = uni.getStorageSync('userinfo');
			if (token) {
				this.$store.dispatch('setToken', token);
				this.$store.dispatch('setUserData', userinfo);
			}
		}
	}
};
</script>

<style>
.footer {
	box-shadow: none;
	border-top: 1upx solid #f5f6f8;
}
.footer .icon-btn {
	border: none;
}
.ex-footer-center-btn-ico image {
	width: 188upx;
	height: 167upx;
	z-index: 3;
	position: fixed;
	bottom: 1px;
	left: 280upx;
	font-size: 25px;
	text-align: center;
	line-height: 167upx;
}
</style>
