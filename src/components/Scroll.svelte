<script>
	import Sound from "$components/Sound.svelte";
	import Apartment from "$components/Apartment.svelte";
	import City from "$components/City.svelte";
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import Description from "$components/Description.svelte";
	import Modal from "$components/Modal.svelte";
	import Inline from "$components/Inline.svelte";
	import Title from "$components/Title.svelte";
	import {
		language,
		inModal,
		inFreePlay,
		ambi,
		ambiVolume,
		highlightedVendor
	} from "$stores/misc.js";
	import { writable } from "svelte/store";
	import { previous } from "$stores/previous.js";
	import copy from "$data/copy.json";
	import inView from "$actions/inView.js";
	import _ from "lodash";

	$: console.log({ scrollValue });

	export let id;
	export let steps;
	export let textBg = true;

	let scrollValue;
	let sticky;

	const scrollStore = writable(undefined);
	$: $scrollStore = scrollValue;
	const prev = previous(scrollStore);

	$: leavingTop = scrollValue === undefined && $prev === 0;
	$: leavingBottom = scrollValue === undefined && $prev === numSteps - 1;
	$: numSteps = id === "intro" ? steps.length + 1 : steps.length;
	$: currentStep =
		force || scrollValue === undefined || scrollValue > steps.length - 1
			? undefined
			: steps[scrollValue];
	$: currentSound =
		currentStep && currentStep.sound
			? `assets/sound/${currentStep.sound}.mp3`
			: undefined;
	$: vendors = _.uniq(steps.filter((d) => d.vendor).map((d) => d.vendor));

	$: scrollValue, handleModal();
	const handleModal = () => {
		if (id === "city") {
			if (leavingBottom && !$inFreePlay) {
				$inModal = true;
			} else {
				$inModal = false;
			}
		}
	};

	$: sendBack =
		$inFreePlay ||
		(id === "intro" && (scrollValue === numSteps - 1 || leavingBottom));

	$: scrollValue, adjustAmbi();
	const adjustAmbi = () => {
		const levels = [0.4, 0.6, 0.75];
		if (id === "intro") {
			if (scrollValue !== undefined && scrollValue < numSteps - 1) {
				$ambi = scrollValue + 1;
				$ambiVolume = levels[scrollValue];
			}
		}
	};

	let force = false;
	const forceModal = () => {
		force = true;
		$inModal = true;
	};
	const forceReset = () => {
		force = true;
	};
	const releaseForce = () => {
		force = false;
	};
</script>

<section {id} class="steps">
	{#if id === "city"}
		<div
			id="detect-start"
			use:inView={{ top: 100 }}
			on:enter={forceReset}
			on:exit={releaseForce}
		/>
	{/if}

	<div class="sticky" bind:this={sticky} class:apartment={id === "apartment"}>
		{#if id === "intro"}
			<Title {scrollValue} {leavingBottom} />
		{:else if id === "apartment"}
			<Apartment {currentStep} {vendors} />
		{:else if id === "city"}
			<City location="freeplay" {currentStep} {sticky} {leavingTop} />
			<Description />
			<Modal title={copy.freePlay.title} content={copy.freePlay.content} />
		{/if}
	</div>

	<Scrolly bind:value={scrollValue} {sendBack}>
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
		{:else if id === "city" && $inFreePlay}
			<!-- <div class="spacer" /> -->
		{/if}
	</Scrolly>

	{#if id === "city"}
		<div id="scroll-to-explore" />
		<div
			id="detect-end"
			use:inView
			on:enter={forceModal}
			on:exit={releaseForce}
		/>
	{/if}

	{#if currentSound}
		{#key currentSound}
			<Sound src={currentSound} />
		{/key}
	{/if}
</section>

<style>
	.spacer {
		height: 200vh;
	}
	#scroll-to-explore {
		height: 100vh;
	}
	#detect-end {
		height: 50vh;
	}
	#detect-start {
		height: 10px;
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
		font-size: var(--18px);
	}
	.step.extra {
		height: 10px;
		margin: 65vh 1em;
	}
	.step.background {
		background: var(--step-background);
		border: 3px solid var(--color-fg);
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
	.apartment {
		align-items: center;
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
