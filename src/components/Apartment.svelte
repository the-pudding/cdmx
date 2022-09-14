<script>
	import Vendor from "$components/Vendor.svelte";

	export let currentStep;
	export let vendors;

	const exteriorBig = "assets/img/background/apartment_ext_big_compressed.png";
	const exteriorSmall =
		"assets/img/background/apartment_ext_small_compressed.png";
	const interiorBig = "assets/img/background/apartment_int_big_compressed.png";
	const interiorSmall =
		"assets/img/background/apartment_int_small_compressed.png";

	$: currentVendor =
		currentStep && currentStep.vendor ? currentStep.vendor : undefined;
</script>

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
