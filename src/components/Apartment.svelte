<script>
	import Vendor from "$components/Vendor.svelte";
	import { loadApartment } from "$stores/misc.js";

	export let currentStep;
	export let vendors;

	const exteriorBig = "assets/img/background/apartment_ext.png";
	const exteriorSmall = "assets/img/background/apartment_ext_mobile.png";
	const interiorBig = "assets/img/background/apartment_int.png";
	const interiorSmall = "assets/img/background/apartment_int_mobile.png";

	$: currentVendor =
		currentStep && currentStep.vendor ? currentStep.vendor : undefined;
</script>

{#if $loadApartment}
	<img
		srcset={`${exteriorSmall} 1570w, ${exteriorBig} 3140w`}
		sizes={`(max-width: 600px) 1570px, 3140px`}
		src={exteriorBig}
		class="ext"
		alt="illustration of a man sitting at his desk looking out the window of his apartment in mexico city"
	/>
	<img
		srcset={`${interiorSmall} 1570w, ${interiorBig} 3140w`}
		sizes={`(max-width: 600px) 1570px, 3140px`}
		src={interiorBig}
		class="int"
		alt="illustration of a man sitting at his desk looking out the window of his apartment in mexico city"
	/>
{/if}

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
