<script>
	import { soundOn, ambi, ambiVolume, entered } from "$stores/misc.js";
	import { range } from "d3";

	let audioEls = [];

	$: if ($entered) play();
	$: $ambiVolume, transitionVolume();

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
