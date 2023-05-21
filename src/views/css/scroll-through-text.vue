<template>
	<div>
		<div class="box">
			<div class="scroll-wrap">
				<div class="scroll-item">我是开头，我是中间我是中间我是中间，我是结尾</div>
			</div>
		</div>
		动态使用iconfont的Unicode码<i class="iconfont">{{ iconfont }}</i>

		<div class="annulus_class">
			<div style="background-color: #fff; z-index: 10; width: 90%; height: 90%; border-radius: 90%"></div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			iconfont: '\ue751',
		};
	},
};
</script>

<style>
.annulus_class {
	width: 60px;
	height: 60px;
	border-radius: 60px;
	overflow: hidden;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
}
.annulus_class::before {
	content: '';
	background-image: linear-gradient(132deg, #5ddcff, #3c67e3 63%, #4e00c2);
	position: absolute;
	z-index: 0;
	left: -4px;
	right: -4px;
	padding-bottom: calc(100% + 8px);
	animation: run 2s linear infinite;
}
@keyframes run {
	0% {
		rotate: 0deg;
	}
	50% {
		rotate: 180deg;
	}
	100% {
		rotate: 360deg;
	}
}
.box {
	max-width: 15em;
	border: 1px solid;
	padding: 10px;
	border-radius: 10px;
}
/* 
  max-width: 100%;保证自身宽度不超过 box;
  display: inline-block;目的是让 scroll-wrap 宽度自适应，可以被子元素撑开;
  vertical-align: top;设置完上面的属性之后，inline 会带上 1.x 的行高导致高度过大。设置 top 可以消除;
*/
.scroll-wrap {
	max-width: 100%;
	display: inline-block;
	vertical-align: top;
	overflow: hidden;
	white-space: nowrap;
}
.scroll-item {
	animation: scroll linear 4s alternate infinite;
	display: inline-block;
	/* float: left; */
	/* 为了使当前元素变成行内元素，宽度自动撑开 */
}
@keyframes scroll {
	0% {
		margin-left: 0;
		transform: translateX(0);
	}
	15% {
		margin-left: 0;
		transform: translateX(0);
	}
	85% {
		margin-left: 100%;
		transform: translateX(-100%);
	}
	100% {
		margin-left: 100%;
		transform: translateX(-100%);
	}
}
</style>
