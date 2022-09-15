<script>
	import {
		inModal,
		language,
		ambi,
		ambiVolume,
		soundPlaying,
		loadApartment,
		loadCityVendors
	} from "$stores/misc.js";
	import { onMount } from "svelte";
	import inView from "$actions/inView.js";

	export let content;

	const skip = () => {
		const el = document.getElementById("spacer-end");
		el.scrollIntoView({ block: "start", inline: "nearest" });
		$inModal = true;
		$ambi = 1;
		$ambiVolume = 0.1;
		$soundPlaying = undefined;
		$loadCityVendors = true;
		$loadApartment = true;
	};

	onMount(() => {
		const button = document.getElementById("skip");
		button.addEventListener("click", skip);
	});
</script>

<section id="skip" use:inView on:enter={() => ($loadApartment = true)}>
	{#each content as item}
		<p>{@html item[$language]}</p>
	{/each}
</section>

<style>
	section {
		width: 90%;
		max-width: 700px;
		margin: 5em auto;
		padding: 1em;
		display: flex;
		flex-direction: column;
		align-items: center;
		border: 3px solid var(--color-fg);
	}
	p:first-of-type {
		font-size: 1.8em;
		padding: 0.3em;
		margin: 0;
		text-align: center;
	}
	p:last-of-type {
		font-size: 1.2em;
		text-align: center;
		font-family: var(--sans);
	}
</style>
