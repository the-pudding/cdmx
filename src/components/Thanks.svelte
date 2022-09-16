<script>
	import { language } from "$stores/misc.js";

	export let title;
	export let content;
</script>

<section id="thanks">
	<div class="wrapper">
		<!-- <h2 class="title">{@html title[$language]}</h2> -->
		<p style="margin-bottom: 2em">{@html content[0][$language]}</p>

		<p style="font-weight: bold">With thanks to:</p>
		{#each content.slice(1, content.length - 1) as p}
			{@const text = p[$language]}
			<p>{@html text}</p>
		{/each}

		<p style="margin-top: 2em">
			{@html content[content.length - 1][$language]}
		</p>
	</div>
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
