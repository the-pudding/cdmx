<script>
	import Sound from "$components/Sound.svelte";
	import copy from "$data/copy.json";
	import {
		freePlaySelection,
		freePlayHover,
		highlightedVendor,
		locations,
		inFreePlay,
		language
	} from "$stores/misc.js";
	import viewport from "$stores/viewport.js";

	const ids = copy.soundBank.map((d) => d.id);

	$: isMobile = $viewport.width < 600;
	$: src = $freePlaySelection
		? `assets/sound/${$freePlaySelection}.mp3`
		: undefined;

	const onClick = (e) => {
		if ($inFreePlay) {
			const clickedId = e.target.id.replace("-button", "");
			$freePlaySelection = clickedId;
			$freePlayHover = undefined;
		}
	};
	const onButtonHover = (e) => {
		if ($inFreePlay && !$freePlaySelection && !isMobile)
			$freePlayHover = e.target.id.replace("-button", "");
	};
	const onButtonLeave = () => {
		if ($inFreePlay && !isMobile) $freePlayHover = undefined;
	};

	// TODO: translate "click to hear me"
</script>

{#each ids as id}
	{@const left = `${$locations[id][0] * 100}%`}
	{@const top = `${$locations[id][1] * 100}%`}
	{@const width = `${$locations[id][2]}px`}
	{@const height = `${$locations[id][3]}px`}
	{@const title = copy.soundBank.filter((d) => d.id === id)[0].title[$language]}

	{@const imgVisible =
		id === $freePlaySelection ||
		id === $freePlayHover ||
		id === $highlightedVendor}
	{@const previewVisible = $inFreePlay && title && id === $freePlayHover}
	{@const buttonExists = $inFreePlay}

	{#if $locations[id]}
		<img src={`assets/img/freeplay/${id}.png`} class:visible={imgVisible} />

		{#if !isMobile}
			<div
				style:left
				style:top
				style={`--translate-y: ${$locations[id][3] / 2 + 8}px`}
				class="preview"
				class:visible={previewVisible}
			>
				<strong>{title}</strong>
				<span style={`font-size: 12px`}>(click to hear me!)</span>
			</div>
		{/if}

		<button
			id={`${id}-button`}
			class:visible={buttonExists}
			on:click|stopPropagation={onClick}
			on:mouseenter={onButtonHover}
			on:mouseleave={onButtonLeave}
			style:left
			style:top
			style:width
			style:height
		/>
	{/if}
{/each}

{#if src}
	{#key src}
		<Sound {src} />
	{/key}
{/if}

<style>
	img {
		position: absolute;
		top: 0;
		width: 100%;
		min-width: 1378px;
		opacity: 0;
		z-index: -1;
		transition: opacity 500ms;
	}
	img.visible {
		opacity: 1;
		z-index: 10;
	}

	button {
		position: absolute;
		background: transparent;
		/* background: rgb(0, 0, 0, 0.5); */
		transform: translate(-50%, -50%);
		border: none;
		border-radius: 50px;
		z-index: 11;
		display: none;
	}
	button.visible {
		display: block;
	}

	.preview {
		position: absolute;
		z-index: -1;
		background: white;
		border: 3px solid var(--color-fg);
		opacity: 0;
		padding: 0.4em;
		transition: opacity 500ms;
		transform: translate(-50%, var(--translate-y));
		max-width: 300px;
		text-align: center;
	}
	.preview.visible {
		opacity: 1;
		z-index: 100;
	}
</style>
