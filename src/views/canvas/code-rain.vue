<template>
	<div>
		<canvas id="canvasBg"></canvas>
	</div>
</template>

<script>
export default {
	name: 'codeRain',
	data() {
		return {
			ctx: null,
			columnWidth: 20,
			columnNextIndexes: [],
			timer: null,
		};
	},
	mounted() {
		this.canvasInfo();
		this.draw();
		this.timer = setInterval(this.draw, 40);
	},
	destroyed() {
		clearInterval(this.timer);
	},
	methods: {
		canvasInfo() {
			const cvs = document.getElementById('canvasBg');
			const width = window.innerWidth - 250;
			const height = window.innerHeight - 110;
			cvs.width = width;
			cvs.height = height;
			this.ctx = cvs.getContext('2d');
			// 根据列宽获取总列数
			const columnCount = Math.floor(width / this.columnWidth);
			// 设置每列要画的字的下标
			const columnNextIndexes = new Array(columnCount);
			// 设置每列开始画的下标，默认从1开始画
			columnNextIndexes.fill(1);
			this.columnNextIndexes = columnNextIndexes;
		},
		draw() {
			let { ctx, columnNextIndexes } = this;

			ctx.fillStyle = 'rgba(240,240,240,0.1)';
			ctx.fillRect(0, 0, window.innerWidth - 250, window.innerHeight - 110);
			const fz = 20;
			ctx.fillStyle = this.getRoundomColor();
			ctx.font = `${fz}px "Roboto Mono"`;
			for (let i = 0; i < columnNextIndexes.length; i++) {
				const x = i * this.columnWidth;
				const y = fz * columnNextIndexes[i];
				ctx.fillText(this.getRoundomStr(), x, y);
				if (y > window.innerHeight - 110 && Math.random() > 0.99) {
					columnNextIndexes[i] = 0;
				} else {
					columnNextIndexes[i]++;
				}
			}
		},
		getRoundomColor(alpha = 1) {
			const r = this.getRandomNum(50, 230);
			const g = this.getRandomNum(0, 230);
			const b = this.getRandomNum(20, 230);
			return `rgba(${r},${g},${b},${alpha})`;
		},
		getRoundomStr() {
			const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
			return str.charAt(Math.floor(Math.random() * str.length));
		},
		getRandomNum(min, max) {
			let result;
			if (min <= max) {
				result = Math.floor(Math.random() * (max - min + 1) + min);
			} else {
				result = Math.floor(Math.random() * (min - max + 1) + max);
			}
			return result;
		},
	},
};
</script>
