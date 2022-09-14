<script>
	import {
		freePlayHover,
		inFreePlay,
		teaching,
		language
	} from "$stores/misc.js";
	import copy from "$data/copy.json";

	export let id;
	export let location;

	$: title =
		id !== "teach"
			? copy.soundBank.filter((d) => d.id === id)[0].title[$language]
			: "";
	$: left = `${Math.max(12, location[0] * 100)}%`;
	$: top = `${location[1] * 100}%`;
	$: translateY = `${location[3] / 2 + 8}px`;
	$: visible =
		id === "teach"
			? $teaching
			: $inFreePlay &&
			  title &&
			  id === $freePlayHover &&
			  (!$teaching || "afilador" !== $freePlayHover);
	$: teachText =
		$language === "english"
			? "Click me to hear my sound!"
			: "¡Hazme clic para escuchar mi sonido!";
	$: previewText =
		$language === "english"
			? "(click to hear me!)"
			: "(¡haz clic para escucharme!)";
</script>

<div
	style:left
	style:top
	style={`--translate-y: ${translateY}`}
	class="preview"
	class:visible
>
	{#if id === "teach"}
		{teachText}
	{:else}
		<strong>{title}</strong>
		<span style={`font-size: 12px`}>{previewText}</span>
	{/if}
</div>

<style>
	.preview {
		position: absolute;
		z-index: -1;
		background: white;
		border: 3px solid var(--color-fg);
		opacity: 0;
		padding: 0.4em;
		transition: opacity 500ms;
		transform: translate(-50%, var(--translate-y));
		min-width: 200px;
		max-width: 300px;
		text-align: center;
	}
	.preview.visible {
		opacity: 1;
		z-index: 100;
	}
</style>
