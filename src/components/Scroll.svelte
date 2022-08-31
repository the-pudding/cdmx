<script>
	import Sound from "$components/Sound.svelte";
	import Apartment from "$components/Apartment.svelte";
	import City from "$components/City.svelte";
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import Inline from "$components/Inline.svelte";
	import Title from "$components/Title.svelte";
	import {
		language,
		inModal,
		inFreePlay,
		ambi,
		ambiVolume
	} from "$stores/misc.js";
	import scrollY from "$stores/scrollY.js";
	import copy from "$data/copy.json";
	import { browser } from "$app/env";
	import _ from "lodash";

	export let id;
	export let steps;
	export let textBg = true;

	let scrollValue;
	let sticky;

	$: currentStep =
		scrollValue === undefined || scrollValue > steps.length - 1
			? undefined
			: steps[scrollValue];
	$: currentSound =
		currentStep && currentStep.sound
			? `assets/sound/${currentStep.sound}.mp3`
			: undefined;
	$: vendors = _.uniq(steps.filter((d) => d.vendor).map((d) => d.vendor));
	$: $inModal =
		id === "city" &&
		scrollValue === undefined &&
		$scrollY > 16000 &&
		!$inFreePlay;

	$: scrollValue, adjustAmbi();
	const adjustAmbi = () => {
		const levels = [0.4, 0.6, 0.75];
		if (id === "intro") {
			if (scrollValue !== undefined && scrollValue < 3) {
				$ambi = scrollValue + 1;
				$ambiVolume = levels[scrollValue];
			}
		}
	};

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
	<div class="sticky" bind:this={sticky}>
		{#if id === "intro"}
			<Title {scrollValue} />
		{:else if id === "apartment"}
			<Apartment {currentStep} {vendors} />
		{:else if id === "city"}
			<City {currentStep} {sticky} />
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

	<Scrolly bind:value={scrollValue} hide={id === "intro" && scrollValue === 3}>
		{#each steps as step, i}
			{@const stepId = id === "intro" && i === 0 ? "scroll-to-start" : null}
			{@const active = scrollValue === i}
			{@const background = textBg}
			{@const last = id === "city" && i === steps.length - 1}

			<div id={stepId} class="step" class:active class:background class:last>
				{@html step[$language]}
			</div>
		{/each}

		{#if id === "intro"}
			<div class="step extra" />
		{/if}
	</Scrolly>

	{#if id === "city"}
		<div class="spacer" id="scroll-to-explore" />
	{/if}

	{#if currentSound}
		{#key currentSound}
			<Sound src={currentSound} />
		{/key}
	{/if}
</section>

<style>
	.spacer {
		height: 150vh;
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
	.step.extra {
		height: 10px;
		margin: 65vh 1em;
	}
	.step.background {
		background: var(--color-gray-100);
		padding: 2em;
	}
	.step.last {
		margin-bottom: 0;
	}
	.step:first-of-type {
		margin-top: 0;
	}
	.sticky {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		position: sticky;
		top: 0;
		height: 100vh;
		width: 100%;
		overflow: hidden;
	}
	.placeholder {
		width: 100%;
		height: 100vh;
		visibility: hidden;
		position: absolute;
		top: 0;
	}
	:global(section#intro .step) {
		font-size: 1.5em;
	}
	@media only screen and (max-width: 400px) {
		:global(section#intro .step) {
			font-size: 1.2em;
		}
	}
</style>
