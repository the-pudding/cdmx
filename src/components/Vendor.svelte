<script>
	import { fly } from "svelte/transition";
	import viewport from "$stores/viewport.js";
	import { onMount, tick } from "svelte";
	import loadImage from "$utils/loadImage.js";

	export let src;

	let ratio = 0;

	$: imageW = $viewport.width > 1024 ? $viewport.width : 1024;
	$: imageH = ratio * imageW;

	$: leftBorder = 0.08 * imageW;
	$: rightBorder = 0.95 * imageW;
	$: middle = 0.46 * imageW;
	$: enter = {
		x: leftBorder - middle,
		duration: 8000,
		opacity: 1,
		delay: 800
	};
	$: exit = {
		x: rightBorder - middle,
		duration: 5000,
		opacity: 1
	};

	onMount(async () => {
		const img = await loadImage("assets/img/background/apartment_int.png");
		ratio = img.height / img.width;
	});

	let imageEl;
	const beforeExit = async () => {
		imageEl.style.animation = null;
		imageEl.style.left = middle;
	};
</script>

{#key src}
	<img
		{src}
		in:fly={enter}
		out:fly={exit}
		on:outrostart={beforeExit}
		style:left={`${middle}px`}
		style:top={`${imageH * 0.15}px`}
		class:big={imageW > 1350}
		alt="vendor"
		bind:this={imageEl}
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
