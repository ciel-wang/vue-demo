<template>
	<div>
		<h1>人脸识别</h1>
		<div style="position: relative">
			<!-- <div id="camera" :style="{ width: 638 + 'px', height: 359 + 'px', background: '#000' }"></div> -->
			<video @play="onPlay" id="inputVideo" autoplay muted></video>
			<canvas id="canvas" style="position: absolute; top: 0; left: 0"></canvas>
		</div>
		<img id="picture2" v-show="false" />
	</div>
</template>

<script>
import * as faceapi from "face-api.js";
// import webcamjs from "webcamjs";
export default {
	data() {
		return {
			faceOptions: null, // faceapi配置
			originalImgDes: "", // 原始图片的faceapi数据
			withBoxes: true, // 画脸部的landmark时, 是否需要带盒子
			videoElm: null,
		};
	},
	mounted() {
		// 初始化摄像环境
		this._initCamera();
	},
	destroyed() {
		// 关闭摄像头
		// webcamjs.reset();
		// webcamjs.off("live"); // 删除监听器
	},
	methods: {
		// 初始化摄像机和初始化faceapi模块加载
		async _initCamera() {
			await faceapi.loadTinyFaceDetectorModel("/faceapi-models");
			await faceapi.nets.ssdMobilenetv1.loadFromUri("/faceapi-models");
			await faceapi.nets.faceLandmark68Net.loadFromUri("/faceapi-models");
			await faceapi.nets.faceRecognitionNet.loadFromUri("/faceapi-models");
			this.faceOptions = new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.4 });

			const originalImgElem = document.createElement("img");
			originalImgElem.src = "/wangbo.jpg";
			this.originalImgDes = await faceapi.detectSingleFace(originalImgElem, this.faceOptions).withFaceLandmarks().withFaceDescriptor();

			// 打开摄像头
			const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
			const videoEl = document.getElementById("inputVideo");
			videoEl.srcObject = stream;
			// webcamjs.attach("#camera");
			// webcamjs.on("live", () => {
			// 	this.videoElm = document.querySelector("#camera>video");
			// 	this.onPlay();
			// });
		},
		drawLandmarks(dimensions, canvas, results, withBoxes = true) {
			// const { width, height } = dimensions instanceof HTMLVideoElement ? faceapi.getMediaDimensions(dimensions) : dimensions;

			canvas.width = 638;
			canvas.height = 359;
			const resizedResults = faceapi.resizeResults(results, { width: 638, height: 359 });
			if (withBoxes) {
				faceapi.draw.drawDetections(canvas, resizedResults);
			}
			// const faceLandmarks = resizedResults.map((det) => det.landmarks);
			// const drawLandmarksOptions = {
			// 	lineWidth: 0,
			// 	drawLines: false,
			// 	color: "red",
			// };
			// faceapi.draw.drawDetections(canvas, faceLandmarks, drawLandmarksOptions);
		},
		// 获取视频流照片
		async onPlay() {
			const videoEl = document.getElementById("inputVideo");
			if (videoEl.paused || videoEl.ended || !faceapi.nets.tinyFaceDetector.params) return setTimeout(() => this.onPlay());
			const result = await faceapi.detectSingleFace(videoEl, this.faceOptions).withFaceLandmarks().withFaceDescriptor();
			if (result) {
				const faceMatcher = new faceapi.FaceMatcher(result);
				this.drawLandmarks(videoEl, document.getElementById("canvas"), [result], this.withBoxes);
				if (this.originalImgDes) {
					const bestMatch = faceMatcher.findBestMatch(this.originalImgDes.descriptor);
					if (bestMatch.distance > 0.4) {
						console.log("比对失败：" + bestMatch.distance);
					} else {
						console.log("比对成功：" + bestMatch.distance);
					}
				}
			}
			setTimeout(() => this.onPlay());

			// webcamjs.snap(async (imgUrl) => {
			// 	const picElem2 = document.getElementById("picture2");
			// 	picElem2.src = imgUrl;

			// 	const result = await faceapi.detectSingleFace(picElem2).withFaceLandmarks().withFaceDescriptor();

			// 	if (result) {
			// 		const faceMatcher = new faceapi.FaceMatcher(result);
			// 		this.drawLandmarks(this.videoElm, document.getElementById("canvas"), [result], this.withBoxes);
			// 		if (this.originalImgDes) {
			// 			const bestMatch = faceMatcher.findBestMatch(this.originalImgDes.descriptor);
			// 			console.log(bestMatch.distance);

			// 			if (bestMatch.distance > 0.4) {
			// 				// console.log("比对失败：" + bestMatch.distance);
			// 			} else {
			// 				// console.log("比对成功：" + bestMatch.distance);
			// 			}
			// 		}
			// 	}
			// 	setTimeout(() => this.onPlay());
			// });
		},
	},
};
</script>
