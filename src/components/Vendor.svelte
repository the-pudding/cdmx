<script>
	import { fly } from "svelte/transition";

	export let src;
	export let scrollValue;

	const enter = { x: -200, duration: 2000, opacity: 1 };
	const exit = { x: 1000, duration: 5000, opacity: 1 };
</script>

{#key src}
	<img {src} in:fly={enter} out:fly={exit} />
{/key}

<style>
	img {
		height: 200px;
		position: sticky;
		top: 5em;
	}
</style>
