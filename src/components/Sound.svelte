<script>
	import { soundOn, ambiLoopTime } from "$stores/misc.js";
	import { onDestroy, onMount } from "svelte";
	import { tweened } from "svelte/motion";

	export let src;
	export let ambiLoop = false;
	// export let fadeIn = true;
	// export let fadeOut = true;

	let time;
	let audioEl;
	// let volume = tweened(0, { duration: 1000 });
	// $: if (audioEl) audioEl.volume = $volume;

	onMount(() => {
		const startTime = $ambiLoopTime;
		time = startTime;
		// $volume = 1;
	});

	onDestroy(() => {
		$ambiLoopTime = time;
		// $volume = 0;
	});
</script>

<div class="temp">
	<audio
		bind:this={audioEl}
		bind:currentTime={time}
		controls
		{src}
		muted={!$soundOn}
		autoplay
		loop
	>
		<!-- TODO: accessibility -->
		<track kind="captions" />
	</audio>
	<!-- <p>volume: {$volume}</p> -->
</div>

<style>
	audio {
		/* display: block; */
	}
	.temp {
		position: fixed;
		top: 0;
	}
</style>
