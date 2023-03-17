<template>
	<div>
		<div class="pulldown" v-pulldown-outside>
			<div
				class="pulldown_control"
				@mouseenter="inputHovering = true"
				@mouseleave="inputHovering = false"
				ref="controlRef"
				:class="[size ? 'el-input--' + size : '']"
			>
				<el-input
					class="el-select cursor"
					:placeholder="placeholder"
					v-model="inputValue"
					:clearable="clearable"
					:size="size"
					readonly
					:disabled="disabled"
				>
					<template slot="suffix">
						<i v-show="!showClose" :class="['el-select__caret', 'el-input__icon', this.icon]"></i>
						<i v-if="showClose" class="el-select__caret el-input__icon el-icon-circle-close" @click="handleClearClick"></i>
					</template>
				</el-input>

				<div class="pulldown_control_input el-select__tags" v-if="multiple">
					<el-tag class="el-tag_class" type="info" size="mini" v-for="(item, index) in tagArr" :key="index">{{ item }}</el-tag>
				</div>
			</div>

			<transition name="el-zoom-in-top">
				<div class="pulldown_panel" v-show="show">
					<div class="pulldown_arrow"></div>
					<div class="pulldown_panel_contant">
						<slot>
							<el-input
								v-if="filters"
								:placeholder="filterPlaceholder"
								v-model="filterText"
								:size="size"
								style="margin: 0 10px 10px; width: calc(100% - 20px)"
							>
							</el-input>
							<el-tree
								ref="tree"
								:data="treedData"
								node-key="valueStr"
								:props="defaultProps"
								:highlight-current="!multiple"
								:show-checkbox="multiple"
								:filter-node-method="filterNode"
								:default-checked-keys="defaultKeys"
								:default-expanded-keys="defaultKeys"
								:current-node-key="currentNodeKey"
								@node-click="handleNodeClick"
								@check="checkChange"
							></el-tree>
						</slot>
					</div>
				</div>
			</transition>
		</div>

		<div id="div"></div>
	</div>
</template>

