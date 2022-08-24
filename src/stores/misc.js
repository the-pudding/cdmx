import { writable } from "svelte/store";
import { tweened } from "svelte/motion";

export const language = writable("english");
export const soundOn = writable(true);

export const entered = writable(false); /* entered the story */
export const inModal = writable(false); /* in free play instruction modal */
export const inFreePlay = writable(false); /* in zoomable/panable free play */

export const ambi = writable(undefined); /* which ambi track is playing */
export const ambiVolume = tweened(0.75, {
	duration: 3000
});
