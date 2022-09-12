<script>
	import {
		language,
		inModal,
		inFreePlay,
		ambi,
		ambiVolume
	} from "$stores/misc.js";
	import { fade } from "svelte/transition";
	import Icon from "$components/helpers/Icon.svelte";
	import inView from "$actions/inView.js";

	export let id;
	export let content;
	export let title;
	export let modal;

	$: buttonText = $language === "english" ? "explore!" : "¡explora!";

	const startFreePlay = () => {
		$inModal = false;
		$inFreePlay = true;
		$ambi = 1;
		$ambiVolume = 0.1;

		const el = document.getElementById("scroll-to-explore");
		el.scrollIntoView({ block: "center" });
	};

	const adjustAmbi = () => {
		if (id === "inline1") {
			$ambi = 1;
			$ambiVolume = 0.1;
		}
	};
</script>

<section
	{id}
	class:modal
	transition:fade
	use:inView={{ bottom: 200 }}
	on:enter={adjustAmbi}
>
	<h2 class="title">{@html title[$language]}</h2>
	{#each content as p}
		{@const text = p[$language]}
		<p>{@html text}</p>
	{/each}

	{#if modal}
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
	{/if}
</section>

<style>
	section {
		width: 90%;
		max-width: 700px;
		margin: 5em auto;
		padding: 0 1em;
	}
	.modal {
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
		z-index: 3000;
	}
	.modal h2 {
		margin: 0;
	}
	:not(#free) h2 {
		background: white;
		border: 3px solid var(--color-fg);
		width: fit-content;
		padding: 0.4em;
		transform: rotate(-3deg);
		margin-bottom: 1em;
		margin-left: -10px;
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
			padding: 0;
		}
		h2 {
			text-align: center;
			margin-left: 0px !important;
		}
	}
</style>
