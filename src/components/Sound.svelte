<script>
	import { soundOn } from "$stores/misc.js";

	export let src;
</script>

<div>
	<audio {src} muted={!$soundOn} controls autoplay loop>
		<!-- TODO: accessibility -->
		<track kind="captions" />
	</audio>
</div>

<style>
	audio {
		display: block;
	}
</style>
