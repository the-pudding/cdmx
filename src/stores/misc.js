import { writable } from "svelte/store";

export const entered = writable(false);
export const language = writable("english");
export const soundOn = writable(true);

export const inModal = writable(false);
export const inFreePlay = writable(false);
