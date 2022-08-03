<script>
	import { fly } from "svelte/transition";

	export let src;
	export let scrollValue;
</script>

<img
	{src}
	in:fly={{ x: -200, duration: 2000, opacity: 1 }}
	out:fly={{ x: 1000, duration: 5000, opacity: 1 }}
/>

<style>
	img {
		height: 200px;
		position: sticky;
		top: 5em;
	}
</style>
