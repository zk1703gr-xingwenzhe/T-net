<template name="ali-btn">

	<view class="ali-btn" :class="['ali-btn-'+btnstyle]" :style="{'color':color,'font-size':fontSize}" >
		<ali-icon v-if='isIcon' :iconStyle="icon" :color="icoColor" :iconSize="size"/>
		<text>{{btnName}}</text>
	</view>

</template>
<script>
	import aliIcon from "@/components/ali-ui/ali-icon/ali-icon.vue"
export default {
	name: "ali-btn",
	components: {
		aliIcon
	},
	//属性
	props: {		
		btnstyle:String,
		color: String,
		icoColor: String,
		size: [Number, String],
		btnName:String,		
		icon:String,
		
	},
	computed: {
		
		fontSize() {
			return `${this.size}px`
		},
		isIcon(){
			if(this.icon != ""){
				return true;
			}else{
				return false;
			}
			
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
.ali-btn {
  display: inline-block;
  margin-bottom: 0;
  font-weight: normal;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 0.625em 1em;
  border-radius: 2px;
  line-height: 1.2;
  font-size: 1.6rem;
  outline: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
  -webkit-transition: background-color 300ms ease-out, border-color 300ms ease-out;
  transition: background-color 300ms ease-out, border-color 300ms ease-out;
}
.ali-btn:focus {
  outline: thin dotted #333;
  outline: 5px auto -webkit-focus-ring-color;
  outline-offset: -2px;
}
.ali-btn:hover,
.ali-btn:focus {
  outline: 0;
  color: #444444;
  text-decoration: none;
}
.ali-btn:active,
.ali-btn.ali-active {
  background-image: none;
  -webkit-box-shadow: inset 0 1px 8px rgba(0, 0, 0, 0.125);
  box-shadow: inset 0 1px 8px rgba(0, 0, 0, 0.125);
}
.ali-btn.ali-disabled,
.ali-btn[disabled],
fieldset[disabled] .ali-btn {
  pointer-events: none;
  border-color: transparent;
  cursor: not-allowed;
  opacity: 0.45;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.ali-btn.ali-round {
  border-radius: 1000px;
}
.ali-btn.ali-square {
  border-radius: 0;
}
.ali-btn-default {
  color: #444444;
  background-color: #e6e6e6;
  border-color: #e6e6e6;
}
.ali-btn-default:hover,
.ali-btn-default:focus,
.ali-btn-default:active,
.ali-btn-default.ali-active,
.ali-active .ali-dropdown-toggle.ali-btn-default {
  color: #444444;
  background-color: #c7c7c7;
  border-color: #c7c7c7;
}
.ali-btn-default:active,
.ali-btn-default.ali-btn-active,
.ali-active .ali-dropdown-toggle.ali-btn-default {
  background-image: none;
}
.ali-btn-default.ali-disabled,
.ali-btn-default[disabled],
fieldset[disabled] .ali-btn-default,
.ali-btn-default.ali-disabled:hover,
.ali-btn-default[disabled]:hover,
fieldset[disabled] .ali-btn-default:hover,
.ali-btn-default.ali-disabled:focus,
.ali-btn-default[disabled]:focus,
fieldset[disabled] .ali-btn-default:focus,
.ali-btn-default.ali-disabled:active,
.ali-btn-default[disabled]:active,
fieldset[disabled] .ali-btn-default:active,
.ali-btn-default.ali-disabled.ali-btn-active,
.ali-btn-default[disabled].ali-btn-active,
fieldset[disabled] .ali-btn-default.ali-btn-active {
  background-color: #e6e6e6;
  border-color: #e6e6e6;
}
.ali-btn-group .ali-btn-default,
.ali-btn-group-stacked .ali-btn-default {
  border-color: #d9d9d9;
}
.ali-btn-primary {
  color: #ffffff;
  background-color: #0e90d2;
  border-color: #0e90d2;
}
.ali-btn-primary:hover,
.ali-btn-primary:focus,
.ali-btn-primary:active,
.ali-btn-primary.ali-active,
.ali-active .ali-dropdown-toggle.ali-btn-primary {
  color: #ffffff;
  background-color: #0a6999;
  border-color: #0a6999;
}
.ali-btn-primary:active,
.ali-btn-primary.ali-btn-active,
.ali-active .ali-dropdown-toggle.ali-btn-primary {
  background-image: none;
}
.ali-btn-primary.ali-disabled,
.ali-btn-primary[disabled],
fieldset[disabled] .ali-btn-primary,
.ali-btn-primary.ali-disabled:hover,
.ali-btn-primary[disabled]:hover,
fieldset[disabled] .ali-btn-primary:hover,
.ali-btn-primary.ali-disabled:focus,
.ali-btn-primary[disabled]:focus,
fieldset[disabled] .ali-btn-primary:focus,
.ali-btn-primary.ali-disabled:active,
.ali-btn-primary[disabled]:active,
fieldset[disabled] .ali-btn-primary:active,
.ali-btn-primary.ali-disabled.ali-btn-active,
.ali-btn-primary[disabled].ali-btn-active,
fieldset[disabled] .ali-btn-primary.ali-btn-active {
  background-color: #0e90d2;
  border-color: #0e90d2;
}
.ali-btn-group .ali-btn-primary,
.ali-btn-group-stacked .ali-btn-primary {
  border-color: #0c80ba;
}
.ali-btn-warning {
  color: #ffffff;
  background-color: #f37b1d;
  border-color: #f37b1d;
}
.ali-btn-warning:hover,
.ali-btn-warning:focus,
.ali-btn-warning:active,
.ali-btn-warning.ali-active,
.ali-active .ali-dropdown-toggle.ali-btn-warning {
  color: #ffffff;
  background-color: #c85e0b;
  border-color: #c85e0b;
}
.ali-btn-warning:active,
.ali-btn-warning.ali-btn-active,
.ali-active .ali-dropdown-toggle.ali-btn-warning {
  background-image: none;
}
.ali-btn-warning.ali-disabled,
.ali-btn-warning[disabled],
fieldset[disabled] .ali-btn-warning,
.ali-btn-warning.ali-disabled:hover,
.ali-btn-warning[disabled]:hover,
fieldset[disabled] .ali-btn-warning:hover,
.ali-btn-warning.ali-disabled:focus,
.ali-btn-warning[disabled]:focus,
fieldset[disabled] .ali-btn-warning:focus,
.ali-btn-warning.ali-disabled:active,
.ali-btn-warning[disabled]:active,
fieldset[disabled] .ali-btn-warning:active,
.ali-btn-warning.ali-disabled.ali-btn-active,
.ali-btn-warning[disabled].ali-btn-active,
fieldset[disabled] .ali-btn-warning.ali-btn-active {
  background-color: #f37b1d;
  border-color: #f37b1d;
}
.ali-btn-group .ali-btn-warning,
.ali-btn-group-stacked .ali-btn-warning {
  border-color: #ea6e0c;
}
.ali-btn-danger {
  color: #ffffff;
  background-color: #dd514c;
  border-color: #dd514c;
}
.ali-btn-danger:hover,
.ali-btn-danger:focus,
.ali-btn-danger:active,
.ali-btn-danger.ali-active,
.ali-active .ali-dropdown-toggle.ali-btn-danger {
  color: #ffffff;
  background-color: #c62b26;
  border-color: #c62b26;
}
.ali-btn-danger:active,
.ali-btn-danger.ali-btn-active,
.ali-active .ali-dropdown-toggle.ali-btn-danger {
  background-image: none;
}
.ali-btn-danger.ali-disabled,
.ali-btn-danger[disabled],
fieldset[disabled] .ali-btn-danger,
.ali-btn-danger.ali-disabled:hover,
.ali-btn-danger[disabled]:hover,
fieldset[disabled] .ali-btn-danger:hover,
.ali-btn-danger.ali-disabled:focus,
.ali-btn-danger[disabled]:focus,
fieldset[disabled] .ali-btn-danger:focus,
.ali-btn-danger.ali-disabled:active,
.ali-btn-danger[disabled]:active,
fieldset[disabled] .ali-btn-danger:active,
.ali-btn-danger.ali-disabled.ali-btn-active,
.ali-btn-danger[disabled].ali-btn-active,
fieldset[disabled] .ali-btn-danger.ali-btn-active {
  background-color: #dd514c;
  border-color: #dd514c;
}
.ali-btn-group .ali-btn-danger,
.ali-btn-group-stacked .ali-btn-danger {
  border-color: #d93c37;
}
.ali-btn-success {
  color: #ffffff;
  background-color: #5eb95e;
  border-color: #5eb95e;
}
.ali-btn-success:hover,
.ali-btn-success:focus,
.ali-btn-success:active,
.ali-btn-success.ali-active,
.ali-active .ali-dropdown-toggle.ali-btn-success {
  color: #ffffff;
  background-color: #429842;
  border-color: #429842;
}
.ali-btn-success:active,
.ali-btn-success.ali-btn-active,
.ali-active .ali-dropdown-toggle.ali-btn-success {
  background-image: none;
}
.ali-btn-success.ali-disabled,
.ali-btn-success[disabled],
fieldset[disabled] .ali-btn-success,
.ali-btn-success.ali-disabled:hover,
.ali-btn-success[disabled]:hover,
fieldset[disabled] .ali-btn-success:hover,
.ali-btn-success.ali-disabled:focus,
.ali-btn-success[disabled]:focus,
fieldset[disabled] .ali-btn-success:focus,
.ali-btn-success.ali-disabled:active,
.ali-btn-success[disabled]:active,
fieldset[disabled] .ali-btn-success:active,
.ali-btn-success.ali-disabled.ali-btn-active,
.ali-btn-success[disabled].ali-btn-active,
fieldset[disabled] .ali-btn-success.ali-btn-active {
  background-color: #5eb95e;
  border-color: #5eb95e;
}
.ali-btn-group .ali-btn-success,
.ali-btn-group-stacked .ali-btn-success {
  border-color: #4db14d;
}
.ali-btn-secondary {
  color: #ffffff;
  background-color: #3bb4f2;
  border-color: #3bb4f2;
}
.ali-btn-secondary:hover,
.ali-btn-secondary:focus,
.ali-btn-secondary:active,
.ali-btn-secondary.ali-active,
.ali-active .ali-dropdown-toggle.ali-btn-secondary {
  color: #ffffff;
  background-color: #0f9ae0;
  border-color: #0f9ae0;
}
.ali-btn-secondary:active,
.ali-btn-secondary.ali-btn-active,
.ali-active .ali-dropdown-toggle.ali-btn-secondary {
  background-image: none;
}
.ali-btn-secondary.ali-disabled,
.ali-btn-secondary[disabled],
fieldset[disabled] .ali-btn-secondary,
.ali-btn-secondary.ali-disabled:hover,
.ali-btn-secondary[disabled]:hover,
fieldset[disabled] .ali-btn-secondary:hover,
.ali-btn-secondary.ali-disabled:focus,
.ali-btn-secondary[disabled]:focus,
fieldset[disabled] .ali-btn-secondary:focus,
.ali-btn-secondary.ali-disabled:active,
.ali-btn-secondary[disabled]:active,
fieldset[disabled] .ali-btn-secondary:active,
.ali-btn-secondary.ali-disabled.ali-btn-active,
.ali-btn-secondary[disabled].ali-btn-active,
fieldset[disabled] .ali-btn-secondary.ali-btn-active {
  background-color: #3bb4f2;
  border-color: #3bb4f2;
}
.ali-btn-group .ali-btn-secondary,
.ali-btn-group-stacked .ali-btn-secondary {
  border-color: #23abf0;
}
/* Style links like a button */
.ali-btn-link {
  color: #0e90d2;
  font-weight: normal;
  cursor: pointer;
  border-radius: 0;
}
.ali-btn-link,
.ali-btn-link:active,
.ali-btn-link[disabled],
fieldset[disabled] .ali-btn-link {
  background-color: transparent;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.ali-btn-link,
.ali-btn-link:hover,
.ali-btn-link:focus,
.ali-btn-link:active {
  border-color: transparent;
}
.ali-btn-link:hover,
.ali-btn-link:focus {
  color: #095f8a;
  text-decoration: underline;
  background-color: transparent;
}
.ali-btn-link[disabled]:hover,
fieldset[disabled] .ali-btn-link:hover,
.ali-btn-link[disabled]:focus,
fieldset[disabled] .ali-btn-link:focus {
  color: #999999;
  text-decoration: none;
}
/* button size */
.ali-btn-lg,
.ali-btn-group-lg > .ali-btn {
  font-size: 1.8rem;
}
.ali-btn-sm,
.ali-btn-group-sm > .ali-btn {
  font-size: 1.4rem;
}
.ali-btn-xs,
.ali-btn-group-xs > .ali-btn {
  font-size: 1.2rem;
}
/* Block button  */
.ali-btn-block {
  display: block;
  width: 100%;
  padding-left: 0;
  padding-right: 0;
}
/* Multiple block buttons vertically space */
.ali-btn-block + .ali-btn-block {
  margin-top: 5px;
}
/* Specificity overrides */
input[type="submit"].ali-btn-block,
input[type="reset"].ali-btn-block,
input[type="button"].ali-btn-block {
  width: 100%;
}
/* Button with loading spinner */
.ali-btn.ali-btn-loading .ali-icon-spin {
  margin-right: 5px;
}
</style>