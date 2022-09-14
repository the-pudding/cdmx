<script>
	import { entered } from "$stores/misc.js";
	import wordmark from "$svg/wordmark.svg";
	import scrollY from "$stores/scrollY.js";

	$: visible = !$entered || $scrollY < 30;
</script>

<header>
	<div class="wordmark" class:visible>
		<a href="https://pudding.cool" aria-label="The Pudding">{@html wordmark}</a>
	</div>
</header>

<style>
	header {
		z-index: var(--z-overlay);
		position: fixed;
		top: 0;
		width: 100%;
	}
	.wordmark {
		display: none;
		max-width: 10em;
		margin: 0 auto;
		padding: 1em 0;
	}
	.visible {
		display: block;
	}

	.wordmark a {
		border: none;
		display: block;
		color: var(--color-fg);
	}

	.wordmark a:hover {
		background-color: transparent;
	}

	:global(.wordmark svg path) {
		fill: currentColor;
	}
</style>
