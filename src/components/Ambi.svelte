<script>
	import { soundOn, ambi, ambiVolume } from "$stores/misc.js";
	import { range } from "d3";

	let audioEls = [];

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
		controls={false}
		autoplay
		loop
	/>
{/each}
