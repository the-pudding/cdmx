<script>
	import Buttons from "$components/TopBar.Buttons.svelte";
	import { language, entered } from "$stores/misc.js";
	import copy from "$data/copy.json";
	import { createEventDispatcher, onMount, tick } from "svelte";
	import _ from "lodash";
	import { fade } from "svelte/transition";

	const dispatch = createEventDispatcher();

	$: intro = copy.landing[$language];
	$: buttonText =
		$language === "english"
			? "Start audio story"
			: "Iniciar historia audiovisual";

	const enter = async () => {
		$entered = true;
		await tick();
		const el = document.getElementById("scroll-to-start");
		el.scrollIntoView({ behavior: "smooth", block: "center" });
		dispatch("enter");
	};

	let randomId;
	onMount(() => {
		randomId = _.sample(
			copy.soundBank
				.map((d) => d.id)
				.filter((d) => d !== "metro" && d !== "ropa")
		);
	});
</script>

<section id="landing">
	<div class="wrapper">
		{#if randomId}
			<img
				src={`assets/img/freeplay/${randomId}.png`}
				alt="illustration of mexico city street vendor"
				transition:fade
			/>
		{:else}
			<div class="placeholder" />
		{/if}

		<div class="intro">
			{#each intro as text, i}
				<p class:big={i === 0}>{@html text}</p>
			{/each}
		</div>

		<Buttons />

		<button on:click={enter}>{buttonText} </button>
	</div>
</section>

<style>
	section {
		background: var(--highlight-light);
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.intro {
		margin: 1em;
	}
	.intro,
	.welcome {
		text-align: center;
	}
	button {
		display: flex;
		align-items: center;
		margin-top: 3em;
		padding: 0.5em;
		font-size: 1.3em;
		color: var(--color-fg);
		border: 3px solid var(--color-fg);
		border-radius: 0;
	}
	span {
		display: flex;
		margin-left: 8px;
	}
	.big {
		font-size: 4em;
	}
	img {
		height: 200px;
	}
	.placeholder {
		height: 200px;
	}

	@media only screen and (max-width: 600px) {
		.big {
			font-size: 2.3em;
		}
		img {
			height: 150px;
		}
		button {
			margin-top: 1em;
		}
		section {
			justify-content: flex-start;
		}
		.wrapper {
			margin-top: 100px;
		}
	}
</style>
