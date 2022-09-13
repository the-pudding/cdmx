<script>
	import Vendor from "$components/Vendor.svelte";

	export let currentStep;
	export let vendors;

	$: currentVendor =
		currentStep && currentStep.vendor ? currentStep.vendor : undefined;
</script>

<img
	src="assets/img/background/apartment_ext_big_compressed.png"
	class="ext"
	alt="illustration of a man sitting at his desk looking out the window of his apartment in mexico city"
/>
<img
	src="assets/img/background/apartment_int_big_compressed.png"
	class="int"
	alt="illustration of a man sitting at his desk looking out the window of his apartment in mexico city"
/>

{#each vendors as vendor}
	<Vendor {vendor} onStage={vendor === currentVendor} />
{/each}

<style>
	img {
		width: 100%;
		min-height: 100vh;
		min-width: 1047px;
		position: absolute;
		top: 0;
	}
	.ext {
		z-index: 1;
	}
	.int {
		z-index: 3;
	}
</style>
