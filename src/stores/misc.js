import { writable } from "svelte/store";

export const language = writable("english");
export const soundOn = writable(true);

export const entered = writable(false); /* entered the story */
export const inModal = writable(false); /* in free play instruction modal */
export const inFreePlay = writable(false); /* in zoomable/panable free play */
