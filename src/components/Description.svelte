<script>
	import Icon from "$components/helpers/Icon.svelte";
	import { freePlaySelection, language } from "$stores/misc.js";
	import copy from "$data/copy.json";

	$: vendor = copy.soundBank.filter((d) => d.id === $freePlaySelection);

	$: description = vendor.length ? vendor[0].description[$language] : null;
	$: title = vendor.length ? vendor[0].title[$language] : null;

	const close = () => {
		$freePlaySelection = undefined;
	};
</script>

<div class="description" class:visible={description && title}>
	<h3>{@html title}</h3>
	<p>{@html description}</p>
	<button class="close" on:click={close}><Icon name="x" /></button>
</div>

<style>
	.description {
		position: absolute;
		width: 75%;
		opacity: 0;
		left: 50%;
		transform: translate(-50%, 0);
		bottom: 2em;
		text-align: center;
		border: 3px solid var(--color-fg);
		padding: 1em;
		background: white;
		transition: opacity 500ms;
	}
	.visible {
		opacity: 1;
	}
	h3 {
		font-weight: bold;
	}
	p {
		margin: 0;
	}
	.close {
		position: absolute;
		right: -15px;
		top: -15px;
		border: 3px solid black;
		border-radius: 0;
	}
</style>
