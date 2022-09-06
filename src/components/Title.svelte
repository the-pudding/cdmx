<script>
	import City from "$components/City.svelte";
	import copy from "$data/copy.json";
	import { language, inModal } from "$stores/misc.js";
	import scrollY from "$stores/scrollY.js";
	import { fade } from "svelte/transition";
	import { tweened } from "svelte/motion";
	import { cubicOut } from "svelte/easing";

	export let scrollValue;

	const { hed, dek, bylines } = copy;

	const skip = () => {
		const el = document.getElementById("scroll-to-explore");
		el.scrollIntoView({ block: "center" });
	};

	// $: panelWidth =
	// 	scrollValue === undefined && $scrollY < 1000
	// 		? 0
	// 		: scrollValue === undefined
	// 		? 100
	// 		: 25 * (scrollValue + 1);
	// $: faded = panelWidth !== 100
	$: panelWidth = 100;
	$: faded = $gradient > 0;

	$: titlesVisible = scrollValue === 3 || leaving;
	$: leaving = scrollValue === undefined && $scrollY > 2000;
	$: buttonText =
		$language === "english" ? "skip to explore this map" : "ir directo al mapa";

	const gradient = tweened(100, { duration: 800, easing: cubicOut });
	$: scrollValue, updateGradient();

	const updateGradient = () => {
		if (scrollValue === undefined && leaving) {
			$gradient = 0;
		} else if (scrollValue === undefined) {
			$gradient = 100;
		} else {
			$gradient = 100 - (scrollValue + 1) * 25;
		}
	};
</script>

<div id="title">
	{#if !titlesVisible}
		<div class="gradient" style={`--gradient: ${$gradient}%`} out:fade />
	{/if}

	<div class="panel-wrapper" style:width={`${panelWidth}%`} class:faded>
		<City />
	</div>

	{#if titlesVisible}
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
	}

	.panel-wrapper {
		opacity: 1;
		overflow: hidden;
		transition: all 1s;
	}
	.faded {
		opacity: 0.7;
	}

	.titles {
		position: absolute;
		top: 30%;
		width: 100vw;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	h1 {
		font-size: 5em;
		transform: rotate(2deg);
	}
	h2 {
		font-size: 2em;
		transform: rotate(-1deg);
		max-width: 600px;
	}
	h1,
	h2,
	.bylines {
		background: white;
		padding: 0 0.4em;
		border: 2px solid var(--color-fg);
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
</style>
