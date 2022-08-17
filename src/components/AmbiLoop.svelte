<script>
	import { soundOn } from "$stores/misc.js";

	export let sounds;
	export let scrollValue;

	$: console.log({ scrollValue });
</script>

{#each sounds as src, i}
	{@const muted = !$soundOn || i !== scrollValue}
	<audio controls {src} {muted} autoplay loop>
		<!-- TODO: accessibility -->
		<track kind="captions" />
	</audio>
{/each}

<style>
	audio {
		position: fixed;
	}
	audio:nth-child(1) {
		top: 1em;
	}
	audio:nth-child(2) {
		top: 5em;
	}
	audio:nth-child(3) {
		top: 10em;
	}
</style>
