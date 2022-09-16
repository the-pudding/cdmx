<script>
	import Icon from "$components/helpers/Icon.svelte";
	import {
		freePlaySelection,
		language,
		browserZoom,
		soundPlaying
	} from "$stores/misc.js";
	import copy from "$data/copy.json";
	import viewport from "$stores/viewport.js";

	const ids = copy.soundBank.map((d) => d.id);
	let expanded = false;

	$: vendor = copy.soundBank.filter((d) => d.id === $freePlaySelection);

	$: isMobile = $viewport.width < 600;
	$: description = vendor.length ? vendor[0].description[$language] : null;
	$: extra =
		vendor.length && vendor[0].extra ? vendor[0].extra[$language] : null;
	$: title = vendor.length ? vendor[0].title[$language] : "";
	$: titleOpposite = vendor.length
		? vendor[0].title[$language === "english" ? "spanish" : "english"]
		: "";
	$: visible = description && title;
	$: visible, handleFocus();
	$: zoomed = $browserZoom > 200;
	$: summaryText = $language === "english" ? "Read more" : "Lee mas";

	let modalEl;
	let lastFocusedEl;
	const handleFocus = () => {
		expanded = false;
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
		expanded = false;
	};

	const goPrevious = () => {
		expanded = false;
		const current = ids.findIndex((d) => d === $freePlaySelection);
		const p = current - 1 >= 0 ? current - 1 : ids.length - 1;
		$freePlaySelection = ids[p];
		$soundPlaying = ids[p];
	};
	const goNext = () => {
		expanded = false;
		const current = ids.findIndex((d) => d === $freePlaySelection);
		const n = current + 1 < ids.length ? current + 1 : 0;
		$freePlaySelection = ids[n];
		$soundPlaying = ids[n];
	};
</script>

<div
	class="description"
	class:visible
	class:zoomed
	class:expanded
	bind:this={modalEl}
>
	<div class="title-row">
		<button on:click={goPrevious}><Icon name="arrow-left" /></button>
		<div class="titles">
			<h3>{@html title}</h3>
			{#if $language === "english"}<p class="opposite">
					{@html titleOpposite}
				</p>{/if}
		</div>
		<button on:click={goNext}><Icon name="arrow-right" /></button>
	</div>

	<p>{@html description}</p>

	{#if extra}
		<details>
			<summary>{summaryText}</summary>
			<p class="extra">{@html extra}</p>
		</details>
	{/if}

	<div class="close-minimize">
		<button class="expand" on:click={() => (expanded = !expanded)}>
			<Icon name={expanded ? "minimize-2" : "maximize-2"} />
		</button>
		<button class="close" aria-label="close" on:click={close}
			><Icon name="x" /></button
		>
	</div>
</div>

<style>
	.opposite {
		color: var(--highlight);
		font-style: italic;
	}
	h3 {
		margin-bottom: 0;
	}
	.titles {
		margin-bottom: 1em;
	}

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
	.close,
	.expand {
		border-radius: 0;
		border: none;
		background: transparent;
	}
	.close-minimize {
		position: absolute;
		right: 0;
		top: 0;
		display: flex;
	}
	.expand {
		display: none;
	}

	@media only screen and (max-width: 600px) {
		.description {
			width: 98%;
			bottom: 30px;
			max-height: 250px;
			overflow: hidden;
		}
		.description:not(.expanded):after {
			content: "";
			background-image: linear-gradient(
				to top,
				rgba(255, 255, 255, 1),
				rgba(255, 255, 255, 0)
			);
			position: absolute;
			height: 100px;
			right: 0;
			bottom: 0;
			left: 0;
		}
		.expand {
			display: block;
		}
		.expanded {
			max-height: none;
		}
		h3 {
			margin-left: 12px;
			margin-right: 12px;
		}
	}
</style>
