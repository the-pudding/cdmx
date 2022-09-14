<script>
	import Icon from "$components/helpers/Icon.svelte";
	import Buttons from "$components/TopBar.Buttons.svelte";
	import { language } from "$stores/misc.js";
	import copy from "$data/copy.json";

	$: intro = copy.landing[$language];
</script>

<section id="landing">
	<div class="intro">
		{#each intro as text, i}
			<p class:big={i === 0}>{@html text}</p>
		{/each}
	</div>

	<Buttons />

	<div class="scroll">
		<p>Scroll to enter</p>
		<Icon
			name="chevrons-down"
			height={"2em"}
			width={"2em"}
			stroke={`var(--highlight)`}
		/>
	</div>
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
	span {
		display: flex;
		margin-left: 8px;
	}
	.big {
		font-size: 4em;
	}
</style>
