import { createEvent, createStore } from "effector";

export const $arrayStore = createStore<number>(-1);
export const $lightStore = createStore<number>(-1);

export const setBolls = createEvent<number>();
export const setlights = createEvent<any[]>();

$arrayStore.on(setBolls, (_, state) => state);
// $lightStore.on(setlights, (state, payload) => [...state, payload]);
