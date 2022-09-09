<script>
	import City from "$components/City.svelte";
	import copy from "$data/copy.json";
	import { language, inModal } from "$stores/misc.js";
	import { fade } from "svelte/transition";
	import { tweened } from "svelte/motion";
	import { cubicOut } from "svelte/easing";

	export let scrollValue;
	export let leavingBottom;

	const { hed, dek, bylines } = copy;

	const skip = () => {
		const el = document.getElementById("scroll-to-explore");
		el.scrollIntoView({ block: "center" });
		$inModal = true;
	};

	// TODO: use classes instead, might be causing scroll inconsistency
	$: showTitles = scrollValue === 3 || leavingBottom;
	$: buttonText =
		$language === "english" ? "skip to explore this map" : "ir directo al mapa";

	const gradient = tweened(100, { duration: 800, easing: cubicOut });
	$: scrollValue, updateGradient();

	const updateGradient = () => {
		if (scrollValue === undefined) {
			$gradient = 100;
		} else {
			$gradient = 100 - (scrollValue + 1) * 25;
		}
	};
</script>

<div id="title">
	{#if !showTitles}
		<div class="gradient" style={`--gradient: ${$gradient}%`} out:fade />
	{/if}

	<City />

	{#if showTitles}
		<div class="titles" transition:fade={{ duration: 1000 }}>
			<h1>{@html hed[$language]}</h1>
			<h2>{@html dek[$language]}</h2>

			<div class="bylines">
				{#each bylines as byline}
					<div>{@html byline[$language]}</div>
				{/each}
			</div>
		</div>
		<button on:click={skip} transition:fade>{buttonText}</button>
	{/if}
</div>

<style>
	#title {
		width: 100%;
		height: 100vh;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		text-align: center;
		position: relative;
	}

	.gradient {
		z-index: 1000;
		height: 100vh;
		width: 100vw;
		position: absolute;
		top: 0;
		background: radial-gradient(white var(--gradient), transparent);
		transition: opacity 1000ms;
	}

	.titles {
		position: absolute;
		width: 100vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		top: 50%;
		transform: translate(0, -50%);
	}

	h1,
	h2,
	.bylines {
		background: white;
		padding: 0 0.4em;
		border: 2px solid var(--color-fg);
	}
	h1 {
		font-size: 5em;
	}
	h2 {
		font-size: 2em;
		max-width: 600px;
	}
	.bylines {
		font-family: var(--sans);
		padding: 0.8em;
	}

	button {
		position: absolute;
		bottom: 30px;
		left: 50%;
		transform: translate(-50%, 0);
	}

	@media only screen and (max-width: 600px) {
		h1 {
			font-size: 4em;
			margin: 0 0.4em;
			padding: 0 0.1em;
		}
		h2 {
			font-size: 1.2em;
			margin: 16px 0.4em;
		}
	}
</style>
