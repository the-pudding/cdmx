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

	$: imageW = $viewport.width > 1024 ? $viewport.width : 1024;
	$: imageH = ratio * imageW;

	$: leftWing = 0.08 * imageW;
	$: rightWing = 0.95 * imageW;
	$: middle = 0.46 * imageW;

	$: onStage, update();

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
		style:left={`${$x}px`}
		style:top={`${imageH * 0.15}px`}
		class:big={imageW > 1350}
		alt="vendor"
	/>
{/key}

<style>
	img {
		z-index: 2;
		height: 200px;
		position: absolute;
	}
	.big {
		transform: scale(1.5);
	}
</style>
