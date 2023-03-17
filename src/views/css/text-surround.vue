<template>
	<div style="width: 600px; margin: auto">
		<div class="left"></div>
		<div class="right"></div>
		<p>
			Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta delectus a, numquam, illo adipisci voluptates ipsum rem eos
			repudiandae deserunt maxime quos. Pariatur consectetur impedit vitae aspernatur hic modi, harum odit omnis nulla neque cum fugiat
			porro iusto nisi rerum veritatis, sit incidunt voluptates delectus quasi nesciunt. Molestias ad itaque odit voluptas dolor ullam
			cupiditate. Autem exercitationem beatae explicabo inventore placeat illum non facilis eaque facere nobis fuga iure perferendis
			consequatur, modi ipsam voluptate commodi id hic ex alias odio officiis eligendi! Tempora numquam ipsum fugiat ea. Eius delectus illo
			illum consequatur assumenda cumque obcaecati consectetur corrupti modi unde? Distinctio ab ipsum incidunt possimus pariatur ducimus
			et, dolorum ipsam! Alias ipsa dolorem deleniti quam.
		</p>

		<img src="../../assets/avator.jpeg" class="img" alt="" srcset="" />
		<p>
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero natus fuga impedit numquam aliquam incidunt reiciendis vel molestias
			maxime laudantium. Accusamus beatae cum accusantium rerum aliquam repudiandae consequuntur ipsam, explicabo fugiat possimus similique
			quod quisquam maiores unde modi non veniam, architecto numquam earum? Ipsam fuga dolores neque quas, iste animi in harum fugit ut
			debitis dicta reprehenderit?
		</p>
	</div>
</template>

<style>
.left,
.right {
	width: 220px;
	height: 280px;
	background-color: cadetblue;
}
.left {
	float: left;
	--shape: polygon(0 0, 100% 100%, 0 100%);
	shape-outside: var(--shape);
	clip-path: var(--shape);
}
.right {
	float: right;
	--shape: polygon(100% 0, 0 100%, 100% 100%);
	shape-outside: var(--shape);
	clip-path: var(--shape);
}
.img {
	width: 150px;
	float: left;
	border-radius: 50%;
	margin-right: 10px;
	shape-outside: circle(50%);
}
</style>
