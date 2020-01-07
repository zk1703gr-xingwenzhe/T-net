<template name="exPopupMenu">
	<view>
		<view class="ex-popup-mask" v-if="show" @tap.stop="hideMenu"></view>
		<view class="ex-popup-menu ex-border-radius-small" v-if="show" :style="{right:right+'px',top:top+'px', background:bgColor, width:menuWidth}">
			<slot></slot>
		</view>
	</view>
</template>
<script>
	export default {
		name: "exPopupMenu",
		props: {
			show:{
				type : Boolean,
				default : false
			},
			top:{
				type : Number,
				default : 0
			},
			right:{
				type : Number,
				default : 0
			},			
			bgColor:{
				type : String,
				default :'#4c4c4c'
			},
			menuWidth :{
				type : String,
				default : '258upx'
			}
		},
		methods: {
			hideMenu : function() {
				this.$emit('hideMenu');
			}
		},
	}
</script>
<style>
.ex-popup-menu{background:#4c4c4c; width:258upx; padding:6px; /* right:0px; */ top:0px; position:absolute; z-index:9999;}
.ex-popup-mask{background:rgba(0,0,0, 0.5); width:100%; height:100%; position:fixed; left:0; top:0; z-index:9998;}
</style>