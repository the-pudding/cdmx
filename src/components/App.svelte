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
		entered,
		inFreePlay,
		inModal,
		freePlaySelection,
		soundPlaying,
		browserZoom
	} from "$stores/misc.js";

	$: console.log({ copy });

	const handleKey = (e) => {
		if (e.key === "Escape" && $inFreePlay) {
			$inFreePlay = false;
			$inModal = true;
			$freePlaySelection = undefined;
			$soundPlaying = undefined;
		}
	};

	let outerWidth;
	let innerWidth;
	$: $browserZoom = Math.round((outerWidth / innerWidth) * 100);
</script>

<Landing />
<TopBar />
{#if $entered}
	<Ambi />
	<Sound />

	<Scroll id="intro" steps={copy.preTitleProse} textBg={false} />

	<Skip />

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
{/if}

<svelte:window on:keydown={handleKey} bind:outerWidth bind:innerWidth />
