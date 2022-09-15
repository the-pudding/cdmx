<script>
	import Image from "$components/Interactive.Image.svelte";
	import Button from "$components/Interactive.Button.svelte";
	import Preview from "$components/Interactive.Preview.svelte";
	import copy from "$data/copy.json";
	import { locations, inFreePlay } from "$stores/misc.js";
	import viewport from "$stores/viewport.js";

	const ids = copy.soundBank.map((d) => d.id);

	$: isMobile = $viewport.width < 600;
</script>

{#each ids as id}
	{@const location = $locations[id]}

	<Image {id} />

	{#if !isMobile}
		<Preview {id} {location} />
	{/if}

	{#if id === "afilador" && $inFreePlay}
		<Preview id="teach" {location} />
	{/if}

	<Button {id} {location} />
{/each}

{#each ["tacos", "toreros"] as id}
	<Image {id} />
{/each}
