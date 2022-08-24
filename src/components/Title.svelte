<script>
	import { base } from "$app/paths";
	import copy from "$data/copy.json";
	import { language } from "$stores/misc.js";

	const { hed, dek, bylines } = copy;

	const skip = () => {
		const el = document.getElementById("scroll-to-explore");
		el.scrollIntoView({ block: "center" });
	};

	$: bgImage = `${base}/assets/img/background/city.jpg`;
</script>

<section id="title" style={`background-image: url(${bgImage})`}>
	<h1>{@html hed[$language]}</h1>
	<h2>{@html dek[$language]}</h2>

	{#each bylines as byline}
		<div>{@html byline[$language]}</div>
	{/each}

	<button on:click={skip}>skip to explore this map</button>
</section>

<style>
	section {
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
		left: 30px;
	}
</style>
