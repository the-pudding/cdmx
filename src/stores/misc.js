import { writable, derived } from "svelte/store";

export const language = writable("english");
export const soundOn = writable(true);
