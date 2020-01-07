<template>
	<view>
		<view
			class="ex-unselect ex-form-switch "
			:class="[isChecked ? 'ex-form-onswitch' : '']"
			:value="value"
			:sid="index"
			@click="toggle"
			:style="{ color: bgcolor,height:'26px', width: width + 'px' }"
		>
			<em v-if="isChecked && direction.length > 0">{{ direction[0] }}</em>
			<em v-if="!isChecked && direction.length > 0">{{ direction[1] }}</em>

			<i></i>
		</view>
	</view>
</template>

<script>
export default {
	name: 'exSwitch',
	props: {
		value: {
			type: [String, Number],
			default: 0
		},
		bgcolor: {
			type: String,
			default: '#5FB878'
		},
		//宽度 px
		width: {
			type: Number,
			default: 52
		},
		text: {
			type: String,
			default: ''
		},
		sid: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			isChecked: this.value,
			index: this.sid
		};
	},
	computed: {
		direction() {
			if (this.text) {
				return this.text.split('|');
			} else {
				return [];
			}
		}
	},
	watch: {
		value(val) {
			this.isChecked = val;
		},
		isChecked(val) {
			let textTemp = '';
			if (val) {
				textTemp = this.text.split('|')[0];
			}
			if (!val) {
				textTemp = this.text.split('|')[1];
			}
			let ob = {
				sid: this.sid,
				value: val,
				text: textTemp
			};
			this.$emit('change', ob);
		}
	},
	methods: {
		toggle: function(e) {
			this.isChecked = !this.isChecked;
		}
	}
};
</script>

<style>
.ex-unselect {
	-moz-user-select: none;
	-webkit-user-select: none;
	-ms-user-select: none;
}
.ex-form-switch {
	display: inline-block;
	vertical-align: middle;
}
.ex-form-switch {
	position: relative;
	height: 22px;
	line-height: 22px;
	min-width: 35px;
	padding: 0 5px;
	margin-top: 8px;
	border: 1px solid #d2d2d2;
	border-radius: 20px;
	cursor: pointer;
	background-color:rgb(255, 255, 255,0.5);
	-webkit-transition: 0.1s linear;
	transition: 0.1s linear;
}
.ex-form-onswitch {
	/* border-color: #5fb878; */
	background-color: rgb(255, 255, 255,0.5);
}
.ex-form-switch em {
	position: relative;
	top: 2px;
	width: 25px;
	margin-left: 21px;
	padding: 0 !important;
	text-align: center !important;
	color: #fff !important;
	font-style: normal !important;
	font-size: 12px;
}
.ex-form-onswitch em {
	margin-left: 5px;
	margin-right: 21px;
	color: #fff !important;
}
.ex-form-switch i {
	position: absolute;
	left: 5px;
	top: 5px;
	width: 16px;
	height: 16px;
	border-radius: 20px;
	background-color: #fff;
	-webkit-transition: 0.1s linear;
	transition: 0.1s linear;
}
.ex-form-onswitch i {
	left: 100%;
	margin-left: -21px;
	background-color: #fff;
}
</style>
