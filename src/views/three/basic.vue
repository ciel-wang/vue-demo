<template>
	<div id="threeId"></div>
</template>

<script>
import * as THREE from 'three';

export default {
	mounted() {
		this.init();
	},
	methods: {
		init() {
			var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);

			var renderer = new THREE.WebGLRenderer();
			renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
			let container = document.getElementById('threeId');
			container.appendChild(renderer.domElement);

			var geometry = new THREE.BoxGeometry(1, 1, 1);
			var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
			var cube = new THREE.Mesh(geometry, material);
			scene.add(cube);

			camera.position.z = 5;

			var animate = function () {
				requestAnimationFrame(animate);

				cube.rotation.x += 0.1;
				cube.rotation.y += 0.1;

				renderer.render(scene, camera);
			};

			animate();
		},
	},
};
</script>
