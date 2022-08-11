<script>
	import Sound from "$components/Sound.svelte";
	import Vendor from "$components/Vendor.svelte";
	import Background from "$components/Background.svelte";
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import Inline from "$components/Inline.svelte";
	import { language } from "$stores/misc.js";
	import copy from "$data/copy.json";

	export let id;
	export let steps;
	export let background;
	export let fontSize = "1em";
	export let textBg = true;

	let scrollValue;
	let wrapper;

	$: currentStep = scrollValue !== undefined ? steps[scrollValue] : undefined;
	$: currentSound =
		scrollValue !== undefined && currentStep.sound
			? `assets/sound/${currentStep.sound}.mp3`
			: undefined;
	$: currentVendor =
		scrollValue !== undefined && currentStep.vendor
			? `assets/img/vendor.jpeg`
			: undefined;
	$: zoomable = scrollValue !== undefined && currentStep.zoom === "TRUE";
	$: freePlay = id === "city" && scrollValue === undefined;
</script>

<section {id} class="steps">
	<div class="sticky" bind:this={wrapper}>
		{#if background}
			<Background src={`assets/img/${background}.jpg`} {zoomable} {wrapper} />
		{/if}

		{#if freePlay}
			<Inline id="free" content={copy.freePlay} modal={true} />
		{/if}
	</div>

	{#if currentSound}
		<Sound src={currentSound} />
	{/if}

	{#if currentVendor}
		<Vendor src={currentVendor} {scrollValue} />
	{/if}

	<Scrolly bind:value={scrollValue}>
		{#each steps as step, i}
			{@const id = id === "intro" && i === 0 ? "scroll-to-start" : null}
			{@const active = scrollValue === i}
			{@const background = textBg}
			<div
				{id}
				class="step"
				class:active
				class:background
				style:font-size={fontSize}
			>
				{@html step[$language]}
			</div>
		{/each}
	</Scrolly>

	{#if id === "city"}
		<div class="spacer" />
	{/if}
</section>

<style>
	.spacer {
		height: 75vh;
	}
	.steps {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.step {
		text-align: center;
		margin: 80vh 1em;
		max-width: 600px;
	}
	.step.background {
		background: var(--color-gray-100);
		padding: 2em;
	}
	.step:first-of-type {
		margin-top: 0;
	}
	.sticky {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: sticky;
		top: 0;
		width: 100%;
		height: 100vh;
		overflow: hidden;
	}
	.placeholder {
		width: 100%;
		height: 100vh;
		visibility: hidden;
		position: absolute;
		top: 0;
	}
</style>
