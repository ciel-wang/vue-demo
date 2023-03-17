<template>
	<div>
		<div id="bar3d" style="width: 900px; height: 600px"></div>
	</div>
</template>

<script>
import * as echarts from "echarts";

export default {
	data() {
		return {
			barChart: null,
		};
	},
	mounted() {
		this.barChart = echarts.init(document.getElementById("bar3d"));
		this.barChart.setOption(this.initEcharts());
	},
	methods: {
		initEcharts() {
			var data2 = [50, 80, 90, 30, 60, 30, 50, 40, 66];
			let xAxisDic = ["一年级", "二年级", "三年级", "四年级", "五年级", "六年级", "高一", "高二", "高三"];
			var barWidth = 30;
			return {
				grid: {
					x: "60",
					x2: "0%",
					y: "10",
					y2: "25%",
				},
				legend: { show: false },
				xAxis: {
					data: xAxisDic,
					axisLine: { show: false },
					type: "category",
					axisLabel: {
						margin: 50,
						textStyle: {
							color: "#000",
							fontWeight: 500,
							fontSize: "16",
						},
					},
					axisTick: { show: false },
					splitLine: { show: false },
				},
				yAxis: {
					type: "value",
					axisLine: { show: false },
					axisTick: { show: false },
					axisLabel: {
						formatter: "{value} %",
						show: true,
						textStyle: { color: "#000" },
					},
					splitLine: { show: false },
				},
				series: [
					// 头
					{
						z: 12,
						name: "同期",
						type: "pictorialBar",
						symbolPosition: "end",
						data: data2,
						symbol: "circle",
						symbolOffset: [0, -10],
						symbolSize: [barWidth, 20],
						itemStyle: {
							color: new echarts.graphic.RadialGradient(0.5, 0.4, 0.9, [
								{
									offset: 0,
									color: "#51c4fb",
								},
								{
									offset: 1,
									color: "#fff",
								},
							]),
						},
						tooltip: { show: false },
					},
					// bar
					{
						z: 10,
						name: "同期",
						type: "bar",
						barWidth: barWidth,
						barGap: "50%",
						data: data2,
						itemStyle: {
							color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
								{
									offset: 0,
									color: "#229adf",
								},
								{
									offset: 0.3,
									color: "#2eb0ee",
								},
								{
									offset: 0.5,
									color: "#2eb0ee",
								},
								{
									offset: 0.7,
									color: "#2eb0ee",
								},
								{
									offset: 1,
									color: "#6ad1fc",
								},
							]),
						},
					},
					// 尾
					{
						z: 3,
						name: "同期",
						type: "pictorialBar",
						data: data2,
						symbolOffset: [0, 10],
						symbolSize: [barWidth, 20],
						itemStyle: {
							opacity: 1,
							color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
								{
									offset: 0,
									color: "#229adf",
								},
								{
									offset: 0.3,
									color: "#2eb0ee",
								},
								{
									offset: 0.5,
									color: "#2eb0ee",
								},
								{
									offset: 0.7,
									color: "#2eb0ee",
								},
								{
									offset: 1,
									color: "#6ad1fc",
								},
							]),
						},
					},
					{
						name: "",
						type: "pictorialBar",
						symbolOffset: [0, (barWidth || 16) / 1.5],
						symbolSize: [(barWidth || 16) * 1.5, barWidth || 16],
						z: 10,
						itemStyle: {
							normal: {
								color: "transparent",
								borderColor: "#14b1eb",
								borderWidth: 10,
							},
						},
						data: data2,
					},
					{
						name: "",
						type: "pictorialBar",
						symbolOffset: [0, (barWidth || 16) / 1.2],
						symbolSize: [(barWidth || 16) * 2, (barWidth || 16) * 1.5],
						z: 10,
						itemStyle: {
							normal: {
								color: "transparent",
								borderColor: "#14b1eb",
								borderType: "dashed",
								borderWidth: 7,
							},
						},
						data: data2,
					},
				],
			};
		},
	},
};
</script>
