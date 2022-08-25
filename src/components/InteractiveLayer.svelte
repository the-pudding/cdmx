<script>
	import Sound from "$components/Sound.svelte";
	import copy from "$data/copy.json";

	let src;

	const ids = copy.soundBank.map((d) => d.id);

	const onClick = (e) => {
		const clickedId = e.target.id.replace("-button", "");
		src = `assets/sound/${clickedId}.mp3`;
	};
</script>

<!-- <div class="container">
	{#each ids as id}
		<button id={`${id}-button`} on:click|stopPropagation={onClick}>{id}</button>
	{/each}
	<button class="stop" on:click={() => (src = undefined)}>stop</button>
</div> -->

<!-- {#if src}
	<Sound {src} />
{/if} -->
<style>
	.container {
		position: absolute;
		top: 30%;
		left: 30%;
		display: flex;
		flex-wrap: wrap;
		width: 500px;
	}
	button {
		background: gold;
		opacity: 0.7;
		height: 50px;
	}
	.stop {
		background: red;
	}
</style>
