<template>
	<view class="main">
		<view class="title_top">
			<view class="status_bar"><!-- 这里是状态栏 --></view>
			<view class="nav">
				<view class="icon iconfont icon-left" @tap="back"></view>
				<view class="">{{lang.memberGpassword}}</view>
				<view class=""></view>
			</view>
		</view>
		<view class="gesture_father">
			<view class="gesture">
			    <mpvue-gesture-lock :containerWidth="590" :cycleRadius="70" @end="onEnd" :password="password"></mpvue-gesture-lock>
			</view>
			<view class="uni-text">{{text}}</view>
		</view>
	</view>
</template>

<script>
    import mpvueGestureLock from '@/components/mpvueGestureLock';
	import { mapState, mapMutations } from 'vuex';
    export default {
        components: {
            mpvueGestureLock
        },
		computed: {
			...mapState({				
				lang:state => state.lang.lang
			})
		},
        data() {
            return {
                password: [],
                text: this.$store.state.lang.lang.memberPgestures
            }
        },
        methods: {
			back:function(){
				uni.navigateBack();
			},
            onEnd(data) {
                if (this.password.length) {
                    if (this.password.join('') === data.join('')) {
						let gesture_password=JSON.stringify(data)
                        this.text = '手势设定完成'
                        this.password = []
						uni.showLoading({title: this.$store.state.lang.lang.propertyLoading});
						this.$userRequest.post('editGestureFingerprintState',{type:'gesture',is_open:1,gesture_password:gesture_password})
						.then(res => {
							uni.hideLoading();
							if(res.data.code==0){
								this.back()
							}
						})
						.catch(err => {
							uni.hideLoading();
							console.log(err);
						});
                    } else {
                        this.text = '两次手势设定不一致'
                        this.password = []
                    }
                } else {
                    this.text = '请确认手势设定'
                    this.password = data
                }
            }
        }
    }
</script>

<style>
	page{
		width: 100%;
		background:#FFFFFF;
	}
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background-color: #FFFFFF;
	}
	.nav{
		width: 750upx;
		height: 88upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #FFFFFF;
	}
	.nav view:nth-child(1),.nav view:nth-child(3){
		width: 44upx;
		height: 44upx;
		line-height: 44upx;
		font-size: 50upx;
	}
	.nav view:nth-child(2){
		height: 30upx;
		font-size:32upx;
		font-weight:800;
		color:#333333;
		line-height: 30upx;
		text-align: center;
	}
    .uni-text{
        font-size: 30upx;
        text-align: center;
        margin-top: 30upx;
    }
	.gesture_father{
		margin-top: 150upx;
	}
</style>
