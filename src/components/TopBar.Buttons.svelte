<script>
	import Toggle from "$components/helpers/Toggle.svelte";
	import Icon from "$components/helpers/Icon.svelte";
	import {
		soundOn,
		userMuted,
		inFreePlay,
		language,
		inModal,
		freePlaySelection,
		soundPlaying,
		ambiVolume
	} from "$stores/misc.js";
	import { fade } from "svelte/transition";

	$: buttonText = $language === "english" ? "exit free play" : "salir";
	$: muteText = $language === "english" ? "mute" : "silenciar";
	$: unmuteText = $language === "english" ? "unmute" : "activar sonido";
	$: recommendText =
		$language === "english"
			? "sound is recommended!"
			: "¡recomendamos activar el sonido!";

	const exitFreePlay = () => {
		$inFreePlay = false;
		$inModal = true;
		$freePlaySelection = undefined;
		$soundPlaying = undefined;
		$ambiVolume = 0.1;

		// make sure modal is in view, steps are not
		const goTo = document.getElementById("spacer-end");
		goTo.scrollIntoView({ block: "start", inline: "nearest" });
	};

	const onMuteClick = () => {
		$userMuted = !$userMuted;
		$soundOn = !$soundOn;
	};
</script>

<div class="buttons" transition:fade>
	{#if !$soundOn}
		<div class="recommend">{recommendText}</div>
	{/if}

	<button class="mute-button" on:click={onMuteClick}>
		{#if $soundOn}
			<Icon name="volume-2" width={"1.3em"} height={"1.3em"} />
			<div class="mute-text">{muteText}</div>
		{:else}
			<Icon name="volume-x" stroke="#893026" width={"1.3em"} height={"1.3em"} />
			<div class="mute-text">{unmuteText}</div>
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

<style>
	button {
		border: none;
		background: white;
		border-radius: 0;
		height: 100%;
		color: var(--color-fg);
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
