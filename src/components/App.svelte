<script>
	import Toggle from "$components/helpers/Toggle.svelte";
	import Scroll from "$components/Scroll.svelte";
	import Title from "$components/Title.svelte";
	import copy from "$data/copy.json";
	import { language, soundOn } from "$stores/misc.js";

	$: console.log({ copy });
</script>

<section id="top-bar">
	<button on:click={() => ($soundOn = !$soundOn)}
		>{$soundOn ? "mute" : "sound on"}</button
	>
	<Toggle
		label=""
		style="inner"
		bind:value={$language}
		options={["english", "español"]}
	/>
</section>

<Scroll steps={copy.preTitleProse} />
<Title />
<Scroll steps={copy.postTitleProse} />

<style>
	#top-bar {
		position: fixed;
		right: 10px;
		top: 10px;
		z-index: 2000;
		display: flex;
	}
</style>
