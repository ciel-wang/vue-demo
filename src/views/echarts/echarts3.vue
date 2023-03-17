<template>
	<div>
		<div id="echarts3" style="width: 900px; height: 600px"></div>
	</div>
</template>

<script>
import * as echarts from 'echarts';
export default {
	data() {
		return {
			echarts: null,
		};
	},
	mounted() {
		this.echarts = echarts.init(document.getElementById('echarts3'));
		this.echarts.setOption(this.initEcharts());
	},
	methods: {
		initEcharts(val = []) {
			var pathes = [
				'M512 101C285.01 101 101 285.01 101 512S285.01 923 512 923 923 738.99 923 512 738.99 101 512 101z m-0.804 581.982c-93.988 0-170.18-76.192-170.18-170.18s76.192-170.18 170.18-170.18 170.18 76.192 170.18 170.18-76.192 170.18-170.18 170.18z',
				'M8.710254 511.842766C8.705056 328.983302 104.339828 160.012426 259.593646 68.577497c155.24862-91.429732 346.523361-91.429732 501.777179 0 155.24862 91.429732 250.883392 260.405806 250.872996 443.265269 0.010396 182.859463-95.624376 351.83034-250.872996 443.260071-155.253818 91.429732-346.528559 91.429732-501.777179 0C104.33463 863.673106 8.705056 694.697031 8.710254 511.842766z m807.949829-270.28687l-0.067572-1.595732-0.275484-1.871217-0.207913-1.039565v-0.483398l-0.488596-1.871217-0.415826-1.45539-0.69131-1.943987-0.207913-0.623739-0.140342-0.343056-0.067571-0.280683-0.899224-1.938788-0.556167-1.039565-1.107137-1.871217-0.280682-0.556167-0.207913-0.275485-0.067572-0.140341a11.37284 11.37284 0 0 0-1.31505-1.730876l-0.696508-0.971993-1.382621-1.522962c-0.280683-0.348254-0.488595-0.691311-0.764081-0.899224v-0.072769h-0.067571l-1.387819-1.247478-0.971994-0.966796-1.522962-1.112334c-0.348254-0.275485-0.691311-0.623739-1.107137-0.831652l-0.280682-0.207913-0.415826-0.207913-0.899224-0.550969-1.179906-0.76408-1.663304-0.831652-1.382621-0.691311s-0.207913 0-0.348254-0.140341l-0.415826-0.140342-0.831652-0.275484-1.455391-0.556167-1.522963-0.415826-1.736073-0.483398h-0.343056l-0.348255-0.067572-1.315049-0.207913-1.387819-0.207913a32.85025 32.85025 0 0 0-3.466949-0.207913h-0.067572l-269.039392 1.039565a33.889815 33.889815 0 0 0-29.383302 17.324349 35.277634 35.277634 0 0 0 0 34.653895c6.16462 10.738705 17.324349 17.324349 29.523643 17.324349h0.135144l186.913766-0.69131L577.908414 404.835154A242.842357 242.842357 0 0 0 425.716115 350.845352h-3.326608c-136.458485 1.871217-246.028624 116.63918-244.230176 255.805731 1.736073 137.430478 112.761603 249.21489 247.416442 249.21489h3.326608a243.606437 243.606437 0 0 0 174.095931-76.304062 253.513491 253.513491 0 0 0 70.201817-179.496471 253.861745 253.861745 0 0 0-47.955128-145.398743L748.812881 327.69944v190.240374c0 19.127994 15.245219 34.653895 33.957387 34.653895 18.712168 0 33.962585-15.525902 33.962585-34.653895V241.623467l-0.07277-0.067571z m-270.494783 481.526454a165.566301 165.566301 0 0 1-118.302484 51.837903h-2.287043c-91.48171 0-166.954121-75.955808-168.128829-169.308735-1.247478-94.600405 73.25294-172.567771 165.982128-173.815248h2.287043c91.48171 0 167.021692 75.955808 168.134026 169.308735a172.219517 172.219517 0 0 1-47.684841 121.977345z',
				'M582.877 259.966c-94.673 0-172.97 78.809-172.97 172.97 0 94.672 78.81 172.969 172.97 172.969 94.673 4.094 172.97-74.715 172.97-172.97 0-94.16-78.809-172.969-172.97-172.969z M511.745 0C229.262 0 0 229.261 0 511.744s229.26 511.744 511.744 511.744c234.378 0 511.744-180.645 511.744-511.744C1023.489 229.261 794.227 0 511.745 0z m71.132 673.455c-50.663 0-97.231-15.352-136.124-41.963l-78.297 78.297 88.532 88.532-47.592 47.592-88.532-88.532-81.367 81.368-47.592-47.593 81.367-81.367-88.532-88.532 47.592-47.592 88.532 88.532 76.25-76.25c-31.216-42.986-50.663-93.65-50.663-148.406 0-134.077 106.443-240.008 240.008-240.008 134.077 0 236.426 106.443 236.426 236.426 0 128.96-106.443 239.496-240.008 239.496z',
			];
			var layouts = [
				[[0, 0]],
				[
					[-0.25, 0],
					[0.25, 0],
				],
				[
					[0, -0.2],
					[-0.2, 0.2],
					[0.2, 0.2],
				],
				[
					[-0.25, -0.25],
					[-0.25, 0.25],
					[0.25, -0.25],
					[0.25, 0.25],
				],
			];
			var colors = ['#FDC763', '#16B644'];
			const num0 = [0, 0, 0, 0, 0, 0, 0, 0];
			const num1 = [1, 1, 1, 1, 1, 1, 1, 1];

			var data = [];
			var startTime = 0;
			var categories = [];
			var title = val[0][0].floorName;

			val.forEach((v) => {
				categories.push({
					value: v[0].floorLayerName,
					textStyle: {
						color: '#9A0000',
						fontSize: 50,
					},
					dormArr: v,
				});
			});

			// Generate mock data
			categories.forEach(function (category, index) {
				var baseTime = startTime;
				for (var i = 0, item = category.dormArr; i < item.length; i++) {
					var duration = 10;
					data.push({
						name: item[i].dormName,
						value: [
							index,
							baseTime,
							(baseTime += duration),
							duration,
							item[i].dormSex,
							item[i].badCount,
							item[i].realLiveCount,
							item[i].dormName,
						],
						itemStyle: {
							normal: {
								color: 'rgba(154,0,0,1)',
							},
						},
						z: 1,
					});
					baseTime += 10;
				}
			});

			function renderItem(params, api) {
				var categoryIndex = api.value(0);
				var start = api.coord([api.value(1), categoryIndex]);
				var end = api.coord([api.value(2), categoryIndex]);
				var height = api.size([0, 1])[1] * 0.9;
				var text = api.value(7);
				var dormSex = api.value(4);
				var bedCount = api.value(5);
				var realCount = api.value(6);

				var colorIndex = num0.slice(0, realCount).concat(num1.slice(0, bedCount - realCount));

				var rectShape = echarts.graphic.clipRectByRect(
					{
						x: start[0],
						y: start[1] - height / 2,
						width: height * 1.2,
						height: height,
					},
					{
						x: params.coordSys.x,
						y: params.coordSys.y,
						width: params.coordSys.width,
						height: params.coordSys.height,
					}
				);

				var group = {
					type: 'group',
					children:
						(layouts[bedCount - 1] || []).map(function (itemLayout, index) {
							return {
								type: 'path',
								shape: {
									pathData: pathes[dormSex],
									x: 16,
									y: -18,
									width: 32,
									height: 32,
								},
								z: 20,
								z2: 2,
								position: [
									start[0] + 10 + echarts.number.linearMap(itemLayout[0], [-0.7, 0.2], [-height / 2, height / 2]),
									start[1] + 20 + echarts.number.linearMap(itemLayout[1], [-0.6, 0.6], [-height / 2, height / 2]),
								],
								style: api.style({
									fill: colors[colorIndex[index]],
								}),
							};
						}) || [],
				};
				group.children.push({
					type: 'rect',
					transition: ['shape'],
					shape: rectShape,
					style: api.style(),
					z: 10,
					z2: 1,
				});

				group.children.push({
					type: 'text',
					style: {
						fill: 'transparent',
						stroke: 'transparent',
						text: text,
						textFill: '#fff',
						x: start[0] + 4,
						y: start[1] - height / 2 + 3,
						font: '32px "Microsoft YaHei", sans-serif',
					},
					z2: 2,
				});

				return group;
			}

			return {
				title: {
					text: title,
					left: '1%',
					textStyle: {
						color: '#9A0000',
						fontSize: 52,
						fontWeight: 600,
					},
				},
				grid: {
					height: '90%',
					width: '100%',
					left: 80,
					right: 0,
					top: 60,
				},
				xAxis: {
					show: false,
				},
				yAxis: {
					data: categories,
					axisLine: { show: false },
					axisTick: { show: false },
					splitNumber: 7,
				},
				series: [
					{
						type: 'custom',
						renderItem: renderItem,
						encode: {
							x: [1, 2],
							y: 0,
						},
						data: data,
					},
				],
			};
		},
	},
};
</script>
