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

export const buttonLocations = readable({
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
});

export const flyLocations = readable({
	afilador: { desktop: [-1.3, -0.9], mobile: [-1.5, -1] },
	guy: { desktop: [-0.75, -0.3], mobile: [-0.2, -0.3] },
	chatarrero: { desktop: [-1.5, -1], mobile: [-1.5, -1] },
	tacos: { desktop: [-1, -1.9], mobile: [-1, -1.9] },
	toreros: { desktop: [0, -2], mobile: [0, -2] }
});
