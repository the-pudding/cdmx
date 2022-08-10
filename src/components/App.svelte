<script>
	import TopBar from "$components/TopBar.svelte";
	import Landing from "$components/Landing.svelte";
	import Scroll from "$components/Scroll.svelte";
	import Title from "$components/Title.svelte";
	import copy from "$data/copy.json";
	import { entered, language, soundOn } from "$stores/misc.js";

	$: console.log({ copy });
</script>

<TopBar />

<Landing />

{#if $entered}
	<Scroll
		id="intro"
		steps={copy.preTitleProse}
		fontSize={"1.5em"}
		textBg={false}
	/>
	<Title />
	<Scroll id="main" steps={copy.postTitleProse} />
{/if}
