<template>
	<canvas id="canvasId"></canvas>
</template>

<script>
export default {
	data() {
		return {
			ctx: null,
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			const cvs = document.getElementById('canvasId');
			const ctx = cvs.getContext('2d');
			const targetColor = [0, 255, 0, 255];
			let imgData = [];

			let img = new Image();
			img.onload = () => {
				cvs.width = img.width;
				cvs.height = img.height;
				ctx.drawImage(img, 0, 0);
				imgData = ctx.getImageData(0, 0, cvs.width, cvs.height);
			};
			img.src = require('../../assets/xhm.jpeg');
			// 获取画布上所有像素点的颜色数组

			const changeColor = (x, y) => {
				let i = this.getPointIndex(x, y, cvs.width);
				imgData.data.set(targetColor, i);
			};
			cvs.addEventListener('click', (e) => {
				const x = e.offsetX,
					y = e.offsetY;
				// 获取点击位置的像素颜色
				const clickColor = this.getColor(x, y, cvs.width, imgData);

				changeColor(x, y);
				ctx.putImageData(imgData, 0, 0);
			});
		},
		getPointIndex(x, y, width) {
			return (y * width + x) * 4;
		},
		getColor(x, y, width, imgData) {
			let i = this.getPointIndex(x, y, width);
			return [imgData.data[i], imgData.data[i + 1], imgData.data[i + 2], imgData.data[i + 3]];
		},
	},
};
</script>
<style>
#canvasId {
	border: 1px solid #ccc;
}
</style>
