<script>
	import { soundOn } from "$stores/misc.js";

	export let sounds;
	export let scrollValue;

	let controls = false;
</script>

{#each sounds as src, i}
	{@const muted = !$soundOn || i !== scrollValue}
	<audio {src} {muted} {controls} autoplay loop>
		<!-- TODO: accessibility -->
		<track kind="captions" />
	</audio>
{/each}

<style>
	/* audio {
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
	} */
</style>
