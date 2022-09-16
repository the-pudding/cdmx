<script>
	import {
		soundOn,
		ambi,
		ambiVolume,
		entered,
		loadApartment,
		ios
	} from "$stores/misc.js";
	import { range } from "d3";
	import viewport from "$stores/viewport.js";

	let audioEl;

	export const enter = () => {
		play();
	};

	$: $ambiVolume, transitionVolume();
	$: if ($loadApartment) {
		if ($ios) pause();
		else ambiVolume.set(0, { duration: 1000 });
	}

	const transitionVolume = () => {
		if (!$entered || $ios) return;
		audioEl.volume = $ambiVolume;
	};

	const pause = () => {
		if (audioEl) audioEl.pause();
	};

	const play = () => {
		if (audioEl?.paused) {
			audioEl.volume = 0;
			audioEl.play();
		}
	};
</script>

<audio
	bind:this={audioEl}
	src={`assets/sound/ambi/loop1${$ios ? "-ios" : ""}.mp3`}
	muted={!$soundOn}
	loop
/>
