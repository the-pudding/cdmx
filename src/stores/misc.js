import { writable, readable } from "svelte/store";
import { tweened } from "svelte/motion";

export const language = writable("english");
export const soundOn = writable(true);
export const browserZoom = writable(1);

export const entered = writable(false); /* entered the story */
export const inModal = writable(false); /* in free play instruction modal */
export const inFreePlay = writable(false); /* in zoomable/panable free play */

export const ambi = writable(undefined); /* which ambi track is playing */
export const ambiVolume = tweened(0, {
	duration: 2000
});

export const teaching = writable(true);

// id of vendor
export const highlightedVendor = writable(undefined);
export const freePlaySelection = writable(undefined);
export const freePlayHover = writable(undefined);

export const locations = readable({
	afilador: [0.56, 0.42, 111, 127],
	agua: [0.62, 0.85, 167, 212],
	camotero: [0.65, 0.57, 125, 132],
	cartero: [0.71, 0.62, 128, 154],
	chatarrero: [0.66, 0.46, 213, 187],
	elotero: [0.28, 0.75, 157, 145],
	gasero: [0.33, 0.67, 370, 227],
	globero: [0.84, 0.29, 100, 131],
	guy: [0.38, 0.22],
	heladero: [0.77, 0.32, 100, 112],
	merenguero: [0.85, 0.47, 100, 100],
	metro: [0.92, 0.85, 100, 100],
	obleas: [0.04, 0.46, 84, 112],
	organillero: [0.04, 0.57, 80, 137],
	panadero: [0.69, 0.72, 151, 161],
	recolector: [0.27, 0.47, 141, 196],
	ropa: [0.06, 0.73, 158, 168],
	tacos: [0.14, 0.87, 100],
	tamalero: [0.37, 0.44, 142, 146],
	toreros: [0.44, 0.88, 100],
	trompetista: [0.4, 0.35, 135, 130],
	verdulero: [0.5, 0.75, 300, 215]
});
