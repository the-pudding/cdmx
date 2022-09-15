<script>
	import {
		freePlaySelection,
		freePlayHover,
		highlightedVendor,
		loadCityVendors,
		imageLocations
	} from "$stores/misc.js";

	export let id;

	let experiment = true;

	$: opacity =
		id === $freePlaySelection ||
		id === $freePlayHover ||
		id === $highlightedVendor
			? 1
			: 0;

	const big = `assets/img/freeplay-small/${id}.png`;
	const small = `assets/img/freeplay-small/${id}-mobile.png`;

	$: left = `${$imageLocations[id][0] * 100}%`;
	$: top = `${$imageLocations[id][1] * 100}%`;
	$: width = `${$imageLocations[id][2]}px`;
</script>

{#if $loadCityVendors}
	<img
		srcset={`${small} 400w, ${big} 1379w`}
		sizes={`(max-width: 600px) 400px, 1379px`}
		src={experiment ? big : `assets/img/freeplay/${id}.png`}
		alt={`${id} street vendor`}
		class:forward={opacity === 1}
		class:experiment
		style:opacity
		style:left
		style:top
		style:width
	/>
{/if}

<style>
	img:not(.experiment) {
		position: absolute;
		top: 0;
		width: 100%;
		min-width: 1378px;
		z-index: -1;
		transition: opacity 500ms;
	}

	img.experiment {
		position: absolute;
		z-index: -1;
		transition: opacity 500ms;
		transform: translate(-50%, -50%);
	}
	img.forward {
		z-index: 10;
	}
</style>
