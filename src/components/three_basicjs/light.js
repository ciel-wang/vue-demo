import * as THREE from 'three';
import { scene } from './init'

// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 2.9);
directionalLight.position.set(-125, 150, 75);
scene.add(directionalLight);
// 设置用于计算阴影的光源对象
directionalLight.castShadow = true;
// 设置计算阴影的区域，最好刚好紧密包围在对象周围
// 计算阴影的区域过大：模糊  过小：看不到或显示不完整
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 3000;
directionalLight.shadow.camera.left = -500;
directionalLight.shadow.camera.right = 500;
directionalLight.shadow.camera.top = 500;
directionalLight.shadow.camera.bottom = -500;
// 为了清晰度，提升阴影贴图的尺寸
directionalLight.shadow.mapSize.width = 1024 *4;
directionalLight.shadow.mapSize.height = 1024 * 4;
directionalLight.shadow.radius = 3;
// directionalLight.shadow.bias = -0.00006;
// directionalLight.shadow.bias = -0.00001;

// DirectionalLightHelper：可视化平行光
// var helper = new THREE.DirectionalLightHelper(directionalLight, 5, 0xff0000);
// scene.add(helper);



//环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

export { directionalLight, ambientLight }