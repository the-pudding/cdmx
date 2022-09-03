import { writable, readable } from "svelte/store";
import { tweened } from "svelte/motion";

export const language = writable("english");
export const soundOn = writable(false);

export const entered = writable(false); /* entered the story */
export const inModal = writable(false); /* in free play instruction modal */
export const inFreePlay = writable(false); /* in zoomable/panable free play */

export const ambi = writable(undefined); /* which ambi track is playing */
export const ambiVolume = tweened(0, {
	duration: 2000
});

export const freePlaySelection = writable(undefined); /* id of vendor */

export const flyLocations = readable({
	afilador: [0.56, 0.42],
	agua: [0.61, 0.84],
	camotero: [0.65, 0.57],
	cartero: [0.71, 0.62],
	chatarrero: [0.66, 0.47],
	elotero: [0.28, 0.75],
	gasero: [0.43, 0.63],
	globero: [0.83, 0.31],
	guy: [0.38, 0.22],
	heladero: [0.76, 0.33],
	merenguero: [0.85, 0.47],
	metro: [0.84, 0.8],
	obleas: [0.09, 0.46],
	organillero: [0.09, 0.57],
	panadero: [0.69, 0.71],
	recolector: [0.28, 0.47],
	ropa: [0.9, 0.7],
	tacos: [0.5, 0.5],
	tamalero: [0.37, 0.43],
	toreros: [0.14, 0.77],
	trompetista: [0.4, 0.37],
	verdulero: [0.5, 0.76]
});
