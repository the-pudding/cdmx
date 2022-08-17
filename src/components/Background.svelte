<script>
	import InteractiveLayer from "$components/InteractiveLayer.svelte";
	import { select, zoom, zoomIdentity } from "d3";
	import viewport from "$stores/viewport";
	import { onMount } from "svelte";
	import { inFreePlay } from "$stores/misc.js";
	import loadImage from "$utils/loadImage.js";

	export let src;
	export let zoomable;
	export let wrapper;
	export let highlight;
	export let opacity = 1;

	let z;
	let background;
	let ratio = 0;
	const flyDuration = 1500;

	const handleZoom = (e) => {
		select(background).style(
			"transform",
			`translate(${e.transform.x}px, ${e.transform.y}px) scale(${e.transform.k})`
		);
	};

	$: background, $viewport.width, $inFreePlay, setupZoom();
	$: highlight, flyTo();

	let zoomableW;
	let zoomableH;
	const setupZoom = () => {
		if (zoomable) {
			zoomableW = $viewport.width > 1024 ? $viewport.width : 1024;
			zoomableH = ratio * zoomableW;

			z = zoom()
				.scaleExtent([1, 3])
				.translateExtent([
					[0, 0],
					[zoomableW, zoomableH]
				])
				.on("zoom", handleZoom);

			select(wrapper).call(z);

			if (!$inFreePlay) {
				reset();
				select(wrapper).on("wheel.zoom", null); // disable wheel;
			}
		}
	};

	const reset = () => {
		select(wrapper)
			.transition()
			.duration(flyDuration)
			.call(z.transform, zoomIdentity);
	};

	const flyTo = () => {
		const flyLocations = {
			chatarrero: [-1.5, -1],
			tacos: [-1, -1.9],
			bullfighter: [0, -2]
		};

		if (wrapper) {
			if (highlight === undefined) {
				reset();
			} else {
				const t = zoomIdentity
					.translate(
						zoomableW * flyLocations[highlight][0],
						zoomableH * flyLocations[highlight][1]
					)
					.scale(3);
				select(wrapper).transition().duration(flyDuration).call(z.transform, t);
			}
		}
	};

	onMount(async () => {
		const img = await loadImage("assets/img/city.jpg");
		ratio = img.height / img.width;
		if (zoomable) {
			setupZoom();
		}
	});
</script>

<div class="background" bind:this={background}>
	<img {src} style:opacity />

	{#if $inFreePlay}
		<InteractiveLayer />
	{/if}
</div>

<style>
	.test {
		background: red;
		opacity: 0.4;
		height: 100px;
		width: 100px;
		position: absolute;
		top: 50%;
		left: 40%;
	}
	.background {
		position: sticky;
		top: 0;
		left: 0;
		min-width: 1024px;
		width: 100%;
		transform-origin: 0px 0px;
	}
	@media screen and (max-width: 1024px) {
		img.background {
			height: 100vh;
		}
	}
	@media screen and (min-width: 1300px) {
		img.background {
			transform: translate(0, -10%);
		}
	}
</style>
