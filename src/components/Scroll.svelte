<script>
	import Apartment from "$components/Apartment.svelte";
	import City from "$components/City.svelte";
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import Description from "$components/Description.svelte";
	import Modal from "$components/Modal.svelte";
	import Title from "$components/Title.svelte";
	import {
		language,
		inModal,
		inFreePlay,
		ambi,
		ambiVolume,
		soundPlaying
	} from "$stores/misc.js";
	import { writable } from "svelte/store";
	import { previous } from "$stores/previous.js";
	import copy from "$data/copy.json";
	import inView from "$actions/inView.js";
	import _ from "lodash";
	import viewport from "$stores/viewport.js";

	export let id;
	export let steps;
	export let textBg = true;

	let scrollValue;
	let sticky;
	let force = false;
	let spacerEndVisible = false;
	let stickyVisible = false;

	const scrollStore = writable(undefined);
	const prev = previous(scrollStore);

	$: isMobile = $viewport.width < 600;
	$: $scrollStore = scrollValue;
	$: leavingTop = scrollValue === undefined && $prev === 0;
	$: leavingBottom = scrollValue === undefined && $prev === numSteps - 1;
	$: numSteps = id === "intro" ? steps.length + 1 : steps.length;
	$: currentStep =
		force || scrollValue === undefined || scrollValue > steps.length - 1
			? undefined
			: steps[scrollValue];
	$: $soundPlaying =
		currentStep && currentStep.sound && !force ? currentStep.sound : undefined;
	$: vendors = _.uniq(steps.filter((d) => d.vendor).map((d) => d.vendor));
	$: sendBack =
		$inFreePlay ||
		(id === "intro" && (scrollValue === numSteps - 1 || leavingBottom));

	$: scrollValue, handleModal();
	const handleModal = () => {
		if (id === "city") {
			if (leavingBottom && !$inFreePlay) {
				$inModal = true;
			} else if (!force) {
				$inModal = false;
			}
		}
	};

	$: scrollValue, adjustAmbi();
	const adjustAmbi = () => {
		const levels = [0.4, 0.6, 0.75];
		if (id === "intro") {
			if (scrollValue !== undefined && scrollValue < numSteps - 1) {
				$ambi = scrollValue + 1;
				ambiVolume.set(levels[scrollValue], { duration: isMobile ? 0 : 2000 });
			}
		}
	};

	const detectEndEnter = () => {
		if (!$inFreePlay) {
			force = true;
			$inModal = true;
		}
	};
	const detectEndExit = () => {
		if (spacerEndVisible) {
			force = false;
			$inModal = false;
		}
	};
	const detectStartEnter = () => {
		force = true;
	};
	const detectStartExit = () => {
		if (stickyVisible) force = false;
	};
</script>

<section {id} class="steps">
	{#if id === "city"}
		<div
			id="detect-start"
			use:inView
			on:enter={detectStartEnter}
			on:exit={detectStartExit}
		/>
	{/if}

	<div
		class="sticky"
		bind:this={sticky}
		class:apartment={id === "apartment"}
		use:inView
		on:enter={() => (stickyVisible = true)}
		on:exit={() => (stickyVisible = false)}
	>
		{#if id === "intro"}
			<Title {scrollValue} {leavingBottom} />
		{:else if id === "apartment"}
			<Apartment {currentStep} {vendors} />
		{:else if id === "city"}
			<City location="freeplay" {currentStep} {sticky} {leavingTop} />
			<Description />
			<Modal
				title={copy.freePlay.title}
				content={copy.freePlay.content}
				{sticky}
			/>
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
		{/if}
	</Scrolly>

	{#if id === "city"}
		<div
			id="spacer-end"
			use:inView
			on:enter={() => (spacerEndVisible = true)}
			on:exit={() => (spacerEndVisible = false)}
		/>
		<div
			id="detect-end"
			use:inView
			on:enter={detectEndEnter}
			on:exit={detectEndExit}
		/>
	{/if}
</section>

<style>
	#spacer-end {
		height: 95vh;
	}
	#detect-end {
		height: 50vh;
	}
	#detect-start {
		height: 5em;
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
	.step:not(.background) {
		text-shadow: 0px 0px 10px white;
	}
	.step.last {
		margin-bottom: 0;
	}
	.step:first-of-type {
		margin-top: 0;
	}
	#apartment .step:first-of-type {
		margin-top: -50vh;
	}
	#city .step:first-of-type {
		margin-top: -50vh;
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
