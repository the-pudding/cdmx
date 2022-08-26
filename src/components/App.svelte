<script>
	import TopBar from "$components/TopBar.svelte";
	import Landing from "$components/Landing.svelte";
	import Inline from "$components/Inline.svelte";
	import Scroll from "$components/Scroll.svelte";
	import Title from "$components/Title.svelte";
	import Ambi from "$components/Ambi.svelte";
	import Footer from "$components/Footer.svelte";
	import copy from "$data/copy.json";
	import { entered } from "$stores/misc.js";

	$: console.log({ copy });
</script>

<TopBar />
<Landing />

{#if $entered}
	<Ambi />

	<Scroll id="intro" steps={copy.preTitleProse} textBg={false} />

	<!-- <Title /> -->

	<Inline
		id="inline1"
		title={copy.inline1.title}
		content={copy.inline1.content}
	/>

	<Scroll id="apartment" background="apartment" steps={copy.apartmentSteps} />

	<Inline
		id="inline2"
		title={copy.inline2.title}
		content={copy.inline2.content}
	/>

	<Scroll id="city" background="city" steps={copy.citySteps} />

	<Footer />
{/if}
