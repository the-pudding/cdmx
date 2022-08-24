<script>
	import viewport from "$stores/viewport.js";
	import { onMount } from "svelte";
	import loadImage from "$utils/loadImage.js";
	import { tweened } from "svelte/motion";
	import { quadOut } from "svelte/easing";
	import inView from "$actions/inView.js";

	export let src;
	export let onStage;

	let ratio = 0;

	$: x = tweened(leftWing, { duration: 3000, easing: quadOut });

	$: imageW = $viewport.width > 1024 ? $viewport.width : 1024;
	$: imageH = ratio * imageW;

	$: leftWing = $viewport.width < 600 ? -0.2 * imageW : -0.08 * imageW;
	$: rightWing = 0.95 * imageW;
	$: middle = $viewport.width < 600 ? 0.45 * imageW : 0.45 * imageW;

	$: onStage, update();

	const onLeaveScreen = () => {
		x.set(leftWing, { duration: 0 });
	};

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
		style:left={`${$x}px`}
		style:top={`${imageH * 0.15}px`}
		class:big={imageW > 1350}
		use:inView
		on:exit={onLeaveScreen}
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
