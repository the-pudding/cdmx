<script>
	import Sound from "$components/Sound.svelte";
	import copy from "$data/copy.json";
	import { freePlaySound } from "$stores/misc.js";

	let src;

	const ids = copy.soundBank.map((d) => d.id);

	const locations = {
		afilador: [53, 38],
		agua: [60, 79],
		camotero: [62, 52],
		cartero: [67, 57],
		chatarrero: [66, 40],
		elotero: [25, 70],
		gasero: [40, 60],
		globero: [80, 26],
		heladero: [73, 28],
		merenguero: [81, 42],
		metro: [89, 81],
		obleas: [0, 41],
		organillero: [0, 51],
		panadero: [65, 68],
		recolector: [25, 43],
		ropa: [87, 68],
		tamalero: [35, 39],
		trompetista: [34, 32],
		verdulero: [50, 70]
	};

	$: src = $freePlaySound ? `assets/sound/${$freePlaySound}.mp3` : undefined;

	const onClick = (e) => {
		const clickedId = e.target.id.replace("-button", "");
		$freePlaySound = clickedId;
	};
</script>

{#each ids as id}
	{#if locations[id]}
		<button
			id={`${id}-button`}
			on:click|stopPropagation={onClick}
			style:left={`${locations[id][0]}%`}
			style:top={`${locations[id][1]}%`}
			class:selected={$freePlaySound === id}
		/>
	{/if}
{/each}

{#if src}
	<Sound {src} />
{/if}

<style>
	button {
		position: absolute;
		background: transparent;
		box-shadow: inset 0px 0px 25px 0px rgb(255, 215, 0, 0.5),
			0px 0px 40px 0px rgb(255, 215, 0, 0.8);
		border: none;
		height: 100px;
		width: 100px;
		border-radius: 50px;
	}
	.selected,
	button:hover {
		box-shadow: inset 0px 0px 25px 0px rgba(212, 0, 255, 0.5),
			0px 0px 40px 0px rgb(212, 0, 255, 0.8);
	}
</style>
