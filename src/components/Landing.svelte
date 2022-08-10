<script>
	import { language, entered } from "$stores/misc.js";
	import copy from "$data/copy.json";
	import { tick } from "svelte";

	$: intro = copy.landing[$language];

	const enter = async () => {
		$entered = true;
		await tick();
		const el = document.getElementById("scroll-to-start");
		el.scrollIntoView({ behavior: "smooth", block: "center" });
	};
</script>

<section id="landing">
	<div class="intro">
		{#each intro as text}
			<p>{@html text}</p>
		{/each}
	</div>

	<div class="buttons">
		<button on:click={enter}>let's go!</button>
	</div>

	<!-- {#if !$language}
		<div class="buttons">
			{#each ["english", "spanish"] as l}
				{@const selected = $language === l}
				{@const onClick = () => {
					$language = l;
					scrollToStart();
				}}
				<button on:click={onClick} class:selected
					>{l === "spanish" ? "español" : l}</button
				>
			{/each}
		</div>
	{/if} -->
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
	.intro,
	.welcome {
		text-align: center;
	}
	.buttons {
		margin: 3em 0;
		min-width: 35%;
		display: flex;
		justify-content: space-evenly;
	}
	:global(button) {
		background: white;
		border: 1px solid var(--button-outline);
		border-radius: 4px;
	}
	:global(button:hover) {
		background: var(--color-gray-100);
	}
	.selected {
		background: var(--color-gray-100);
	}
</style>
