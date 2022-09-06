<script>
	import InteractiveLayer from "$components/InteractiveLayer.svelte";
	import Vendor from "$components/Vendor.svelte";
	import { select, zoom, zoomIdentity } from "d3";
	import viewport from "$stores/viewport";
	import { onMount } from "svelte";
	import { inFreePlay, freePlaySelection, locations } from "$stores/misc.js";
	import loadImage from "$utils/loadImage.js";
	import scrollY from "$stores/scrollY.js";

	export let id;
	export let zoomable;
	export let wrapper;
	export let highlight;
	export let opacity = 1;
	export let vendors;
	export let currentVendor;

	let z;
	let zoomableW;
	let zoomableH;
	let cityBg;
	let ratio = 0;
	const flyDuration = 1500;

	$: cityBg, $viewport.width, $inFreePlay, setupZoom();
	$: highlight, highlightChange();
	$: if ($freePlaySelection) flyTo($freePlaySelection);
	$: isMobile = $viewport.width < 600;

	const setupZoom = () => {
		if (zoomable) {
			zoomableW = $viewport.width > 1378 ? $viewport.width : 1378;
			zoomableH = ratio * zoomableW;

			const topLeft = [-(zoomableW - $viewport.width) / 2, 0];
			const bottomRight = [
				zoomableW + (zoomableW - $viewport.width) / 2,
				zoomableH
			];

			z = zoom()
				.scaleExtent([1, 3])
				.translateExtent([topLeft, bottomRight])
				.on("zoom", handleZoom);

			select(wrapper).call(z);

			if (!$inFreePlay) {
				reset();
				select(wrapper).on("wheel.zoom", null); // disable wheel
			}
		}
	};

	const handleZoom = (e) => {
		let x = e.transform.x;
		let y = e.transform.y;

		select(cityBg).style(
			"transform",
			`translate(${x}px, ${y}px) scale(${e.transform.k})`
		);
	};

	const highlightChange = () => {
		if (zoomable) {
			if (highlight === undefined) {
				reset();
			} else {
				flyTo(highlight);
			}
		}
	};

	const reset = () => {
		if ($scrollY > 13000) {
			select(wrapper)
				.transition()
				.duration(flyDuration)
				.call(z.transform, zoomIdentity);
		} else {
			flyTo("guy");
		}
	};

	const flyTo = (id) => {
		const scale = isMobile ? 2 : 3;

		if ($locations[id]) {
			const location = isMobile
				? $locations[id].mobile
				: $locations[id].desktop;

			const t = zoomIdentity
				.translate(zoomableW * location[0], zoomableH * location[1])
				.scale(scale);
			select(wrapper).transition().duration(flyDuration).call(z.transform, t);
		}
	};

	onMount(async () => {
		const img = await loadImage("assets/img/background/city.jpg");
		ratio = img.height / img.width;
		if (zoomable) {
			setupZoom();
		}
	});
</script>

{#if id === "apartment"}
	<img
		src="assets/img/background/apartment_ext.png"
		class="apartment ext"
		alt="illustration of apartment in cdmx"
	/>
	<img
		src="assets/img/background/apartment_int.png"
		class="apartment int"
		alt="illustration of apartment in cdmx"
	/>

	{#each vendors as vendor}
		<Vendor
			src={`assets/img/${vendor}.png`}
			onStage={vendor === currentVendor}
		/>
	{/each}
{:else if id === "city"}
	<div bind:this={cityBg} class="city-wrapper">
		<img
			src="assets/img/background/city.jpg"
			class="city"
			style:opacity
			alt="illustration of cdmx streets"
			on:click={() => ($freePlaySelection = undefined)}
		/>

		{#if $inFreePlay}
			<InteractiveLayer />
		{/if}
	</div>
{/if}

<style>
	img {
		width: 100%;
	}
	.city-wrapper {
		transform-origin: 0px 0px;
		position: relative;
	}
	.city {
		min-width: 1378px;
	}
	.apartment {
		position: absolute;
		top: 0;
	}
	.apartment.ext {
		z-index: 1;
	}
	.apartment.int {
		z-index: 3;
	}
</style>
