<script>
	import AmbiLoop from "$components/AmbiLoop.svelte";
	import Sound from "$components/Sound.svelte";
	import Vendor from "$components/Vendor.svelte";
	import Background from "$components/Background.svelte";
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import Inline from "$components/Inline.svelte";
	import { language, inModal, inFreePlay } from "$stores/misc.js";
	import scrollY from "$stores/scrollY.js";
	import copy from "$data/copy.json";
	import { browser } from "$app/env";

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
			? `assets/img/${currentStep.vendor}.jpeg`
			: undefined;
	$: currentHighlight =
		scrollValue !== undefined && currentStep.highlight
			? currentStep.highlight
			: undefined;
	$: $inModal =
		id === "city" &&
		scrollValue === undefined &&
		$scrollY > 16000 &&
		!$inFreePlay;
	$: zoomable = id === "city";

	$: if ($inFreePlay && id === "city") disableScroll();
	$: if (!$inFreePlay && id === "city") enableScroll();

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
</script>

<section {id} class="steps">
	<div class="sticky" bind:this={wrapper}>
		{#if background}
			<Background
				src={`assets/img/${background}.jpg`}
				{zoomable}
				{wrapper}
				highlight={currentHighlight}
				opacity={$inModal ? 0.7 : 1}
			/>
		{/if}

		{#if $inModal}
			<Inline
				id="free"
				title={copy.freePlay.title}
				content={copy.freePlay.content}
				modal={true}
			/>
		{/if}
	</div>

	{#if currentSound}
		{#if id === "intro"}
			<AmbiLoop
				sounds={steps.map((d) => `assets/sound/${d.sound}.mp3`)}
				{scrollValue}
			/>
		{:else}
			<Sound src={currentSound} />
		{/if}
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
		<div class="spacer" id="scroll-to-explore" />
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
