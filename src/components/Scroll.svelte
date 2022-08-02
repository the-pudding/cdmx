<script>
	import Sound from "$components/Sound.svelte";
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import { language } from "$stores/misc.js";
	export let steps;

	let scrollValue;

	$: currentStep = scrollValue !== undefined ? steps[scrollValue] : undefined;
	$: currentBackground =
		scrollValue !== undefined && currentStep.background
			? `assets/img/${currentStep.background}.jpeg`
			: undefined;
	$: currentSound =
		scrollValue !== undefined && currentStep.sound
			? `assets/sound/${currentStep.sound}.mp3`
			: undefined;

	$: console.log({ currentSound });
</script>

<div class="steps">
	<div class="sticky">
		{#if currentBackground}
			<div class="background" style={`--url: url(${currentBackground})`} />
		{/if}
	</div>

	{#if currentSound}
		<Sound src={currentSound} />
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
		background-image: var(--url);

		/* max-width: 989px;
    margin: auto; */
		/* Full height */
		height: 100vh;

		/* Center and scale the image nicely */
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}
	.placeholder {
		width: 100%;
		height: 100vh;
		visibility: hidden;
		position: absolute;
		top: 0;
	}
</style>
