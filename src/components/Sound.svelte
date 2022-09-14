<script>
	import { soundOn, soundPlaying } from "$stores/misc.js";
	import { tweened } from "svelte/motion";
	import copy from "$data/copy.json";
	import { previous } from "$stores/previous.js";

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

			if (newEl) {
				newEl.currentTime = 0;
				newEl.play();
			}
		} else {
			$volumes = ids.map((d) => 0);
		}
	};

	$: $volumes, setVolumes();
	const setVolumes = () => {
		audioEls.forEach((audioEl, i) => {
			audioEl.volume = $volumes[i];
		});
	};
</script>

{#each ids as id, i}
	{@const muted = !$soundOn}

	<audio
		id={`${id}-audio`}
		bind:this={audioEls[i]}
		src={`assets/sound/${id}.mp3`}
		controls={false}
		loop
		{muted}
	>
		<track kind="captions" />
	</audio>
{/each}
