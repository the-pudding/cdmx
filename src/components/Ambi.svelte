<script>
	import { soundOn, ambi, ambiVolume } from "$stores/misc.js";
	import { range } from "d3";

	let audioEls = [];
	let controls = false;

	$: $ambiVolume, transitionVolume();

	const transitionVolume = () => {
		audioEls.forEach((audioEl) => {
			audioEl.volume = $ambiVolume;
		});
	};
</script>

{#each range(3) as i}
	{@const muted = !$soundOn || i + 1 !== $ambi}
	<audio
		bind:this={audioEls[i]}
		src={`assets/sound/ambi/loop${i + 1}.mp3`}
		{muted}
		{controls}
		autoplay
		loop
	>
		<track kind="captions" />
	</audio>
{/each}

<!-- <style>
	audio {
		position: fixed;
	}
	audio:nth-child(2) {
		top: 1em;
	}
	audio:nth-child(3) {
		top: 5em;
	}
	audio:nth-child(4) {
		top: 10em;
	}
</style> -->
