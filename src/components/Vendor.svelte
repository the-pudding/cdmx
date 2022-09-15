<script>
	import viewport from "$stores/viewport.js";
	import { onMount } from "svelte";
	import loadImage from "$utils/loadImage.js";
	import { tweened } from "svelte/motion";
	import { cubicOut } from "svelte/easing";
	import { loadApartment } from "$stores/misc.js";

	export let vendor;
	export let onStage;

	const ratio = 2874 / 3140;

	$: x = tweened(leftWing, {
		easing: cubicOut
	});

	$: src = `assets/img/window/${vendor}.png`;
	$: imageW = $viewport.width > 1047 ? $viewport.width : 1047;
	$: imageH = ratio * imageW;

	$: top = vendor === "recolector" ? imageH * 0.1 : imageH * 0.15;
	$: leftWing = big ? $viewport.width * 0 : $viewport.width * -0.5;
	$: middle = $viewport.width * 0.55;
	$: rightWing = big ? $viewport.width * 1 : $viewport.width * 1.5;
	$: big = $viewport.width > 1200;

	$: onStage, $viewport.width, update();

	const update = () => {
		if (onStage) {
			x.set(leftWing, { duration: 0 });
			x.set(middle, { duration: 3500 });
		} else {
			if ($x > leftWing) {
				x.set(middle, { duration: 0 });
				x.set(rightWing, { duration: 4500 });
			}
		}
	};
</script>

<!-- {#key src} -->
{#if $loadApartment}
	<img
		{src}
		alt="street vendor passing by the window"
		style:top={`${top}px`}
		style:left={`${$x}px`}
		class:big
		id={`moving-${vendor}`}
	/>
{/if}

<!-- {/key} -->
<style>
	img {
		z-index: 2;
		position: absolute;
		transform: translate(-50%, 0);
	}

	#moving-afilador {
		height: 200px;
	}
	#moving-recolector {
		height: 250px;
	}
	#moving-tamalero {
		height: 200px;
	}

	.big {
		transform: translate(-50%, 0) scale(1.3);
	}
</style>
