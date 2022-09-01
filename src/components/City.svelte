<script>
	import InteractiveLayer from "$components/InteractiveLayer.svelte";
	import {
		freePlaySelection,
		inModal,
		inFreePlay,
		flyLocations
	} from "$stores/misc.js";
	import viewport from "$stores/viewport.js";
	import scrollY from "$stores/scrollY.js";
	import { onMount } from "svelte";
	import { select, zoom, zoomIdentity } from "d3";
	import loadImage from "$utils/loadImage.js";

	export let currentStep;
	export let sticky;

	const flyDuration = 1500;

	let z;
	let wrapper;
	let zoomableW;
	let zoomableH;
	let ratio = 0;

	$: isMobile = $viewport.width < 600;
	$: opacity = $inModal ? 0.7 : 1;
	$: wrapper, $viewport.width, $inFreePlay, setupZoom();
	$: currentHighlight =
		currentStep && currentStep.highlight ? currentStep.highlight : undefined;
	$: currentHighlight, highlightChange();
	$: if ($freePlaySelection) flyTo($freePlaySelection);

	const highlightChange = () => {
		if (currentHighlight === undefined) {
			reset();
		} else {
			flyTo(currentHighlight);
		}
	};

	const setupZoom = () => {
		zoomableW = $viewport.width > 1378 ? $viewport.width : 1378;
		zoomableH = ratio * zoomableW;

		const topLeft = [0, 0];
		const bottomRight = [zoomableW, zoomableH];

		z = zoom()
			.scaleExtent([1, 3])
			.translateExtent([topLeft, bottomRight])
			.on("zoom", handleZoom);

		select(sticky).call(z);

		if (!$inFreePlay) {
			reset();
			select(sticky).on("wheel.zoom", null); // disable wheel
		}
	};

	const handleZoom = (e) => {
		select(wrapper).style(
			"transform",
			`translate(${e.transform.x}px, ${e.transform.y}px) scale(${e.transform.k})`
		);
	};

	const flyTo = (id) => {
		const scale = isMobile ? 2 : 3;

		if ($flyLocations[id]) {
			const location = isMobile
				? $flyLocations[id].mobile
				: $flyLocations[id].desktop;

			const t = zoomIdentity
				.translate(zoomableW * location[0], zoomableH * location[1])
				.scale(scale);

			select(sticky).transition().duration(flyDuration).call(z.transform, t);
		}
	};

	const reset = () => {
		if ($scrollY > 13000) {
			select(sticky)
				.transition()
				.duration(flyDuration)
				.call(z.transform, zoomIdentity);
		} else {
			flyTo("guy");
		}
	};

	onMount(async () => {
		const img = await loadImage("assets/img/background/city.jpg");
		ratio = img.height / img.width;
		setupZoom();
	});
</script>

<div class="city-wrapper" bind:this={wrapper}>
	<img
		src="assets/img/background/city.jpg"
		style:opacity
		alt="illustration of cdmx streets"
		on:click={() => ($freePlaySelection = undefined)}
	/>

	{#if $inFreePlay}
		<InteractiveLayer />
	{/if}
</div>

<style>
	img {
		width: 100%;
		min-width: 1378px;
	}
	.city-wrapper {
		transform-origin: 0px 0px;
		position: relative;
	}
</style>
