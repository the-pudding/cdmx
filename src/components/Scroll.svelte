<script>
	import { select, zoom } from "d3";
	import Sound from "$components/Sound.svelte";
	import Vendor from "$components/Vendor.svelte";
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import viewport from "$stores/viewport";
	import { language } from "$stores/misc.js";
	import { onMount, tick } from "svelte";

	export let steps;

	let z;
	let scrollValue;
	let wrapper;
	let background;
	let width = 0;
	let height = 0;

	$: currentStep = scrollValue !== undefined ? steps[scrollValue] : undefined;
	$: currentBackground =
		scrollValue !== undefined && currentStep.background
			? `assets/img/${currentStep.background}.jpg`
			: undefined;
	$: currentSound =
		scrollValue !== undefined && currentStep.sound
			? `assets/sound/${currentStep.sound}.mp3`
			: undefined;
	$: currentVendor =
		scrollValue !== undefined && currentStep.vendor
			? `assets/img/vendor.jpeg`
			: undefined;
	let zoomable = true;
	// $: zoomable = scrollValue > 6 && currentStep.background === "city";

	const handleZoom = (e) => {
		select(background).style(
			"transform",
			`translate(${e.transform.x}px, ${e.transform.y}px) scale(${e.transform.k})`
		);
	};

	$: background, $viewport.width, setDimensions();
	const setDimensions = () => {
		if (background) {
			width = background.clientWidth;
			height = background.clientHeight;

			setupZoom();
		}
	};

	$: console.log({ width, height });

	const setupZoom = () => {
		console.log("setting up", width, height);
		z = zoom()
			.scaleExtent([1, 4])
			.translateExtent([
				[0, 0],
				[width, height]
			])
			.on("zoom", handleZoom);

		select(wrapper).call(z);
	};

	onMount(async () => {
		if (zoomable) {
			await tick();
			setDimensions();
			// SO CLOSE! <3
			// TODO: issue, getting a height that's too small on the first call
		}
	});
</script>

<div class="steps">
	<div class="sticky" bind:this={wrapper}>
		{#if currentBackground}
			<img src={currentBackground} bind:this={background} class="background" />
			<!-- <div
				class="background"
				bind:this={background}
				style={`--url: url(${currentBackground})`}
			/> -->
		{/if}
	</div>

	{#if currentSound}
		<Sound src={currentSound} />
	{/if}

	{#if currentVendor}
		<Vendor src={currentVendor} {scrollValue} />
	{/if}

	<Scrolly bind:value={scrollValue}>
		{#each steps as { english, spanish }, i}
			{@const text = $language === "english" ? english : spanish}
			<div class="step" class:active={scrollValue === i}>{@html text}</div>
		{/each}
	</Scrolly>
</div>

<style>
	.steps {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.step {
		background: var(--color-gray-100);
		text-align: center;
		padding: 2em;
		margin: 80vh 1em;
		max-width: 600px;
	}
	.step:first-of-type {
		margin-top: 0;
	}
	.sticky {
		position: sticky;
		top: 0;
		width: 100%;
		height: 100vh;
	}
	.background {
		/* background-image: var(--url);
		width: 100%; */

		/* height: 100vh; */

		/* Center and scale the image nicely */
		/* background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		transform-origin: 0px 0px; */
	}
	img.background {
		transform-origin: 0px 0px;
		/* Set rules to fill background */
		min-height: 100%;
		min-width: 1024px;

		/* Set up proportionate scaling */
		width: 100%;
		height: auto;

		/* Set up positioning */
		position: fixed;
		top: 0;
		left: 0;
	}

	@media screen and (max-width: 1024px) {
		/* Specific to this particular image */
		img.background {
			left: 50%;
			margin-left: -512px; /* 50% */
		}
	}

	.placeholder {
		width: 100%;
		height: 100vh;
		visibility: hidden;
		position: absolute;
		top: 0;
	}
</style>
