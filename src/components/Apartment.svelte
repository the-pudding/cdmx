<script>
	import Vendor from "$components/Vendor.svelte";

	export let currentStep;
	export let vendors;

	$: currentVendor =
		currentStep && currentStep.vendor ? currentStep.vendor : undefined;
</script>

<img
	src="assets/img/background/apartment_ext.png"
	class="ext"
	alt="illustration of apartment in cdmx"
/>
<img
	src="assets/img/background/apartment_int.png"
	class="int"
	alt="illustration of apartment in cdmx"
/>

{#each vendors as vendor}
	<Vendor src={`assets/img/${vendor}.png`} onStage={vendor === currentVendor} />
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
