<script>
	import Icon from "$components/helpers/Icon.svelte";
	import { freePlaySelection, language } from "$stores/misc.js";
	import copy from "$data/copy.json";

	const ids = copy.soundBank.map((d) => d.id);

	$: vendor = copy.soundBank.filter((d) => d.id === $freePlaySelection);

	$: description = vendor.length ? vendor[0].description[$language] : null;
	$: extra =
		vendor.length && vendor[0].extra ? vendor[0].extra[$language] : null;
	$: title = vendor.length ? vendor[0].title[$language] : null;

	const close = () => {
		$freePlaySelection = undefined;
	};

	const goPrevious = () => {
		const current = ids.findIndex((d) => d === $freePlaySelection);
		const p = current - 1 >= 0 ? current - 1 : ids.length - 1;
		$freePlaySelection = ids[p];
	};
	const goNext = () => {
		const current = ids.findIndex((d) => d === $freePlaySelection);
		const n = current + 1 < ids.length ? current + 1 : 0;
		$freePlaySelection = ids[n];
	};
</script>

<div class="description" class:visible={description && title}>
	<div class="title-row">
		<button on:click={goPrevious}>{"<"}</button>
		<h3>{@html title}</h3>
		<button on:click={goNext}>{">"}</button>
	</div>

	<p>{@html description}</p>

	{#if extra}
		<p class="extra">{@html extra}</p>
	{/if}

	<button class="close" on:click={close}><Icon name="x" /></button>
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
	}
	.extra {
		font-style: italic;
		margin-top: 12px;
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
