<template>
	<div class="title">
		<span>css之强大，你会发现它是你永远也学不会的语音</span>
	</div>
</template>
<style lang="scss">
.title {
	width: 300px;
	font-size: 28px;
	line-height: 2.3;
	span {
		padding-bottom: 2px;
		background: linear-gradient(to right, #ec695c, #61c454) no-repeat right bottom;
		background-size: 0 4px;
		transition: background-size 1300ms;
		&:hover {
			background-position-x: left;
			background-size: 100% 4px;
		}
	}
}
</style>
