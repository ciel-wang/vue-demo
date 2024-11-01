import { renderer, scene, camera } from "./init";
import config from "./config";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
// 引入渲染器通道RenderPass
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
// 引入OutlinePass通道,OutlinePass可以给指定的某个模型对象添加一个高亮发光描边效果。
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";

// three.js WebGL渲染器执行渲染方法.render()会得到一张图像，如果你需要对一个webgl渲染器的渲染结果进行后期处理，就把它作为EffectComposer的参数。
const composer = new EffectComposer(renderer);
// 创建一个渲染器通道,渲染器通道RenderPass的作用是指定后处理对应的相机camera和场景scene
const renderPass = new RenderPass(scene, camera);
// 给EffectComposer添加一个渲染器通道RenderPass
composer.addPass(renderPass);

// 创建OutlinePass通道,OutlinePass第一个参数v2的尺寸和canvas画布保持一致
const outlinePass = new OutlinePass(new THREE.Vector2(config.cWidth, config.cHeight), scene, camera);
//outlinePass相关属性设置
outlinePass.visibleEdgeColor.set(0x00ffff); //模型描边颜色，默认白色
outlinePass.edgeThickness = 4.0; //轮廓边缘描边厚度
outlinePass.edgeStrength = 6.0; //边缘发光强度,数值大，更亮一些
outlinePass.pulsePeriod = 2; //模型闪烁频率控制，默认0不闪烁
// outlinePass.hiddenEdgeColor.set(0x220101);//模型被遮挡部分描边颜色控制
// outlinePass.edgeGlow = 0.0;//边缘发光，默认0.0
// outlinePass.downSampleRatio = 2;//下采样比,默认2
// outlinePass.usePatternTexture = false;//纹理,默认false
//设置要显示边框的网格模型,交互的时候可以设置一个鼠标事件，点击选中了某个模型，就直接把某个模型作为值的元素
outlinePass.selectedObjects = [];
// 设置OutlinePass通道
composer.addPass(outlinePass);

export { composer, outlinePass };
