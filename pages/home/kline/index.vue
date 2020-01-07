<template>
    <view>		
        <web-view :webview-styles="webviewStyles" :src="url"></web-view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                },
				buy:'',
				sell:'',
				url:'',
				userinfo:null
            }
        },
		onLoad(option) {
			this.userinfo = this.$store.getters.getUserData;
			this.buy = (option.buy).toLowerCase();
			this.sell = (option.sell).toLowerCase();
			this.url = "http://api.sstex.co/kine/index.html?buy="+this.buy+"&sell="+this.sell+"&uid="+this.userinfo.id+"&v="+this.$twebVersion
		}
    }
</script>

<style>

</style>