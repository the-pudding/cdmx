<script>
	import { soundOn, soundPlaying } from "$stores/misc.js";
	import { tweened } from "svelte/motion";
	import { previous } from "$stores/previous.js";
	import copy from "$data/copy.json";
	import viewport from "$stores/viewport.js";

	$: isMobile = $viewport.width < 600;

	const ids = [...copy.soundBank.map((d) => d.id), "toreros", "tacos"];

	const prevSound = previous(soundPlaying);

	let audioEls = [];
	let newEl;

	let newI;
	let prevI;

	const volumes = tweened(
		ids.map((d) => 0),
		{ duration: 3000 }
	);

	$: $soundPlaying, setupSound();
	const setupSound = () => {
		newEl = audioEls.filter(
			(d) => d.id.replace("-audio", "") === $soundPlaying
		)[0];
		newI = audioEls.findIndex(
			(d) => d.id.replace("-audio", "") === $soundPlaying
		);
		prevI = audioEls.findIndex(
			(d) => d.id.replace("-audio", "") === $prevSound
		);
		if ($soundPlaying) {
			let updatedVolumes = ids.map((d) => 0);
			if (newI !== -1) updatedVolumes.splice(newI, 1, 1);
			if (prevI !== -1) updatedVolumes.splice(prevI, 1, 0);
			$volumes = updatedVolumes;

			if (isMobile) {
				const others = audioEls.filter((d) => d !== newEl);
				others.forEach((d) => {
					d.pause();
				});
			}

			if (newEl) {
				newEl.currentTime = 0;
				newEl.play();
			}
		} else {
			$volumes = ids.map((d) => 0);

			if (isMobile) {
				audioEls.forEach((d) => {
					d.pause();
				});
			}
		}
	};

	$: $volumes, setVolumes();
	const setVolumes = () => {
		if (!isMobile) {
			audioEls.forEach((audioEl, i) => {
				audioEl.volume = $volumes[i];
			});
		}
	};
</script>

<div class="fixed">
	{#each ids as id, i}
		{@const muted = !$soundOn}

		<audio
			id={`${id}-audio`}
			bind:this={audioEls[i]}
			src={`assets/sound/${id}.mp3`}
			loop
			{muted}
		/>
	{/each}
</div>

<style>
</style>
