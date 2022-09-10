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
			{#if !$soundOn}
				<div class="recommend">sound is recommended!</div>
			{/if}

			<button class="mute-button" on:click={() => ($soundOn = !$soundOn)}>
				{#if $soundOn}
					<Icon name="volume-2" width={"1.3em"} height={"1.3em"} />
					<div class="mute-text">mute</div>
				{:else}
					<Icon
						name="volume-x"
						stroke="#893026"
						width={"1.3em"}
						height={"1.3em"}
					/>
					<div class="mute-text">unmute</div>
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
		background: var(--color-gray-100);
	}
	button.mute-button {
		padding: 1em;
		display: flex;
		align-items: center;
	}
	.buttons {
		display: flex;
		align-items: center;
		border: 2px solid black;
		position: relative;
	}
	.mute-text {
		font-size: 14px;
		margin-left: 8px;
	}
	.recommend {
		position: absolute;
		top: 0;
		left: 0;
		background: var(--highlight);
		transform: translate(-50px, 170%) rotate(4deg);
		padding: 0 6px;
		border: 2px solid var(--color-fg);
		color: white;
	}
</style>
