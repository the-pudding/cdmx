<script>
	import Toggle from "$components/helpers/Toggle.svelte";
	import Icon from "$components/helpers/Icon.svelte";
	import logo from "$svg/logo.svg";
	import {
		entered,
		language,
		soundOn,
		inFreePlay,
		freePlaySelection
	} from "$stores/misc.js";
	import { fade } from "svelte/transition";
	import scrollY from "$stores/scrollY.js";

	$: visible = $entered && $scrollY > 300;
	$: buttonText = $language === "english" ? "exit free play" : "salir";

	const exitFreePlay = () => {
		$inFreePlay = false;
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
		<div class="buttons">
			{#if $inFreePlay}
				<button on:click={exitFreePlay}>{buttonText}</button>
			{/if}

			<button on:click={() => ($soundOn = !$soundOn)}
				>{$soundOn ? "mute" : "unmute"}</button
			>

			<Toggle
				label=""
				style="inner"
				bind:value={$language}
				options={["english", "spanish"]}
				displayOptions={["english", "español"]}
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
		text-decoration: underline;
		border-radius: 0;
	}
	.buttons {
		display: flex;
		align-items: center;
	}
</style>
