<template>
	<div class="key-box block flex">
		<div class="key-left">
			<div class="key-top flex flex-wrap">
				<div class="btn-box" v-for="(item, index) in numArr" :key="index">
					<button hover-class="active" class="cu-btn key-btn text-black text-xl" @click.stop="keydown(item)">{{ item }}</button>
				</div>
			</div>
			<div class="key-bottom">
				<div :class="isNum ? 'btn-zero' : 'btn-box'">
					<button hover-class="active" class="cu-btn key-btn text-black text-xl" @click.stop="keydown('0')">0</button>
				</div>
				<div v-if="!isNum" :class="isNum ? '' : 'btn-box'">
					<button hover-class="active" class="cu-btn key-btn text-black text-xl" @click.stop="keydown('X')">X</button>
				</div>
				<div class="btn-box">
					<button hover-class="active" class="cu-btn key-btn text-black text-xl" @click.stop="keydown('.')">.</button>
				</div>
			</div>
		</div>
		<div class="key-right">
			<div class="del_class2">
				<button hover-class="active" class="cu-btn key-btn text-black text-xl" @click.stop="del">
					<div class="zm iconbackspace text-xl"></div>
				</button>
			</div>
			<div class="confirm">
				<button hover-class="active" :style="confirmStyle" class="cu-btn confirm-btn" @click.stop="confirm">
					<div class="confirm-text">{{ confirmText }}</div>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		duration: {
			type: Number, //弹出动画时常
			default: 300,
		},
		confirmText: {
			type: String,
			default: "确 定",
		},
		maxNumber: {
			default: 0,
			type: Number,
		},
		confirmStyle: {
			type: Object,
			default: () => {
				return {
					backgroundColor: "#57BE6D",
				};
			},
		},
		isNum: {
			type: Boolean,
			default: () => false,
		},
	},
	data() {
		return {
			value: "", //输出的值
			show: true, //显示键盘
			showMask: true, //遮罩层
			numArr: [1, 2, 3, 4, 5, 6, 7, 8, 9],
		};
	},

	watch: {
		value(newval, oldval) {
			this.$emit("change", newval);
		},
	},
	methods: {
		close() {
			this.show = false;
			setTimeout(() => {
				this.showMask = false;
			}, this.duration);
		},
		open() {
			this.value = "";
			this.show = true;
			this.showMask = true;
		},
		del() {
			if (this.value.length) {
				this.value = this.value.slice(0, this.value.length - 1);
			}
		},
		keydown(e) {
			switch (e) {
				case ".":
					// 当输入为点的时候，如果第一次输入点，则补零
					if (!this.value.length) {
						this.value = "0.";
					} else {
						if (this.value.indexOf(".") > -1) {
							// 如果已经有点，则无效
						} else {
							this.value = this.value + "" + e;
						}
					}
					break;
				default:
					if (this.maxNumber > 0 && Number(this.value + e) > this.maxNumber) return;
					let S = this.value;
					//如果有小数点且小数点位数不小于2
					if (S.indexOf(".") > -1 && S.substring(S.indexOf(".") + 1).length < 2) this.value = S + e;
					if (S.indexOf(".") > -1 && S.substring(S.indexOf(".") + 1).length >= 2) return;
					//没有小数点
					if (!(S.indexOf(".") > -1)) {
						//如果第一位是0，只能输入小数点
						if (e == 0 && S.length == 0) this.value = "0.";
						else {
							if (S.length && Number(S.charAt(0)) === 0) return;
							this.value = S + e;
						}
					}
					break;
			}
		},
		hide() {
			this.$emit("hide");
			this.close();
		},
		confirm() {
			this.$emit("confirm", this.value);
			this.close();
		},
	},
};
</script>

<style lang="scss" scoped>
@font-face {
	font-family: "zm"; /* project id 2442084 */
	src: url("https://at.alicdn.com/t/font_2442084_o72ps3802ih.eot");
	src: url("https://at.alicdn.com/t/font_2442084_o72ps3802ih.eot?#iefix") format("embedded-opentype"),
		url("https://at.alicdn.com/t/font_2442084_o72ps3802ih.woff2") format("woff2"),
		url("https://at.alicdn.com/t/font_2442084_o72ps3802ih.woff") format("woff"),
		url("https://at.alicdn.com/t/font_2442084_o72ps3802ih.ttf") format("truetype"),
		url("https://at.alicdn.com/t/font_2442084_o72ps3802ih.svg#zm") format("svg");
}

.zm {
	font-family: "zm" !important;
	font-size: 16px;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

.iconbackspace:before {
	content: "\ef11";
}

.flex {
	display: flex;
}
.flex-wrap {
	flex-wrap: wrap;
}
.cu-btn {
	position: relative;
	border: 0px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	padding: 0 30px;
	font-size: 28px;
	height: 64px;
	line-height: 1;
	text-align: center;
	text-decoration: none;
	overflow: visible;
	margin-left: initial;
	transform: translate(0px, 0px);
	margin-right: initial;
	&:hover {
		background-color: #ccc !important;
		transform: translate(2px, 2px);
	}
}
.confirm-btn:hover {
	background-color: #57be6d !important;
	transform: translate(2px, 2px);
}
.cu-btn::after {
	display: none;
}
.text-xl {
	font-size: 36px;
	font-weight: bold;
	font-family: "microsoft-yahei";
}
.text-black {
	color: #333;
}
.active {
	background-color: #ddd !important;
	transform: translate(2px, 2px);
}
.key-container {
	position: fixed;
	bottom: 0;
	top: 0;
	left: 0;
	right: 0;
	.key-content {
		position: absolute;
		bottom: 0;
		width: 100vw;
		background-color: #f7f7f7;
	}
}
.key-box {
	width: 100%;
	box-sizing: border-box;
	padding: 10px 0;
	.key-left {
		width: 75%;
	}
	.key-right {
		width: 25%;
		display: flex;
		flex-direction: column;
	}
	.key-bottom {
		width: 100%;
		display: flex;
	}
	.del_class2 {
		width: 100%;
	}
}
.btn-box {
	width: 33.33%;
	padding: 0 10px 10px 0;
	box-sizing: border-box;
}
.btn-zero {
	width: 66.66%;
	padding: 0 10px 10px 0;
	box-sizing: border-box;
}
.btn-point {
	width: 33.33%;
	padding: 0 10px 10px 0;
	box-sizing: border-box;
}
.key-right {
	flex-shrink: 0;
}
.key-btn {
	background-color: #fff;
	width: 100%;
	height: 90px;
}

.confirm {
	width: 100%;
	flex: 1;
	padding: 10px 0 10px 0;
	box-sizing: border-box;
	button {
		width: 100%;
		height: 100%;
		.confirm-text {
			color: #fff;
			display: block;
			font-size: 32px;
		}
	}
}
</style>
