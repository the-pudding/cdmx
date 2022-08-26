<script>
	import Background from "$components/Background.svelte";
	import { base } from "$app/paths";
	import copy from "$data/copy.json";
	import { language } from "$stores/misc.js";
	import scrollY from "$stores/scrollY.js";
	import { fade } from "svelte/transition";

	export let scrollValue;

	const { hed, dek, bylines } = copy;

	const skip = () => {
		const el = document.getElementById("scroll-to-explore");
		el.scrollIntoView({ block: "center" });
	};

	$: titlesVisible = scrollValue === 3 || leaving;
	$: leaving = scrollValue === undefined && $scrollY > 2000;
	$: gradient =
		scrollValue === undefined && leaving
			? 0
			: scrollValue === undefined
			? 100
			: 500 - scrollValue * 150;
</script>

<section id="title">
	<Background backgroundId="city" />

	{#if !titlesVisible}
		<div class="gradient" style={`--gradient: ${gradient}%`} transition:fade />
	{/if}

	{#if titlesVisible}
		<div class="titles" transition:fade>
			<h1>{@html hed[$language]}</h1>
			<h2>{@html dek[$language]}</h2>

			{#each bylines as byline}
				<div>{@html byline[$language]}</div>
			{/each}
		</div>
		<button on:click={skip} transition:fade>skip to explore this map</button>
	{/if}
</section>

<style>
	section {
		width: 100%;
		height: 100vh;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		position: relative;
	}

	.gradient {
		height: 100vh;
		width: 100vw;
		position: absolute;
		top: 0;
		background: radial-gradient(white, rgb(255, 255, 255, 0) var(--gradient));
	}

	.titles {
		position: absolute;
		top: 30%;
		width: 100vw;
	}

	h1 {
		font-size: 4em;
	}
	h2 {
		font-size: 2em;
	}

	h1,
	h2,
	div {
		background: white;
		padding: 0 0.4em;
	}

	button {
		position: absolute;
		bottom: 30px;
	}
</style>
