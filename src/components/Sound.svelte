<script>
	import { soundOn } from "$stores/misc.js";
	import { onMount } from "svelte";
	import { tweened } from "svelte/motion";

	export let src;

	let audioEl;
	const volume = tweened(0, { duration: 2000 });

	$: $volume, transitionVolume();

	const transitionVolume = () => {
		if (audioEl) audioEl.volume = $volume;
	};

	onMount(() => {
		$volume = 1;
	});
</script>

<audio bind:this={audioEl} {src} muted={!$soundOn} autoplay loop>
	<!-- TODO: accessibility -->
	<track kind="captions" />
</audio>

<style>
</style>
