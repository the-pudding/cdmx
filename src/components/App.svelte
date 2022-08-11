<script>
	import TopBar from "$components/TopBar.svelte";
	import Landing from "$components/Landing.svelte";
	import Inline from "$components/Inline.svelte";
	import Scroll from "$components/Scroll.svelte";
	import Title from "$components/Title.svelte";
	import Footer from "$components/Footer.svelte";
	import copy from "$data/copy.json";
	import { entered } from "$stores/misc.js";

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
	<Inline id="inline1" content={copy.inline1} />
	<Scroll id="apartment" background="apartment" steps={copy.apartmentSteps} />
	<Inline id="inline2" content={copy.inline2} />
	<Scroll id="city" background="city" steps={copy.citySteps} />
	<Footer />
{/if}
