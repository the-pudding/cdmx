<script>
	import { soundOn, ambi, ambiVolume } from "$stores/misc.js";
	import { range } from "d3";

	let controls = false;

	$: console.log("currently playing", $ambi);
</script>

{#each range(3) as i}
	{@const muted = !$soundOn || i + 1 !== $ambi}
	<audio
		src={`assets/sound/ambi/loop${i + 1}.mp3`}
		{muted}
		bind:volume={$ambiVolume}
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
