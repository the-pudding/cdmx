<script>
	import Toggle from "$components/helpers/Toggle.svelte";
	import logo from "$svg/logo.svg";
	import { entered, language, soundOn, inFreePlay } from "$stores/misc.js";
	import { fade } from "svelte/transition";
	import scrollY from "$stores/scrollY.js";

	$: logoVisible = $entered && $scrollY > 300;

	const exitFreePlay = () => {
		$inFreePlay = false;
	};
</script>

<section id="top-bar">
	{#if logoVisible}
		<div class="logo" transition:fade>
			<a href="https://pudding.cool" aria-label="The Pudding">{@html logo}</a>
		</div>
	{/if}
	<div class="logo invisible">
		<a href="https://pudding.cool" aria-label="The Pudding">{@html logo}</a>
	</div>

	<div class="buttons">
		<button on:click={() => ($soundOn = !$soundOn)}
			>{$soundOn ? "mute" : "unmute"}</button
		>
		<button on:click={exitFreePlay}>exit free play</button>
		<Toggle
			label=""
			style="inner"
			bind:value={$language}
			options={["english", "spanish"]}
			displayOptions={["english", "español"]}
		/>
	</div>
</section>

<style>
	#top-bar {
		position: fixed;
		width: 100%;
		display: flex;
		justify-content: space-between;
		right: 10px;
		top: 10px;
		z-index: 2000;
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
	.buttons {
		display: flex;
		align-items: center;
	}
</style>
