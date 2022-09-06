<script>
	import InteractiveLayer from "$components/InteractiveLayer.svelte";
	import {
		freePlaySelection,
		freePlayHover,
		inModal,
		inFreePlay,
		locations
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
	$: wrapper, $viewport.width, $inFreePlay, setupZoom();
	$: currentHighlight =
		currentStep && currentStep.highlight ? currentStep.highlight : undefined;
	$: currentHighlight, highlightChange();
	$: if ($freePlaySelection) flyTo($freePlaySelection);
	$: if ($inModal) reset();

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
		const scale = 2;

		if ($locations[id]) {
			const location = $locations[id] || [0, 0];

			let x = $viewport.width / 2 - zoomableW * scale * location[0];
			let y = $viewport.height / 2 - zoomableH * scale * location[1];

			if (isMobile) y -= 200;

			const xLimit = (zoomableW * 2 - $viewport.width) * -1;
			const yLimit = (zoomableH * 2 - $viewport.height) * -1;

			if (x > 0) x = 0;
			else if (x < xLimit) x = xLimit;
			if (y > 0) y = 0;
			else if (y < yLimit) y = yLimit;

			const t = zoomIdentity.translate(x, y).scale(scale);

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
		alt="illustration of cdmx streets"
		class:in-modal={$inModal}
		class:free-play-selection={$freePlaySelection || $freePlayHover}
	/>

	{#if $inFreePlay}
		<InteractiveLayer />
	{/if}
</div>

<style>
	img {
		width: 100%;
		min-width: 1378px;
		opacity: 1;
		transition: opacity 500ms;
	}
	.city-wrapper {
		transform-origin: 0px 0px;
		position: relative;
		opacity: 1;
		transition: opacity 500ms;
	}
	.in-modal {
		opacity: 0.7;
	}
	.free-play-selection {
		opacity: 0.5;
	}
</style>