<script>
export default {
	props: {
		treedData: {
			type: Array,
			default: () => [
				{
					children: [
						{
							children: [
								{
									children: [
										{
											children: [
												{
													children: [],
													disabled: false,
													flag: "",
													id: 3,
													isChild: false,
													label: "进场设备",
													parentId: -1,
													state: -1,
													treeCid: "kf0baw",
													treePid: "8r306g",
													value: 3,
													valueStr: "CDEV-3",
												},
											],
											disabled: false,
											flag: "",
											id: 2,
											isChild: false,
											label: "进口",
											parentId: -1,
											state: -1,
											treeCid: "8r306g",
											treePid: "owzj0b",
											value: 2,
											valueStr: "CHANNEL-2",
										},
										{
											children: [
												{
													children: [],
													disabled: false,
													flag: "",
													id: 2,
													isChild: false,
													label: "出场设备",
													parentId: -1,
													state: -1,
													treeCid: "h6p1p5",
													treePid: "0y5hwa",
													value: 2,
													valueStr: "CDEV-2",
												},
											],
											disabled: false,
											flag: "",
											id: 3,
											isChild: false,
											label: "出口",
											parentId: -1,
											state: -1,
											treeCid: "0y5hwa",
											treePid: "owzj0b",
											value: 3,
											valueStr: "CHANNEL-3",
										},
									],
									disabled: false,
									flag: "",
									id: 3,
									isChild: false,
									label: "默认岗亭1",
									parentId: -1,
									state: -1,
									treeCid: "owzj0b",
									treePid: "5er66h",
									value: 3,
									valueStr: "SENTRY-3",
								},
							],
							disabled: false,
							flag: "",
							id: 4,
							isChild: false,
							label: "默认区域",
							parentId: -1,
							state: -1,
							treeCid: "5er66h",
							treePid: "z1k7xi",
							value: 4,
							valueStr: "CA-4",
						},
						{
							children: [
								{
									children: [
										{
											children: [
												{
													children: [],
													disabled: false,
													flag: "",
													id: 5,
													isChild: false,
													label: "",
													parentId: -1,
													state: -1,
													treeCid: "jkg8of",
													treePid: "bm2egp",
													value: 5,
													valueStr: "CDEV-5",
												},
											],
											disabled: false,
											flag: "",
											id: 4,
											isChild: false,
											label: "S11",
											parentId: -1,
											state: -1,
											treeCid: "bm2egp",
											treePid: "275p18",
											value: 4,
											valueStr: "CHANNEL-4",
										},
										{
											children: [
												{
													children: [],
													disabled: false,
													flag: "",
													id: 4,
													isChild: false,
													label: "",
													parentId: -1,
													state: -1,
													treeCid: "8ddtgn",
													treePid: "rmn9jp",
													value: 4,
													valueStr: "CDEV-4",
												},
											],
											disabled: false,
											flag: "",
											id: 5,
											isChild: false,
											label: "S2",
											parentId: -1,
											state: -1,
											treeCid: "rmn9jp",
											treePid: "275p18",
											value: 5,
											valueStr: "CHANNEL-5",
										},
										{
											children: [],
											disabled: false,
											flag: "",
											id: 6,
											isChild: false,
											label: "3434",
											parentId: -1,
											state: -1,
											treeCid: "4hi2c8",
											treePid: "275p18",
											value: 6,
											valueStr: "CHANNEL-6",
										},
									],
									disabled: false,
									flag: "",
									id: 4,
									isChild: false,
									label: "S1",
									parentId: -1,
									state: -1,
									treeCid: "275p18",
									treePid: "7vlvy0",
									value: 4,
									valueStr: "SENTRY-4",
								},
							],
							disabled: false,
							flag: "",
							id: 5,
							isChild: false,
							label: "内部车场",
							parentId: -1,
							state: -1,
							treeCid: "7vlvy0",
							treePid: "z1k7xi",
							value: 5,
							valueStr: "CA-5",
						},
					],
					disabled: false,
					flag: "",
					id: 3,
					isChild: false,
					label: "默认车场",
					parentId: -1,
					state: -1,
					treeCid: "z1k7xi",
					treePid: "347fam",
					value: 3,
					valueStr: "CP-3",
				},
			],
		},
		defaultProps: {
			default: () => ({}),
			type: Object,
		},
		multiple: {
			default: false,
			type: Boolean,
		},
		filters: {
			default: true,
			type: Boolean,
		},
		filterPlaceholder: {
			default: "请输入关键字进行过滤",
			type: String,
		},
		placeholder: {
			default: "请输入内容",
			type: String,
		},
		clearable: {
			default: true,
			type: Boolean,
		},
		size: {
			default: "mini",
			type: String,
		},
		disabled: {
			default: false,
			type: Boolean,
		},
		defaultCheckedKeys: {
			type: Array,
			default: () => [],
		},
		defaultExpandedKeys: {
			type: Array,
			default: () => [],
		},
		nodeClick: Function,
		checked: Function,
	},
	directives: {
		pulldownOutside: {
			bind(el, binding, vnode) {
				let handler = (e) => {
					let ctx = vnode.context;
					if (!ctx.show && el.contains(e.target)) return ctx.onShow();
					if (ctx.show && (ctx.$refs.controlRef.contains(e.target) || !el.contains(e.target))) return ctx.onHide();
				};
				el.handler = handler;
				document.addEventListener("click", handler);
			},
			unbind(el) {
				document.removeEventListener("click", el.handler);
			},
		},
	},
	data() {
		return {
			inputValue: "",
			show: false,
			inputHovering: false,
			tagArr: [],
			defaultKeys: [],
			currentNodeKey: "",
			filterText: "",
			html: "<h1>2222{{msg}}</h1>",
			msg: "msg",
		};
	},
	mounted() {
		document.getElementById("div").innerHTML = this.html;
	},
	watch: {
		filterText(val) {
			this.$refs.tree.filter(val);
		},
		defaultCheckedKeys: {
			immediate: true,
			handler(newVal) {
				if (!newVal.length) return;
				this.$nextTick(() => {
					if (this.multiple) {
						this.defaultKeys = newVal;
						this.$refs.tree.setCheckedKeys(newVal);
						let checkedNodes = this.$refs.tree.getCheckedNodes();
						let arr = [...checkedNodes];
						if (checkedNodes.length > 30) {
							arr = arr.splice(0, 30);
						}
						let list = arr.map((node) => node.label);
						this.inputValue = list.join(",");
						this.tagArr = list;
					} else {
						this.currentNodeKey = newVal[0];
						this.$refs.tree.setCurrentKey(newVal[0]);
						let data = this.$refs.tree.getCurrentNode();
						this.inputValue = data.label;
					}
				});
			},
		},
		defaultExpandedKeys(newVal) {
			this.defaultKeys = newVal;
		},
	},
	methods: {
		// 过滤
		filterNode(value, data) {
			if (!value) return true;
			return data.label.toLowerCase().indexOf(value.toLowerCase()) !== -1;
		},
		// 清空
		handleClearClick(event) {
			event.stopPropagation();
			this.inputValue = "";
			this.show = false;
			this.tagArr = [];
			if (this.multiple) {
				this.defaultKeys = [];
				this.$refs.tree.setCheckedKeys([]);
			} else {
				this.currentNodeKey = "";
				this.$refs.tree.setCurrentKey("");
			}
		},
		onHide() {
			this.show = false;
		},
		onShow() {
			this.show = true;
		},
		// 点击节点
		handleNodeClick(data, node, nodeComp) {
			if (data.disabled) return;
			if (typeof this.nodeClick === "function") this.nodeClick(data, node, nodeComp);
			if (this.multiple) return;
			this.inputValue = data.label;
			this.currentNodeKey = data.valueStr;
			this.defaultKeys = [data.valueStr];
			this.onHide();
		},
		// 多选
		checkChange(checkedNode, { checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys }) {
			if (typeof this.checked === "function") this.checked(checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys);
			let arr = [...checkedNodes];
			if (checkedNodes.length > 30) {
				arr = arr.splice(0, 30);
			}
			let list = arr.map((node) => node.label);
			this.inputValue = list.join(",");
			this.tagArr = list;
			// this.defaultKeys = checkedNodes.map((node) => node.valueStr);
		},
	},
	computed: {
		showClose() {
			return !this.disabled && this.clearable && this.inputHovering && this.inputValue;
		},
		icon() {
			return this.show ? "el-icon-arrow-up" : "el-icon-arrow-down";
		},
	},
};
</script>

