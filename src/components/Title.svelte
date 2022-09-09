<script>
	import City from "$components/City.svelte";
	import copy from "$data/copy.json";
	import { language, inModal } from "$stores/misc.js";
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
	<div
		class="gradient"
		class:visible={!showTitles}
		style={`--gradient: ${$gradient}%`}
	/>

	<City />

	<div class="titles" class:visible={showTitles}>
		<h1>{@html hed[$language]}</h1>
		<h2>{@html dek[$language]}</h2>

		<div class="bylines">
			{#each bylines as byline}
				<div>{@html byline[$language]}</div>
			{/each}
		</div>
	</div>
	<button on:click={skip} class:visible={showTitles}>{buttonText}</button>
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
		z-index: 100;
		height: 100vh;
		width: 100vw;
		position: absolute;
		top: 0;
		background: radial-gradient(white var(--gradient), transparent);
		opacity: 0;
		transition: opacity 1s;
	}

	.titles {
		position: absolute;
		width: 100vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		top: 50%;
		transform: translate(0, -50%);
		opacity: 0;
		transition: opacity 1s;
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
		opacity: 0;
		transition: opacity 1s;
		z-index: 101;
	}

	.visible {
		opacity: 1;
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
