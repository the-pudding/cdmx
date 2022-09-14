<script>
	import Icon from "$components/helpers/Icon.svelte";
	import Buttons from "$components/TopBar.Buttons.svelte";
	import { language, entered } from "$stores/misc.js";
	import copy from "$data/copy.json";
	import { tick } from "svelte";

	$: intro = copy.landing[$language];

	$: buttonText =
		$language === "english"
			? "Start audio story"
			: "Iniciar historia audiovisual";

	const enter = async () => {
		$entered = true;
		await tick();
		const el = document.getElementById("scroll-to-start");
		el.scrollIntoView({ behavior: "smooth", block: "center" });
	};
</script>

<section id="landing">
	<div class="intro">
		{#each intro as text, i}
			<p class:big={i === 0}>{@html text}</p>
		{/each}
	</div>

	<Buttons />

	<button on:click={enter}
		>{buttonText}<span><Icon name="volume-2" /></span></button
	>
</section>

<style>
	section {
		max-width: 700px;
		margin: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 7em;
	}
	.scroll {
		margin-top: 2em;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-family: var(--sans);
		font-size: 1.6em;
		color: var(--highlight);
	}
	.intro {
		margin: 1em;
	}
	.intro,
	.welcome {
		text-align: center;
	}
	button {
		display: flex;
		align-items: center;
		margin-top: 3em;
		padding: 0.5em;
		font-size: 1.6em;
	}
	span {
		display: flex;
		margin-left: 8px;
	}
	.big {
		font-size: 4em;
	}
</style>
