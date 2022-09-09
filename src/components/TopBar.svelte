<script>
	import Toggle from "$components/helpers/Toggle.svelte";
	import Icon from "$components/helpers/Icon.svelte";
	import logo from "$svg/logo.svg";
	import {
		entered,
		language,
		soundOn,
		inFreePlay,
		inModal,
		freePlaySelection
	} from "$stores/misc.js";
	import { fade } from "svelte/transition";
	import scrollY from "$stores/scrollY.js";

	$: visible = $entered && $scrollY > 300;
	$: buttonText = $language === "english" ? "exit free play" : "salir";

	// TODO: i think i do want a volume symbol (volume-x = muted, volume-2 = sound on)
	// TODO: when muted, flash in some way, or "this piece is best with sound!"

	const exitFreePlay = () => {
		$inFreePlay = false;
		$inModal = true;
		$freePlaySelection = undefined;
	};
</script>

<section id="top-bar">
	{#if visible}
		<div class="logo" transition:fade>
			<a href="https://pudding.cool" aria-label="The Pudding">{@html logo}</a>
		</div>
	{/if}

	<div class="logo invisible">
		<a href="https://pudding.cool" aria-label="The Pudding">{@html logo}</a>
	</div>

	{#if visible}
		<div class="buttons" transition:fade>
			<button
				class="mute-button"
				class:muted={!$soundOn}
				on:click={() => ($soundOn = !$soundOn)}
			>
				{#if $soundOn}
					<Icon name="volume-x" />
				{:else}
					<Icon name="volume-2" />
				{/if}
			</button>

			{#if $inFreePlay}
				<button class="exit" on:click={exitFreePlay}>{buttonText}</button>
			{/if}

			<Toggle
				label=""
				style="inner"
				bind:value={$language}
				options={["english", "spanish"]}
				displayOptions={["english", "español"]}
				borderless={true}
			/>
		</div>
	{/if}
</section>

<style>
	#top-bar {
		position: fixed;
		width: 100%;
		display: flex;
		justify-content: space-between;
		right: 10px;
		top: 10px;
		z-index: 100;
	}
	.invisible {
		visibility: hidden;
	}
	.logo {
		width: 35px;
		margin-left: 24px;
	}
	.logo a {
		border: none;
		display: block;
		color: var(--color-fg);
	}
	button {
		border: none;
		background: white;
		border-radius: 0;
		height: 100%;
	}
	button:hover {
		background: #d9e8ed;
	}
	button.mute-button {
		width: 75px;
	}
	.muted {
		background: #e2a0a0;
	}
	.buttons {
		display: flex;
		align-items: center;
		border: 2px solid black;
	}
</style>
