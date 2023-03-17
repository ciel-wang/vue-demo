<template>
	<div>
		<!-- <vxe-grid ref="xGrid2" v-bind="gridOptions2"></vxe-grid> -->
		<vxe-grid
			id="dragPage"
			border
			resizable
			auto-resize
			highlight-hover-row
			:height="600"
			class="sortable-column-demo"
			keep-source
			rowKey
			columnKey
			ref="xGrid2"
			size="mini"
			align="center"
			:toolbarConfig="{ custom: true }"
			:customConfig="{ storage: { visible: true, resizable: true } }"
			:scrollX="{ enabled: false }"
			:highlight="true"
			:columns="tableColumn"
			:data="tableData"
		>
		</vxe-grid>
	</div>
</template>

<script>
import Sortable from "sortablejs";
import { setStore, getStore } from "@/utils/store.js";

export default {
	data() {
		return {
			// gridOptions2: {
			// 	border: true,
			// 	class: "sortable-column-demo",
			// 	rowKey: true,
			// 	columnKey: true,
			// 	scrollX: { enabled: false },
			// 	toolbarConfig: {
			// 		custom: true,
			// 	},
			// 	columns: [
			// 		{ field: "name", title: "Name", fixed: "left", width: 300 },
			// 		{ field: "nickname", title: "Nickname" },
			// 		{ field: "role", title: "Role" },
			// 		{ field: "sex", title: "Sex" },
			// 		{ field: "age", title: "Age" },
			// 		{ field: "date3", title: "Date" },
			// 		{ field: "address", title: "Address", width: 200, fixed: "right", showOverflow: true },
			// 	],
			// 	data: [
			// 		{ id: 10001, name: "Test1", nickname: "T1", role: "Develop", sex: "Man", age: 28, address: "Shenzhen" },
			// 		{ id: 10002, name: "Test2", nickname: "T2", role: "Test", sex: "Women", age: 22, address: "Guangzhou" },
			// 		{ id: 10003, name: "Test3", nickname: "T3", role: "PM", sex: "Man", age: 32, address: "Shanghai" },
			// 		{ id: 10004, name: "Test4", nickname: "T4", role: "Designer", sex: "Women", age: 23, address: "Shenzhen" },
			// 		{ id: 10005, name: "Test5", nickname: "T5", role: "Develop", sex: "Women", age: 30, address: "Shanghai" },
			// 	],
			// },
			tableColumn: [],
			tableData: [],
		};
	},
	created() {
		this.tableColumn = getStore({ name: "menu" }) || [
			{ field: "name", title: "Name", fixed: "left", width: 300 },
			{ field: "nickname", title: "Nickname" },
			{ field: "role", title: "Role" },
			{ field: "sex", title: "Sex" },
			{ field: "age", title: "Age" },
			{ field: "date3", title: "Date" },
			{ field: "address", title: "Address", width: 200, fixed: "right", showOverflow: true },
		];
		let arr = [];
		for (let i = 0; i < 200; i++) {
			arr.push({ id: i + 1, name: "Test" + i, nickname: "T" + i, role: "Develop", sex: "Man", age: 28 + i, address: "Shenzhen" });
		}
		this.tableData = arr;
		this.columnDrop2();
	},
	beforeDestroy() {
		if (this.sortable2) {
			this.sortable2.destroy();
		}
	},
	methods: {
		columnDrop2() {
			this.$nextTick(() => {
				const $table = this.$refs.xGrid2;

				this.sortable2 = Sortable.create($table.$el.querySelector(".body--wrapper>.vxe-table--header .vxe-header--row"), {
					handle: ".vxe-header--column",
					filter: ".col--fixed",
					onEnd: ({ item, newIndex, oldIndex }) => {
						const { fullColumn, tableColumn } = $table.getTableColumn();
						const targetThElem = item;
						const wrapperElem = targetThElem.parentNode;
						const newColumn = fullColumn[newIndex];

						if (newColumn.fixed) {
							const oldThElem = wrapperElem.children[oldIndex];
							// 错误的移动
							if (newIndex > oldIndex) {
								wrapperElem.insertBefore(targetThElem, oldThElem);
							} else {
								wrapperElem.insertBefore(targetThElem, oldThElem ? oldThElem.nextElementSibling : oldThElem);
							}

							// VXETable.modal.message({ content: "固定列不允许拖动，即将还原操作！", status: "error" });
							return;
						}
						// 获取列索引 columnIndex > fullColumn
						const oldColumnIndex = $table.getColumnIndex(tableColumn[oldIndex]);
						const newColumnIndex = $table.getColumnIndex(tableColumn[newIndex]);
						// 移动到目标列
						const currRow = fullColumn.splice(oldColumnIndex, 1)[0];
						fullColumn.splice(newColumnIndex, 0, currRow);

						$table.loadColumn(fullColumn);
						setStore({ name: "menu", content: fullColumn });
					},
				});
			});
		},
	},
};
</script>

<style>
.sortable-column-demo .vxe-header--row .vxe-header--column.sortable-ghost,
.sortable-column-demo .vxe-header--row .vxe-header--column.sortable-chosen {
	background-color: #dfecfb;
}
.sortable-column-demo .vxe-header--row .vxe-header--column.col--fixed {
	cursor: no-drop;
}
</style>
