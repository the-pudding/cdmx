<script>
	import { select, zoom } from "d3";
	import viewport from "$stores/viewport";
	import { onMount } from "svelte";
	import loadImage from "$utils/loadImage.js";

	export let src;
	export let zoomable;
	export let wrapper;

	let z;
	let background;
	let ratio = 0;

	$: console.log({ zoomable });

	const handleZoom = (e) => {
		select(background).style(
			"transform",
			`translate(${e.transform.x}px, ${e.transform.y}px) scale(${e.transform.k})`
		);
	};

	$: background, $viewport.width, setupZoom();

	const setupZoom = () => {
		if (zoomable) {
			const zoomableW = $viewport.width > 1024 ? $viewport.width : 1024;
			const zoomableH = ratio * zoomableW;

			z = zoom()
				.scaleExtent([1, 4])
				.translateExtent([
					[0, 0],
					[zoomableW, zoomableH]
				])
				.on("zoom", handleZoom);

			select(wrapper).call(z);
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

<img {src} bind:this={background} class="background" />

<style>
	img.background {
		transform-origin: 0px 0px;
		min-height: 100%;
		min-width: 1024px;

		width: 100%;
		height: auto;

		position: fixed;
		top: 0;
		left: 0;
	}

	@media screen and (max-width: 1024px) {
		/* TODO: center it on mobile? */
		img.background {
			/* left: 50%;
			margin-left: -512px; */
		}
	}
</style>
