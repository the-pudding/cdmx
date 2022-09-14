<script>
	import TopBar from "$components/TopBar.svelte";
	import Landing from "$components/Landing.svelte";
	import Inline from "$components/Inline.svelte";
	import Skip from "$components/Skip.svelte";
	import Scroll from "$components/Scroll.svelte";
	import Sound from "$components/Sound.svelte";
	import Ambi from "$components/Ambi.svelte";
	import Footer from "$components/Footer.svelte";
	import copy from "$data/copy.json";
	import {
		inFreePlay,
		inModal,
		freePlaySelection,
		soundPlaying,
		browserZoom,
		soundOn,
		entered
	} from "$stores/misc.js";
	import { onMount } from "svelte";

	$: console.log({ copy });

	let outerWidth;
	let innerWidth;
	$: $browserZoom = Math.round((outerWidth / innerWidth) * 100);

	const handleKey = (e) => {
		if (e.key === "Escape" && $inFreePlay) {
			$inFreePlay = false;
			$inModal = true;
			$freePlaySelection = undefined;
			$soundPlaying = undefined;
		}
	};

	onMount(() => {
		document.addEventListener("visibilitychange", (event) => {
			if (document.visibilityState == "visible") {
				// set it back on, but only if you had it on in the first place...
			} else {
				$soundOn = false;
			}
		});
	});
</script>

<Landing />
<Ambi />
<Sound />

<div class:visible={$entered}>
	<TopBar />

	<Scroll id="intro" steps={copy.preTitleProse} textBg={false} />

	<Skip content={copy.skip} />

	<Inline
		id="inline1"
		title={copy.inline1.title}
		content={copy.inline1.content}
	/>

	<Scroll id="apartment" steps={copy.apartmentSteps} />

	<Inline
		id="inline2"
		title={copy.inline2.title}
		content={copy.inline2.content}
	/>

	<Scroll id="city" steps={copy.citySteps} />

	<Inline id="thanks" title={copy.thanks.title} content={copy.thanks.content} />

	<Footer />
</div>

<svelte:window on:keydown={handleKey} bind:outerWidth bind:innerWidth />

<style>
	.visible {
		display: block;
	}
	div {
		display: none;
	}
</style>
