<script>
	import Sound from "$components/Sound.svelte";
	import Vendor from "$components/Vendor.svelte";
	import Background from "$components/Background.svelte";
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import { language } from "$stores/misc.js";

	export let id;
	export let steps;
	export let fontSize = "1em";
	export let textBg = true;

	let scrollValue;
	let wrapper;

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
	$: zoomable = scrollValue !== undefined && currentStep.zoom === "TRUE";
</script>

<section {id} class="steps">
	<div class="sticky" bind:this={wrapper}>
		{#if currentBackground}
			<Background src={currentBackground} {zoomable} {wrapper} />
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
</section>

<style>
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
		position: sticky;
		top: 0;
		width: 100%;
		height: 100vh;
	}
	.placeholder {
		width: 100%;
		height: 100vh;
		visibility: hidden;
		position: absolute;
		top: 0;
	}
</style>
