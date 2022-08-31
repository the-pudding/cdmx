<script>
	import viewport from "$stores/viewport.js";
	import { onMount } from "svelte";
	import loadImage from "$utils/loadImage.js";
	import { tweened } from "svelte/motion";
	import { quadOut } from "svelte/easing";

	export let src;
	export let onStage;

	let ratio = 0;

	$: x = tweened(leftWing, { duration: 3000, easing: quadOut });

	$: imageW = $viewport.width > 1047 ? $viewport.width : 1047;
	$: imageH = ratio * imageW;

	$: top = imageH * 0.15;
	$: leftWing = -10;
	$: middle = 50;
	$: rightWing = 110;
	$: big = $viewport.width > 1200;

	$: onStage, $viewport.width, update();

	const update = () => {
		if (onStage) {
			x.set(leftWing, { duration: 0 });
			$x = middle;
		} else {
			if ($x > leftWing) {
				x.set(middle, { duration: 0 });
				$x = rightWing;
			}
		}
	};

	onMount(async () => {
		const img = await loadImage("assets/img/background/apartment_int.png");
		ratio = img.height / img.width;
	});
</script>

{#key src}
	<img
		{src}
		alt="vendor"
		style:top={`${top}px`}
		style:left={`${$x}%`}
		class:big
	/>
{/key}

<style>
	img {
		z-index: 2;
		height: 200px;
		position: absolute;
	}
	.big {
		transform: scale(1.3);
	}
</style>
