<script>
	import {
		freePlaySelection,
		freePlayHover,
		inFreePlay,
		teaching
	} from "$stores/misc.js";
	import viewport from "$stores/viewport.js";

	export let id;
	export let location;

	$: left = `${location[0] * 100}%`;
	$: top = `${location[1] * 100}%`;
	$: width = `${location[2]}px`;
	$: height = `${location[3]}px`;
	$: isMobile = $viewport.width < 600;

	const onClick = (e) => {
		if ($inFreePlay) {
			$teaching = false;
			const clickedId = e.target.id.replace("-button", "");
			$freePlaySelection = clickedId;
			$freePlayHover = undefined;
		}
	};
	const onButtonHover = (e) => {
		if ($inFreePlay && !$freePlaySelection && !isMobile) {
			$freePlayHover = e.target.id.replace("-button", "");
		}
	};
	const onButtonLeave = () => {
		if ($inFreePlay && !isMobile) $freePlayHover = undefined;
	};
</script>

<button
	id={`${id}-button`}
	tabindex="0"
	class:visible={$inFreePlay}
	class:teaching={$teaching}
	on:click|stopPropagation={onClick}
	on:mouseenter={onButtonHover}
	on:mouseleave={onButtonLeave}
	style:left
	style:top
	style:width
	style:height
/>

<style>
	button {
		position: absolute;
		background: transparent;
		transform: translate(-50%, -50%);
		border: none;
		border-radius: 50px;
		z-index: 11;
		display: none;
	}
	button.visible {
		display: block;
	}
	#afilador-button.teaching {
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
		transform: scale(1);
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0% {
			transform: translate(-50%, -50%) scale(0.95);
			box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.8);
		}

		70% {
			transform: translate(-50%, -50%) scale(1);
			box-shadow: 0 0 0 30px rgba(0, 0, 0, 0);
		}

		100% {
			transform: translate(-50%, -50%) scale(0.95);
			box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
		}
	}
</style>
