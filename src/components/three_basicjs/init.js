import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import config from "./config";

// 创建场景
const scene = new THREE.Scene();
// 设置坐标原点向下移动的向量
let offsetVector = new THREE.Vector3(0, -5, 0);
scene.position.add(offsetVector);
scene.rotateY(-0.6);
// 设置雾化效果，雾的颜色和背景颜色相近，这样远处网格线和背景颜色融为一体
scene.fog = new THREE.Fog(0xffffff, -100, 2000);

//  透视投影相机
const camera = new THREE.PerspectiveCamera(45, config.cWidth / config.cHeight, 0.01, 30000);
camera.position.set(100, 100, 100); //可以通过相机控件OrbitControls旋转相机，选择一个合适场景渲染角度
let x = 0,
  y = 0,
  z = 0;
camera.lookAt(x, y, z);

const renderer = new THREE.WebGLRenderer({
  antialias: true, //开启锯齿
  // 对数深度缓冲区解决深度冲突问题
  logarithmicDepthBuffer: true,
});
renderer.setPixelRatio(window.devicePixelRatio); //设置设备像素比率,防止Canvas画布输出模糊。
renderer.setSize(config.cWidth, config.cHeight); //设置渲染区域尺寸
renderer.physicallyCorrectLights = true; //物理校正光照计算
renderer.shadowMap.enabled = true; // 设置渲染器，允许场景中使用阴影贴图
renderer.shadowMap.type = THREE.VSMShadowMap; // 以免模型表面产生条纹影响渲染效果
// 设置three.js背景颜色 和雾化颜色相配
// renderer.setClearColor(0x005577, 1);
renderer.setClearAlpha(0.0); //设置透明度
// 使用了后处理compouser，renderer.outputEncoding的设置无效，使用伽马校正GammaCorrectionShader后处理解决
// renderer.outputEncoding = THREE.sRGBEncoding; //解决加载gltf格式模型纹理贴图和原图不一样问题

//设置相机控件轨道控制器OrbitControls，控件可以监听鼠标的变化，改变相机对象的属性
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true; //开启阻尼惯性
orbitControls.dampingFactor = 0.1; //阻尼系数,阻尼越大惯性越小
// orbitControls.maxAzimuthAngle = 1; //水平轨道上限
// orbitControls.minAzimuthAngle = -1; //水平轨道下限
// orbitControls.maxPolarAngle = 2; // 垂直轨道上限
// orbitControls.minPolarAngle = 1; // 垂直轨道下限
// orbitControls.addEventListener('change', function () {

// })
orbitControls.target.set(x, y, z);
orbitControls.update(); //update()函数内会执行camera.lookAt(orbitControls.targe)

// AxesHelper：辅助观察的三维坐标轴 三个坐标轴颜色RGB分别对应xyz轴
const axesHelper = new THREE.AxesHelper(150);
axesHelper.position.set(0, 0, 0);
scene.add(axesHelper);

export { scene, renderer, camera, orbitControls, axesHelper };