<style lang="scss">
.pulldown {
	width: 100%;
	position: relative;
	display: inline-block;
	font-size: 14px;
	color: #606266;
	text-align: left;
}
.pulldown_control {
	position: relative;
	cursor: pointer;
}
.pulldown_control_input {
	background-color: #fff;
	margin-left: 10px;
	flex-wrap: nowrap !important;
	width: calc(100% - 40px);
	overflow: hidden;
}
.el-tag_class {
	margin-right: 4px;
}
.pulldown_panel {
	position: relative;
	transform-origin: center top;
}
.pulldown_panel_contant {
	width: 100%;
	min-height: 60px;
	max-height: 200px;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	padding: 4px 0;
	margin: 10px 0;
	text-align: left;
	position: absolute;
	left: 0;
	overflow: auto;
}
.pulldown_arrow {
	width: 0;
	height: 0;
	position: absolute;
	top: 4px;
	left: 20px;
	z-index: 1;
	border: 6px solid transparent;
	border-top-width: 0;
	border-bottom-color: #e8eef5;
}
.pulldown_arrow::after {
	content: "";
	position: absolute;
	top: 1px;
	left: -6px;
	border: 6px solid transparent;
	border-top-width: 0;
	border-bottom-color: #fff;
}
.cursor {
	cursor: pointer;
}
.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
	color: #409eff;
}
</style>
