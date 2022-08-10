<script>
	import Toggle from "$components/helpers/Toggle.svelte";
	import Landing from "$components/Landing.svelte";
	import Scroll from "$components/Scroll.svelte";
	import Title from "$components/Title.svelte";
	import copy from "$data/copy.json";
	import { entered, language, soundOn } from "$stores/misc.js";

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
		options={["english", "spanish"]}
		displayOptions={["english", "español"]}
	/>
</section>

<Landing />

{#if $entered}
	<Scroll
		id="intro"
		steps={copy.preTitleProse}
		fontSize={"1.5em"}
		textBg={false}
	/>
	<Title />
	<Scroll id="main" steps={copy.postTitleProse} />
{/if}

<style>
	#top-bar {
		position: fixed;
		right: 10px;
		top: 10px;
		z-index: 2000;
		display: flex;
	}
</style>
