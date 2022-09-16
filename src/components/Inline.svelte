<script>
	import {
		language,
		ambi,
		ambiVolume,
		soundPlaying,
		loadCityVendors,
		defaultAmbiVolume
	} from "$stores/misc.js";
	import { fade } from "svelte/transition";
	import inView from "$actions/inView.js";

	export let id;
	export let content;
	export let title;
	export let modal;

	const onEnter = () => {
		$ambi = 1;
		$ambiVolume = $defaultAmbiVolume;
		$soundPlaying = undefined;

		if (id === "inline2") {
			$loadCityVendors = true;
		}
	};
</script>

<section {id} class:modal transition:fade use:inView on:enter={onEnter}>
	<h2 class="title">{@html title[$language]}</h2>
	{#each content as p}
		{@const text = p[$language]}
		<p>{@html text}</p>
	{/each}
</section>

<style>
	section {
		width: 90%;
		max-width: 700px;
		margin: 5em auto;
		padding: 0 1em;
	}
	#inline2 {
		margin-bottom: 0;
	}

	:not(#free) h2 {
		background: white;
		border: 3px solid var(--color-fg);
		width: fit-content;
		padding: 0.4em;
		transform: rotate(-3deg);
		margin-bottom: 1em;
		margin-left: -10px;
	}
	p {
		font-size: var(--18px);
	}

	@media only screen and (max-width: 600px) {
		section {
			margin: 5em auto;
			padding: 0;
		}
		h2 {
			text-align: center;
			margin-left: 0px !important;
		}
	}
</style>
