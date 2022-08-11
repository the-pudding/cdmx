<script>
	import { select, zoom } from "d3";
	import viewport from "$stores/viewport";
	import { onMount } from "svelte";
	import loadImage from "$utils/loadImage.js";

	export let src;
	export let zoomable;
	export let wrapper;
	export let opacity = 1;

	let z;
	let background;
	let ratio = 0;

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

	const go = () => {
		select(wrapper).transition().call(z.scaleTo, 4, [550, 600]);
	};
</script>

<img {src} bind:this={background} class="background" style:opacity />

<!-- <button on:click={go} style="position: absolute; top: 0"
	>go to laptop guy</button
> -->
<style>
	img.background {
		transform-origin: 0px 0px;
		min-width: 1024px;

		width: 100%;
		position: sticky;
		top: 0;
		left: 0;
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
