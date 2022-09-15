<script>
	import {
		language,
		inModal,
		inFreePlay,
		ambi,
		ambiVolume,
		soundPlaying
	} from "$stores/misc.js";
	import inView from "$actions/inView.js";

	export let content;
	export let title;
	export let sticky;

	$: buttonText = $language === "english" ? "Explore!" : "¡Explora!";
	$: visible = $inModal;
	$: visible, handleFocus();

	let modalEl;
	const handleFocus = () => {
		if (visible && modalEl) {
			modalEl.focus();
		}
	};

	const startFreePlay = () => {
		$inModal = false;
		$inFreePlay = true;
		$ambi = 1;
		$ambiVolume = 0.05;
		$soundPlaying = undefined;

		sticky.scrollIntoView({ block: "start", inline: "nearest" });
	};
</script>

<section id="modal" class:visible tabindex="-1" bind:this={modalEl}>
	<h2 class="title">{@html title[$language]}</h2>
	<div class="modal-instruction">
		<img
			src={"assets/img/click.png"}
			alt="the mouse clicking an illustration of a street vendor"
		/>
		<p>
			{@html content[$language][0]}
		</p>
	</div>
	<div class="modal-instruction">
		<p>
			{@html content[$language][1]}
		</p>
	</div>
	<div class="modal-instruction column">
		<img src={"assets/img/exit.png"} alt="the page's menu" />
		<p>{@html content[$language][2]}</p>
	</div>

	<button on:click={startFreePlay}>{buttonText}</button>
</section>

<style>
	section {
		width: 90%;
		position: absolute;
		max-width: 450px;
		top: 40%;
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
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.visible {
		opacity: 1;
		z-index: 3000;
	}
	h2 {
		margin: 0;
		text-align: center;
	}
	p {
		font-size: var(--18px);
	}
	.modal-instruction {
		font-family: var(--sans);
		display: flex;
		align-items: center;
		text-align: center;
		margin: 0.5em 0;
		justify-content: center;
	}
	.modal-instruction.column {
		flex-direction: column;
	}
	.modal-instruction p:not(.column p) {
		margin-left: 8px;
	}
	button {
		font-size: 1.5em;
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
