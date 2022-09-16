<script>
	import {
		soundOn,
		ambi,
		ambiVolume,
		entered,
		loadApartment
	} from "$stores/misc.js";
	import { range } from "d3";
	import viewport from "$stores/viewport.js";

	let audioEls = [];

	$: isMobile = $viewport.width < 600;
	$: if ($entered) play();
	$: $ambiVolume, transitionVolume();
	$: $loadApartment, stopAmbi();

	// cut it because we can't re-set the volume lower
	const stopAmbi = () => {
		if (isMobile) {
			audioEls.forEach((audioEl) => {
				audioEl.pause();
			});
		}
	};

	const transitionVolume = () => {
		audioEls.forEach((audioEl) => {
			audioEl.volume = $ambiVolume;
		});
	};

	const play = () => {
		audioEls.forEach((audioEl) => {
			audioEl.play();
		});
	};
</script>

{#each range(3) as i}
	{@const muted = !$soundOn || i + 1 !== $ambi}
	<audio
		bind:this={audioEls[i]}
		src={`assets/sound/ambi/loop${i + 1}.mp3`}
		{muted}
		loop
	/>
{/each}
