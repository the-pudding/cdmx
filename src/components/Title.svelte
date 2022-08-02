<script>
	import copy from "$data/copy.json";
	import { language } from "$stores/misc.js";

	const { hed, hed_spanish, dek, dek_spanish, bylines } = copy;
</script>

<section id="title">
	<h1>{$language === "english" ? hed : hed_spanish}</h1>
	<h2>{$language === "english" ? dek : dek_spanish}</h2>

	{#each bylines as { english, spanish }}
		{@const text = $language === "english" ? english : spanish}
		<div>{@html text}</div>
	{/each}
</section>

<style>
	section {
		text-align: center;
	}
</style>
