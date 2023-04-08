<template>
	<div>
		<img :src="img" alt="" srcset="" />
	</div>
</template>

<script>
import { CanvasWay, SvgWay } from '@/utils/watermark.js';
export default {
	data() {
		return {
			img: '',
		};
	},
	mounted() {
		let data = new CanvasWay({
			txt: '私人订制',
			x: 20,
			y: 30,
			width: 300,
			height: 300,
			color: 'rgba(0,0,0,.4)',
			angle: 30,
		});
		this.img = data.render();
	},
};
</script>
