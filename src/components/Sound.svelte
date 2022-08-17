<script>
	import { soundOn } from "$stores/misc.js";

	export let src;
</script>

<audio {src} muted={!$soundOn} autoplay loop>
	<!-- TODO: accessibility -->
	<track kind="captions" />
</audio>

<style>
</style>
