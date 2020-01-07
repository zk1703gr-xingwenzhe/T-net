<script>
export default {
	created: function() {
		// #ifdef APP-PLUS
		plus.navigator.closeSplashscreen();
		// #endif
	},
	onLaunch: function() {
		console.log("onLaunch")
	},
	onShow: function() {
		console.log("onSHow")
	},
	onHide: function() {
		console.log("onHide")
	}
};
</script>

<style>
@import 'exui/exuiIcon.css';
@import 'exui/twebIco.css';
@import 'exui/exui.css';
@import 'exui/animate.css';


/* 图标库 */
@font-face {
  font-family: 'iconfont';  /* project id 1495513 */
  src: url('//at.alicdn.com/t/font_1495513_audqw6kahbb.eot');
  src: url('//at.alicdn.com/t/font_1495513_audqw6kahbb.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1495513_audqw6kahbb.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1495513_audqw6kahbb.woff') format('woff'),
  url('//at.alicdn.com/t/font_1495513_audqw6kahbb.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1495513_audqw6kahbb.svg#iconfont') format('svg');
}
</style>
