<template>
	<div class="countroll">
		<span>￥</span>
		<TransitionGroup name="list" tag="ul" style="display: flex; align-items: center; position: relative">
			<li
				v-for="(item, index) in amountArr"
				:key="index + item"
				style="position: absolute"
				:style="{ left: index * 30 + 'px', 'transition-delay': 0.1 * index + 's' }"
			>
				{{ item }}
			</li>
		</TransitionGroup>
	</div>
</template>

<script>
export default {
	data() {
		return {
			amount: 0,
			timer: null,
		};
	},
	mounted() {
		this.timer = setInterval(() => {
			this.amount = '' + Math.floor(Math.random() * 10000);
		}, 2000);
	},
	destroyed() {
		clearInterval(this.timer);
	},
	computed: {
		amountArr() {
			return this.amount ? this.amount.split('') : ['', 0];
		},
	},
};
</script>

<style lang="scss">
.countroll {
	display: flex;
	align-items: center;
	font-size: 60px;
}
.list-enter-active,
.list-leave-active {
	transition: transform 1s ease, opacity 1s ease;
}

.list-enter {
	opacity: 0;
	transform: translateY(50%);
}

.list-leave-to {
	opacity: 0;
	transform: translateY(-50%);
}
</style>
