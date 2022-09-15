<script>
	import Interactive from "$components/Interactive.svelte";
	import {
		freePlaySelection,
		freePlayHover,
		inModal,
		inFreePlay,
		highlightedVendor,
		buttonLocations,
		teaching,
		loadCity
	} from "$stores/misc.js";
	import { browser } from "$app/env";
	import viewport from "$stores/viewport.js";
	import { onMount } from "svelte";
	import { select, zoom, zoomIdentity } from "d3";

	export let location; // title or freeplay
	export let currentStep;
	export let sticky;
	export let leavingTop;

	const ratio = 3758 / 4134;
	const cityBig = "assets/img/background/city.jpg";
	const citySmall = "assets/img/background/city_mobile.jpg";
	const flyDuration = 1500;

	let z;
	let wrapper;
	let zoomableW;
	let zoomableH;

	$: isMobile = $viewport.width < 600;
	$: opacity =
		$inModal || $freePlaySelection || $freePlayHover || $highlightedVendor
			? 0.4
			: 1;
	$: wrapper, $viewport.width, $inFreePlay, setupZoom();
	$: $highlightedVendor =
		currentStep && currentStep.highlight ? currentStep.highlight : undefined;
	$: if ($freePlaySelection) flyTo($freePlaySelection);
	$: if ($inModal) reset();
	$: if (leavingTop) flyTo("guy");
	$: $highlightedVendor, $viewport.width, highlightChange();
	$: $inFreePlay, freePlayChange();

	const highlightChange = () => {
		if ($highlightedVendor) {
			flyTo($highlightedVendor);
		} else {
			reset();
		}
	};

	const freePlayChange = () => {
		if ($inFreePlay) {
			disableScroll();

			if (location === "freeplay") {
				wrapper.focus();

				if ($teaching) {
					flyTo("afilador");
				}
			}
		} else {
			reset();
			enableScroll();
		}
	};

	const disableScroll = () => {
		if (browser) {
			let scrollTop =
				window.pageYOffset || window.document.documentElement.scrollTop;
			let scrollLeft =
				window.pageXOffset || window.document.documentElement.scrollLeft;
			window.onscroll = () => {
				window.scrollTo(scrollLeft, scrollTop);
			};
		}
	};

	const enableScroll = () => {
		if (browser) {
			window.onscroll = () => {};
		}
	};

	const setupZoom = () => {
		zoomableW = $viewport.width > 1378 ? $viewport.width : 1378;
		zoomableH = ratio * zoomableW;

		const topLeft = [0, 0];
		const bottomRight = [zoomableW, zoomableH];

		z = zoom()
			.scaleExtent([1, 2])
			.translateExtent([topLeft, bottomRight])
			.on("zoom", handleZoom);

		select(sticky).call(z);

		if (!$inFreePlay) {
			select(sticky).on("wheel.zoom", null); // disable zoom
			select(sticky)
				.on("mousedown.zoom", null)
				.on("touchstart.zoom", null)
				.on("touchmove.zoom", null)
				.on("touchend.zoom", null); // disable pan
		}
	};

	const handleZoom = (e) => {
		select(wrapper).style(
			"transform",
			`translate(${e.transform.x}px, ${e.transform.y}px) scale(${e.transform.k})`
		);
	};

	const flyTo = (id) => {
		const scale = isMobile ? 1.3 : 2;

		if ($buttonLocations[id]) {
			const location = $buttonLocations[id] || [0, 0];

			let x = $viewport.width / 2 - zoomableW * scale * location[0];
			let y = $viewport.height / 2 - zoomableH * scale * location[1];

			// allows a little more room for descriptions
			if ($inFreePlay && $freePlaySelection) y -= 0.1 * $viewport.height;

			const xLimit = (zoomableW * scale - $viewport.width) * -1;
			const yLimit = (zoomableH * scale - $viewport.height) * -1;

			if (x > 0) x = 0;
			else if (x < xLimit) x = xLimit;
			if (y > 0) y = 0;
			else if (y < yLimit) y = yLimit;

			const t = zoomIdentity.translate(x, y).scale(scale);

			select(sticky).transition().duration(flyDuration).call(z.transform, t);
		}
	};

	const reset = () => {
		if (z) {
			select(sticky)
				.transition()
				.duration(flyDuration)
				.call(z.transform, zoomIdentity);
		}
	};

	onMount(async () => {
		setupZoom();
		flyTo("guy");
	});
</script>

<div class="city-wrapper" bind:this={wrapper} tabindex="-1">
	{#if $loadCity}
		<img
			srcset={`${citySmall} 2067w, ${cityBig} 4134w`}
			sizes={`(max-width: 600px) 2067px, 4134px`}
			src={cityBig}
			alt="illustration of the streets of mexico city, filled with street vendors"
			style:opacity
		/>
	{/if}

	{#if location === "freeplay"}
		<Interactive />
	{/if}
</div>

<style>
	img {
		width: 100%;
		min-width: 1378px;
		transition: opacity 1s;
	}
	.city-wrapper {
		transform-origin: 0px 0px;
		position: relative;
	}
</style>
