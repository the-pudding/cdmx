<script>
	import {
		freePlaySelection,
		freePlayHover,
		highlightedVendor
	} from "$stores/misc.js";

	export let id;

	$: opacity =
		id === $freePlaySelection ||
		id === $freePlayHover ||
		id === $highlightedVendor
			? 1
			: 0;
</script>

<img
	src={`assets/img/freeplay/${id}.png`}
	alt={`${id} street vendor`}
	class:forward={opacity === 1}
	style:opacity
/>

<style>
	img {
		position: absolute;
		top: 0;
		width: 100%;
		min-width: 1378px;
		z-index: -1;
		transition: opacity 500ms;
	}
	img.forward {
		z-index: 10;
	}
</style>
