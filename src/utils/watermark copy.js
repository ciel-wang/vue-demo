export class CanvasWay {
	constructor(watermark) {
		this.watermark = watermark;
		const { width, height } = watermark;
		this.canvas = document.createElement('canvas');
		this.canvas.setAttribute('width', width);
		this.canvas.setAttribute('height', height);
	}

	render() {
		let { txt, x, y, width, height, font = '', color = '#909399', fontSize = 16, angle = 10 } = this.watermark;
		const ctx = this.canvas.getContext('2d');
		ctx.clearRect(0, 0, width, height);

		ctx.textBaseline = 'top';
		ctx.textAlign = 'left';
		ctx.fillStyle = color;
		ctx.font = `${fontSize}px ${font}`;
		/**
		 * ctx.transform(a, b, c, d, e, f);
		 * a:水平缩放
		 * b:水平倾斜
		 * c:垂直倾斜
		 * d:垂直缩放
		 * e:水平移动
		 * f:垂直移动
		 * ctx.createPattern:绘制重复的水印
		 */
		ctx.transform(1, 0.5, -0.5, 1, 0, -height / 2);
		const waterMarkerWidth = ctx.measureText(txt).width;
		for (let i = 0; i < Math.ceil(height / y) * 2; i++) {
			for (let j = 0; j < Math.ceil(width / waterMarkerWidth) * 2; j++) {
				ctx.fillText(txt, j * (waterMarkerWidth + x), i * y);
			}
		}
		return this.canvas.toDataURL();
	}
}

export class SvgWay {
	constructor(watermark) {
		this.watermark = watermark;
	}

	render() {
		const { txt, x, y, width, height, color, font, fontSize, alpha, angle } = this.watermark;
		const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}px" height="${height}px">
                  <text x="${x}px" y="${y}px" dy="${fontSize}px"
                      text-anchor="start"
                      stroke="${color}"
                      stroke-opacity="${alpha}"
                      fill="none"
                      transform="rotate(${angle},${x} ${y})"
                      font-weight="100"
                      font-size="${fontSize}"
                      font-family="${font}"
                      >
                      ${txt}
                  </text>
              </svg>`;
		return `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svgStr)))}`;
	}
}
// base64转文件对象
export function dataURLtoBlob(dataurl, name) {
	const arr = dataurl.split(',');
	const mime = arr[0].match(/:(.*?);/)[1];
	const bstr = atob(arr[1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], name, { type: mime });
}
