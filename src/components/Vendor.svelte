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

	// TODO: fix
	$: imageW = $viewport.width > 1378 ? $viewport.width : 1378;
	$: imageH = ratio * imageW;

	$: top = imageH * 0.15;
	$: leftWing = $viewport.width < 600 ? -0.2 * imageW : -0.08 * imageW;
	$: rightWing = 0.95 * imageW;
	$: middle = 0.45 * imageW;

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
	<img {src} alt="vendor" style:left={`${$x}px`} style:top={`${top}px`} />
{/key}

<style>
	img {
		z-index: 2;
		height: 200px;
		position: absolute;
		transform: scale(1.3);
	}
</style>
