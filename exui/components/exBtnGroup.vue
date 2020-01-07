<template name="exBtnGroup">
	<view class="ex-btn-toolbar">
		<!-- ex-btn-group-xs ex-active-->
		<view class="ex-btn-group" :class="groupClass" v-if="!textFlex">			
		  <button type="button" class="ex-btn"   :class="[index === tabCur ? selectClass + ' ex-active':'',btnColorClass,btnModeClass]"  v-for="(btn,index) in tabList" :key="index" @tap="tabSelect(index,$event)"><text :class="btn.icon"></text>{{btn.name}}</button>
		</view>
		
	</view>
	
	
</template>

<script>
export default {
	name: "exBtnGroup",
	props: {
		groupClass: {
			type: String
		},
		btnColorClass: {
			type: String
		},
		btnModeClass: {
			type: String
		},
		tabList: {
            type: Array,
            default() {
                return [];
            }
        },
		tabCur: {
            type: Number,
            default: 0
        },
        tabClass: {
            type: String,
            default: ''
        },
        tabStyle: {
            type: String,
            default: ''
        },
        textFlex: {
            type: Boolean,
            default: false
        },
        selectClass: {
            type: String,
			default: 'text-blue'
        }
	},
	data() {
		return {
			btnNum: this.maxBtnNum,
			valueSync: this.value
		}
	},
	computed: {
			btns() {
				const max = Number(this.btnNum) ? Number(this.btnNum) : 4
				const value = Number(this.valueSync) ? Number(this.valueSync) : 0
				const btnList = []
				const floorValue = Math.floor(value)
				const ceilValue = Math.ceil(value)
				for (let i = 0; i < max; i++) {
					if (floorValue > i) {
						btnList.push({
							activeWitch: '100%'
						})
					} else if (ceilValue - 1 === i) {
						btnList.push({
							activeWitch: (value - floorValue) * 100 + '%'
						})
					} else {
						btnList.push({
							activeWitch: '0'
						})
					}
				}
				return btnList
			}
	},
	methods: {		
		tabSelect(index, e) {
            if (this.currentTab === index) return false;
            this.$emit('update:tabCur', index);
            this.$emit('change', index);
        }
	}
}
</script>

<style>
</style>
