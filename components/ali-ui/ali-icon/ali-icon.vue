<template name="ali-icon">

	<view class="ali-icon" :class="['ali-icon-'+iconStyle]" :style="{'color':color,'font-size':fontSize}" ></view>

</template>

<script>
	
export default {
	name: "ali-icon",
	//属性
	props: {		
		iconStyle:String,
		color: String,
		iconSize: [Number, String]
		
	},
	computed: {
		
		fontSize() {
			return `${this.iconSize}px`
		}
		
	},
	//组件生命周期
	created:function(e){
	
	},
	
	methods: {
		
		
	}
}
</script>

<style>
	@font-face {
	  font-family: 'FontAwesome';
	  src: url('http://cdn.staticfile.org/font-awesome/4.2.0/fonts/fontawesome-webfont.eot?v=4.2.0');
	  src: url('http://cdn.staticfile.org/font-awesome/4.2.0/fonts/fontawesome-webfont.eot?#iefix&v=4.2.0') format('embedded-opentype'), url('http://cdn.staticfile.org/font-awesome/4.2.0/fonts/fontawesome-webfont.woff?v=4.2.0') format('woff'), url('http://cdn.staticfile.org/font-awesome/4.2.0/fonts/fontawesome-webfont.ttf?v=4.2.0') format('truetype'), url('http://cdn.staticfile.org/font-awesome/4.2.0/fonts/fontawesome-webfont.svg?v=4.2.0#fontawesomeregular') format('svg');
	  font-weight: normal;
	  font-style: normal;
	}
	[class*="ali-icon-"] {
	  display: inline-block;
	}
	[class*="ali-icon-"]:before {
	  display: inline-block;
	  /* 1 */
	  font-family: "FontAwesome";
	  font-weight: normal;
	  /* 2 */
	  font-style: normal;
	  /* 2 */
	  vertical-align: baseline;
	  /* 3 */
	  line-height: 1;
	  /* 4 */
	  -webkit-font-smoothing: antialiased;
	  /* 5 */
	  -moz-osx-font-smoothing: grayscale;
	  font-family: "FontAwesome" !important;
	}
	.ali-icon-border {
	  padding: .2em .25em .15em;
	  border: solid 0.08em #eeeeee;
	  border-radius: .1em;
	}
	[class*='ali-icon-'].ali-fl {
	  margin-right: .3em;
	}
	[class*='ali-icon-'].ali-fr {
	  margin-left: .3em;
	}
	.ali-icon-sm:before {
	  font-size: 150%;
	  vertical-align: -10%;
	}
	.ali-icon-md:before {
	  font-size: 200%;
	  vertical-align: -16%;
	}
	.ali-icon-lg:before {
	  font-size: 250%;
	  vertical-align: -22%;
	}
	.ali-icon-btn {
	  -webkit-box-sizing: border-box;
	  -moz-box-sizing: border-box;
	  box-sizing: border-box;
	  display: inline-block;
	  width: 48px;
	  height: 48px;
	  font-size: 24px;
	  line-height: 48px;
	  border-radius: 50%;
	  background: #eeeeee;
	  color: #555555;
	  text-align: center;
	  /**
	   * Hover
	   * 1. Apply hover style also to focus state
	   * 2. Remove default focus style
	   */
	  /* Active */
	}
	.ali-icon-btn:hover,
	.ali-icon-btn:focus {
	  /* 1 */
	  background-color: #f5f5f5;
	  color: #333333;
	  text-decoration: none;
	  outline: none;
	  /* 2 */
	}
	.ali-icon-btn:active {
	  background-color: #dddddd;
	  color: #333333;
	}
	.ali-icon-glass:before {
	  content: "\f000";
	}
	.ali-icon-music:before {
	  content: "\f001";
	}
	.ali-icon-search:before {
	  content: "\f002";
	}
	.ali-icon-envelope-o:before {
	  content: "\f003";
	}
	.ali-icon-heart:before {
	  content: "\f004";
	}
	.ali-icon-star:before {
	  content: "\f005";
	}
	.ali-icon-star-o:before {
	  content: "\f006";
	}
	.ali-icon-user:before {
	  content: "\f007";
	}
	.ali-icon-film:before {
	  content: "\f008";
	}
	.ali-icon-th-large:before {
	  content: "\f009";
	}
	.ali-icon-th:before {
	  content: "\f00a";
	}
	.ali-icon-th-list:before {
	  content: "\f00b";
	}
	.ali-icon-check:before {
	  content: "\f00c";
	}
	.ali-icon-remove:before,
	.ali-icon-close:before,
	.ali-icon-times:before {
	  content: "\f00d";
	}
	.ali-icon-search-plus:before {
	  content: "\f00e";
	}
	.ali-icon-search-minus:before {
	  content: "\f010";
	}
	.ali-icon-power-off:before {
	  content: "\f011";
	}
	.ali-icon-signal:before {
	  content: "\f012";
	}
	.ali-icon-gear:before,
	.ali-icon-cog:before {
	  content: "\f013";
	}
	.ali-icon-trash-o:before {
	  content: "\f014";
	}
	.ali-icon-home:before {
	  content: "\f015";
	}
	.ali-icon-file-o:before {
	  content: "\f016";
	}
	.ali-icon-clock-o:before {
	  content: "\f017";
	}
	.ali-icon-road:before {
	  content: "\f018";
	}
	.ali-icon-download:before {
	  content: "\f019";
	}
	.ali-icon-arrow-circle-o-down:before {
	  content: "\f01a";
	}
	.ali-icon-arrow-circle-o-up:before {
	  content: "\f01b";
	}
	.ali-icon-inbox:before {
	  content: "\f01c";
	}
	.ali-icon-play-circle-o:before {
	  content: "\f01d";
	}
	.ali-icon-rotate-right:before,
	.ali-icon-repeat:before {
	  content: "\f01e";
	}
	.ali-icon-refresh:before {
	  content: "\f021";
	}
	.ali-icon-list-alt:before {
	  content: "\f022";
	}
	.ali-icon-lock:before {
	  content: "\f023";
	}
	.ali-icon-flag:before {
	  content: "\f024";
	}
	.ali-icon-headphones:before {
	  content: "\f025";
	}
	.ali-icon-volume-off:before {
	  content: "\f026";
	}
	.ali-icon-volume-down:before {
	  content: "\f027";
	}
	.ali-icon-volume-up:before {
	  content: "\f028";
	}
	.ali-icon-qrcode:before {
	  content: "\f029";
	}
	.ali-icon-barcode:before {
	  content: "\f02a";
	}
	.ali-icon-tag:before {
	  content: "\f02b";
	}
	.ali-icon-tags:before {
	  content: "\f02c";
	}
	.ali-icon-book:before {
	  content: "\f02d";
	}
	.ali-icon-bookmark:before {
	  content: "\f02e";
	}
	.ali-icon-print:before {
	  content: "\f02f";
	}
	.ali-icon-camera:before {
	  content: "\f030";
	}
	.ali-icon-font:before {
	  content: "\f031";
	}
	.ali-icon-bold:before {
	  content: "\f032";
	}
	.ali-icon-italic:before {
	  content: "\f033";
	}
	.ali-icon-text-height:before {
	  content: "\f034";
	}
	.ali-icon-text-width:before {
	  content: "\f035";
	}
	.ali-icon-align-left:before {
	  content: "\f036";
	}
	.ali-icon-align-center:before {
	  content: "\f037";
	}
	.ali-icon-align-right:before {
	  content: "\f038";
	}
	.ali-icon-align-justify:before {
	  content: "\f039";
	}
	.ali-icon-list:before {
	  content: "\f03a";
	}
	.ali-icon-dedent:before,
	.ali-icon-outdent:before {
	  content: "\f03b";
	}
	.ali-icon-indent:before {
	  content: "\f03c";
	}
	.ali-icon-video-camera:before {
	  content: "\f03d";
	}
	.ali-icon-photo:before,
	.ali-icon-image:before,
	.ali-icon-picture-o:before {
	  content: "\f03e";
	}
	.ali-icon-pencil:before {
	  content: "\f040";
	}
	.ali-icon-map-marker:before {
	  content: "\f041";
	}
	.ali-icon-adjust:before {
	  content: "\f042";
	}
	.ali-icon-tint:before {
	  content: "\f043";
	}
	.ali-icon-edit:before,
	.ali-icon-pencil-square-o:before {
	  content: "\f044";
	}
	.ali-icon-share-square-o:before {
	  content: "\f045";
	}
	.ali-icon-check-square-o:before {
	  content: "\f046";
	}
	.ali-icon-arrows:before {
	  content: "\f047";
	}
	.ali-icon-step-backward:before {
	  content: "\f048";
	}
	.ali-icon-fast-backward:before {
	  content: "\f049";
	}
	.ali-icon-backward:before {
	  content: "\f04a";
	}
	.ali-icon-play:before {
	  content: "\f04b";
	}
	.ali-icon-pause:before {
	  content: "\f04c";
	}
	.ali-icon-stop:before {
	  content: "\f04d";
	}
	.ali-icon-forward:before {
	  content: "\f04e";
	}
	.ali-icon-fast-forward:before {
	  content: "\f050";
	}
	.ali-icon-step-forward:before {
	  content: "\f051";
	}
	.ali-icon-eject:before {
	  content: "\f052";
	}
	.ali-icon-chevron-left:before {
	  content: "\f053";
	}
	.ali-icon-chevron-right:before {
	  content: "\f054";
	}
	.ali-icon-plus-circle:before {
	  content: "\f055";
	}
	.ali-icon-minus-circle:before {
	  content: "\f056";
	}
	.ali-icon-times-circle:before {
	  content: "\f057";
	}
	.ali-icon-check-circle:before {
	  content: "\f058";
	}
	.ali-icon-question-circle:before {
	  content: "\f059";
	}
	.ali-icon-info-circle:before {
	  content: "\f05a";
	}
	.ali-icon-crosshairs:before {
	  content: "\f05b";
	}
	.ali-icon-times-circle-o:before {
	  content: "\f05c";
	}
	.ali-icon-check-circle-o:before {
	  content: "\f05d";
	}
	.ali-icon-ban:before {
	  content: "\f05e";
	}
	.ali-icon-arrow-left:before {
	  content: "\f060";
	}
	.ali-icon-arrow-right:before {
	  content: "\f061";
	}
	.ali-icon-arrow-up:before {
	  content: "\f062";
	}
	.ali-icon-arrow-down:before {
	  content: "\f063";
	}
	.ali-icon-mail-forward:before,
	.ali-icon-share:before {
	  content: "\f064";
	}
	.ali-icon-expand:before {
	  content: "\f065";
	}
	.ali-icon-compress:before {
	  content: "\f066";
	}
	.ali-icon-plus:before {
	  content: "\f067";
	}
	.ali-icon-minus:before {
	  content: "\f068";
	}
	.ali-icon-asterisk:before {
	  content: "\f069";
	}
	.ali-icon-exclamation-circle:before {
	  content: "\f06a";
	}
	.ali-icon-gift:before {
	  content: "\f06b";
	}
	.ali-icon-leaf:before {
	  content: "\f06c";
	}
	.ali-icon-fire:before {
	  content: "\f06d";
	}
	.ali-icon-eye:before {
	  content: "\f06e";
	}
	.ali-icon-eye-slash:before {
	  content: "\f070";
	}
	.ali-icon-warning:before,
	.ali-icon-exclamation-triangle:before {
	  content: "\f071";
	}
	.ali-icon-plane:before {
	  content: "\f072";
	}
	.ali-icon-calendar:before {
	  content: "\f073";
	}
	.ali-icon-random:before {
	  content: "\f074";
	}
	.ali-icon-comment:before {
	  content: "\f075";
	}
	.ali-icon-magnet:before {
	  content: "\f076";
	}
	.ali-icon-chevron-up:before {
	  content: "\f077";
	}
	.ali-icon-chevron-down:before {
	  content: "\f078";
	}
	.ali-icon-retweet:before {
	  content: "\f079";
	}
	.ali-icon-shopping-cart:before {
	  content: "\f07a";
	}
	.ali-icon-folder:before {
	  content: "\f07b";
	}
	.ali-icon-folder-open:before {
	  content: "\f07c";
	}
	.ali-icon-arrows-v:before {
	  content: "\f07d";
	}
	.ali-icon-arrows-h:before {
	  content: "\f07e";
	}
	.ali-icon-bar-chart-o:before,
	.ali-icon-bar-chart:before {
	  content: "\f080";
	}
	.ali-icon-twitter-square:before {
	  content: "\f081";
	}
	.ali-icon-facebook-square:before {
	  content: "\f082";
	}
	.ali-icon-camera-retro:before {
	  content: "\f083";
	}
	.ali-icon-key:before {
	  content: "\f084";
	}
	.ali-icon-gears:before,
	.ali-icon-cogs:before {
	  content: "\f085";
	}
	.ali-icon-comments:before {
	  content: "\f086";
	}
	.ali-icon-thumbs-o-up:before {
	  content: "\f087";
	}
	.ali-icon-thumbs-o-down:before {
	  content: "\f088";
	}
	.ali-icon-star-half:before {
	  content: "\f089";
	}
	.ali-icon-heart-o:before {
	  content: "\f08a";
	}
	.ali-icon-sign-out:before {
	  content: "\f08b";
	}
	.ali-icon-linkedin-square:before {
	  content: "\f08c";
	}
	.ali-icon-thumb-tack:before {
	  content: "\f08d";
	}
	.ali-icon-external-link:before {
	  content: "\f08e";
	}
	.ali-icon-sign-in:before {
	  content: "\f090";
	}
	.ali-icon-trophy:before {
	  content: "\f091";
	}
	.ali-icon-github-square:before {
	  content: "\f092";
	}
	.ali-icon-upload:before {
	  content: "\f093";
	}
	.ali-icon-lemon-o:before {
	  content: "\f094";
	}
	.ali-icon-phone:before {
	  content: "\f095";
	}
	.ali-icon-square-o:before {
	  content: "\f096";
	}
	.ali-icon-bookmark-o:before {
	  content: "\f097";
	}
	.ali-icon-phone-square:before {
	  content: "\f098";
	}
	.ali-icon-twitter:before {
	  content: "\f099";
	}
	.ali-icon-facebook:before {
	  content: "\f09a";
	}
	.ali-icon-github:before {
	  content: "\f09b";
	}
	.ali-icon-unlock:before {
	  content: "\f09c";
	}
	.ali-icon-credit-card:before {
	  content: "\f09d";
	}
	.ali-icon-rss:before {
	  content: "\f09e";
	}
	.ali-icon-hdd-o:before {
	  content: "\f0a0";
	}
	.ali-icon-bullhorn:before {
	  content: "\f0a1";
	}
	.ali-icon-bell:before {
	  content: "\f0f3";
	}
	.ali-icon-certificate:before {
	  content: "\f0a3";
	}
	.ali-icon-hand-o-right:before {
	  content: "\f0a4";
	}
	.ali-icon-hand-o-left:before {
	  content: "\f0a5";
	}
	.ali-icon-hand-o-up:before {
	  content: "\f0a6";
	}
	.ali-icon-hand-o-down:before {
	  content: "\f0a7";
	}
	.ali-icon-arrow-circle-left:before {
	  content: "\f0a8";
	}
	.ali-icon-arrow-circle-right:before {
	  content: "\f0a9";
	}
	.ali-icon-arrow-circle-up:before {
	  content: "\f0aa";
	}
	.ali-icon-arrow-circle-down:before {
	  content: "\f0ab";
	}
	.ali-icon-globe:before {
	  content: "\f0ac";
	}
	.ali-icon-wrench:before {
	  content: "\f0ad";
	}
	.ali-icon-tasks:before {
	  content: "\f0ae";
	}
	.ali-icon-filter:before {
	  content: "\f0b0";
	}
	.ali-icon-briefcase:before {
	  content: "\f0b1";
	}
	.ali-icon-arrows-alt:before {
	  content: "\f0b2";
	}
	.ali-icon-group:before,
	.ali-icon-users:before {
	  content: "\f0c0";
	}
	.ali-icon-chain:before,
	.ali-icon-link:before {
	  content: "\f0c1";
	}
	.ali-icon-cloud:before {
	  content: "\f0c2";
	}
	.ali-icon-flask:before {
	  content: "\f0c3";
	}
	.ali-icon-cut:before,
	.ali-icon-scissors:before {
	  content: "\f0c4";
	}
	.ali-icon-copy:before,
	.ali-icon-files-o:before {
	  content: "\f0c5";
	}
	.ali-icon-paperclip:before {
	  content: "\f0c6";
	}
	.ali-icon-save:before,
	.ali-icon-floppy-o:before {
	  content: "\f0c7";
	}
	.ali-icon-square:before {
	  content: "\f0c8";
	}
	.ali-icon-navicon:before,
	.ali-icon-reorder:before,
	.ali-icon-bars:before {
	  content: "\f0c9";
	}
	.ali-icon-list-ul:before {
	  content: "\f0ca";
	}
	.ali-icon-list-ol:before {
	  content: "\f0cb";
	}
	.ali-icon-strikethrough:before {
	  content: "\f0cc";
	}
	.ali-icon-underline:before {
	  content: "\f0cd";
	}
	.ali-icon-table:before {
	  content: "\f0ce";
	}
	.ali-icon-magic:before {
	  content: "\f0d0";
	}
	.ali-icon-truck:before {
	  content: "\f0d1";
	}
	.ali-icon-pinterest:before {
	  content: "\f0d2";
	}
	.ali-icon-pinterest-square:before {
	  content: "\f0d3";
	}
	.ali-icon-google-plus-square:before {
	  content: "\f0d4";
	}
	.ali-icon-google-plus:before {
	  content: "\f0d5";
	}
	.ali-icon-money:before {
	  content: "\f0d6";
	}
	.ali-icon-caret-down:before {
	  content: "\f0d7";
	}
	.ali-icon-caret-up:before {
	  content: "\f0d8";
	}
	.ali-icon-caret-left:before {
	  content: "\f0d9";
	}
	.ali-icon-caret-right:before {
	  content: "\f0da";
	}
	.ali-icon-columns:before {
	  content: "\f0db";
	}
	.ali-icon-unsorted:before,
	.ali-icon-sort:before {
	  content: "\f0dc";
	}
	.ali-icon-sort-down:before,
	.ali-icon-sort-desc:before {
	  content: "\f0dd";
	}
	.ali-icon-sort-up:before,
	.ali-icon-sort-asc:before {
	  content: "\f0de";
	}
	.ali-icon-envelope:before {
	  content: "\f0e0";
	}
	.ali-icon-linkedin:before {
	  content: "\f0e1";
	}
	.ali-icon-rotate-left:before,
	.ali-icon-undo:before {
	  content: "\f0e2";
	}
	.ali-icon-legal:before,
	.ali-icon-gavel:before {
	  content: "\f0e3";
	}
	.ali-icon-dashboard:before,
	.ali-icon-tachometer:before {
	  content: "\f0e4";
	}
	.ali-icon-comment-o:before {
	  content: "\f0e5";
	}
	.ali-icon-comments-o:before {
	  content: "\f0e6";
	}
	.ali-icon-flash:before,
	.ali-icon-bolt:before {
	  content: "\f0e7";
	}
	.ali-icon-sitemap:before {
	  content: "\f0e8";
	}
	.ali-icon-umbrella:before {
	  content: "\f0e9";
	}
	.ali-icon-paste:before,
	.ali-icon-clipboard:before {
	  content: "\f0ea";
	}
	.ali-icon-lightbulb-o:before {
	  content: "\f0eb";
	}
	.ali-icon-exchange:before {
	  content: "\f0ec";
	}
	.ali-icon-cloud-download:before {
	  content: "\f0ed";
	}
	.ali-icon-cloud-upload:before {
	  content: "\f0ee";
	}
	.ali-icon-user-md:before {
	  content: "\f0f0";
	}
	.ali-icon-stethoscope:before {
	  content: "\f0f1";
	}
	.ali-icon-suitcase:before {
	  content: "\f0f2";
	}
	.ali-icon-bell-o:before {
	  content: "\f0a2";
	}
	.ali-icon-coffee:before {
	  content: "\f0f4";
	}
	.ali-icon-cutlery:before {
	  content: "\f0f5";
	}
	.ali-icon-file-text-o:before {
	  content: "\f0f6";
	}
	.ali-icon-building-o:before {
	  content: "\f0f7";
	}
	.ali-icon-hospital-o:before {
	  content: "\f0f8";
	}
	.ali-icon-ambulance:before {
	  content: "\f0f9";
	}
	.ali-icon-medkit:before {
	  content: "\f0fa";
	}
	.ali-icon-fighter-jet:before {
	  content: "\f0fb";
	}
	.ali-icon-beer:before {
	  content: "\f0fc";
	}
	.ali-icon-h-square:before {
	  content: "\f0fd";
	}
	.ali-icon-plus-square:before {
	  content: "\f0fe";
	}
	.ali-icon-angle-double-left:before {
	  content: "\f100";
	}
	.ali-icon-angle-double-right:before {
	  content: "\f101";
	}
	.ali-icon-angle-double-up:before {
	  content: "\f102";
	}
	.ali-icon-angle-double-down:before {
	  content: "\f103";
	}
	.ali-icon-angle-left:before {
	  content: "\f104";
	}
	.ali-icon-angle-right:before {
	  content: "\f105";
	}
	.ali-icon-angle-up:before {
	  content: "\f106";
	}
	.ali-icon-angle-down:before {
	  content: "\f107";
	}
	.ali-icon-desktop:before {
	  content: "\f108";
	}
	.ali-icon-laptop:before {
	  content: "\f109";
	}
	.ali-icon-tablet:before {
	  content: "\f10a";
	}
	.ali-icon-mobile-phone:before,
	.ali-icon-mobile:before {
	  content: "\f10b";
	}
	.ali-icon-circle-o:before {
	  content: "\f10c";
	}
	.ali-icon-quote-left:before {
	  content: "\f10d";
	}
	.ali-icon-quote-right:before {
	  content: "\f10e";
	}
	.ali-icon-spinner:before {
	  content: "\f110";
	}
	.ali-icon-circle:before {
	  content: "\f111";
	}
	.ali-icon-mail-reply:before,
	.ali-icon-reply:before {
	  content: "\f112";
	}
	.ali-icon-github-alt:before {
	  content: "\f113";
	}
	.ali-icon-folder-o:before {
	  content: "\f114";
	}
	.ali-icon-folder-open-o:before {
	  content: "\f115";
	}
	.ali-icon-smile-o:before {
	  content: "\f118";
	}
	.ali-icon-frown-o:before {
	  content: "\f119";
	}
	.ali-icon-meh-o:before {
	  content: "\f11a";
	}
	.ali-icon-gamepad:before {
	  content: "\f11b";
	}
	.ali-icon-keyboard-o:before {
	  content: "\f11c";
	}
	.ali-icon-flag-o:before {
	  content: "\f11d";
	}
	.ali-icon-flag-checkered:before {
	  content: "\f11e";
	}
	.ali-icon-terminal:before {
	  content: "\f120";
	}
	.ali-icon-code:before {
	  content: "\f121";
	}
	.ali-icon-mail-reply-all:before,
	.ali-icon-reply-all:before {
	  content: "\f122";
	}
	.ali-icon-star-half-empty:before,
	.ali-icon-star-half-full:before,
	.ali-icon-star-half-o:before {
	  content: "\f123";
	}
	.ali-icon-location-arrow:before {
	  content: "\f124";
	}
	.ali-icon-crop:before {
	  content: "\f125";
	}
	.ali-icon-code-fork:before {
	  content: "\f126";
	}
	.ali-icon-unlink:before,
	.ali-icon-chain-broken:before {
	  content: "\f127";
	}
	.ali-icon-question:before {
	  content: "\f128";
	}
	.ali-icon-info:before {
	  content: "\f129";
	}
	.ali-icon-exclamation:before {
	  content: "\f12a";
	}
	.ali-icon-superscript:before {
	  content: "\f12b";
	}
	.ali-icon-subscript:before {
	  content: "\f12c";
	}
	.ali-icon-eraser:before {
	  content: "\f12d";
	}
	.ali-icon-puzzle-piece:before {
	  content: "\f12e";
	}
	.ali-icon-microphone:before {
	  content: "\f130";
	}
	.ali-icon-microphone-slash:before {
	  content: "\f131";
	}
	.ali-icon-shield:before {
	  content: "\f132";
	}
	.ali-icon-calendar-o:before {
	  content: "\f133";
	}
	.ali-icon-fire-extinguisher:before {
	  content: "\f134";
	}
	.ali-icon-rocket:before {
	  content: "\f135";
	}
	.ali-icon-maxcdn:before {
	  content: "\f136";
	}
	.ali-icon-chevron-circle-left:before {
	  content: "\f137";
	}
	.ali-icon-chevron-circle-right:before {
	  content: "\f138";
	}
	.ali-icon-chevron-circle-up:before {
	  content: "\f139";
	}
	.ali-icon-chevron-circle-down:before {
	  content: "\f13a";
	}
	.ali-icon-html5:before {
	  content: "\f13b";
	}
	.ali-icon-css3:before {
	  content: "\f13c";
	}
	.ali-icon-anchor:before {
	  content: "\f13d";
	}
	.ali-icon-unlock-alt:before {
	  content: "\f13e";
	}
	.ali-icon-bullseye:before {
	  content: "\f140";
	}
	.ali-icon-ellipsis-h:before {
	  content: "\f141";
	}
	.ali-icon-ellipsis-v:before {
	  content: "\f142";
	}
	.ali-icon-rss-square:before {
	  content: "\f143";
	}
	.ali-icon-play-circle:before {
	  content: "\f144";
	}
	.ali-icon-ticket:before {
	  content: "\f145";
	}
	.ali-icon-minus-square:before {
	  content: "\f146";
	}
	.ali-icon-minus-square-o:before {
	  content: "\f147";
	}
	.ali-icon-level-up:before {
	  content: "\f148";
	}
	.ali-icon-level-down:before {
	  content: "\f149";
	}
	.ali-icon-check-square:before {
	  content: "\f14a";
	}
	.ali-icon-pencil-square:before {
	  content: "\f14b";
	}
	.ali-icon-external-link-square:before {
	  content: "\f14c";
	}
	.ali-icon-share-square:before {
	  content: "\f14d";
	}
	.ali-icon-compass:before {
	  content: "\f14e";
	}
	.ali-icon-toggle-down:before,
	.ali-icon-caret-square-o-down:before {
	  content: "\f150";
	}
	.ali-icon-toggle-up:before,
	.ali-icon-caret-square-o-up:before {
	  content: "\f151";
	}
	.ali-icon-toggle-right:before,
	.ali-icon-caret-square-o-right:before {
	  content: "\f152";
	}
	.ali-icon-euro:before,
	.ali-icon-eur:before {
	  content: "\f153";
	}
	.ali-icon-gbp:before {
	  content: "\f154";
	}
	.ali-icon-dollar:before,
	.ali-icon-usd:before {
	  content: "\f155";
	}
	.ali-icon-rupee:before,
	.ali-icon-inr:before {
	  content: "\f156";
	}
	.ali-icon-cny:before,
	.ali-icon-rmb:before,
	.ali-icon-yen:before,
	.ali-icon-jpy:before {
	  content: "\f157";
	}
	.ali-icon-ruble:before,
	.ali-icon-rouble:before,
	.ali-icon-rub:before {
	  content: "\f158";
	}
	.ali-icon-won:before,
	.ali-icon-krw:before {
	  content: "\f159";
	}
	.ali-icon-bitcoin:before,
	.ali-icon-btc:before {
	  content: "\f15a";
	}
	.ali-icon-file:before {
	  content: "\f15b";
	}
	.ali-icon-file-text:before {
	  content: "\f15c";
	}
	.ali-icon-sort-alpha-asc:before {
	  content: "\f15d";
	}
	.ali-icon-sort-alpha-desc:before {
	  content: "\f15e";
	}
	.ali-icon-sort-amount-asc:before {
	  content: "\f160";
	}
	.ali-icon-sort-amount-desc:before {
	  content: "\f161";
	}
	.ali-icon-sort-numeric-asc:before {
	  content: "\f162";
	}
	.ali-icon-sort-numeric-desc:before {
	  content: "\f163";
	}
	.ali-icon-thumbs-up:before {
	  content: "\f164";
	}
	.ali-icon-thumbs-down:before {
	  content: "\f165";
	}
	.ali-icon-youtube-square:before {
	  content: "\f166";
	}
	.ali-icon-youtube:before {
	  content: "\f167";
	}
	.ali-icon-xing:before {
	  content: "\f168";
	}
	.ali-icon-xing-square:before {
	  content: "\f169";
	}
	.ali-icon-youtube-play:before {
	  content: "\f16a";
	}
	.ali-icon-dropbox:before {
	  content: "\f16b";
	}
	.ali-icon-stack-overflow:before {
	  content: "\f16c";
	}
	.ali-icon-instagram:before {
	  content: "\f16d";
	}
	.ali-icon-flickr:before {
	  content: "\f16e";
	}
	.ali-icon-adn:before {
	  content: "\f170";
	}
	.ali-icon-bitbucket:before {
	  content: "\f171";
	}
	.ali-icon-bitbucket-square:before {
	  content: "\f172";
	}
	.ali-icon-tumblr:before {
	  content: "\f173";
	}
	.ali-icon-tumblr-square:before {
	  content: "\f174";
	}
	.ali-icon-long-arrow-down:before {
	  content: "\f175";
	}
	.ali-icon-long-arrow-up:before {
	  content: "\f176";
	}
	.ali-icon-long-arrow-left:before {
	  content: "\f177";
	}
	.ali-icon-long-arrow-right:before {
	  content: "\f178";
	}
	.ali-icon-apple:before {
	  content: "\f179";
	}
	.ali-icon-windows:before {
	  content: "\f17a";
	}
	.ali-icon-android:before {
	  content: "\f17b";
	}
	.ali-icon-linux:before {
	  content: "\f17c";
	}
	.ali-icon-dribbble:before {
	  content: "\f17d";
	}
	.ali-icon-skype:before {
	  content: "\f17e";
	}
	.ali-icon-foursquare:before {
	  content: "\f180";
	}
	.ali-icon-trello:before {
	  content: "\f181";
	}
	.ali-icon-female:before {
	  content: "\f182";
	}
	.ali-icon-male:before {
	  content: "\f183";
	}
	.ali-icon-gittip:before {
	  content: "\f184";
	}
	.ali-icon-sun-o:before {
	  content: "\f185";
	}
	.ali-icon-moon-o:before {
	  content: "\f186";
	}
	.ali-icon-archive:before {
	  content: "\f187";
	}
	.ali-icon-bug:before {
	  content: "\f188";
	}
	.ali-icon-vk:before {
	  content: "\f189";
	}
	.ali-icon-weibo:before {
	  content: "\f18a";
	}
	.ali-icon-renren:before {
	  content: "\f18b";
	}
	.ali-icon-pagelines:before {
	  content: "\f18c";
	}
	.ali-icon-stack-exchange:before {
	  content: "\f18d";
	}
	.ali-icon-arrow-circle-o-right:before {
	  content: "\f18e";
	}
	.ali-icon-arrow-circle-o-left:before {
	  content: "\f190";
	}
	.ali-icon-toggle-left:before,
	.ali-icon-caret-square-o-left:before {
	  content: "\f191";
	}
	.ali-icon-dot-circle-o:before {
	  content: "\f192";
	}
	.ali-icon-wheelchair:before {
	  content: "\f193";
	}
	.ali-icon-vimeo-square:before {
	  content: "\f194";
	}
	.ali-icon-turkish-lira:before,
	.ali-icon-try:before {
	  content: "\f195";
	}
	.ali-icon-plus-square-o:before {
	  content: "\f196";
	}
	.ali-icon-space-shuttle:before {
	  content: "\f197";
	}
	.ali-icon-slack:before {
	  content: "\f198";
	}
	.ali-icon-envelope-square:before {
	  content: "\f199";
	}
	.ali-icon-wordpress:before {
	  content: "\f19a";
	}
	.ali-icon-openid:before {
	  content: "\f19b";
	}
	.ali-icon-institution:before,
	.ali-icon-bank:before,
	.ali-icon-university:before {
	  content: "\f19c";
	}
	.ali-icon-mortar-board:before,
	.ali-icon-graduation-cap:before {
	  content: "\f19d";
	}
	.ali-icon-yahoo:before {
	  content: "\f19e";
	}
	.ali-icon-google:before {
	  content: "\f1a0";
	}
	.ali-icon-reddit:before {
	  content: "\f1a1";
	}
	.ali-icon-reddit-square:before {
	  content: "\f1a2";
	}
	.ali-icon-stumbleupon-circle:before {
	  content: "\f1a3";
	}
	.ali-icon-stumbleupon:before {
	  content: "\f1a4";
	}
	.ali-icon-delicious:before {
	  content: "\f1a5";
	}
	.ali-icon-digg:before {
	  content: "\f1a6";
	}
	.ali-icon-pied-piper:before {
	  content: "\f1a7";
	}
	.ali-icon-pied-piper-alt:before {
	  content: "\f1a8";
	}
	.ali-icon-drupal:before {
	  content: "\f1a9";
	}
	.ali-icon-joomla:before {
	  content: "\f1aa";
	}
	.ali-icon-language:before {
	  content: "\f1ab";
	}
	.ali-icon-fax:before {
	  content: "\f1ac";
	}
	.ali-icon-building:before {
	  content: "\f1ad";
	}
	.ali-icon-child:before {
	  content: "\f1ae";
	}
	.ali-icon-paw:before {
	  content: "\f1b0";
	}
	.ali-icon-spoon:before {
	  content: "\f1b1";
	}
	.ali-icon-cube:before {
	  content: "\f1b2";
	}
	.ali-icon-cubes:before {
	  content: "\f1b3";
	}
	.ali-icon-behance:before {
	  content: "\f1b4";
	}
	.ali-icon-behance-square:before {
	  content: "\f1b5";
	}
	.ali-icon-steam:before {
	  content: "\f1b6";
	}
	.ali-icon-steam-square:before {
	  content: "\f1b7";
	}
	.ali-icon-recycle:before {
	  content: "\f1b8";
	}
	.ali-icon-automobile:before,
	.ali-icon-car:before {
	  content: "\f1b9";
	}
	.ali-icon-cab:before,
	.ali-icon-taxi:before {
	  content: "\f1ba";
	}
	.ali-icon-tree:before {
	  content: "\f1bb";
	}
	.ali-icon-spotify:before {
	  content: "\f1bc";
	}
	.ali-icon-deviantart:before {
	  content: "\f1bd";
	}
	.ali-icon-soundcloud:before {
	  content: "\f1be";
	}
	.ali-icon-database:before {
	  content: "\f1c0";
	}
	.ali-icon-file-pdf-o:before {
	  content: "\f1c1";
	}
	.ali-icon-file-word-o:before {
	  content: "\f1c2";
	}
	.ali-icon-file-excel-o:before {
	  content: "\f1c3";
	}
	.ali-icon-file-powerpoint-o:before {
	  content: "\f1c4";
	}
	.ali-icon-file-photo-o:before,
	.ali-icon-file-picture-o:before,
	.ali-icon-file-image-o:before {
	  content: "\f1c5";
	}
	.ali-icon-file-zip-o:before,
	.ali-icon-file-archive-o:before {
	  content: "\f1c6";
	}
	.ali-icon-file-sound-o:before,
	.ali-icon-file-audio-o:before {
	  content: "\f1c7";
	}
	.ali-icon-file-movie-o:before,
	.ali-icon-file-video-o:before {
	  content: "\f1c8";
	}
	.ali-icon-file-code-o:before {
	  content: "\f1c9";
	}
	.ali-icon-vine:before {
	  content: "\f1ca";
	}
	.ali-icon-codepen:before {
	  content: "\f1cb";
	}
	.ali-icon-jsfiddle:before {
	  content: "\f1cc";
	}
	.ali-icon-life-bouy:before,
	.ali-icon-life-buoy:before,
	.ali-icon-life-saver:before,
	.ali-icon-support:before,
	.ali-icon-life-ring:before {
	  content: "\f1cd";
	}
	.ali-icon-circle-o-notch:before {
	  content: "\f1ce";
	}
	.ali-icon-ra:before,
	.ali-icon-rebel:before {
	  content: "\f1d0";
	}
	.ali-icon-ge:before,
	.ali-icon-empire:before {
	  content: "\f1d1";
	}
	.ali-icon-git-square:before {
	  content: "\f1d2";
	}
	.ali-icon-git:before {
	  content: "\f1d3";
	}
	.ali-icon-hacker-news:before {
	  content: "\f1d4";
	}
	.ali-icon-tencent-weibo:before {
	  content: "\f1d5";
	}
	.ali-icon-qq:before {
	  content: "\f1d6";
	}
	.ali-icon-wechat:before,
	.ali-icon-weixin:before {
	  content: "\f1d7";
	}
	.ali-icon-send:before,
	.ali-icon-paper-plane:before {
	  content: "\f1d8";
	}
	.ali-icon-send-o:before,
	.ali-icon-paper-plane-o:before {
	  content: "\f1d9";
	}
	.ali-icon-history:before {
	  content: "\f1da";
	}
	.ali-icon-circle-thin:before {
	  content: "\f1db";
	}
	.ali-icon-header:before {
	  content: "\f1dc";
	}
	.ali-icon-paragraph:before {
	  content: "\f1dd";
	}
	.ali-icon-sliders:before {
	  content: "\f1de";
	}
	.ali-icon-share-alt:before {
	  content: "\f1e0";
	}
	.ali-icon-share-alt-square:before {
	  content: "\f1e1";
	}
	.ali-icon-bomb:before {
	  content: "\f1e2";
	}
	.ali-icon-soccer-ball-o:before,
	.ali-icon-futbol-o:before {
	  content: "\f1e3";
	}
	.ali-icon-tty:before {
	  content: "\f1e4";
	}
	.ali-icon-binoculars:before {
	  content: "\f1e5";
	}
	.ali-icon-plug:before {
	  content: "\f1e6";
	}
	.ali-icon-slideshare:before {
	  content: "\f1e7";
	}
	.ali-icon-twitch:before {
	  content: "\f1e8";
	}
	.ali-icon-yelp:before {
	  content: "\f1e9";
	}
	.ali-icon-newspaper-o:before {
	  content: "\f1ea";
	}
	.ali-icon-wifi:before {
	  content: "\f1eb";
	}
	.ali-icon-calculator:before {
	  content: "\f1ec";
	}
	.ali-icon-paypal:before {
	  content: "\f1ed";
	}
	.ali-icon-google-wallet:before {
	  content: "\f1ee";
	}
	.ali-icon-cc-visa:before {
	  content: "\f1f0";
	}
	.ali-icon-cc-mastercard:before {
	  content: "\f1f1";
	}
	.ali-icon-cc-discover:before {
	  content: "\f1f2";
	}
	.ali-icon-cc-amex:before {
	  content: "\f1f3";
	}
	.ali-icon-cc-paypal:before {
	  content: "\f1f4";
	}
	.ali-icon-cc-stripe:before {
	  content: "\f1f5";
	}
	.ali-icon-bell-slash:before {
	  content: "\f1f6";
	}
	.ali-icon-bell-slash-o:before {
	  content: "\f1f7";
	}
	.ali-icon-trash:before {
	  content: "\f1f8";
	}
	.ali-icon-copyright:before {
	  content: "\f1f9";
	}
	.ali-icon-at:before {
	  content: "\f1fa";
	}
	.ali-icon-eyedropper:before {
	  content: "\f1fb";
	}
	.ali-icon-paint-brush:before {
	  content: "\f1fc";
	}
	.ali-icon-birthday-cake:before {
	  content: "\f1fd";
	}
	.ali-icon-area-chart:before {
	  content: "\f1fe";
	}
	.ali-icon-pie-chart:before {
	  content: "\f200";
	}
	.ali-icon-line-chart:before {
	  content: "\f201";
	}
	.ali-icon-lastfm:before {
	  content: "\f202";
	}
	.ali-icon-lastfm-square:before {
	  content: "\f203";
	}
	.ali-icon-toggle-off:before {
	  content: "\f204";
	}
	.ali-icon-toggle-on:before {
	  content: "\f205";
	}
	.ali-icon-bicycle:before {
	  content: "\f206";
	}
	.ali-icon-bus:before {
	  content: "\f207";
	}
	.ali-icon-ioxhost:before {
	  content: "\f208";
	}
	.ali-icon-angellist:before {
	  content: "\f209";
	}
	.ali-icon-cc:before {
	  content: "\f20a";
	}
	.ali-icon-shekel:before,
	.ali-icon-sheqel:before,
	.ali-icon-ils:before {
	  content: "\f20b";
	}
	.ali-icon-meanpath:before {
	  content: "\f20c";
	}
</style>
