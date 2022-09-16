<script>
	import { soundOn, soundPlaying, ios } from "$stores/misc.js";
	import { tweened } from "svelte/motion";
	import { previous } from "$stores/previous.js";
	import copy from "$data/copy.json";
	import viewport from "$stores/viewport.js";

	const ids = [...copy.soundBank.map((d) => d.id), "toreros", "tacos"];

	const soundPrevious = previous(soundPlaying);

	let audioEls = {};

	const volumeCurrent = tweened(0, { duration: 2000 });
	const volumePrevious = tweened(0, { duration: 2000 });

	const play = () => {
		// fade in new one
		if ($soundPlaying) {
			const el = audioEls[$soundPlaying];
			if (el?.paused) {
				if (!$ios) el.volume = 0;
				el.play();
				if (!$ios) volumeCurrent.set(0.75);
			}
		}

		// everything else hard stop in case it was previously fading
		Object.keys(audioEls).forEach((id) => {
			const notActive = ![$soundPrevious, $soundPlaying].includes(id);
			if (notActive) audioEls[id].pause();
		});

		// fade out old one
		if ($soundPrevious) {
			const el = audioEls[$soundPrevious];
			if (!el?.paused) {
				if ($ios) el.pause();
				else {
					volumePrevious.set(1, { duration: 0 });
					volumePrevious.set(0, { duration: 2000 });
				}
			}
		}
	};

	$: play($soundPlaying);

	$: if (audioEls[$soundPlaying])
		audioEls[$soundPlaying].volume = $volumeCurrent;
	$: if (audioEls[$soundPrevious])
		audioEls[$soundPrevious].volume = $volumePrevious;
	$: if ($volumePrevious === 0 && audioEls[$soundPrevious]) {
		audioEls[$soundPrevious].pause();
		audioEls[$soundPrevious].currentTime = 0;
	}
</script>

<div class="fixed">
	{#each ids as id, i}
		{@const muted = !$soundOn}

		<audio
			id={`${id}-audio`}
			bind:this={audioEls[id]}
			src={`assets/sound/${id}.mp3`}
			loop
			{muted}
		/>
	{/each}
</div>

<style>
</style>
