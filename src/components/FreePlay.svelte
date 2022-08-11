<script>
	import copy from "$data/copy.json";
	import { language } from "$stores/misc.js";
</script>

<section id="free">
	{#each copy.freePlay as p}
		{@const text = p[$language]}
		<p>{@html text}</p>
	{/each}
</section>

<style>
</style>
