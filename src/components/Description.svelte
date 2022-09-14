<script>
	import Icon from "$components/helpers/Icon.svelte";
	import {
		freePlaySelection,
		language,
		browserZoom,
		soundPlaying
	} from "$stores/misc.js";
	import copy from "$data/copy.json";

	const ids = copy.soundBank.map((d) => d.id);

	$: vendor = copy.soundBank.filter((d) => d.id === $freePlaySelection);

	$: description = vendor.length ? vendor[0].description[$language] : null;
	$: extra =
		vendor.length && vendor[0].extra ? vendor[0].extra[$language] : null;
	$: title = vendor.length ? vendor[0].title[$language] : "";
	$: visible = description && title;
	$: visible, handleFocus();
	$: zoomed = $browserZoom > 200;

	let modalEl;
	let lastFocusedEl;
	const handleFocus = () => {
		if (visible && modalEl) {
			lastFocusedEl = document.activeElement;
			modalEl.focus();
		} else if (lastFocusedEl) {
			lastFocusedEl.focus();
		}
	};

	const close = () => {
		$freePlaySelection = undefined;
		$soundPlaying = undefined;
	};

	const goPrevious = () => {
		const current = ids.findIndex((d) => d === $freePlaySelection);
		const p = current - 1 >= 0 ? current - 1 : ids.length - 1;
		$freePlaySelection = ids[p];
		$soundPlaying = ids[p];
	};
	const goNext = () => {
		const current = ids.findIndex((d) => d === $freePlaySelection);
		const n = current + 1 < ids.length ? current + 1 : 0;
		$freePlaySelection = ids[n];
		$soundPlaying = ids[n];
	};
</script>

<div class="description" class:visible class:zoomed bind:this={modalEl}>
	<div class="title-row">
		<button on:click={goPrevious}><Icon name="arrow-left" /></button>
		<h3>{@html title}</h3>
		<button on:click={goNext}><Icon name="arrow-right" /></button>
	</div>

	<p>{@html description}</p>

	{#if extra}
		<details>
			<summary>Fun fact</summary>
			<p class="extra">{@html extra}</p>
		</details>
	{/if}

	<button class="close" aria-label="close" on:click={close}
		><Icon name="x" /></button
	>
</div>

<style>
	.description {
		position: absolute;
		width: 75%;
		max-width: 1000px;
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
	.title-row {
		display: flex;
		align-items: center;
		justify-content: space-evenly;
	}
	h3 {
		font-weight: bold;
	}
	p {
		margin: 0;
		font-size: var(--18px);
	}
	.zoomed p,
	.zoomed details {
		font-size: var(--12px);
	}
	.zoomed h3 {
		font-size: var(--16px);
	}
	details {
		margin-top: 12px;
	}
	summary {
		color: var(--highlight);
	}
	summary:hover {
		cursor: pointer;
	}
	.extra {
		font-style: italic;
		font-size: var(--16px);
	}
	.close {
		position: absolute;
		right: 0;
		top: 0;
		border-radius: 0;
		border: none;
		background: transparent;
	}

	@media only screen and (max-width: 600px) {
		.description {
			width: 98%;
			bottom: 4px;
		}
		h3 {
			margin-left: 12px;
			margin-right: 12px;
		}
	}
</style>
