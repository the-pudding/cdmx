<script>
	import {
		language,
		inModal,
		inFreePlay,
		ambi,
		ambiVolume
	} from "$stores/misc.js";
	import Icon from "$components/helpers/Icon.svelte";

	export let content;
	export let title;

	$: buttonText = $language === "english" ? "explore!" : "¡explora!";
	$: visible = $inModal;
	$: visible, handleFocus();

	let modalEl;
	// let lastFocusedEl;
	const handleFocus = () => {
		if (visible && modalEl) {
			// lastFocusedEl = document.activeElement;
			modalEl.focus();
		}
		//else if (lastFocusedEl) {
		// lastFocusedEl.focus();
		//}
	};

	const startFreePlay = () => {
		$inModal = false;
		$inFreePlay = true;
		$ambi = 1;
		$ambiVolume = 0.1;

		const el = document.getElementById("scroll-to-explore");
		el.scrollIntoView({ block: "center" });
	};
</script>

<section id="modal" class:visible tabindex="-1" bind:this={modalEl}>
	<h2 class="title">{@html title[$language]}</h2>
	{#each content as p}
		{@const text = p[$language]}
		<p>{@html text}</p>
	{/each}

	<div class="modal-instructions">
		<p>You can:</p>
		<ul>
			<li><Icon name="zoom-in" /><span>Zoom</span></li>
			<li>
				<Icon name="mouse-pointer" /><span>Click & drag to pan around</span>
			</li>
		</ul>
	</div>

	<button on:click={startFreePlay}>{buttonText}</button>
</section>

<style>
	section {
		width: 90%;
		position: absolute;
		max-width: 450px;
		top: 50%;
		left: 50%;
		margin: 0;
		transform: translate(-50%, -50%);
		background: white;
		border: 3px solid var(--color-fg);
		padding: 1em 1.5em;
		box-shadow: 0 3px 7px rgb(0 0 0 / 30%);
		opacity: 0;
		z-index: -1;
		transition: opacity 500ms;
	}
	.visible {
		opacity: 1;
		z-index: 3000;
	}
	h2 {
		margin: 0;
	}
	p {
		font-size: var(--18px);
	}
	.modal-instructions {
		font-family: var(--sans);
	}
	.modal-instructions p {
		text-decoration: underline;
		margin: 0;
	}
	.modal-instructions ul {
		margin-bottom: 16px;
	}
	.modal-instructions span {
		margin-left: 4px;
	}

	@media only screen and (max-width: 600px) {
		section {
			margin: 5em auto;
		}
		h2 {
			text-align: center;
			margin-left: 0px !important;
		}
	}
</style>
